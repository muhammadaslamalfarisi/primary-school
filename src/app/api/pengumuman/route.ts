import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import {
  createResponse,
  createErrorResponse,
  withAuth,
} from "@/lib/api-helpers";
import { pengumumanSchema } from "@/lib/validations";

// GET all pengumuman
export async function GET(request: NextRequest) {
  try {
    const pengumuman = await prisma.pengumuman.findMany({
      orderBy: { tanggal: "desc" },
    });
    return createResponse(pengumuman, "Data pengumuman");
  } catch (error) {
    console.error("Get pengumuman error:", error);
    return createErrorResponse("Terjadi kesalahan server", 500);
  }
}

// POST create pengumuman
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
    const validation = pengumumanSchema.safeParse(body);

    if (!validation.success) {
      return createErrorResponse(
        "Validasi gagal",
        400,
        validation.error.issues,
      );
    }

    const pengumuman = await prisma.pengumuman.create({
      data: validation.data,
    });

    return createResponse(pengumuman, "Pengumuman berhasil dibuat", 201);
  } catch (error) {
    console.error("Create pengumuman error:", error);
    return createErrorResponse("Terjadi kesalahan server", 500);
  }
}
