import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

// Validation schema for update
const updateCardSchema = z.object({
  nomorUrut: z.string().optional(),
  statusAktif: z.boolean().optional(),
  tandaTanganPrinsipal: z.string().optional(),
  tandaTanganSiswa: z.string().optional(),
  dicetak_terakhir: z.string().optional(),
});

// GET - Fetch single student card
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const card = await prisma.kartuSiswa.findUnique({
      where: { id },
      include: {
        siswa: {
          include: {
            user: true,
            rombonganBelajar: true,
          },
        },
      },
    });

    if (!card) {
      return NextResponse.json(
        { success: false, message: "Kartu siswa tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: card,
      message: "Kartu siswa berhasil diambil",
    });
  } catch (error) {
    console.error("Error fetching student card:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil kartu siswa" },
      { status: 500 },
    );
  }
}

// PUT - Update student card
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate input
    const validation = updateCardSchema.safeParse(body);
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

    // Check if card exists
    const existingCard = await prisma.kartuSiswa.findUnique({
      where: { id },
    });

    if (!existingCard) {
      return NextResponse.json(
        { success: false, message: "Kartu siswa tidak ditemukan" },
        { status: 404 },
      );
    }

    // Prepare update data
    const updateData: any = {
      ...validation.data,
    };

    // Handle dicetak_terakhir separately if provided as string
    if (updateData.dicetak_terakhir) {
      updateData.dicetak_terakhir = new Date(updateData.dicetak_terakhir);
      // Increment print count when printed
      updateData.jumlah_cetak = { increment: 1 };
    } else {
      delete updateData.dicetak_terakhir;
    }

    // Update card
    const updated = await prisma.kartuSiswa.update({
      where: { id },
      data: updateData,
      include: {
        siswa: {
          include: {
            user: true,
            rombonganBelajar: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: updated,
      message: "Kartu siswa berhasil diperbarui",
    });
  } catch (error) {
    console.error("Error updating student card:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui kartu siswa" },
      { status: 500 },
    );
  }
}

// DELETE - Delete student card
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    // Check if card exists
    const card = await prisma.kartuSiswa.findUnique({
      where: { id },
    });

    if (!card) {
      return NextResponse.json(
        { success: false, message: "Kartu siswa tidak ditemukan" },
        { status: 404 },
      );
    }

    // Delete card
    await prisma.kartuSiswa.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      data: null,
      message: "Kartu siswa berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting student card:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus kartu siswa" },
      { status: 500 },
    );
  }
}
