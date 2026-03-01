import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { generateToken, setAuthCookie } from "@/lib/auth";
import { createResponse, createErrorResponse } from "@/lib/api-helpers";
import { registerStaffSchema } from "@/lib/validations";
import { withAuth } from "@/lib/api-helpers";

export async function POST(request: NextRequest) {
  try {
    // Check authorization - only SUPER_ADMIN can create staff
    const auth = await withAuth(request, ["SUPER_ADMIN"]);
    if (auth.error) {
      return createErrorResponse(auth.error, auth.status);
    }

    const body = await request.json();
    const validation = registerStaffSchema.safeParse(body);

    if (!validation.success) {
      return createErrorResponse(
        "Validasi gagal",
        400,
        validation.error.issues,
      );
    }

    const {
      email,
      username,
      password,
      fullName,
      jabatan,
      departemen,
      phoneNumber,
    } = validation.data;

    // Check if email or username exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return createErrorResponse("Email atau username sudah digunakan", 400);
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
        role: "TENAGA_KEPENDIDIKAN",
        phoneNumber,
        tenagaKependidikan: {
          create: {
            jabatan,
            departemen,
          },
        },
      },
      include: {
        tenagaKependidikan: true,
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
      "Registrasi tenaga kependidikan berhasil",
      201,
    );
  } catch (error) {
    console.error("Registration error:", error);
    return createErrorResponse("Terjadi kesalahan server", 500);
  }
}
