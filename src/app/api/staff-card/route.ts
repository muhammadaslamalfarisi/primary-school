import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

// Validation schema
const staffCardSchema = z.object({
  userId: z.string().min(1, "User ID tidak boleh kosong"),
  nomorUrut: z.string().min(1, "Nomor urut tidak boleh kosong"),
  tahunPelajaran: z.string().min(1, "Tahun pelajaran tidak boleh kosong"),
  role: z.enum([
    "SUPER_ADMIN",
    "KEPALA_SEKOLAH",
    "PENDIDIK",
    "TENAGA_KEPENDIDIKAN",
  ]),
  nip: z.string().optional(),
  jabatan: z.string().optional(),
  departemen: z.string().optional(),
  statusAktif: z.boolean().optional().default(true),
});

// GET - Fetch all staff cards
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    const tahunPelajaran = searchParams.get("tahunPelajaran");
    const role = searchParams.get("role");

    let where: any = {};

    if (userId) where.userId = userId;
    if (tahunPelajaran) where.tahunPelajaran = tahunPelajaran;
    if (role) where.role = role;

    const cards = await prisma.kartuStaff.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
          },
        },
      },
      orderBy: { dibuat_tanggal: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: cards,
      message: "Data kartu staf berhasil diambil",
    });
  } catch (error) {
    console.error("Error fetching staff cards:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data kartu staf" },
      { status: 500 },
    );
  }
}

// POST - Create new staff card
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userId = request.headers.get("X-User-Id");

    // Validate input
    const validation = staffCardSchema.safeParse(body);
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
      userId: targetUserId,
      nomorUrut,
      tahunPelajaran,
      role,
      nip,
      jabatan,
      departemen,
      statusAktif,
    } = validation.data;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: targetUserId },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User tidak ditemukan" },
        { status: 404 },
      );
    }

    // Check if card already exists
    const existingCard = await prisma.kartuStaff.findUnique({
      where: {
        userId_tahunPelajaran: {
          userId: targetUserId,
          tahunPelajaran,
        },
      },
    });

    if (existingCard) {
      return NextResponse.json(
        {
          success: false,
          message: "Kartu staf untuk tahun pelajaran ini sudah ada",
        },
        { status: 409 },
      );
    }

    // Create new card
    const newCard = await prisma.kartuStaff.create({
      data: {
        userId: targetUserId,
        nomorUrut,
        tahunPelajaran,
        role,
        nip,
        jabatan,
        departemen,
        statusAktif,
        dibuat_oleh: userId || "system",
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: newCard,
        message: "Kartu staf berhasil dibuat",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating staff card:", error);
    return NextResponse.json(
      { success: false, message: "Gagal membuat kartu staf" },
      { status: 500 },
    );
  }
}
