import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import {
  createResponse,
  createErrorResponse,
  withAuth,
} from "@/lib/api-helpers";
import { updateSiswaSchema } from "@/lib/validations";

// GET single siswa
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const auth = await withAuth(request);
    if (auth.error) {
      return createErrorResponse(auth.error, auth.status);
    }

    const { id } = await params;

    const siswa = await prisma.siswa.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            email: true,
            username: true,
            fullName: true,
            phoneNumber: true,
            profilePicture: true,
          },
        },
        rombonganBelajar: true,
        nilaiRapor: {
          include: {
            mataPelajaran: true,
          },
        },
        kehadiran: true,
      },
    });

    if (!siswa) {
      return createErrorResponse("Siswa tidak ditemukan", 404);
    }

    return createResponse(siswa);
  } catch (error) {
    console.error("Get siswa error:", error);
    return createErrorResponse("Terjadi kesalahan server", 500);
  }
}

// PUT update siswa data
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const auth = await withAuth(request);
    if (auth.error) {
      return createErrorResponse(auth.error, auth.status);
    }

    const { id } = await params;
    const body = await request.json();
    const validation = updateSiswaSchema.safeParse(body);

    if (!validation.success) {
      return createErrorResponse(
        "Validasi gagal",
        400,
        validation.error.issues,
      );
    }

    // Check if siswa exists
    const existingSiswa = await prisma.siswa.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!existingSiswa) {
      return createErrorResponse("Siswa tidak ditemukan", 404);
    }

    // Check authorization
    if (
      auth.user!.id !== existingSiswa.userId &&
      auth.user!.role !== "SUPER_ADMIN" &&
      auth.user!.role !== "PENDIDIK" &&
      auth.user!.role !== "TENAGA_KEPENDIDIKAN"
    ) {
      return createErrorResponse("Forbidden", 403);
    }

    const { fullName, ...siswaData } = validation.data;

    // Update user fullName if provided
    if (fullName) {
      await prisma.user.update({
        where: { id: existingSiswa.userId },
        data: { fullName },
      });
    }

    // Update siswa data
    const siswa = await prisma.siswa.update({
      where: { id },
      data: siswaData,
      include: {
        user: true,
      },
    });

    return createResponse(siswa, "Data siswa berhasil diperbarui");
  } catch (error) {
    console.error("Update siswa error:", error);
    return createErrorResponse("Terjadi kesalahan server", 500);
  }
}
