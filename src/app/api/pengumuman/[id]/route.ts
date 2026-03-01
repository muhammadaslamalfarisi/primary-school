import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import {
  createResponse,
  createErrorResponse,
  withAuth,
} from "@/lib/api-helpers";
import { pengumumanSchema } from "@/lib/validations";

// GET single pengumuman
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const pengumuman = await prisma.pengumuman.findUnique({
      where: { id },
    });

    if (!pengumuman) {
      return createErrorResponse("Pengumuman tidak ditemukan", 404);
    }

    return createResponse(pengumuman);
  } catch (error) {
    console.error("Get pengumuman error:", error);
    return createErrorResponse("Terjadi kesalahan server", 500);
  }
}

// PUT update pengumuman
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
    const validation = pengumumanSchema.safeParse(body);

    if (!validation.success) {
      return createErrorResponse(
        "Validasi gagal",
        400,
        validation.error.issues,
      );
    }

    // Check if pengumuman exists
    const existingPengumuman = await prisma.pengumuman.findUnique({
      where: { id },
    });

    if (!existingPengumuman) {
      return createErrorResponse("Pengumuman tidak ditemukan", 404);
    }

    const pengumuman = await prisma.pengumuman.update({
      where: { id },
      data: validation.data,
    });

    return createResponse(pengumuman, "Pengumuman berhasil diperbarui");
  } catch (error) {
    console.error("Update pengumuman error:", error);
    return createErrorResponse("Terjadi kesalahan server", 500);
  }
}

// DELETE pengumuman
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

    // Check if pengumuman exists
    const existingPengumuman = await prisma.pengumuman.findUnique({
      where: { id },
    });

    if (!existingPengumuman) {
      return createErrorResponse("Pengumuman tidak ditemukan", 404);
    }

    await prisma.pengumuman.delete({
      where: { id },
    });

    return createResponse(null, "Pengumuman berhasil dihapus");
  } catch (error) {
    console.error("Delete pengumuman error:", error);
    return createErrorResponse("Terjadi kesalahan server", 500);
  }
}
