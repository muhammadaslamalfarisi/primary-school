import { z } from "zod";

// Auth Schemas
export const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export const registerSiswaSchema = z.object({
  email: z.string().email("Email tidak valid"),
  username: z.string().min(3, "Username minimal 3 karakter"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  fullName: z.string().min(3, "Nama minimal 3 karakter"),
  nisn: z.string().length(10, "NISN harus 10 digit"),
  nis: z.string(),
  phoneNumber: z.string().optional(),
});

export const registerPendidikSchema = z.object({
  email: z.string().email("Email tidak valid"),
  username: z.string().min(3, "Username minimal 3 karakter"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  fullName: z.string().min(3, "Nama minimal 3 karakter"),
  nip: z.string(),
  nuptk: z.string().optional(),
  phoneNumber: z.string().optional(),
});

export const registerStaffSchema = z.object({
  email: z.string().email("Email tidak valid"),
  username: z.string().min(3, "Username minimal 3 karakter"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  fullName: z.string().min(3, "Nama minimal 3 karakter"),
  jabatan: z.string(),
  departemen: z.string(),
  phoneNumber: z.string().optional(),
});

// Pengumuman Schema
export const pengumumanSchema = z.object({
  judul: z.string().min(3, "Judul minimal 3 karakter"),
  isi: z.string().min(10, "Isi minimal 10 karakter"),
});

// Undangan Schema
export const undanganSchema = z.object({
  judul: z.string().min(3, "Judul minimal 3 karakter"),
  deskripsi: z.string().min(10, "Deskripsi minimal 10 karakter"),
  tanggalAcara: z.string().or(z.date()),
  waktuAcara: z.string().optional(),
  lokasi: z.string().optional(),
});

// Inovasi Schema
export const inovasiSchema = z.object({
  judul: z.string().min(3, "Judul minimal 3 karakter"),
  deskripsi: z.string().min(10, "Deskripsi minimal 10 karakter"),
  tujuan: z.string().optional(),
  manfaat: z.string().optional(),
});

// Program Schema
export const programSchema = z.object({
  nama: z.string().min(3, "Nama minimal 3 karakter"),
  deskripsi: z.string().min(10, "Deskripsi minimal 10 karakter"),
  jenis: z.enum(["PEMBELAJARAN", "EKSTRAKURIKULER", "BOSP", "PIP", "SPMB"]),
  keterangan: z.string().optional(),
});

// Siswa Data Schema
export const updateSiswaSchema = z.object({
  fullName: z.string().optional(),
  tempatLahir: z.string().optional(),
  tanggalLahir: z.string().optional(),
  jenisKelamin: z.string().optional(),
  agama: z.string().optional(),
  alamat: z.string().optional(),
  desaKelurahan: z.string().optional(),
  kecamatan: z.string().optional(),
  kabupatenKota: z.string().optional(),
  provinsi: z.string().optional(),
  kodePos: z.string().optional(),
  namaAyah: z.string().optional(),
  pekerjaanAyah: z.string().optional(),
  noTelpAyah: z.string().optional(),
  namaIbu: z.string().optional(),
  pekerjaanIbu: z.string().optional(),
  noTelpIbu: z.string().optional(),
  namaWali: z.string().optional(),
  pekerjaanWali: z.string().optional(),
  noTelpWali: z.string().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterSiswaInput = z.infer<typeof registerSiswaSchema>;
export type RegisterPendidikInput = z.infer<typeof registerPendidikSchema>;
export type RegisterStaffInput = z.infer<typeof registerStaffSchema>;
export type PengumumanInput = z.infer<typeof pengumumanSchema>;
export type UndanganInput = z.infer<typeof undanganSchema>;
export type InovasiInput = z.infer<typeof inovasiSchema>;
export type ProgramInput = z.infer<typeof programSchema>;
export type UpdateSiswaInput = z.infer<typeof updateSiswaSchema>;
