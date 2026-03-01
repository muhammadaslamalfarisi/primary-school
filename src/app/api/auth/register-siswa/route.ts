import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { generateToken, setAuthCookie } from "@/lib/auth";
import { createResponse, createErrorResponse } from "@/lib/api-helpers";
import { registerSiswaSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = registerSiswaSchema.safeParse(body);

    if (!validation.success) {
      return createErrorResponse(
        "Validasi gagal",
        400,
        validation.error.issues,
      );
    }

    const { email, username, password, fullName, nisn, nis, phoneNumber } =
      validation.data;

    // Check if email or username exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return createErrorResponse("Email atau username sudah digunakan", 400);
    }

    // Check if NISN exists
    const existingSiswa = await prisma.siswa.findUnique({
      where: { nisn },
    });

    if (existingSiswa) {
      return createErrorResponse("NISN sudah terdaftar", 400);
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        fullName,
        role: "SISWA",
        phoneNumber,
        siswa: {
          create: {
            nisn,
            nis,
            status: "AKTIF",
          },
        },
      },
      include: {
        siswa: true,
      },
    });

    const token = generateToken({
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    });

    await setAuthCookie(token);

    return createResponse(
      {
        token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          fullName: user.fullName,
          role: user.role,
        },
      },
      "Registrasi berhasil",
      201,
    );
  } catch (error) {
    console.error("Registration error:", error);
    return createErrorResponse("Terjadi kesalahan server", 500);
  }
}
