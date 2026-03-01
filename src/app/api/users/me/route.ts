import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import {
  createResponse,
  createErrorResponse,
  withAuth,
} from "@/lib/api-helpers";

// GET current user
export async function GET(request: NextRequest) {
  try {
    const auth = await withAuth(request);
    if (auth.error) {
      return createErrorResponse(auth.error, auth.status);
    }

    const user = await prisma.user.findUnique({
      where: { id: auth.user!.id },
      include: {
        siswa: true,
        pendidik: true,
        tenagaKependidikan: true,
      },
    });

    if (!user) {
      return createErrorResponse("User tidak ditemukan", 404);
    }

    return createResponse({
      id: user.id,
      email: user.email,
      username: user.username,
      fullName: user.fullName,
      role: user.role,
      profilePicture: user.profilePicture,
      status: user.status,
      siswa: user.siswa,
      pendidik: user.pendidik,
      tenagaKependidikan: user.tenagaKependidikan,
    });
  } catch (error) {
    console.error("Get current user error:", error);
    return createErrorResponse("Terjadi kesalahan server", 500);
  }
}
