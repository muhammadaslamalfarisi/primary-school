import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { createResponse, createErrorResponse } from "@/lib/api-helpers";

// Public endpoint for listing teachers & staff
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type"); // guru | staff | undefined

    let where: any = {};
    if (type === "guru") {
      where.role = "PENDIDIK";
    } else if (type === "staff") {
      where.role = "TENAGA_KEPENDIDIKAN";
    } else {
      where.role = { in: ["PENDIDIK", "TENAGA_KEPENDIDIKAN"] };
    }

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        fullName: true,
        role: true,
        pendidik: {
          select: {
            id: true,
            nip: true,
            pendidikanTerakhir: true,
            jurusanPendidikan: true,
          },
        },
        tenagaKependidikan: {
          select: {
            id: true,
            jabatan: true,
            departemen: true,
          },
        },
      },
    });

    return createResponse(users, "Data PTK publik");
  } catch (error) {
    console.error("Get PTK error:", error);
    return createErrorResponse("Terjadi kesalahan server", 500);
  }
}
