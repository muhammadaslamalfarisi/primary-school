// Informasi Sekolah
export const SCHOOL_INFO = {
  name: "SD Negeri 1 Batu Rakit",
  shortName: "SDN 1 BATU RAKIT",
  npsn: "20505555",
  address: "Jln. Batu Rakit, Desa Batu Rakit, Kecamatan Bayan",
  city: "Kabupaten Lombok Utara",
  province: "Nusa Tenggara Barat",
  zipCode: "83354",
  phone: "+62 821-4791-5101",
  email: "sdnegeri1baturakit@gmail.com",
  establishedYear: 1976,
  headmaster: {
    name: "Raden Irawangsa, S.Pd.",
    title: "Kepala SD Negeri 1 Batu Rakit",
  },
  vision:
    "Mewujudkan generasi yang berakhlak mulia, cerdas, dan kreatif serta siap menghadapi tantangan masa depan",
  mission: [
    "Menyelenggarakan pendidikan yang berkualitas dan inklusif untuk semua peserta didik",
    "Mengembangkan potensi akademik dan non-akademik melalui pembelajaran inovatif",
    "Menanamkan nilai-nilai moral, budi pekerti, dan kepribadian yang luhur",
    "Memfasilitasi pembelajaran yang relevan dengan perkembangan zaman",
  ],
};

// Data Pengumuman (Berita)
export const ANNOUNCEMENTS = [
  {
    id: "p-1",
    title: "Sistem Penerimaan Murid Baru (SPMB) Tahun Ajaran 2026/2027",
    slug: "spmb-2026-2027",
    date: "2026-07-01",
    category: "Penting",
    image: "/images/spmb.jpg",
    excerpt:
      "Informasi mengenai persyaratan, alur pendaftaran, dan jadwal seleksi calon siswa baru.",
    content: `
      <h2>Persyaratan SPMB 2026/2027</h2>
      <p>Berikut adalah persyaratan lengkap untuk pendaftaran calon siswa baru:</p>
      <ul>
        <li>Fotokopi Akte Kelahiran (2 lembar)</li>
        <li>Fotokopi Kartu Keluarga (2 lembar)</li>
        <li>Pas Foto 3x4 (4 lembar)</li>
        <li>Surat Keterangan Sehat dari Puskesmas</li>
        <li>Surat Referensi dari TK/Sekolah sebelumnya</li>
      </ul>
      <h2>Jadwal Pendaftaran</h2>
      <p><strong>Dibuka:</strong> 1 Juli 2026</p>
      <p><strong>Ditutup:</strong> 31 Agustus 2026</p>
      <p><strong>Pengumuman Hasil:</strong> 15 September 2026</p>
    `,
  },
  {
    id: "p-2",
    title: "Libur Akhir Semester Genap dan Pembagian Rapor",
    slug: "libur-semester-genap",
    date: "2026-06-28",
    category: "Akademik",
    image: "/images/rapor.jpg",
    excerpt: "Pembagian rapor akan dilaksanakan pada hari Sabtu minggu depan.",
    content: `
      <h2>Jadwal Libur Semester Genap</h2>
      <p>Diberitahukan kepada seluruh orang tua siswa dan siswa SDN 1 Batu Rakit:</p>
      <p><strong>Pembagian Rapor:</strong> Sabtu, 28 Juni 2026 (14:00 - 16:00 WIB)</p>
      <p><strong>Libur Resmi:</strong> 1 Juli - 31 Agustus 2026</p>
      <p><strong>Kegiatan Pengayaan:</strong> 2 Agustus - 15 Agustus 2026 (Pukul 08:00 - 11:00 WIB)</p>
      <p>Siswa diharapkan tetap menjaga kesehatan dan mengulang pelajaran semasa libur.</p>
    `,
  },
  {
    id: "p-3",
    title: "Kegiatan Ekstrakurikuler Pramuka Wajib Kelas 4-6",
    slug: "ekstrakurikuler-pramuka",
    date: "2026-05-08",
    category: "Kegiatan",
    image: "/images/pramuka.jpg",
    excerpt:
      "Pengumuman mengenai jadwal rutin mingguan dan perlengkapan yang harus dibawa.",
    content: `
      <h2>Ketentuan Ekstrakurikuler Pramuka</h2>
      <p>Pramuka adalah kegiatan ekstrakurikuler yang wajib diikuti bagi semua siswa kelas 4, 5, dan 6.</p>
      <h3>Jadwal & Tempat</h3>
      <ul>
        <li>Hari: Jumat (14:00 - 15:30 WIB)</li>
        <li>Tempat: Lapangan Sekolah</li>
        <li>Pembina: Tim Pramuka SDN 1 Batu Rakit</li>
      </ul>
      <h3>Perlengkapan yang Harus Dibawa</h3>
      <ul>
        <li>Seragam Pramuka Lengkap</li>
        <li>Ikat Kepala</li>
        <li>Tas/Ransel</li>
        <li>Alas Kaki</li>
        <li>Botol Minum</li>
      </ul>
    `,
  },
  {
    id: "p-4",
    title: "Perubahan Jadwal Pembelajaran Daring",
    slug: "perubahan-jadwal-pembelajaran",
    date: "2026-05-15",
    category: "Akademik",
    image: "/images/pembelajaran.jpg",
    excerpt: "Jadwal pembelajaran daring diubah menjadi lebih fleksibel.",
    content: `Pembelajaran daring akan disesuaikan dengan kondisi cuaca lokal.`,
  },
  {
    id: "p-5",
    title: "Undangan Rapat Orang Tua & Komite Sekolah",
    slug: "rapat-orang-tua",
    date: "2026-06-10",
    category: "Penting",
    image: "/images/rapat.jpg",
    excerpt:
      "Kami undang seluruh orang tua siswa untuk menghadiri rapat bersama komite sekolah.",
    content: `Rapat pembahasan program sekolah tahun ajaran mendatang.`,
  },
];

// Data Undangan/Invitation
export const INVITATIONS = [
  {
    id: "u-1",
    title: "Undangan Rapat Komite Sekolah",
    date: "2026-06-20",
    time: "14:00 - 16:00 WIB",
    place: "Ruang Kepala Sekolah",
    description:
      "Mengundang semua anggota Komite Sekolah untuk membahas program kerja tahun ajaran 2026/2027.",
  },
  {
    id: "u-2",
    title: "Undangan Lepas Sambut Kepala Sekolah",
    date: "2026-07-05",
    time: "09:00 - 11:00 WIB",
    place: "Aula Sekolah",
    description:
      "Acara seremonial lepas sambut Kepala Sekolah yang baru dan penutupan tahun ajaran lalu.",
  },
  {
    id: "u-3",
    title: "Undangan Upacara Bendera Hari Pendidikan",
    date: "2026-05-02",
    time: "08:00 WIB",
    place: "Lapangan Upacara",
    description:
      "Upacara bendera dalam memperingati Hari Pendidikan Nasional dengan pelibatan orang tua.",
  },
];

// Data Inovasi/Berita Inovasi
export const INNOVATIONS = [
  {
    id: "i-1",
    title: "Portal Akademik Digital - Transformasi Pendidikan Abad 21",
    slug: "portal-akademik-digital",
    date: "2026-06-01",
    image: "/images/inovasi-digital.jpg",
    excerpt:
      "Kami meluncurkan portal akademik paling modern untuk mendukung pembelajaran hybrid.",
    content: `Inovasi terbaru dalam transformasi digital pendidikan di SDN 1 Batu Rakit.`,
    author: "Kepala Sekolah",
  },
  {
    id: "i-2",
    title: "Program Literasi Digital untuk Guru & Siswa",
    slug: "program-literasi-digital",
    date: "2026-05-20",
    image: "/images/literasi-digital.jpg",
    excerpt:
      "Program pelatihan komprehensif untuk meningkatkan kompetensi digital.",
    content: `Pelatihan intensif literasi digital untuk semua stakeholder sekolah.`,
    author: "Tim Kurikulum",
  },
];

// Data Program
export const PROGRAMS = [
  {
    id: "prog-1",
    title: "Pembelajaran Berbasis Kurikulum Merdeka",
    slug: "pembelajaran",
    icon: "GraduationCap",
    description:
      "Pendekatan pembelajaran yang fleksibel dan berfokus pada materi esensial",
    color: "bg-blue-50 text-blue-600",
    details: `Kurikulum Merdeka membebaskan sekolah untuk mengembangkan pembelajaran yang sesuai dengan konteks dan kebutuhan peserta didik. Kami menerapkan:
      - Pembelajaran berbasis proyek
      - Integrasi nilai-nilai profil pelajar Pancasila
      - Pembelajaran yang berpusat pada siswa
      - Fleksibilitas jam pembelajaran`,
  },
  {
    id: "prog-2",
    title: "Program Beasiswa PIP (Program Indonesia Pintar)",
    slug: "pip",
    icon: "Award",
    description: "Bantuan finansial untuk siswa dari keluarga kurang mampu",
    color: "bg-emerald-50 text-emerald-600",
    details: `Program Indonesia Pintar memberikan bantuan tunai untuk membantu siswa dari keluarga kurang mampu tetap dapat melanjutkan pendidikan. Bantuan diberikan dalam bentuk:
      - Bantuan tunai langsung ke orang tua
      - Dukungan pembelajaran
      - Akses ke layanan pendidikan berkualitas`,
  },
  {
    id: "prog-3",
    title: "Program BOSP (Bantuan Operasional Sekolah Primer)",
    slug: "bosp",
    icon: "Zap",
    description:
      "Dana operasional untuk meningkatkan kualitas pembelajaran dan fasilitas",
    color: "bg-orange-50 text-orange-600",
    details: `BOSP adalah program pemerintah untuk membantu operasional sekolah dalam meningkatkan layanan pendidikan. Dana dialokasikan untuk:
      - Perbaikan dan pemeliharaan sarana prasarana
      - Pengadaan buku dan alat pembelajaran
      - Program pengembangan kompetensi guru
      - Penunjang pembelajaran berkualitas`,
  },
  {
    id: "prog-4",
    title: "Komunitas Belajar (Learning Community)",
    slug: "komunitas-belajar",
    icon: "Users",
    description: "Wadah kolaborasi guru untuk meningkatkan kualitas pengajaran",
    color: "bg-purple-50 text-purple-600",
    details: `Komunitas belajar adalah forum kolaboratif antar guru untuk:
      - Berbagi best practice
      - Mengembangkan bahan ajar bersama
      - Penelitian tindakan kelas
      - Peningkatan kompetensi profesional berkelanjutan`,
  },
  {
    id: "prog-5",
    title: "SPMB (Sistem Penerimaan Murid Baru)",
    slug: "spmb",
    icon: "Users",
    description:
      "Sistem penerimaan siswa baru yang adil, transparan, dan selektif",
    color: "bg-pink-50 text-pink-600",
    details: `SPMB SDN 1 Batu Rakit menggunakan sistem yang fair dan transparan:
      - Pendaftaran online
      - Tes kemampuan akademik
      - Nilai rapor terakhir
      - Wawancara keluarga
      - Pengumuman hasil seleksi`,
  },
  {
    id: "prog-6",
    title: "Program Ekstrakurikuler Lengkap",
    slug: "ekstrakurikuler",
    icon: "Target",
    description:
      "Berbagai kegiatan ekstrakurikuler untuk pengembangan bakat dan minat",
    color: "bg-red-50 text-red-600",
    details: `Ekstrakurikuler wajib dan pilihan untuk mengembangkan potensi siswa:
      - Pramuka (Wajib kelas 4-6)
      - Sepak bola
      - Bulu tangkis
      - Seni tari
      - Seni musik
      - Membaca Al-Qur'an
      - Jurnalistik
      - Robotik dan coding`,
  },
];

// Data Download
export const DOWNLOADS = [
  {
    id: "d-1",
    title: "Formulir Pendaftaran Siswa Baru",
    type: "PDF",
    size: "2.5 MB",
    date: "2026-06-15",
    category: "Formulir",
    url: "#",
  },
  {
    id: "d-2",
    title: "Kebijakan Sekolah Tahun 2026",
    type: "PDF",
    size: "3.1 MB",
    date: "2026-06-01",
    category: "Dokumen Resmi",
    url: "#",
  },
  {
    id: "d-3",
    title: "Panduan Pembelajaran Orang Tua",
    type: "PDF",
    size: "1.8 MB",
    date: "2026-05-20",
    category: "Panduan",
    url: "#",
  },
  {
    id: "d-4",
    title: "Kalender Akademik 2026/2027",
    type: "Excel",
    size: "0.5 MB",
    date: "2026-05-15",
    category: "Kalender",
    url: "#",
  },
  {
    id: "d-5",
    title: "Struktur Kurikulum Merdeka",
    type: "PDF",
    size: "2.8 MB",
    date: "2026-05-10",
    category: "Kurikulum",
    url: "#",
  },
];

// Data JDIH (Jaringan Dokumentasi Informasi Hukum)
export const LEGAL_DOCS = [
  {
    id: "j-1",
    title: "SK Kepala Sekolah Tahun 2026",
    date: "2026-01-15",
    category: "Surat Keputusan",
    description: "Surat Keputusan Kepala Sekolah tentang Penugasan Guru",
    content: "Lampiran lengkap tersedia di kantor sekolah",
  },
  {
    id: "j-2",
    title: "Tata Tertib Siswa SDN 1 Batu Rakit",
    date: "2025-06-01",
    category: "Tata Tertib",
    description:
      "Peraturan dan tata tertib yang harus dipatuhi oleh semua siswa",
    content: "Berlaku efektif sejak tahun ajaran 2025/2026",
  },
  {
    id: "j-3",
    title: "Kode Etik Pendidik",
    date: "2025-06-01",
    category: "Regulasi",
    description: "Standar etika dan profesionalitas pendidik SDN 1 Batu Rakit",
    content: "Wajib dipatuhi oleh semua tenaga pendidik",
  },
  {
    id: "j-4",
    title: "Rencana Kerja Sekolah (RKS) 2026-2027",
    date: "2026-06-01",
    category: "Rencana Strategis",
    description:
      "Rencana kerja tahunan SDN 1 Batu Rakit untuk tahun ajaran 2026/2027",
    content: "Disahkan oleh Kepala Sekolah dan Komite Sekolah",
  },
];

// Data Profil Sekolah
export const SCHOOL_PROFILE = {
  establishment: "Tahun 1976",
  status: "Negeri",
  accreditation: "A (Terakreditasi)",
  totalStudents: "150+",
  totalTeachers: "13",
  totalStaff: "5",
  classrooms: "6",
  facilities: [
    "Ruang Kelas dengan AC",
    "Laboratorium Komputer",
    "Perpustakaan Digital",
    "Kantin Sehat",
    "Mushola",
    "UKS (Unit Kesehatan Sekolah)",
    "Ruang Seni & Musik",
    "Lapangan Olahraga",
  ],
};

// Data Struktur Organisasi
export const ORGANIZATIONAL_STRUCTURE = [
  {
    position: "Kepala Sekolah",
    name: "Raden Irawangsa, S.Pd.",
    qualification: "S1 Pendidikan",
    responsibility: "Pimpinan sekolah dan koordinator utama",
  },
  {
    position: "Wakil Kepala Sekolah",
    name: "Siti Nurhaliza, S.Pd.",
    qualification: "S1 Pendidikan",
    responsibility: "Kurikulum dan pembelajaran",
  },
  {
    position: "Guru Kelas 1",
    name: "Ahmad Rizki, S.Pd.",
    qualification: "S1 Pendidikan",
    responsibility: "Pembelajaran kelas 1",
  },
];

// Data PTK (Pendidik dan Tenaga Kependidikan)
export const PTK_DATA = [
  {
    id: "ptk-1",
    nip: "195503121975041003",
    name: "Raden Irawangsa, S.Pd.",
    position: "Kepala Sekolah",
    qualification: "S1 Pendidikan",
    status: "PNS",
    startYear: 1975,
  },
  {
    id: "ptk-2",
    nip: "196204151982032002",
    name: "Siti Nurhaliza, S.Pd.",
    position: "Guru Kelas",
    qualification: "S1 Pendidikan",
    status: "PNS",
    startYear: 1982,
  },
  {
    id: "ptk-3",
    nip: "197501231998011001",
    name: "Ahmad Rizki, S.Pd.I",
    position: "Guru PAI",
    qualification: "S1 Pendidikan Islam",
    status: "PNS",
    startYear: 1998,
  },
];

// Data Peserta Didik
export const STUDENT_DATA = {
  total: 152,
  byGrade: [
    { grade: "Kelas 1", male: 15, female: 13, total: 28 },
    { grade: "Kelas 2", male: 16, female: 12, total: 28 },
    { grade: "Kelas 3", male: 14, female: 14, total: 28 },
    { grade: "Kelas 4", male: 15, female: 13, total: 28 },
    { grade: "Kelas 5", male: 13, female: 15, total: 28 },
    { grade: "Kelas 6", male: 14, female: 12, total: 26 },
  ],
  byStatus: [
    { status: "Aktif", count: 150 },
    { status: "Pindah", count: 2 },
  ],
};
