# Admin Panel - Dokumentasi Lengkap

## 📊 Ringkasan Admin Panel

Admin Panel adalah sistem manajemen konten (CMS) untuk SD Negeri 1 Batu Rakit yang memungkinkan administrator mengelola semua konten website secara terpisah dari halaman publik.

## 🔐 Login Admin

**URL:** `/admin/login`
**Username Demo:** `admin`
**Password Demo:** `admin123`

### Fitur Keamanan:

- ✅ Sistem autentikasi berbasis localStorage
- ✅ Session timeout protection
- ✅ Redirect otomatis jika login expired
- ✅ Form validation

---

## 📋 Menu Utama Admin

### 1. **Dashboard** (`/admin/dashboard`)

- Ringkasan statistik semua konten
- Quick access ke fitur-fitur utama
- Status sistem
- Informasi user yang login

**Statistik yang ditampilkan:**

- Total Pengumuman
- Total Program
- Total PTK
- Total Siswa

---

### 2. **Pengumuman** (`/admin/pengumuman`)

Kelola semua pengumuman sekolah dengan fitur CRUD lengkap.

**Fitur:**

- ➕ Tambah pengumuman baru
- ✏️ Edit pengumuman
- 🗑️ Hapus pengumuman
- 🔍 Search/filter
- 📅 Tanggal otomatis

**Form Fields:**

- Judul (required)
- Isi Pengumuman (required)
- Tanggal (auto-fill hari ini)
- Kategori (default: Pengumuman)

**Data tersimpan di:** `localStorage:announcements`

---

### 3. **Undangan** (`/admin/undangan`)

Manajemen undangan acara dan gathering sekolah.

**Fitur:**

- ➕ Tambah undangan
- ✏️ Edit undangan
- 🗑️ Hapus undangan
- 📍 Lokasi event
- ⏰ Waktu spesifik

**Form Fields:**

- Judul (required)
- Deskripsi (required)
- Tanggal (date picker)
- Waktu (time picker)
- Lokasi/Tempat

**Data tersimpan di:** `localStorage:invitations`

---

### 4. **Inovasi** (`/admin/inovasi`)

Kelola inovasi program pembelajaran dan kegiatan sekolah.

**Fitur:**

- ➕ Tambah inovasi
- ✏️ Edit inovasi
- 🗑️ Hapus inovasi
- Trophy icon untuk manfaat

**Form Fields:**

- Judul (required)
- Deskripsi (required)
- Manfaat
- Tahun (auto-fill tahun sekarang)

**Data tersimpan di:** `localStorage:innovations`

---

### 5. **Program** (`/admin/program`)

Manajemen program pendidikan sekolah (6 program utama).

**Fitur:**

- ➕ Tambah program
- ✏️ Edit program
- 🗑️ Hapus program
- 🌈 Color picker untuk badge

**Form Fields:**

- Nama Program (required)
- Slug/URL (required)
- Deskripsi
- Warna Badge (6 pilihan warna)

**Warna Tersedia:**

- Blue
- Purple
- Pink
- Green
- Yellow
- Red

**Data tersimpan di:** `localStorage:programs`

**Program Bawaan:**

1. Pembelajaran (Kurikulum Merdeka)
2. PIP (Program Indonesia Pintar)
3. BOSP (Bantuan Operasional Sekolah)
4. SPMB (Sistem Penerimaan Murid Baru)
5. Ekstrakurikuler
6. Komunitas Belajar

---

### 6. **Download** (`/admin/download`)

Kelola file-file yang dapat diunduh pengunjung.

**Fitur:**

- ➕ Tambah file
- ✏️ Edit file
- 🗑️ Hapus file
- 📊 Info ukuran file

**Form Fields:**

- Nama File (required)
- Deskripsi
- Kategori
- Ukuran File (cth: 1.2 MB)
- Tipe File (cth: PDF, Excel, Word)

**Data tersimpan di:** `localStorage:downloads`

---

### 7. **JDIH** (`/admin/jdih`)

Jaringan Dokumentasi dan Informasi Hukum - Manajemen dokumen legal.

**Fitur:**

- ➕ Tambah dokumen
- ✏️ Edit dokumen
- 🗑️ Hapus dokumen
- 📜 Kategori dokumen

**Form Fields:**

- Judul (required)
- Deskripsi (required)
- Kategori (dropdown)
- Tahun

**Kategori Tersedia:**

- Peraturan (Indigo)
- Keputusan (Blue)
- Instruksi (Purple)
- Surat Edaran (Violet)

**Data tersimpan di:** `localStorage:legaldocs`

---

### 8. **PTK** (`/admin/ptk`)

Pendidik dan Tenaga Kependidikan - Data guru dan staff sekolah.

**Fitur:**

- ➕ Tambah PTK
- ✏️ Edit PTK
- 🗑️ Hapus PTK
- 👤 Info pengembang

**Form Fields:**

- Nama Lengkap (required)
- Jabatan (required)
- NIP (required)
- Pendidikan Terakhir (dropdown)

**Pendidikan Tersedia:**

- SMA
- D3
- S1 (Strata 1)
- S2 (Strata 2)
- S3 (Strata 3)

**Data tersimpan di:** `localStorage:ptk`

---

### 9. **Siswa** (`/admin/siswa`)

Data peserta didik/siswa sekolah.

**Fitur:**

- ➕ Tambah siswa
- ✏️ Edit siswa
- 🗑️ Hapus siswa
- 📊 Statistik per kelas
- 🔍 Search

**Form Fields:**

- NISN (required)
- Nama Lengkap (required)
- Kelas (dropdown)
- Jenis Kelamin

**Kelas Tersedia:**

- Kelas 1-6

**Data tersimpan di:** `localStorage:students`

**Statistik Ditampilkan:**

- Total siswa per kelas
- Breakdown gender

---

### 10. **Pengaturan** (`/admin/settings`)

Manajemen profil admin dan keamanan sistem.

**Tab 1: Profil**

- Informasi Administrator
  - Nama Admin
  - Email Admin
- Data Sekolah
  - Nomor Telepon Sekolah
  - Email Sekolah

**Tab 2: Keamanan**

- Ubah Password
  - Password Lama
  - Password Baru
  - Konfirmasi Password

**Data tersimpan di:** `localStorage:adminSettings`

---

## 💾 Penyimpanan Data

Semua data admin panel disimpan menggunakan **localStorage browser**:

| Halaman    | Storage Key               |
| ---------- | ------------------------- |
| Pengumuman | `announcements`           |
| Undangan   | `invitations`             |
| Inovasi    | `innovations`             |
| Program    | `programs`                |
| Download   | `downloads`               |
| JDIH       | `legaldocs`               |
| PTK        | `ptk`                     |
| Siswa      | `students`                |
| Pengaturan | `adminSettings`           |
| Auth       | `adminToken`, `adminName` |

### ⚠️ Catatan Penting:

- Data localStorage **bersifat lokal di browser**
- Jika cache browser dihapus, data akan hilang
- Untuk production, disarankan integrasi dengan backend/database
- Backup data secara berkala

---

## 🎨 UI/UX Features

### Design System:

- **Framework:** Next.js 16 + React 19
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Components:** shadcn/ui

### Responsive Design:

- ✅ Desktop (1920px+)
- ✅ Laptop (1280px+)
- ✅ Tablet (768px+)
- ✅ Mobile (320px+)

### Color Scheme:

- Primary: Blue (#0066CC)
- Secondary: Slate (Gray)
- Context Colors:
  - Orange: Pengumuman
  - Emerald: Undangan
  - Purple: Inovasi
  - Pink: Program
  - Cyan: Download
  - Indigo: JDIH
  - Violet: PTK
  - Red: Siswa

---

## 🚀 Cara Menggunakan

### 1. Login

- Buka URL: `http://localhost:3000/admin/login`
- Username: `admin`
- Password: `admin123`
- Klik tombol "Login"

### 2. Kelola Konten

- Dari dashboard, pilih menu yang ingin dikelola
- Klik tombol "Tambah [Item]" untuk menambah
- Isi form dan klik "Simpan"
- Untuk edit, klik tombol "Edit" di item
- Untuk hapus, klik tombol "Hapus"

### 3. Search & Filter

- Gunakan search box untuk mencari item
- Hasil akan difilter real-time

### 4. Logout

- Klik tombol "Logout" di navbar
- Session akan terhapus
- Akan diredirect ke login page

---

## 🔧 Integrasi dengan Frontend

### Data Flow:

```
Admin Panel (CRUD)
    ↓
localStorage
    ↓
Import constants.ts
    ↓
Public Pages
```

### File Utama:

- `/src/app/admin/` - Admin panel pages
- `/src/lib/constants.ts` - Data utama
- `/src/app/` - Public pages

### Cara Update Data di Frontend:

1. Edit data di admin panel
2. Data tersimpan di localStorage
3. Restart browser/clear cache
4. Frontend akan membaca dari constants.ts

**Untuk update real-time: Integrasi backend API diperlukan**

---

## 📱 Akses Admin Panel

### Dari Website Publik:

- Belum ada link publik ke admin panel (untuk keamanan)
- Akses manual melalui: `http://localhost:3000/admin/login`

### Dari Preview Sidebar:

- Tambahkan link admin di footer atau navbar
- Rekomendasi: Link tersembunyi atau footer

---

## 🆘 Troubleshooting

| Masalah            | Solusi                               |
| ------------------ | ------------------------------------ |
| Tidak bisa login   | Clear localStorage dan cache browser |
| Data tidak muncul  | Refresh page atau restart browser    |
| Form tidak submit  | Pastikan field required terisi       |
| Styling berantakan | Hard refresh (Ctrl+F5)               |

---

## 📝 Catatan Developer

### Struktur File Admin:

```
/admin
├── layout.tsx (auth guard)
├── login/
│   └── page.tsx
├── dashboard/
│   └── page.tsx
├── pengumuman/
│   └── page.tsx
├── undangan/
│   └── page.tsx
├── inovasi/
│   └── page.tsx
├── program/
│   └── page.tsx
├── download/
│   └── page.tsx
├── jdih/
│   └── page.tsx
├── ptk/
│   └── page.tsx
├── siswa/
│   └── page.tsx
└── settings/
    └── page.tsx
```

### Reusable Patterns:

- Semua CRUD page mengikuti pattern yang sama
- State management dengan `useState`
- localStorage untuk persistance
- Framer Motion untuk animations
- shadcn/ui components

---

## 🔐 Security Notes

⚠️ **DEMO ONLY** - Sistem ini menggunakan:

- ❌ Plain text password di localStorage (TIDAK AMAN)
- ❌ Tidak ada backend validation
- ❌ localStorage mudah diakses via DevTools

### Rekomendasi untuk Production:

- ✅ Gunakan JWT tokens
- ✅ Backend API dengan authentication
- ✅ Database untuk persistance
- ✅ HTTPS untuk semua komunikasi
- ✅ Environment variables untuk secrets
- ✅ Rate limiting
- ✅ CORS configuration

---

## 📚 Referensi

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

---

**Versi:** 1.0.0  
**Last Updated:** 2026  
**Author:** Development Team
