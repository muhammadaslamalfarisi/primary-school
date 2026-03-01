import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import {
  createResponse,
  createErrorResponse,
  withAuth,
} from "@/lib/api-helpers";
import { hashPassword, comparePassword } from "@/lib/password";
import z from "zod";

const credentialsSchema = z.object({
  email: z.string().email("Email tidak valid").optional(),
  username: z.string().min(3, "Username minimal 3 karakter").optional(),
  currentPassword: z.string().min(6, "Password minimal 6 karakter"),
  newPassword: z.string().min(6, "Password baru minimal 6 karakter").optional(),
});

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const auth = await withAuth(request);
    if (auth.error) {
      return createErrorResponse(auth.error, auth.status);
    }

    const { id } = await params;

    // Users can only update their own credentials unless admin
    if (auth.user!.id !== id && auth.user!.role !== "SUPER_ADMIN") {
      return createErrorResponse("Tidak bisa mengubah data user lain", 403);
    }

    const body = await request.json();
    const validation = credentialsSchema.safeParse(body);

    if (!validation.success) {
      return createErrorResponse(
        "Data tidak valid",
        400,
        validation.error.issues,
      );
    }

    const { email, username, currentPassword, newPassword } = validation.data;

    // Get current user
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return createErrorResponse("User tidak ditemukan", 404);
    }

    // Verify current password
    const passwordMatch = await comparePassword(currentPassword, user.password);
    if (!passwordMatch) {
      return createErrorResponse("Password saat ini salah", 401);
    }

    // Prepare update data
    const updateData: any = {};

    // Check email uniqueness if changing email
    if (email && email !== user.email) {
      const existingEmail = await prisma.user.findUnique({
        where: { email },
      });
      if (existingEmail) {
        return createErrorResponse("Email sudah digunakan", 400);
      }
      updateData.email = email;
    }

    // Check username uniqueness if changing username
    if (username && username !== user.username) {
      const existingUsername = await prisma.user.findUnique({
        where: { username },
      });
      if (existingUsername) {
        return createErrorResponse("Username sudah digunakan", 400);
      }
      updateData.username = username;
    }

    // Hash new password if provided
    if (newPassword) {
      updateData.password = await hashPassword(newPassword);
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        username: true,
        fullName: true,
        role: true,
        updatedAt: true,
      },
    });

    return createResponse(updatedUser, "Kredensial berhasil diperbarui");
  } catch (error) {
    console.error("Update credentials error:", error);
    return createErrorResponse("Terjadi kesalahan server", 500);
  }
}
