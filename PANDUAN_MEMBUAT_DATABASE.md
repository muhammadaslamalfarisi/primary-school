# 📚 PANDUAN LENGKAP MEMBUAT DATABASE DARI 0 SAMPAI 100%

## Website Manajemen Sekolah - PostgreSQL

**Tanggal:** 1 Maret 2026  
**Platform:** Windows / PostgreSQL 12+  
**Aplikasi:** Next.js 16 + Prisma ORM 6

---

## 📋 DAFTAR ISI

1. [Persyaratan Sistem](#persyaratan-sistem)
2. [Langkah 1: Install PostgreSQL](#langkah-1-install-postgresql)
3. [Langkah 2: Verifikasi Instalasi](#langkah-2-verifikasi-instalasi)
4. [Langkah 3: Buat Database Kosong](#langkah-3-buat-database-kosong)
5. [Langkah 4: Konfigurasi File `.env.local`](#langkah-4-konfigurasi-file-envlocal)
6. [Langkah 5: Jalankan Migrasi Prisma](#langkah-5-jalankan-migrasi-prisma)
7. [Langkah 6: Seed Data Awal (Isi User & Konten)](#langkah-6-seed-data-awal-isi-user--konten)
8. [Langkah 7: Verifikasi Database](#langkah-7-verifikasi-database)
9. [Langkah 8: Jalankan Aplikasi](#langkah-8-jalankan-aplikasi)
10. [Troubleshooting](#troubleshooting)
11. [Test Login Accounts](#test-login-accounts)

---

## 📦 Persyaratan Sistem

- **Windows 10 / 11 / Server 2019+**
- **Node.js 18+** (sudah terinstal; verifikasi dengan `node --version`)
- **PostgreSQL 12 atau lebih baru**
- **Git Bash** atau **Windows PowerShell** (untuk terminal)
- **pgAdmin 4** atau GUI untuk PostgreSQL (opsional, memudahkan visualisasi)

**Estimasi waktu total:** 15-20 menit

---

## 🚀 Langkah 1: Install PostgreSQL

### Opsi A: Download Installer (Recommended untuk Pemula)

1. **Kunjungi website PostgreSQL:**

   ```
   https://www.postgresql.org/download/windows/
   ```

2. **Klik "Download the installer"**  
   Unduh versi **PostgreSQL 15 atau 16** (stabil dan recommended).

3. **Jalankan installer (`postgresql-16.x.exe`)**
   - Terima lisensi PostgreSQL (Apache License 2.0)
   - Pilih folder instalasi (default: `C:\Program Files\PostgreSQL\16`)
   - Masukkan password untuk user `postgres` (catat baik-baik!)
     ```
     Username: postgres
     Password: postgres_password  ← gunakan password yang kuat
     ```
   - Port default: **5432** (biarkan default, cukup klik Next)
   - Locale: Pilih bahasa (Indonesia atau English)
   - Klik **Install** dan tunggu selesai (~5 menit)
   - Pilih untuk install **Stack Builder** (untuk tools tambahan, opsional)
   - Selesai! Klik **Finish**

4. **PostgreSQL server akan langsung auto-start** setelah instalasi.

### Opsi B: Docker (Lebih Cepat Jika Sudah Ada)

Jika Anda sudah memiliki Docker:

```powershell
docker run -d `
  --name postgres-school `
  -e POSTGRES_PASSWORD=postgres_password `
  -e POSTGRES_DB=primary_school `
  -p 5432:5432 `
  postgres:16-alpine
```

---

## ✅ Langkah 2: Verifikasi Instalasi

Buka **PowerShell** atau **Command Prompt** dan jalankan:

```powershell
psql --version
```

**Output yang diharapkan:**

```
psql (PostgreSQL) 16.1
```

Jika pesan error "psql is not recognized":

- PostgreSQL belum ditambahkan ke PATH Windows
- **Solusi:** Tambahkan `C:\Program Files\PostgreSQL\16\bin` ke PATH (lihat bagian Troubleshooting)

---

## 🗄️ Langkah 3: Buat Database Kosong

### Cara 1: Menggunakan PowerShell (Recommended)

Buka PowerShell **sebagai Administrator** dan jalankan:

```powershell
# Login ke PostgreSQL sebagai user 'postgres'
psql -U postgres -c "CREATE DATABASE primary_school;"
```

Ketika diminta password, masukkan password yang Anda set saat instalasi PostgreSQL (default: `postgres`).

**Output yang diharapkan:**

```
Password for user postgres:
CREATE DATABASE
```

### Cara 2: Menggunakan pgAdmin (GUI)

1. **Buka pgAdmin 4** (aplikasi desktop yang terinstall otomatis)
2. Klik tab **Servers** → **PostgreSQL 16** (login dengan password `postgres`)
3. Klik kanan **Databases** → **Create** → **Database**
4. Isikan nama: `primary_school`
5. Klik **Save**

### Cara 3: Menggunakan createdb Command

```powershell
createdb -U postgres primary_school
```

---

## 🔧 Langkah 4: Konfigurasi File `.env.local`

File konfigurasi yang menghubungkan aplikasi ke database sudah ada di project folder:

```
c:\Users\DUNIA IMAJINASIKU\Documents\Web\primary-school\.env.local
```

### Edit file `.env.local` dengan text editor (Notepad++ atau VS Code):

```env
# ========================================
# DATABASE CONFIGURATION
# ========================================
DATABASE_URL="postgresql://postgres:postgres_password@localhost:5432/primary_school?schema=public"

# ========================================
# JWT CONFIGURATION
# ========================================
JWT_SECRET="ganti-dengan-kunci-aman-di-production-minimal-32-karakter"
JWT_EXPIRY="7d"

# ========================================
# ENVIRONMENT
# ========================================
NODE_ENV="development"
```

### Penjelasan setiap variable:

| Variable       | Nilai                                                                                 | Penjelasan                                                                     |
| -------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `DATABASE_URL` | `postgresql://postgres:postgres_password@localhost:5432/primary_school?schema=public` | Connection string ke database. Ganti `postgres_password` dengan password Anda. |
| `JWT_SECRET`   | String panjang & random                                                               | Kunci enkripsi untuk token login (gunakan minimal 32 karakter yang kompleks)   |
| `JWT_EXPIRY`   | `7d`                                                                                  | Token login berlaku selama 7 hari                                              |
| `NODE_ENV`     | `development`                                                                         | Mode pengembangan (gunakan `production` saat deploy)                           |

**Contoh CONNECTION STRING berbeda berdasarkan setup Anda:**

```env
# Standard (username: postgres, password: postgres, localhost, port 5432)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/primary_school?schema=public"

# Custom password dengan special character (ganti @sign jika ada di password)
DATABASE_URL="postgresql://postgres:my%40Password123@localhost:5432/primary_school?schema=public"

# Host berbeda (AWS RDS / VPS)
DATABASE_URL="postgresql://user:password@db.example.com:5432/primary_school?schema=public"

# Docker container
DATABASE_URL="postgresql://postgres:postgres_password@localhost:5432/primary_school?schema=public"
```

**⚠️ Penting:** Setelah edit `.env.local`, **simpan file** dan **tutup terminal** yang sudah berjalan. Terminal baru akan mengambil konfigurasi yang diperbarui.

---

## 🔄 Langkah 5: Jalankan Migrasi Prisma

Migrasi akan membuat semua tabel dan struktur database sesuai dengan `prisma/schema.prisma`.

### Buka PowerShell di folder project:

```powershell
cd c:\Users\DUNIA IMAJINASIKU\Documents\Web\primary-school
```

### Jalankan migrasi:

```powershell
npm run prisma:migrate
```

**Apa yang terjadi:**

1. Prisma membaca `prisma/schema.prisma`
2. Prisma membandingkan dengan database yang ada
3. Prisma akan menanyakan nama migrasi (misal: `init`, `create_schema`, dsb.)
4. Prisma membuat file migrasi di folder `prisma/migrations/`
5. Prisma menjalankan SQL ke database PostgreSQL

**Output yang diharapkan:**

```
Environment variables loaded from .env.local
Prisma schema loaded from prisma\schema.prisma
Datasource "db": PostgreSQL database "primary_school" at "localhost:5432"

✔ Enter a name for this migration › init

Applying migration `./prisma/migrations/20260301120000_init/migration.sql`

✓ Completed in 2.34s

The following migration(s) have been created and applied:

migrations/
  └─ 20260301120000_init/
    └─ migration.sql

Your database is now in sync with your schema.
```

### Tabel yang dibuat (19 tabel):

```sql
-- User Management
User              -- Tabel pengguna dengan role (4 tipe)
Pendidik          -- Data guru
TenagaKependidikan -- Data staff/tendik
Siswa             -- Data peserta didik

-- Academic
RombonganBelajar  -- Kelas/Rombel
MataPelajaran     -- Mata pelajaran
NilaiRapor        -- Nilai/rapor siswa
Kehadiran         -- Absensi siswa
JadwalPelajaran   -- Jadwal kelas
DokumenPendaftaran -- Dokumen siswa

-- Content Management
Pengumuman        -- Announcements
Undangan          -- Event invitations
Inovasi           -- Learning innovations
Program           -- School programs
SaranaPrasarana   -- Facilities/inventory
DownloadResource  -- Files for download
JDIH              -- Legal documents

-- Other
Kontak            -- Contact form messages
SistemSetting     -- System configuration
```

---

## 🌱 Langkah 6: Seed Data Awal (Isi User & Konten)

Seed akan menambahkan data awal untuk testing, termasuk user dari semua role.

### Jalankan seed:

```powershell
npm run prisma:seed
```

**Output yang diharapkan:**

```
Prisma schema loaded from prisma\schema.prisma
Running seed command `ts-node --compiler-options {"module":"commonjs"} prisma/seed.ts` ...
🌱 Seeding database...
✅ Super Admin created: admin@sekolah.id
✅ Pendidik 1 created: guru1@sekolah.id
✅ Pendidik 2 created: guru2@sekolah.id
✅ Tenaga Kependidikan 1 created: staff1@sekolah.id
✅ Tenaga Kependidikan 2 created: staff2@sekolah.id
✅ Siswa 1 created: siswa1@sekolah.id
✅ Siswa 2 created: siswa2@sekolah.id
✅ Mata Pelajaran created: 10
✅ Test Pengumuman created: 2
✨ Database seeding completed!

```

### Data yang ditambahkan:

#### 🔐 User Accounts (7 total):

| Email             | Password | Role                | Akses                         |
| ----------------- | -------- | ------------------- | ----------------------------- |
| admin@sekolah.id  | admin123 | SUPER_ADMIN         | `/admin/dashboard`            |
| guru1@sekolah.id  | guru123  | PENDIDIK            | `/guru/dashboard`             |
| guru2@sekolah.id  | guru123  | PENDIDIK            | `/guru/dashboard`             |
| staff1@sekolah.id | staff123 | TENAGA_KEPENDIDIKAN | `/staff/dashboard`            |
| staff2@sekolah.id | staff123 | TENAGA_KEPENDIDIKAN | `/staff/dashboard`            |
| siswa1@sekolah.id | siswa123 | SISWA               | `/dashboard` (student portal) |
| siswa2@sekolah.id | siswa123 | SISWA               | `/dashboard` (student portal) |

#### 📚 Data Akademik:

- **2 Kelas (Rombongan Belajar):**
  - Kelas 1A (Guru: Ibu Siti Nurhaliza)
  - Kelas 2B (Guru: Pak Budi Santoso)

- **10 Mata Pelajaran:**
  - Pendidikan Pancasila dan Kewarganegaraan (PPKn)
  - Bahasa Indonesia
  - Matematika
  - Ilmu Pengetahuan Alam (IPA)
  - Ilmu Pengetahuan Sosial (IPS)
  - Bahasa Inggris
  - Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)
  - Seni dan Budaya
  - Pendidikan Agama Islam (PAI)
  - Muatan Lokal (MULOK)

- **2 Sample Pengumuman:**
  - Libur Nasional
  - Pengumuman Penerimaan Siswa Baru

---

## 🔍 Langkah 7: Verifikasi Database

Pastikan semua tabel dan data sudah tersimpan dengan benar di PostgreSQL.

### Cara 1: Menggunakan psql (Command Line)

```powershell
psql -U postgres -d primary_school
```

Ketika berhasil login, Anda akan melihat:

```
psql (16.1)
Type "help" for help.

primary_school=#
```

### Query untuk verifikasi:

**1. Lihat semua tabel:**

```sql
\dt
```

**Output akan menampilkan 19 tabel (seperti: User, Siswa, Pendidik, dsb.)**

**2. Hitung user per role:**

```sql
SELECT role, COUNT(*) as jumlah FROM "User" GROUP BY role;
```

**Output yang diharapkan:**

```
        role        | jumlah
--------------------+--------
 PENDIDIK           |      2
 SISWA              |      2
 SUPER_ADMIN        |      1
 TENAGA_KEPENDIDIKAN|      2
(4 rows)
```

**3. Lihat semua user:**

```sql
SELECT id, email, role, status FROM "User";
```

**4. Lihat data siswa:**

```sql
SELECT u.fullName, s.nisn, rb.nama as kelas FROM "Siswa" s
JOIN "User" u ON s.userId = u.id
LEFT JOIN "RombonganBelajar" rb ON s.rombonganBelajarId = rb.id;
```

**5. Keluar dari psql:**

```sql
\q
```

### Cara 2: Menggunakan pgAdmin (GUI)

1. **Buka pgAdmin 4**
2. Expand **Servers → PostgreSQL 16 → Databases → primary_school → Schemas → public → Tables**
3. Klik pada setiap tabel untuk melihat data
4. Klik tab **Data** untuk melihat isi

---

## ▶️ Langkah 8: Jalankan Aplikasi

Sekarang aplikasi siap berjalan dengan database yang sudah terisi.

### Start development server:

```powershell
npm run dev
```

**Output yang diharapkan:**

```
  ▲ Next.js 16.1.6
  - Local:        http://localhost:3000
  - Environments: .env.local

 ✓ Ready in 2.3s
```

### Buka browser:

```
http://localhost:3000
```

---

## 🧪 Langkah 9: Test Login & Akses

### Test 1: Login sebagai Super Admin

1. **Kunjungi:**

   ```
   http://localhost:3000/login
   ```

2. **Masukkan:**
   - Email: `admin@sekolah.id`
   - Password: `admin123`

3. **Klik Login**

4. **Expected redirect:** `http://localhost:3000/admin/dashboard`

5. **Anda akan melihat:** Dashboard admin dengan menu sidebar

### Test 2: Login sebagai Guru

1. **Di halaman login, masukkan:**
   - Email: `guru1@sekolah.id`
   - Password: `guru123`

2. **Expected redirect:** `http://localhost:3000/guru/dashboard`

### Test 3: Login sebagai Staff/Tendik

1. **Masukkan:**
   - Email: `staff1@sekolah.id`
   - Password: `staff123`

2. **Expected redirect:** `http://localhost:3000/staff/dashboard`

### Test 4: Login sebagai Siswa

1. **Masukkan:**
   - Email: `siswa1@sekolah.id`
   - Password: `siswa123`

2. **Expected redirect:** `http://localhost:3000/dashboard`

### Test 5: Coba CRUD Admin Panel

1. **Login sebagai admin**
2. **Klik "Pengumuman"** di sidebar
3. **Klik "Tambah Pengumuman"** (tombol +)
4. **Isi form:**
   - Judul: "Test Pengumuman"
   - Isi: "Ini adalah pengumuman test"
5. **Klik Save** - data akan disimpan ke database
6. **Refresh halaman** - pengumuman baru akan tampil dari database

---

## 🆘 Troubleshooting

### Error 1: "psql is not recognized"

**Penyebab:** PostgreSQL belum ditambahkan ke PATH Windows

**Solusi:**

1. **Buka Environment Variables:**
   - Tekan `Win + R`
   - Ketik `environment` dan tekan Enter
   - Klik "Edit the system environment variables"

2. **Klik "Environment Variables" button**

3. **Di "System variables", cari `Path` dan klik "Edit"**

4. **Klik "New" dan tambahkan:**

   ```
   C:\Program Files\PostgreSQL\16\bin
   ```

5. **Klik OK 3x untuk menutup semua dialog**

6. **Restart PowerShell/CMD dan coba lagi:**
   ```powershell
   psql --version
   ```

### Error 2: "Connection refused at 127.0.0.1:5432"

**Penyebab:** PostgreSQL server tidak berjalan

**Solusi:**

**Untuk Windows:**

1. **Buka Services (services.msc):**
   - Tekan `Win + R`
   - Ketik `services.msc` dan tekan Enter

2. **Cari "postgresql-x64-16"** (atau nama serupa)

3. **Klik kanan → Start** (jika belum running)

**Untuk Docker:**

```powershell
docker ps   # apakah container masih berjalan?
docker start postgres-school  # jalankan jika stopped
```

### Error 3: "role 'postgres' does not exist"

**Penyebab:** PostgreSQL user `postgres` tidak ada atau tidak dapat diakses

**Solusi:**

```powershell
# Jalankan sebagai superuser/administrator
psql -U postgres -h localhost -c "SELECT 1"
```

Jika masih error, reinstall PostgreSQL dengan password yang tepat.

### Error 4: "Database 'primary_school' already exists"

**Penyebab:** Database sudah pernah dibuat sebelumnya

**Solusi (pilih salah satu):**

**Opsi A - Hapus dan buat ulang:**

```powershell
psql -U postgres -c "DROP DATABASE primary_school;"
psql -U postgres -c "CREATE DATABASE primary_school;"
npm run prisma:migrate
```

**Opsi B - Reset database (lebih aman):**

```powershell
npm run prisma:migrate reset
```

Pilih "y" saat ditanya untuk reset. Ini akan menghapus semua data dan recreate sesuai fresh schema.

### Error 5: ".env.local not found" atau "DATABASE_URL not defined"

**Penyebab:** File `.env.local` tidak ada atau belum disimpan dengan benar

**Solusi:**

1. **Pastikan file ada di folder project:**

   ```
   c:\Users\DUNIA IMAJINASIKU\Documents\Web\primary-school\.env.local
   ```

2. **Jika belum ada, buat file baru** (copy dari `.env.local-example` atau buat manual)

3. **Tutup terminal dan buka terminal baru** (terminal lama tidak akan membaca `.env.local` yang baru)

4. **Verifikasi variabel**
   ```powershell
   $env:DATABASE_URL    # lihat isi
   ```

### Error 6: "Unexpected token or syntax error" saat npm run prisma:seed

**Penyebab:** File seed.ts corrupt atau error dalam kode

**Solusi:**

```powershell
# Cek syntax TypeScript
npx tsc --noEmit

# Jika ada error, fix terlebih dahulu, kemudian retry
npm run prisma:seed
```

### Error 7: "Port 3000 already in use" atau "EADDRINUSE"

**Penyebab:** Aplikasi Next.js sudah berjalan di port 3000

**Solusi:**

**Opsi A - Gunakan port berbeda:**

```powershell
$env:PORT=3001
npm run dev
```

Buka `http://localhost:3001` di browser.

**Opsi B - Tutup proses yang menggunakan port 3000:**

```powershell
# Cari aplikasi yang menggunakan port 3000
netstat -ano | findstr :3000

# Kill proses (ganti PID dengan nomor yang keluar)
taskkill /PID 12345 /F
```

---

## 🎯 Ringkasan Process

```
┌─────────────────────────────────────────┐
│ 1. Install PostgreSQL                   │
└────────────────┬────────────────────────┘
                 ▼
┌─────────────────────────────────────────┐
│ 2. Create Database 'primary_school'     │
│    psql -U postgres -c                  │
│    "CREATE DATABASE primary_school"     │
└────────────────┬────────────────────────┘
                 ▼
┌─────────────────────────────────────────┐
│ 3. Edit .env.local                      │
│    DATABASE_URL="postgresql://..."      │
└────────────────┬────────────────────────┘
                 ▼
┌─────────────────────────────────────────┐
│ 4. npm run prisma:migrate               │
│    (Create all tables & schema)         │
└────────────────┬────────────────────────┘
                 ▼
┌─────────────────────────────────────────┐
│ 5. npm run prisma:seed                  │
│    (Insert test data & users)           │
└────────────────┬────────────────────────┘
                 ▼
┌─────────────────────────────────────────┐
│ 6. Verify with psql or pgAdmin          │
│    SELECT * FROM "User"                 │
└────────────────┬────────────────────────┘
                 ▼
┌─────────────────────────────────────────┐
│ 7. npm run dev                          │
│    Start Next.js development server     │
└────────────────┬────────────────────────┘
                 ▼
┌─────────────────────────────────────────┐
│ 8. Open http://localhost:3000           │
│    Login with test accounts             │
└─────────────────────────────────────────┘
```

---

## 📋 Test Login Accounts (Siap Pakai Setelah Seed)

### Super Admin Panel

```
Email:    admin@sekolah.id
Password: admin123
Role:     SUPER_ADMIN
Akses:    http://localhost:3000/admin/dashboard
```

### Guru/Pendidik 1

```
Email:    guru1@sekolah.id
Password: guru123
Role:     PENDIDIK
Nama:     Ibu Siti Nurhaliza
NIP:      196501011987032001
Akses:    http://localhost:3000/guru/dashboard
```

### Guru/Pendidik 2

```
Email:    guru2@sekolah.id
Password: guru123
Role:     PENDIDIK
Nama:     Pak Budi Santoso
NIP:      196502021988031001
Akses:    http://localhost:3000/guru/dashboard
```

### Staff/Tendik 1

```
Email:    staff1@sekolah.id
Password: staff123
Role:     TENAGA_KEPENDIDIKAN
Nama:     Ibu Ratna Wijaya
Jabatan:  Operator Sekolah
Akses:    http://localhost:3000/staff/dashboard
```

### Staff/Tendik 2

```
Email:    staff2@sekolah.id
Password: staff123
Role:     TENAGA_KEPENDIDIKAN
Nama:     Pak Hendra Kusuma
Jabatan:  Tata Usaha
Akses:    http://localhost:3000/staff/dashboard
```

### Siswa 1

```
Email:    siswa1@sekolah.id
Password: siswa123
Role:     SISWA
Nama:     Ahmad Faisal Al-Razi
NISN:     0012345678
NIS:      001
Kelas:    Kelas 1A
Akses:    http://localhost:3000/dashboard
```

### Siswa 2

```
Email:    siswa2@sekolah.id
Password: siswa123
Role:     SISWA
Nama:     Wirda Husna
NISN:     0023456789
NIS:      002
Kelas:    Kelas 2B
Akses:    http://localhost:3000/dashboard
```

---

## ✨ Database Structure Overview

### User Roles & Permissions

| Role                    | Akses        | Fitur                                  |
| ----------------------- | ------------ | -------------------------------------- |
| **SUPER_ADMIN**         | `/admin`     | Kelola semua konten, user, sistem      |
| **PENDIDIK**            | `/guru`      | Lihat kelas, siswa, nilai, kehadiran   |
| **TENAGA_KEPENDIDIKAN** | `/staff`     | Kelola data administratif, inventaris  |
| **SISWA**               | `/dashboard` | Lihat nilai, kehadiran, profil pribadi |

### Tabel Utama & Relasi

```
User (7 users dengan 4 role)
├── Pendidik (2 guru)
│   └── RombonganBelajar (2 kelas)
│       └── Siswa (dihubungkan ke kelas)
├── TenagaKependidikan (2 staff)
├── Siswa (2 siswa)
│   ├── NilaiRapor (nilai per mata pelajaran)
│   ├── Kehadiran (absensi)
│   └── DokumenPendaftaran (dokumen pendidik)
└── Content
    ├── Pengumuman (2 sample)
    ├── Undangan (event invitations)
    ├── Inovasi (innovations)
    ├── Program (school programs)
    ├── JDIH (legal documents)
    ├── DownloadResource (files)
    ├── SaranaPrasarana (facilities)
    ├── Kontak (contact messages)
    └── MataPelajaran (10 subjects)
```

---

## 🔐 Security Notes

1. **Jangan commit `.env.local` ke Git** - gunakan `.gitignore`
2. **Ganti JWT_SECRET dengan nilai yang kuat** sebelum production
3. **Ganti semua test passwords** dengan password yang kompleks
4. **Gunakan HTTPS** di production
5. **Backup database regularly** dengan `pg_dump`

```bash
# Backup database
pg_dump -U postgres primary_school > backup_20260301.sql

# Restore dari backup
psql -U postgres primary_school < backup_20260301.sql
```

---

## 📞 Support & Referensi

- **Dokumentasi PostgreSQL:** https://www.postgresql.org/docs/
- **Prisma ORM:** https://www.prisma.io/docs/
- **Next.js:** https://nextjs.org/docs
- **SQL Tutorial:** https://www.w3schools.com/sql/

---

**Selamat! Database Anda sudah siap 100%.** 🎉

Jika ada pertanyaan selama proses, lihat bagian **Troubleshooting** atau dokumentasi referensi di atas.

---

_Dokumen ini dibuat untuk website manajemen sekolah berbasis Next.js + PostgreSQL + Prisma ORM._  
_Versi: 1.0 | Tanggal: 1 Maret 2026_
