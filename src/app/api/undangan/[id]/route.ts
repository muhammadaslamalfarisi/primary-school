import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import {
  createResponse,
  createErrorResponse,
  withAuth,
} from "@/lib/api-helpers";
import { undanganSchema } from "@/lib/validations";

// GET single undangan
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const undangan = await prisma.undangan.findUnique({
      where: { id },
    });

    if (!undangan) {
      return createErrorResponse("Undangan tidak ditemukan", 404);
    }

    return createResponse(undangan);
  } catch (error) {
    console.error("Get undangan error:", error);
    return createErrorResponse("Terjadi kesalahan server", 500);
  }
}

// PUT update undangan
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
    const validation = undanganSchema.safeParse(body);

    if (!validation.success) {
      return createErrorResponse(
        "Validasi gagal",
        400,
        validation.error.issues,
      );
    }

    const existingUndangan = await prisma.undangan.findUnique({
      where: { id },
    });

    if (!existingUndangan) {
      return createErrorResponse("Undangan tidak ditemukan", 404);
    }

    const undangan = await prisma.undangan.update({
      where: { id },
      data: {
        ...validation.data,
        tanggalAcara:
          typeof validation.data.tanggalAcara === "string"
            ? new Date(validation.data.tanggalAcara)
            : validation.data.tanggalAcara,
      },
    });

    return createResponse(undangan, "Undangan berhasil diperbarui");
  } catch (error) {
    console.error("Update undangan error:", error);
    return createErrorResponse("Terjadi kesalahan server", 500);
  }
}

// DELETE undangan
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

    const existingUndangan = await prisma.undangan.findUnique({
      where: { id },
    });

    if (!existingUndangan) {
      return createErrorResponse("Undangan tidak ditemukan", 404);
    }

    await prisma.undangan.delete({
      where: { id },
    });

    return createResponse(null, "Undangan berhasil dihapus");
  } catch (error) {
    console.error("Delete undangan error:", error);
    return createErrorResponse("Terjadi kesalahan server", 500);
  }
}
