import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import {
  createResponse,
  createErrorResponse,
  withAuth,
} from "@/lib/api-helpers";
import { inovasiSchema } from "@/lib/validations";

// GET single inovasi
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const inovasi = await prisma.inovasi.findUnique({
      where: { id },
    });

    if (!inovasi) {
      return createErrorResponse("Inovasi tidak ditemukan", 404);
    }

    return createResponse(inovasi);
  } catch (error) {
    console.error("Get inovasi error:", error);
    return createErrorResponse("Terjadi kesalahan server", 500);
  }
}

// PUT update inovasi
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const auth = await withAuth(request, [
      "SUPER_ADMIN",
      "PENDIDIK",
      "TENAGA_KEPENDIDIKAN",
    ]);
    if (auth.error) {
      return createErrorResponse(auth.error, auth.status);
    }

    const { id } = await params;
    const body = await request.json();
    const validation = inovasiSchema.safeParse(body);

    if (!validation.success) {
      return createErrorResponse(
        "Validasi gagal",
        400,
        validation.error.issues,
      );
    }

    const existingInovasi = await prisma.inovasi.findUnique({
      where: { id },
    });

    if (!existingInovasi) {
      return createErrorResponse("Inovasi tidak ditemukan", 404);
    }

    const inovasi = await prisma.inovasi.update({
      where: { id },
      data: validation.data,
    });

    return createResponse(inovasi, "Inovasi berhasil diperbarui");
  } catch (error) {
    console.error("Update inovasi error:", error);
    return createErrorResponse("Terjadi kesalahan server", 500);
  }
}

// DELETE inovasi
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const auth = await withAuth(request, [
      "SUPER_ADMIN",
      "PENDIDIK",
      "TENAGA_KEPENDIDIKAN",
    ]);
    if (auth.error) {
      return createErrorResponse(auth.error, auth.status);
    }

    const { id } = await params;

    const existingInovasi = await prisma.inovasi.findUnique({
      where: { id },
    });

    if (!existingInovasi) {
      return createErrorResponse("Inovasi tidak ditemukan", 404);
    }

    await prisma.inovasi.delete({
      where: { id },
    });

    return createResponse(null, "Inovasi berhasil dihapus");
  } catch (error) {
    console.error("Delete inovasi error:", error);
    return createErrorResponse("Terjadi kesalahan server", 500);
  }
}
