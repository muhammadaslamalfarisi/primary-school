import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import {
  createResponse,
  createErrorResponse,
  withAuth,
} from "@/lib/api-helpers";
import { programSchema } from "@/lib/validations";

// GET single program
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const program = await prisma.program.findUnique({
      where: { id },
    });

    if (!program) {
      return createErrorResponse("Program tidak ditemukan", 404);
    }

    return createResponse(program);
  } catch (error) {
    console.error("Get program error:", error);
    return createErrorResponse("Terjadi kesalahan server", 500);
  }
}

// PUT update program
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
    const validation = programSchema.safeParse(body);

    if (!validation.success) {
      return createErrorResponse(
        "Validasi gagal",
        400,
        validation.error.issues,
      );
    }

    const existingProgram = await prisma.program.findUnique({
      where: { id },
    });

    if (!existingProgram) {
      return createErrorResponse("Program tidak ditemukan", 404);
    }

    const program = await prisma.program.update({
      where: { id },
      data: validation.data,
    });

    return createResponse(program, "Program berhasil diperbarui");
  } catch (error) {
    console.error("Update program error:", error);
    return createErrorResponse("Terjadi kesalahan server", 500);
  }
}

// DELETE program
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

    const existingProgram = await prisma.program.findUnique({
      where: { id },
    });

    if (!existingProgram) {
      return createErrorResponse("Program tidak ditemukan", 404);
    }

    await prisma.program.delete({
      where: { id },
    });

    return createResponse(null, "Program berhasil dihapus");
  } catch (error) {
    console.error("Delete program error:", error);
    return createErrorResponse("Terjadi kesalahan server", 500);
  }
}
