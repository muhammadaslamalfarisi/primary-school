import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import {
  createResponse,
  createErrorResponse,
  withAuth,
} from "@/lib/api-helpers";
import { programSchema } from "@/lib/validations";

// GET all program
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const jenis = searchParams.get("jenis");

    let where: any = {};
    if (jenis) {
      where.jenis = jenis;
    }

    const program = await prisma.program.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    return createResponse(program, "Data program");
  } catch (error) {
    console.error("Get program error:", error);
    return createErrorResponse("Terjadi kesalahan server", 500);
  }
}

// POST create program
export async function POST(request: NextRequest) {
  try {
    const auth = await withAuth(request, [
      "SUPER_ADMIN",
      "PENDIDIK",
      "TENAGA_KEPENDIDIKAN",
    ]);
    if (auth.error) {
      return createErrorResponse(auth.error, auth.status);
    }

    const body = await request.json();
    const validation = programSchema.safeParse(body);

    if (!validation.success) {
      return createErrorResponse(
        "Validasi gagal",
        400,
        validation.error.issues,
      );
    }

    const program = await prisma.program.create({
      data: validation.data,
    });

    return createResponse(program, "Program berhasil dibuat", 201);
  } catch (error) {
    console.error("Create program error:", error);
    return createErrorResponse("Terjadi kesalahan server", 500);
  }
}
