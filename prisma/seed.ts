import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/lib/password";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ===== CREATE SUPER ADMIN =====
  const hashedAdminPassword = await hashPassword("admin123");
  const superAdmin = await prisma.user.create({
    data: {
      email: "admin@sekolah.id",
      username: "superadmin",
      password: hashedAdminPassword,
      fullName: "Super Administrator",
      role: "SUPER_ADMIN",
      status: "AKTIF",
      phoneNumber: "081234567890",
    },
  });
  console.log("✅ Super Admin created:", superAdmin.email);

  // ===== CREATE PENDIDIK (Teachers) =====
  const hashedTeacherPassword = await hashPassword("guru123");

  const teacher1 = await prisma.user.create({
    data: {
      email: "guru1@sekolah.id",
      username: "guru1",
      password: hashedTeacherPassword,
      fullName: "Ibu Siti Nurhaliza",
      role: "PENDIDIK",
      status: "AKTIF",
      phoneNumber: "082345678901",
      pendidik: {
        create: {
          nip: "196501011987032001",
          nuptk: "123456789012345678",
          statusPegawai: "PNS",
          tempatLahir: "Batu Rakit",
          tanggalLahir: new Date("1965-01-01"),
          jenisKelamin: "Perempuan",
          agama: "Islam",
          noIdentitas: "1309760113653001",
          pendidikanTerakhir: "S1 Pendidikan",
          jurusanPendidikan: "Pendidikan Guru Sekolah Dasar",
        },
      },
    },
  });
  console.log("✅ Pendidik 1 created:", teacher1.email);

  const teacher2 = await prisma.user.create({
    data: {
      email: "guru2@sekolah.id",
      username: "guru2",
      password: hashedTeacherPassword,
      fullName: "Pak Budi Santoso",
      role: "PENDIDIK",
      status: "AKTIF",
      phoneNumber: "082456789012",
      pendidik: {
        create: {
          nip: "196502021988031001",
          statusPegawai: "PNS",
          tempatLahir: "Jakarta",
          tanggalLahir: new Date("1965-02-02"),
          jenisKelamin: "Laki-laki",
          agama: "Islam",
          noIdentitas: "3201020214652002",
          pendidikanTerakhir: "S1 Pendidikan",
          jurusanPendidikan: "Pendidikan Jasmani",
        },
      },
    },
  });
  console.log("✅ Pendidik 2 created:", teacher2.email);

  // ===== CREATE TENAGA KEPENDIDIKAN (Staff) =====
  const hashedStaffPassword = await hashPassword("staff123");

  const staff1 = await prisma.user.create({
    data: {
      email: "staff1@sekolah.id",
      username: "staff1",
      password: hashedStaffPassword,
      fullName: "Ibu Ratna Wijaya",
      role: "TENAGA_KEPENDIDIKAN",
      status: "AKTIF",
      phoneNumber: "082567890123",
      tenagaKependidikan: {
        create: {
          nip: "199001011234567890",
          jabatan: "Operator Sekolah",
          departemen: "IT",
          tempatLahir: "Surabaya",
          tanggalLahir: new Date("1990-01-01"),
          jenisKelamin: "Perempuan",
          agama: "Islam",
          pendidikanTerakhir: "D3 Teknik Informatika",
        },
      },
    },
  });
  console.log("✅ Tenaga Kependidikan 1 created:", staff1.email);

  const staff2 = await prisma.user.create({
    data: {
      email: "staff2@sekolah.id",
      username: "staff2",
      password: hashedStaffPassword,
      fullName: "Pak Hendra Kusuma",
      role: "TENAGA_KEPENDIDIKAN",
      status: "AKTIF",
      phoneNumber: "082678901234",
      tenagaKependidikan: {
        create: {
          jabatan: "Tata Usaha",
          departemen: "Administrasi",
          tempatLahir: "Bandung",
          tanggalLahir: new Date("1988-05-15"),
          jenisKelamin: "Laki-laki",
          agama: "Islam",
          pendidikanTerakhir: "SMA",
        },
      },
    },
  });
  console.log("✅ Tenaga Kependidikan 2 created:", staff2.email);

  // ===== CREATE SISWA (Students) =====
  const hashedStudentPassword = await hashPassword("siswa123");

  // Retrieve pendidik records to use their IDs when creating classes
  const pendidik1 = await prisma.pendidik.findFirst({
    where: { userId: teacher1.id },
  });
  const pendidik2 = await prisma.pendidik.findFirst({
    where: { userId: teacher2.id },
  });

  // Create Rombongan Belajar (Classes)
  const rombel1A = await prisma.rombonganBelajar.create({
    data: {
      nama: "Kelas 1A",
      tingkat: 1,
      paralel: "A",
      tahunAjaran: "2023/2024",
      pendidikId: pendidik1?.id,
    },
  });

  const rombel2B = await prisma.rombonganBelajar.create({
    data: {
      nama: "Kelas 2B",
      tingkat: 2,
      paralel: "B",
      tahunAjaran: "2023/2024",
      pendidikId: pendidik2?.id,
    },
  });

  // Create Students
  const student1 = await prisma.user.create({
    data: {
      email: "siswa1@sekolah.id",
      username: "siswa1",
      password: hashedStudentPassword,
      fullName: "Ahmad Faisal Al-Razi",
      role: "SISWA",
      status: "AKTIF",
      phoneNumber: "082789012345",
      siswa: {
        create: {
          nisn: "0012345678",
          nis: "001",
          status: "AKTIF",
          rombonganBelajarId: rombel1A.id,
          tempatLahir: "Batu Rakit",
          tanggalLahir: new Date("2017-03-15"),
          jenisKelamin: "Laki-laki",
          agama: "Islam",
          alamat: "Jl. Merdeka No. 5",
          desaKelurahan: "Batu Rakit",
          kecamatan: "Kuantan Tengah",
          kabupatenKota: "Kuantan Singingi",
          provinsi: "Riau",
          kodePos: "29261",
          namaAyah: "Suryanto",
          pekerjaanAyah: "Wiraswasta",
          noTelpAyah: "081234567890",
          namaIbu: "Siti Maryam",
          pekerjaanIbu: "Ibu Rumah Tangga",
          noTelpIbu: "081234567891",
        },
      },
    },
  });
  console.log("✅ Siswa 1 created:", student1.email);

  const student2 = await prisma.user.create({
    data: {
      email: "siswa2@sekolah.id",
      username: "siswa2",
      password: hashedStudentPassword,
      fullName: "Wirda Husna",
      role: "SISWA",
      status: "AKTIF",
      phoneNumber: "082890123456",
      siswa: {
        create: {
          nisn: "0023456789",
          nis: "002",
          status: "AKTIF",
          rombonganBelajarId: rombel2B.id,
          tempatLahir: "Pekanbaru",
          tanggalLahir: new Date("2016-07-22"),
          jenisKelamin: "Perempuan",
          agama: "Islam",
          alamat: "Jl. Raya Batu Rakit No. 10",
          desaKelurahan: "Batu Rakit",
          kecamatan: "Kuantan Tengah",
          kabupatenKota: "Kuantan Singingi",
          provinsi: "Riau",
          kodePos: "29261",
          namaAyah: "Hamzah",
          pekerjaanAyah: "Petani",
          noTelpAyah: "081234567892",
          namaIbu: "Rina Kusuma",
          pekerjaanIbu: "Ibu Rumah Tangga",
          noTelpIbu: "081234567893",
        },
      },
    },
  });
  console.log("✅ Siswa 2 created:", student2.email);

  // ===== CREATE MATA PELAJARAN (Subjects) =====
  const mataPelajaran = await prisma.mataPelajaran.createMany({
    data: [
      {
        nama: "Pendidikan Pancasila dan Kewarganegaraan (PPKn)",
        kodeMP: "PPKn",
      },
      { nama: "Bahasa Indonesia", kodeMP: "BTI" },
      { nama: "Matematika", kodeMP: "MAT" },
      { nama: "Ilmu Pengetahuan Alam (IPA)", kodeMP: "IPA" },
      { nama: "Ilmu Pengetahuan Sosial (IPS)", kodeMP: "IPS" },
      { nama: "Bahasa Inggris", kodeMP: "BEN" },
      {
        nama: "Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)",
        kodeMP: "PJOK",
      },
      { nama: "Seni dan Budaya", kodeMP: "SB" },
      { nama: "Pendidikan Agama Islam", kodeMP: "PAI" },
      { nama: "Muatan Lokal", kodeMP: "MULOK" },
    ],
  });
  console.log("✅ Mata Pelajaran created:", mataPelajaran.count);

  // ===== CREATE TEST DATA =====
  const pengumuman = await prisma.pengumuman.createMany({
    data: [
      {
        judul: "Libur Nasional",
        isi: "Pengumuman libur nasional untuk hari Raya Idul Fitri 2024 dimulai tanggal 10 April sampai 20 April 2024",
        tanggal: new Date(),
      },
      {
        judul: "Pengumuman Penerimaan Siswa Baru",
        isi: "Pendaftaran siswa baru tahun ajaran 2024/2025 dibuka mulai tanggal 1 Mei 2024",
        tanggal: new Date(),
      },
    ],
  });
  console.log("✅ Test Pengumuman created:", pengumuman.count);

  console.log("✨ Database seeding completed!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
