# 🎓 Admin Panel - SD Negeri 1 Batu Rakit

Admin panel adalah sistem manajemen konten (CMS) yang memungkinkan administrator sekolah mengelola semua konten website tanpa perlu coding.

## 🚀 Akses Admin Panel

### URL

- **Admin Dashboard:** `/admin/dashboard`
- **Admin Login:** `/admin/login`
- **Admin Hub:** `/admin`

### Dari Website Utama

1. Buka website sekolah
2. Scroll ke bawah (footer)
3. Klik ikon ⚙️ (settings) di bagian kanan bawah
4. Akan diarahkan ke halaman admin

## 🔐 Login

### Demo Credentials

- **Username:** `admin`
- **Password:** `admin123`

### Proses Login

1. Buka `/admin/login`
2. Masukkan username dan password
3. Klik tombol "Login"
4. Akan diarahkan ke dashboard

## 📊 Dashboard Admin

Dashboard menampilkan:

- 📢 Total Pengumuman
- 📚 Total Program
- 👥 Total PTK (Guru & Staff)
- 🎓 Total Siswa
- Quick access ke semua fitur

## 📋 Menu Utama

### 1. 📢 Pengumuman

**Lokasi:** `/admin/pengumuman`

Kelola seluruh pengumuman sekolah:

- ➕ Tambah pengumuman baru
- ✏️ Edit pengumuman
- 🗑️ Hapus pengumuman
- 🔍 Search pengumuman

**Form Pengumuman:**

- Judul (wajib)
- Isi Pengumuman (wajib)
- Tanggal (otomatis hari ini)

**Contoh Pengumuman:**

- Pengumuman libur sekolah
- Pengumuman acara sekolah
- Pengumuman penting lainnya

---

### 2. 📧 Undangan

**Lokasi:** `/admin/undangan`

Manajemen undangan acara sekolah:

- ➕ Tambah undangan acara
- ✏️ Edit undangan
- 🗑️ Hapus undangan
- 📍 Lokasi acara
- ⏰ Waktu acara

**Form Undangan:**

- Judul (wajib)
- Deskripsi (wajib)
- Tanggal acara
- Waktu acara
- Lokasi/Tempat

---

### 3. 🎯 Inovasi

**Lokasi:** `/admin/inovasi`

Kelola inovasi program pembelajaran:

- ➕ Tambah inovasi baru
- ✏️ Edit inovasi
- 🗑️ Hapus inovasi

**Form Inovasi:**

- Judul (wajib)
- Deskripsi (wajib)
- Manfaat inovasi
- Tahun (otomatis tahun sekarang)

---

### 4. 📚 Program

**Lokasi:** `/admin/program`

Kelola 6 program pendidikan utama:

- ➕ Tambah program
- ✏️ Edit program
- 🗑️ Hapus program
- 🌈 Pilih warna badge

**Form Program:**

- Nama Program (wajib)
- Slug/URL (wajib)
- Deskripsi
- Warna Badge (6 pilihan)

**Program Bawaan:**

1. Pembelajaran (Kurikulum Merdeka)
2. PIP (Program Indonesia Pintar)
3. BOSP (Bantuan Operasional Sekolah)
4. SPMB (Sistem Penerimaan Murid Baru)
5. Ekstrakurikuler
6. Komunitas Belajar

---

### 5. 📥 Download

**Lokasi:** `/admin/download`

Kelola file download untuk pengunjung:

- ➕ Tambah file baru
- ✏️ Edit file
- 🗑️ Hapus file
- 📊 Info file size

**Form Download:**

- Nama File (wajib)
- Deskripsi
- Kategori
- Ukuran File (cth: 1.2 MB)
- Tipe File (cth: PDF, Excel)

---

### 6. ⚖️ JDIH

**Lokasi:** `/admin/jdih`

Jaringan Dokumentasi dan Informasi Hukum:

- ➕ Tambah dokumen legal
- ✏️ Edit dokumen
- 🗑️ Hapus dokumen
- 📜 Kategori dokumen

**Form JDIH:**

- Judul (wajib)
- Deskripsi (wajib)
- Kategori (Peraturan/Keputusan/Instruksi/Surat Edaran)
- Tahun

---

### 7. 👨‍🏫 PTK

**Lokasi:** `/admin/ptk`

Data Pendidik dan Tenaga Kependidikan (Guru & Staff):

- ➕ Tambah PTK
- ✏️ Edit PTK
- 🗑️ Hapus PTK

**Form PTK:**

- Nama Lengkap (wajib)
- Jabatan (wajib)
- NIP (wajib)
- Pendidikan Terakhir (S1/S2/S3/D3/SMA)

---

### 8. 🎓 Siswa

**Lokasi:** `/admin/siswa`

Data peserta didik/siswa sekolah:

- ➕ Tambah siswa
- ✏️ Edit siswa
- 🗑️ Hapus siswa
- 📊 Statistik per kelas
- 🔍 Search siswa

**Form Siswa:**

- NISN (wajib)
- Nama Lengkap (wajib)
- Kelas (Kelas 1-6)
- Jenis Kelamin

**Statistik:**

- Total siswa per kelas
- Breakdown laki-laki dan perempuan

---

### 9. ⚙️ Pengaturan

**Lokasi:** `/admin/settings`

Manajemen profil admin dan keamanan:

#### Tab Profil

- Nama Administrator
- Email Administrator
- Nomor Telepon Sekolah
- Email Sekolah

#### Tab Keamanan

- Ubah password admin
- Password lama (required)
- Password baru (required)
- Konfirmasi password

---

## 💾 Penyimpanan Data

Semua data disimpan di browser menggunakan **localStorage**:

| Menu       | Storage                   |
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
| Login      | `adminToken`, `adminName` |

## ⚠️ Penting Diketahui

1. **Data Lokal:** Data hanya tersimpan di browser Anda, bukan server
2. **Backup:** Jika cache browser dihapus, data akan hilang
3. **Sinkronisasi:** Data tidak otomatis sinkronisasi ke halaman publik tanpa refresh
4. **Production:** Untuk produksi, disarankan integrasi dengan backend/database

## 📱 Fitur

### Fitur Umum di Semua Menu

- ✅ Tambah item baru
- ✅ Edit item existing
- ✅ Hapus item
- ✅ Search/filter
- ✅ Real-time feedback (toast messages)
- ✅ Responsive design (mobile-friendly)

### UI/UX Features

- 🎨 Modern dark mode interface
- 🌈 Color-coded menus
- ⚡ Fast performance
- 📱 Responsive di semua device
- 🎬 Smooth animations

## 🎯 Panduan Penggunaan Cepat

### Menambah Item Baru

1. Klik tombol "Tambah [Item]"
2. Isi form dengan data
3. Klik tombol "Simpan"
4. Refresh halaman untuk melihat perubahan

### Mengedit Item

1. Cari item yang ingin diedit
2. Klik tombol "Edit"
3. Ubah data yang diperlukan
4. Klik tombol "Update"

### Menghapus Item

1. Temukan item yang ingin dihapus
2. Klik tombol "Hapus"
3. Item akan langsung terhapus

### Search Item

1. Ketik di search box
2. Hasil akan difilter real-time
3. Clear search box untuk melihat semua item

## 🔒 Keamanan

### Untuk Demo

- ✅ Credentials disimpan di localStorage
- ✅ Session timeout protection
- ✅ Basic form validation

### Catatan Keamanan

- ❌ TIDAK cocok untuk production
- ⚠️ Password terlihat di DevTools browser
- ⚠️ Data mudah diakses orang lain jika akses PC

### Rekomendasi Production

- Gunakan JWT tokens
- Backend API dengan authentication
- Database server
- HTTPS
- Rate limiting
- CORS security

## 🆘 Troubleshooting

| Masalah              | Solusi                               |
| -------------------- | ------------------------------------ |
| Tidak bisa login     | Clear browser cache dan localStorage |
| Data tidak muncul    | Refresh page (F5)                    |
| Form tidak submit    | Pastikan field required terisi semua |
| Styling berantakan   | Hard refresh (Ctrl+F5)               |
| Hilang logout button | Refresh page                         |

## 📚 Teknologi

- **Framework:** Next.js 16.1.6 + React 19.2.3
- **Styling:** Tailwind CSS 4.1.18
- **Animations:** Framer Motion 12.34.0
- **Icons:** Lucide React 0.564.0
- **Components:** shadcn/ui

## 📞 Support

Untuk pertanyaan atau masalah:

- Email: sdnegeri1baturakit@gmail.com
- Phone: +62 821-4791-5101
- Lokasi: Desa Batu Rakit, Kabupaten Lombok Utara

## 📄 Dokumentasi Lengkap

Lihat file `ADMIN_PANEL_DOCS.md` untuk dokumentasi teknis lengkap.

---

**Versi:** 1.0.0  
**Last Updated:** 2026  
**Status:** Active ✅
