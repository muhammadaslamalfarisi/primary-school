import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword, comparePassword } from "@/lib/password";
import { generateToken, setAuthCookie } from "@/lib/auth";
import { createResponse, createErrorResponse } from "@/lib/api-helpers";
import { loginSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return createErrorResponse(
        "Validasi gagal",
        400,
        validation.error.issues,
      );
    }

    const { email, password } = validation.data;

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        siswa: true,
        pendidik: true,
        tenagaKependidikan: true,
      },
    });

    if (!user) {
      return createErrorResponse("Email atau password salah", 401);
    }

    if (user.status !== "AKTIF") {
      return createErrorResponse("Akun tidak aktif", 403);
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return createErrorResponse("Email atau password salah", 401);
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    });

    await setAuthCookie(token);

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    return createResponse(
      {
        token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          fullName: user.fullName,
          role: user.role,
          profilePicture: user.profilePicture,
          siswa: user.siswa,
          pendidik: user.pendidik,
          tenagaKependidikan: user.tenagaKependidikan,
        },
      },
      "Login berhasil",
    );
  } catch (error) {
    console.error("Login error:", error);
    return createErrorResponse("Terjadi kesalahan server", 500);
  }
}
