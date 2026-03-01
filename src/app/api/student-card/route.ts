import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

// Validation schema
const studentCardSchema = z.object({
  siswaId: z.string().min(1, "Siswa ID tidak boleh kosong"),
  nomorUrut: z.string().min(1, "Nomor urut tidak boleh kosong"),
  tahunPelajaran: z.string().min(1, "Tahun pelajaran tidak boleh kosong"),
  statusAktif: z.boolean().optional().default(true),
  tandaTanganPrinsipal: z.string().optional(),
  tandaTanganSiswa: z.string().optional(),
});

// GET - Fetch all student cards
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const siswaId = searchParams.get("siswaId");
    const tahunPelajaran = searchParams.get("tahunPelajaran");

    let where: any = {};

    if (siswaId) where.siswaId = siswaId;
    if (tahunPelajaran) where.tahunPelajaran = tahunPelajaran;

    const cards = await prisma.kartuSiswa.findMany({
      where,
      include: {
        siswa: {
          include: {
            user: {
              select: {
                id: true,
                fullName: true,
                email: true,
              },
            },
            rombonganBelajar: true,
          },
        },
      },
      orderBy: { dibuat_tanggal: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: cards,
      message: "Data kartu siswa berhasil diambil",
    });
  } catch (error) {
    console.error("Error fetching student cards:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data kartu siswa" },
      { status: 500 },
    );
  }
}

// POST - Create new student card
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userId = request.headers.get("X-User-Id"); // Should be set by middleware

    // Validate input
    const validation = studentCardSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Data tidak valid",
          issues: validation.error.issues,
        },
        { status: 400 },
      );
    }

    const {
      siswaId,
      nomorUrut,
      tahunPelajaran,
      statusAktif,
      tandaTanganPrinsipal,
      tandaTanganSiswa,
    } = validation.data;

    // Check if siswa exists
    const siswa = await prisma.siswa.findUnique({
      where: { id: siswaId },
    });

    if (!siswa) {
      return NextResponse.json(
        { success: false, message: "Siswa tidak ditemukan" },
        { status: 404 },
      );
    }

    // Check if card already exists for this siswa and tahun pelajaran
    const existingCard = await prisma.kartuSiswa.findUnique({
      where: {
        siswaId_tahunPelajaran: {
          siswaId,
          tahunPelajaran,
        },
      },
    });

    if (existingCard) {
      return NextResponse.json(
        {
          success: false,
          message: "Kartu siswa untuk tahun pelajaran ini sudah ada",
        },
        { status: 409 },
      );
    }

    // Create new card
    const newCard = await prisma.kartuSiswa.create({
      data: {
        siswaId,
        nomorUrut,
        tahunPelajaran,
        statusAktif,
        tandaTanganPrinsipal,
        tandaTanganSiswa,
        dibuat_oleh: userId || "system",
      },
      include: {
        siswa: {
          include: {
            user: true,
            rombonganBelajar: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: newCard,
        message: "Kartu siswa berhasil dibuat",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating student card:", error);
    return NextResponse.json(
      { success: false, message: "Gagal membuat kartu siswa" },
      { status: 500 },
    );
  }
}
