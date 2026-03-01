import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { createResponse, createErrorResponse } from "@/lib/api-helpers";

// GET all JDIH
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const tipe = searchParams.get("tipe");

    let where: any = {};
    if (tipe) {
      where.tipe = tipe;
    }

    const jdih = await prisma.jDIH.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return createResponse(jdih, "Data JDIH");
  } catch (error) {
    console.error("Get JDIH error:", error);
    return createErrorResponse("Terjadi kesalahan server", 500);
  }
}
