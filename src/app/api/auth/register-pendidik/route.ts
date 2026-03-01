import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { generateToken, setAuthCookie } from "@/lib/auth";
import { createResponse, createErrorResponse } from "@/lib/api-helpers";
import { registerPendidikSchema } from "@/lib/validations";
import { withAuth } from "@/lib/api-helpers";

export async function POST(request: NextRequest) {
  try {
    // Check authorization - only SUPER_ADMIN can create pendidik
    const auth = await withAuth(request, ["SUPER_ADMIN"]);
    if (auth.error) {
      return createErrorResponse(auth.error, auth.status);
    }

    const body = await request.json();
    const validation = registerPendidikSchema.safeParse(body);

    if (!validation.success) {
      return createErrorResponse(
        "Validasi gagal",
        400,
        validation.error.issues,
      );
    }

    const { email, username, password, fullName, nip, nuptk, phoneNumber } =
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

    // Check if NIP exists
    const existingPendidik = await prisma.pendidik.findUnique({
      where: { nip },
    });

    if (existingPendidik) {
      return createErrorResponse("NIP sudah terdaftar", 400);
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
        role: "PENDIDIK",
        phoneNumber,
        pendidik: {
          create: {
            nip,
            nuptk,
          },
        },
      },
      include: {
        pendidik: true,
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
      "Registrasi pendidik berhasil",
      201,
    );
  } catch (error) {
    console.error("Registration error:", error);
    return createErrorResponse("Terjadi kesalahan server", 500);
  }
}
