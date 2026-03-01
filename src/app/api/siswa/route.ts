import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import {
  createResponse,
  createErrorResponse,
  withAuth,
} from "@/lib/api-helpers";

// GET all siswa
export async function GET(request: NextRequest) {
  try {
    const auth = await withAuth(request, [
      "SUPER_ADMIN",
      "PENDIDIK",
      "TENAGA_KEPENDIDIKAN",
    ]);
    if (auth.error) {
      return createErrorResponse(auth.error, auth.status);
    }

    const siswa = await prisma.siswa.findMany({
      include: {
        user: {
          select: {
            email: true,
            fullName: true,
            phoneNumber: true,
          },
        },
        rombonganBelajar: true,
      },
    });

    return createResponse(siswa, "Data siswa");
  } catch (error) {
    console.error("Get siswa error:", error);
    return createErrorResponse("Terjadi kesalahan server", 500);
  }
}
