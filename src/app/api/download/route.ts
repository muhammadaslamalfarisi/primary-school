import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import {
  createResponse,
  createErrorResponse,
  withAuth,
} from "@/lib/api-helpers";

// GET all download resources
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const kategori = searchParams.get("kategori");

    let where: any = {};
    if (kategori) {
      where.kategori = kategori;
    }

    const resources = await prisma.downloadResource.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return createResponse(resources, "Data download");
  } catch (error) {
    console.error("Get download error:", error);
    return createErrorResponse("Terjadi kesalahan server", 500);
  }
}

// POST create download resource
export async function POST(request: NextRequest) {
  try {
    const auth = await withAuth(request, [
      "SUPER_ADMIN",
      "PENDIDIK",
      "TENAGA_KEPENDIDIKAN",
    ]);
    if (auth.error) {
      return createErrorResponse(auth.error, auth.status);
    }

    const body = await request.json();
    const { judul, deskripsi, kategori, namaFile, urlFile, ukuran } = body;

    if (!judul || !kategori || !namaFile || !urlFile) {
      return createErrorResponse("Field wajib diisi", 400);
    }

    const resource = await prisma.downloadResource.create({
      data: {
        judul,
        deskripsi,
        kategori,
        namaFile,
        urlFile,
        ukuran,
      },
    });

    return createResponse(resource, "Resource berhasil ditambahkan", 201);
  } catch (error) {
    console.error("Create download error:", error);
    return createErrorResponse("Terjadi kesalahan server", 500);
  }
}
