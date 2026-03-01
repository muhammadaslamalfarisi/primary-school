import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import {
  createResponse,
  createErrorResponse,
  withAuth,
} from "@/lib/api-helpers";
import { inovasiSchema } from "@/lib/validations";

// GET all inovasi
export async function GET(request: NextRequest) {
  try {
    const inovasi = await prisma.inovasi.findMany({
      orderBy: { createdAt: "desc" },
    });
    return createResponse(inovasi, "Data inovasi");
  } catch (error) {
    console.error("Get inovasi error:", error);
    return createErrorResponse("Terjadi kesalahan server", 500);
  }
}

// POST create inovasi
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
    const validation = inovasiSchema.safeParse(body);

    if (!validation.success) {
      return createErrorResponse(
        "Validasi gagal",
        400,
        validation.error.issues,
      );
    }

    const inovasi = await prisma.inovasi.create({
      data: validation.data,
    });

    return createResponse(inovasi, "Inovasi berhasil dibuat", 201);
  } catch (error) {
    console.error("Create inovasi error:", error);
    return createErrorResponse("Terjadi kesalahan server", 500);
  }
}
