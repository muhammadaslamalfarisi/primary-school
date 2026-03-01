import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

// Validation schema for update
const updateCardSchema = z.object({
  nomorUrut: z.string().optional(),
  nip: z.string().optional(),
  jabatan: z.string().optional(),
  departemen: z.string().optional(),
  statusAktif: z.boolean().optional(),
  tandaTanganUser: z.string().optional(),
  tandaTanganKepalaSekolah: z.string().optional(),
  dicetak_terakhir: z.string().optional(),
});

// GET - Fetch single staff card
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const card = await prisma.kartuStaff.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });

    if (!card) {
      return NextResponse.json(
        { success: false, message: "Kartu staf tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: card,
      message: "Kartu staf berhasil diambil",
    });
  } catch (error) {
    console.error("Error fetching staff card:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil kartu staf" },
      { status: 500 },
    );
  }
}

// PUT - Update staff card
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
    const existingCard = await prisma.kartuStaff.findUnique({
      where: { id },
    });

    if (!existingCard) {
      return NextResponse.json(
        { success: false, message: "Kartu staf tidak ditemukan" },
        { status: 404 },
      );
    }

    // Prepare update data
    const updateData: any = { ...validation.data };

    // Handle dicetak_terakhir separately
    if (updateData.dicetak_terakhir) {
      updateData.dicetak_terakhir = new Date(updateData.dicetak_terakhir);
      updateData.jumlah_cetak = { increment: 1 };
    } else {
      delete updateData.dicetak_terakhir;
    }

    // Update card
    const updated = await prisma.kartuStaff.update({
      where: { id },
      data: updateData,
      include: {
        user: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: updated,
      message: "Kartu staf berhasil diperbarui",
    });
  } catch (error) {
    console.error("Error updating staff card:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui kartu staf" },
      { status: 500 },
    );
  }
}

// DELETE - Delete staff card
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    // Check if card exists
    const card = await prisma.kartuStaff.findUnique({
      where: { id },
    });

    if (!card) {
      return NextResponse.json(
        { success: false, message: "Kartu staf tidak ditemukan" },
        { status: 404 },
      );
    }

    // Delete card
    await prisma.kartuStaff.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      data: null,
      message: "Kartu staf berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting staff card:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus kartu staf" },
      { status: 500 },
    );
  }
}
