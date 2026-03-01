# 🚀 QUICK START GUIDE

## ⚡ Setup Cepat (5 Menit)

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Setup Database PostgreSQL

#### Cara 1: Menggunakan PostgreSQL Command

```bash
# Login ke PostgreSQL
psql -U postgres

# Di prompt PostgreSQL, jalankan:
CREATE DATABASE primary_school ENCODING 'UTF8' LC_COLLATE 'C' LC_CTYPE 'C';

# Exit dengan \q
```

#### Cara 2: Menggunakan pgAdmin (GUI)

1. Buka pgAdmin
2. Klik kanan "Databases"
3. Create → Database
4. Nama: `primary_school`
5. Klik "Save"

### 3️⃣ Configure Environment

Edit file `.env.local` di root project:

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/primary_school?schema=public"

# JWT
JWT_SECRET="rahasia-super-aman-ganti-di-production"
JWT_EXPIRY="7d"

# Environment
NODE_ENV="development"
```

**Ganti:**

- `password` dengan password PostgreSQL Anda
- `JWT_SECRET` dengan kunci rahasia yang aman

### 4️⃣ Setup Database Schema & Seed Data

```bash
# Setup semua sekaligus
npm run db:setup

# Atau step by step:
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

### 5️⃣ Start Development Server

```bash
npm run dev
```

Aplikasi berjalan di: **http://localhost:3000**

---

## 🔐 Login Accounts (Sudah Auto-Created)

### Admin (Untuk Kelola Sistem)

```
Email: admin@sekolah.id
Password: admin123
→ http://localhost:3000/admin/dashboard
```

### Guru 1 (Untuk Kelola Kelas)

```
Email: guru1@sekolah.id
Password: guru123
→ http://localhost:3000/guru/dashboard
```

### Staff 1 (Untuk Data Administratif)

```
Email: staff1@sekolah.id
Password: staff123
→ http://localhost:3000/staff/dashboard
```

### Siswa 1 (Untuk Student Portal)

```
Email: siswa1@sekolah.id
Password: siswa123
→ http://localhost:3000/dashboard
```

---

## 📁 Structure Penting

```
project-root/
├── prisma/
│   ├── schema.prisma       ← Database schema (14 tables)
│   └── seed.ts             ← Data demo (jangan hapus)
├── src/
│   ├── app/api/            ← API Routes (CRUD endpoints)
│   ├── app/admin/          ← Admin Dashboard
│   ├── app/guru/           ← Teacher Dashboard
│   ├── app/staff/          ← Staff Dashboard
│   ├── app/dashboard/      ← Student Portal
│   ├── app/login/          ← Login Page
│   ├── lib/
│   │   ├── prisma.ts       ← Database client
│   │   ├── auth.ts         ← JWT functions
│   │   ├── password.ts     ← Hash & compare
│   │   ├── api-helpers.ts  ← Response helpers
│   │   └── validations.ts  ← Zod schemas
│   └── middleware.ts       ← Route protection
├── .env.local              ← Config (jangan commit!)
├── package.json            ← Dependencies
└── DATABASE_SETUP.md       ← Dokumentasi lengkap
```

---

## 🛠️ Perintah Berguna

```bash
# Development
npm run dev                 # Start dev server

# Database
npm run prisma:generate    # Generate Prisma client
npm run prisma:migrate     # Run migrations
npm run prisma:seed        # Seed demo data
npm run db:setup          # All in one (recommended)

# Reset database (WARNING: menghapus semua data!)
npx prisma migrate reset

# View database di GUI
npx prisma studio         # Buka http://localhost:5555

# Production
npm run build             # Build untuk production
npm run start             # Jalankan production build

# Cleanup
npm run lint              # Check code quality
```

---

## 🔍 Troubleshooting

### Error: "Can't reach database server at..."

**Solusi:**

1. Pastikan PostgreSQL sudah running
2. Cek DATABASE_URL di .env.local
3. Test conexi: `psql -U postgres -d primary_school`

### Error: "ENOENT: no such file or directory"

**Solusi:**

```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: "P1000: Authentication failed"

**Solusi:**

1. Cek username & password PostgreSQL
2. Update DATABASE_URL
3. Jalankan: `npx prisma db push`

### Port 3000 sudah digunakan

```bash
# Gunakan port lain
PORT=3001 npm run dev
```

---

## 📊 Database Verification

Untuk memastikan database sudah setup dengan benar:

```bash
# Buka Prisma Studio
npx prisma studio

# Atau query langsung
psql -U postgres -d primary_school

# Di PostgreSQL:
\dt                        # List semua tables
\d users                   # Lihat struktur users table
SELECT COUNT(*) FROM users; # Hitung total user
```

---

## 🎯 First Time Steps

Setelah semua berhasil setup:

1. **Login sebagai Admin**
   - Buka http://localhost:3000/login
   - Email: admin@sekolah.id
   - Password: admin123
   - Akan redirect ke Admin Dashboard

2. **Explore Admin Dashboard**
   - Lihat quick actions (buttons biru)
   - Sidebar menu punya semua fitur
   - Setiap menu mengarah ke API yang sudah built

3. **Test API Endpoints**
   - Buka http://localhost:3000/api/pengumuman
   - Buka http://localhost:3000/api/users/me
   - Test di Postman jika mau

4. **Test Login Dengan Role Lain**
   - Guru: guru1@sekolah.id / guru123
   - Staff: staff1@sekolah.id / staff123
   - Siswa: siswa1@sekolah.id / siswa123

---

## 📚 Documentation Files

Dokumentasi lengkap tersedia dalam:

1. **DATABASE_SETUP.md** - Setup database detail
2. **IMPLEMENTATION_SUMMARY.md** - Summary implementasi
3. **API Routes Comments** - Dokumentasi di code
4. **Prisma Schema** - prisma/schema.prisma

---

## 💡 Next Steps (Optional Development)

Untuk melanjutkan development:

- [ ] Complete CRUD pages untuk semua content
- [ ] Implementasi file upload
- [ ] Buat laporan & export Excel
- [ ] Notifikasi email
- [ ] Mobile app integration
- [ ] Analytics dashboard

---

## 🚨 PENTING

### Sebelum Production:

- ⚠️ **Ganti JWT_SECRET** dengan kunci yang aman
- ⚠️ **Ganti semua default passwords** (admin123, guru123, dll)
- ⚠️ **Setup HTTPS & SSL certificate**
- ⚠️ **Backup database regularly**
- ⚠️ **Setup environment variables** di server hosting
- ⚠️ **Update dependencies secara berkala**

---

## 📞 Support

Jika ada masalah:

1. Cek file **DATABASE_SETUP.md** untuk dokumentasi detail
2. Baca **IMPLEMENTATION_SUMMARY.md** untuk overview
3. Check kode di `src/app/api/` untuk contoh implementation
4. Test di Postman atau curl untuk debug API

---

**Happy Coding! 🎉**

Sistem sudah siap digunakan. Mulai dari Admin Dashboard dan jelajahi setiap fitur!
