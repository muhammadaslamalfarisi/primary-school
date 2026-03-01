/**
 * Script untuk seed admin user ke database
 * Jalankan: npx ts-node prisma/seed-admin.ts
 */

// load environment variables
import dotenv from "dotenv";
dotenv.config();

// avoid module-alias issues by importing directly from packages
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function hashPassword(pw: string) {
  return bcrypt.hash(pw, 10);
}

async function seedAdmin() {
  try {
    console.log("🌱 Seeding admin user...");

    // Check if admin exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: "admin@sekolah.id" },
    });

    if (existingAdmin) {
      console.log("✅ Admin user sudah ada");
      return;
    }

    // Create admin user
    const hashedPassword = await hashPassword("Admin@123");

    const admin = await prisma.user.create({
      data: {
        email: "admin@sekolah.id",
        username: "admin",
        password: hashedPassword,
        fullName: "Administrator",
        role: "SUPER_ADMIN",
        status: "AKTIF",
      },
    });

    console.log("✅ Admin user berhasil dibuat:");
    console.log("   Email: admin@sekolah.id");
    console.log("   Username: admin");
    console.log("   Password: Admin@123");
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedAdmin();
