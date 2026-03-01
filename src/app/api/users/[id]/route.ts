import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import {
  createResponse,
  createErrorResponse,
  withAuth,
} from "@/lib/api-helpers";

// GET user by ID
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

    // Users can only view their own data unless admin
    if (auth.user!.id !== id && auth.user!.role !== "SUPER_ADMIN") {
      return createErrorResponse("Forbidden", 403);
    }

    const user = await prisma.user.findUnique({
      where: { id },
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
    console.error("Get user error:", error);
    return createErrorResponse("Terjadi kesalahan server", 500);
  }
}

// PUT update user status (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const auth = await withAuth(request, ["SUPER_ADMIN"]);
    if (auth.error) {
      return createErrorResponse(auth.error, auth.status);
    }

    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!["AKTIF", "NONAKTIF", "SUSPENDED"].includes(status)) {
      return createErrorResponse("Status tidak valid", 400);
    }

    const user = await prisma.user.update({
      where: { id },
      data: { status },
      select: {
        id: true,
        email: true,
        fullName: true,
        status: true,
      },
    });

    return createResponse(user, "Status user berhasil diperbarui");
  } catch (error) {
    console.error("Update user error:", error);
    return createErrorResponse("Terjadi kesalahan server", 500);
  }
}

// DELETE user
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const auth = await withAuth(request, ["SUPER_ADMIN"]);
    if (auth.error) {
      return createErrorResponse(auth.error, auth.status);
    }

    const { id } = await params;

    // Prevent deleting self
    if (auth.user!.id === id) {
      return createErrorResponse("Tidak bisa menghapus akun sendiri", 400);
    }

    await prisma.user.delete({
      where: { id },
    });

    return createResponse(null, "User berhasil dihapus");
  } catch (error) {
    console.error("Delete user error:", error);
    return createErrorResponse("Terjadi kesalahan server", 500);
  }
}
