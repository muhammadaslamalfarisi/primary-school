import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import {
  createResponse,
  createErrorResponse,
  withAuth,
} from "@/lib/api-helpers";

// GET all users (admin only)
export async function GET(request: NextRequest) {
  try {
    const auth = await withAuth(request, ["SUPER_ADMIN"]);
    if (auth.error) {
      return createErrorResponse(auth.error, auth.status);
    }

    const searchParams = request.nextUrl.searchParams;
    const role = searchParams.get("role");

    let where: any = {};
    if (role) {
      where.role = role;
    }

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        username: true,
        fullName: true,
        role: true,
        status: true,
        phoneNumber: true,
        createdAt: true,
      },
    });

    return createResponse(users, "Data pengguna");
  } catch (error) {
    console.error("Get users error:", error);
    return createErrorResponse("Terjadi kesalahan server", 500);
  }
}
