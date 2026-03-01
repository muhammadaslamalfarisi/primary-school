import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import {
  createResponse,
  createErrorResponse,
  withAuth,
} from "@/lib/api-helpers";

// GET akademik data
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const nilaiRapor = await prisma.nilaiRapor.findMany({
      where: { siswaId: id },
      include: {
        mataPelajaran: true,
      },
      orderBy: { tahunAjaran: "desc" },
    });

    const kehadiran = await prisma.kehadiran.findMany({
      where: { siswaId: id },
      orderBy: { tanggal: "desc" },
    });

    return createResponse({
      nilaiRapor,
      kehadiran,
    });
  } catch (error) {
    console.error("Get akademik error:", error);
    return createErrorResponse("Terjadi kesalahan server", 500);
  }
}
