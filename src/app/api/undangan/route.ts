import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import {
  createResponse,
  createErrorResponse,
  withAuth,
} from "@/lib/api-helpers";
import { undanganSchema } from "@/lib/validations";

// GET all undangan
export async function GET(request: NextRequest) {
  try {
    const undangan = await prisma.undangan.findMany({
      orderBy: { tanggalAcara: "desc" },
    });
    return createResponse(undangan, "Data undangan");
  } catch (error) {
    console.error("Get undangan error:", error);
    return createErrorResponse("Terjadi kesalahan server", 500);
  }
}

// POST create undangan
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
    const validation = undanganSchema.safeParse(body);

    if (!validation.success) {
      return createErrorResponse(
        "Validasi gagal",
        400,
        validation.error.issues,
      );
    }

    const undangan = await prisma.undangan.create({
      data: {
        ...validation.data,
        tanggalAcara:
          typeof validation.data.tanggalAcara === "string"
            ? new Date(validation.data.tanggalAcara)
            : validation.data.tanggalAcara,
      },
    });

    return createResponse(undangan, "Undangan berhasil dibuat", 201);
  } catch (error) {
    console.error("Create undangan error:", error);
    return createErrorResponse("Terjadi kesalahan server", 500);
  }
}
