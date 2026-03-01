# 📚 Dokumentasi Website Sekolah - Database & Sistem User

## 📋 Daftar Isi

1. [Setup Database](#setup-database)
2. [Struktur Database](#struktur-database)
3. [User Roles & Permissions](#user-roles--permissions)
4. [API Endpoints](#api-endpoints)
5. [Credentials Default](#credentials-default)
6. [Fitur-fitur](#fitur-fitur)

---

## Setup Database

### Prerequisites

- Node.js 18+
- PostgreSQL 12+
- npm atau yarn

### Langkah-langkah Setup

#### 1. Install Dependencies

```bash
npm install
```

#### 2. Setup Environment Variables

Buat file `.env.local` di root project:

```env
# Database Configuration
DATABASE_URL="postgresql://user:password@localhost:5432/primary_school?schema=public"

# JWT Secrets
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRY="7d"

# Cookie Settings
NODE_ENV="development"
```

#### 3. Create PostgreSQL Database

```bash
# Login ke PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE primary_school;
CREATE USER school_user WITH PASSWORD 'your_password';
ALTER ROLE school_user SET client_encoding TO 'utf8mb4';
ALTER ROLE school_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE school_user SET default_transaction_deferrable TO on;
ALTER ROLE school_user SET default_time_zone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE primary_school TO school_user;

# Exit
\q
```

#### 4. Setup Prisma Database

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations (create tables)
npm run prisma:migrate

# Seed database dengan data sample
npm run prisma:seed
```

#### 5. Jalankan Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

---

## Struktur Database

### Schema Utama

#### Users (Pengguna)

```
- id (String, PK)
- email (String, Unique)
- username (String, Unique)
- password (String, hashed)
- fullName (String)
- role (Enum: SUPER_ADMIN, PENDIDIK, TENAGA_KEPENDIDIKAN, SISWA)
- status (Enum: AKTIF, NONAKTIF, SUSPENDED)
- profilePicture (String, optional)
- phoneNumber (String, optional)
- createdAt, updatedAt
- lastLogin (DateTime, optional)
```

#### Siswa (Peserta Didik)

```
- id (String, PK)
- userId (String, FK -> User)
- nisn (String, Unique)
- nis (String, Unique)
- status (Enum: AKTIF, GRADUATED, PINDAH, NONAKTIF)
- tempatLahir, tanggalLahir
- jenisKelamin, agama
- alamat & informasi domisili
- Data orang tua (nama, pekerjaan, no telp)
- rombonganBelajarId (FK -> RombonganBelajar)
```

#### Pendidik (Guru)

```
- id (String, PK)
- userId (String, FK -> User)
- nip (String, Unique)
- nuptk (String, Unique, optional)
- statusPegawai (String)
- tempatLahir, tanggalLahir
- jenisKelamin, agama
- Informasi pendidikan (tingkat, jurusan)
- mataPelajaran[] (relation)
- rombonganBelajar[] (relation)
```

#### TenagaKependidikan (Staff)

```
- id (String, PK)
- userId (String, FK -> User)
- nip (String, Unique, optional)
- noIdentitas (String, optional)
- jabatan (String)
- departemen (String)
- tempatLahir, tanggalLahir
- Informasi personal lainnya
```

#### RombonganBelajar (Kelas/Rombel)

```
- id (String, PK)
- nama (String) - "Kelas 1A", "Kelas 2B"
- tingkat (Int) - 1-6 untuk SD
- paralel (String) - A, B, C, D
- tahunAjaran (String) - "2023/2024"
- pendidikId (FK -> Pendidik) - Wali Kelas
- siswa[] (relation)
```

#### MataPelajaran (Mata Pelajaran)

```
- id (String, PK)
- nama (String)
- kodeMP (String, Unique)
- satuan (String)
```

#### NilaiRapor (Nilai Report Card)

```
- id (String, PK)
- siswaId (FK -> Siswa)
- mataPelajaranId (FK -> MataPelajaran)
- semester (Int: 1 atau 2)
- tahunAjaran (String)
- nilaiHarian, nilaiUts, nilaiUas, nilaiAkhir
- predikat (A, B, C, D)
- catatan (String, optional)
```

#### Kehadiran (Attendance)

```
- id (String, PK)
- siswaId (FK -> Siswa)
- tanggal (DateTime)
- status (HADIR, SAKIT, IZIN, ALPHA)
- keterangan (String, optional)
```

#### Content Tables

- **Pengumuman** - Berita & pengumuman sekolah
- **Undangan** - Undangan acara
- **Inovasi** - Program inovasi pembelajaran
- **Program** - Program pembelajaran berbagai jenis
- **SaranaPrasarana** - Inventaris sarana & prasarana
- **DownloadResource** - File download (formulir, jadwal, dll)
- **JDIH** - Jaringan Dokumentasi Informasi Hukum
- **Kontak** - Pesan dari formulir kontak
- **DokumenPendaftaran** - Dokumen siswa (ijazah, dll)
- **JadwalPelajaran** - Jadwal pembelajaran
- **SistemSetting** - Konfigurasi sistem

---

## User Roles & Permissions

### 1. SUPER_ADMIN (Super Administrator)

**Akses:**

- `/admin` - Dashboard Admin
- Mengelola semua konten
- Mengelola pengguna (buat, edit, hapus)
- Mengelola pendidik & staff
- Akses ke semua laporan
- Pengaturan sistem

**Permissions:**

```
- CREATE: User, Pendidik, Staff, Content
- READ: Semua data
- UPDATE: Semua data
- DELETE: Semua data
```

### 2. PENDIDIK (Guru/Teacher)

**Akses:**

- `/guru` - Dashboard Guru
- Mengelola kelas & siswa
- Input nilai & kehadiran
- Edit konten pembelajaran
- Lihat data siswa
- Report kehadiran & nilai

**Permissions:**

```
- CREATE: Pengumuman, Inovasi, Program, Nilai, Kehadiran
- READ: Data siswa, nilai, kehadiran kelas mereka
- UPDATE: Konten sendiri, nilai, kehadiran
- DELETE: Konten sendiri
```

### 3. TENAGA_KEPENDIDIKAN (Staff)

**Akses:**

- `/staff` - Dashboard Staff
- Mengelola data administratif
- Edit data siswa & guru
- Laporan inventaris
- Manajemen dokumen

**Permissions:**

```
- CREATE: Pengumuman, Content, Dokumen
- READ: Data siswa, guru, inventaris
- UPDATE: Data siswa, guru, inventaris
- DELETE: Terbatas pada konten sendiri
```

### 4. SISWA (Student)

**Akses:**

- `/dashboard` - Student Portal
- Lihat nilai & rapor
- Lihat kehadiran
- Download dokumen pribadi
- Lihat pengumuman & undangan
- Edit data pribadi

**Permissions:**

```
- READ: Data pribadi, nilai, kehadiran
- UPDATE: Data pribadi sendiri
- DOWNLOAD: Dokumen pribadi
```

---

## API Endpoints

### Authentication

```
POST   /api/auth/login              - Login
POST   /api/auth/logout             - Logout
POST   /api/auth/register-siswa     - Register siswa
POST   /api/auth/register-pendidik  - Register guru (admin only)
POST   /api/auth/register-staff     - Register staff (admin only)
```

### Users

```
GET    /api/users                   - Get all users (admin)
GET    /api/users/me                - Get current user
GET    /api/users/:id               - Get user by ID
PUT    /api/users/:id               - Update user status (admin)
DELETE /api/users/:id               - Delete user (admin)
```

### Siswa

```
GET    /api/siswa                   - Get all siswa (admin, guru, staff)
GET    /api/siswa/:id               - Get siswa detail
GET    /api/siswa/:id/akademik      - Get nilai & kehadiran siswa
PUT    /api/siswa/:id               - Update siswa data
```

### Content Management

```
GET    /api/pengumuman              - Get all pengumuman
POST   /api/pengumuman              - Create pengumuman
GET    /api/pengumuman/:id          - Get pengumuman detail
PUT    /api/pengumuman/:id          - Update pengumuman
DELETE /api/pengumuman/:id          - Delete pengumuman

GET    /api/undangan                - Get all undangan
POST   /api/undangan                - Create undangan
GET    /api/undangan/:id            - Get undangan detail
PUT    /api/undangan/:id            - Update undangan
DELETE /api/undangan/:id            - Delete undangan

GET    /api/inovasi                 - Get all inovasi
POST   /api/inovasi                 - Create inovasi
GET    /api/inovasi/:id             - Get inovasi detail
PUT    /api/inovasi/:id             - Update inovasi
DELETE /api/inovasi/:id             - Delete inovasi

GET    /api/program                 - Get all program
POST   /api/program                 - Create program
GET    /api/program/:id             - Get program detail
PUT    /api/program/:id             - Update program
DELETE /api/program/:id             - Delete program
```

### Others

```
GET    /api/download                - Get download resources
POST   /api/download                - Create download (admin, guru, staff)

GET    /api/jdih                    - Get JDIH documents

GET/POST /api/kontak                - Get/Create contact messages
```

---

## Credentials Default

Setelah seed database, gunakan credentials berikut untuk testing:

### Super Admin

```
Email: admin@sekolah.id
Username: superadmin
Password: admin123
```

### Guru 1

```
Email: guru1@sekolah.id
Username: guru1
Password: guru123
NIP: 196501011987032001
```

### Guru 2

```
Email: guru2@sekolah.id
Username: guru2
Password: guru123
NIP: 196502021988031001
```

### Staff 1

```
Email: staff1@sekolah.id
Username: staff1
Password: staff123
Jabatan: Operator Sekolah
```

### Staff 2

```
Email: staff2@sekolah.id
Username: staff2
Password: staff123
Jabatan: Tata Usaha
```

### Siswa 1

```
Email: siswa1@sekolah.id
Username: siswa1
Password: siswa123
NISN: 0012345678
Nama: Ahmad Faisal Al-Razi
```

### Siswa 2

```
Email: siswa2@sekolah.id
Username: siswa2
Password: siswa123
NISN: 0023456789
Nama: Wirda Husna
```

---

## Fitur-fitur

### 1. Dashboard Super Admin

- Statistik pengguna & konten
- Manajemen pengguna (CRUD)
- Manajemen konten (Pengumuman, Undangan, Inovasi, Program)
- Manajemen Siswa & Guru
- Laporan sistem
- Setting sistem

### 2. Dashboard Guru (Pendidik)

- Kelas yang di-handle
- Data siswa di kelas
- Input nilai rapor
- Input kehadiran siswa
- Manajemen konten kelas
- Laporan akademik

### 3. Dashboard Staff

- Data siswa & guru
- Manajemen data administratif
- Laporan inventaris
- Manajemen dokumen sekolah
- Statistik

### 4. Portal Siswa

- Profil pribadi
- Lihat nilai & rapor
- Lihat kehadiran
- Update data pribadi
- Download dokumen
- Lihat pengumuman & undangan

### 5. Public Website

- Halaman depan dengan hero section
- Profil sekolah (visi-misi, struktur organisasi)
- Data peserta didik & PTK
- Sarana prasarana
- Program pembelajaran
- Data download
- JDIH
- Kontak
- Berita (pengumuman, undangan, inovasi)

---

## Security

### Password

- Hashing: bcryptjs dengan 10 rounds
- Minimum 6 karakter
- Disimpan terenkripsi di database

### Authentication

- JWT Token dengan secret key
- Token expiry: 7 hari (configurable)
- HttpOnly cookies untuk keamanan
- CSRF protection

### Authorization

- Role-based access control (RBAC)
- Middleware untuk validasi token
- Validasi permission per endpoint

---

## Troubleshooting

### Database Connection Error

```bash
# Check if PostgreSQL is running
psql -U postgres

# Check DATABASE_URL in .env.local
# Format: postgresql://user:password@localhost:5432/database_name?schema=public
```

### Prisma Errors

```bash
# Regenerate Prisma Client
npm run prisma:generate

# Reset database & reseed
npx prisma migrate reset
npm run prisma:seed
```

### Token Expired

- Token otomatis refresh saat login ulang
- Clear cookies jika diperlukan

---

## Best Practices

1. **Environment Variables**: Selalu gunakan .env.local untuk credentials, jangan hardcode
2. **Passwords**: Ubah semua password default sebelum production
3. **Backups**: Regular backup database
4. **Logs**: Monitor logs untuk security issues
5. **Updates**: Selalu update dependencies secara berkala

---

## Support

Untuk pertanyaan atau masalah, silakan hubungi tim IT sekolah.
