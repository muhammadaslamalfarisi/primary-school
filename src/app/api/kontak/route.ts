import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { createResponse, createErrorResponse } from "@/lib/api-helpers";

// GET all kontak messages
export async function GET(request: NextRequest) {
  try {
    const kontak = await prisma.kontak.findMany({
      orderBy: { createdAt: "desc" },
    });
    return createResponse(kontak, "Data pesan kontak");
  } catch (error) {
    console.error("Get kontak error:", error);
    return createErrorResponse("Terjadi kesalahan server", 500);
  }
}

// POST create kontak
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nama, email, noTelepon, pesan } = body;

    if (!nama || !email || !pesan) {
      return createErrorResponse("Field wajib diisi", 400);
    }

    const kontak = await prisma.kontak.create({
      data: {
        nama,
        email,
        noTelepon,
        pesan,
        status: "BARU",
      },
    });

    return createResponse(kontak, "Pesan berhasil dikirim", 201);
  } catch (error) {
    console.error("Create kontak error:", error);
    return createErrorResponse("Terjadi kesalahan server", 500);
  }
}
