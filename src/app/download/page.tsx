"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  FileText,
  Download,
  FileDown,
  Info,
  HelpCircle,
  ArrowRight,
  Clock,
  HardDrive,
  FileArchive,
  Filter,
} from "lucide-react";

// 1. INTERFACE DATA (Struktur Database)
interface DownloadDocument {
  id: string;
  judul: string;
  kategori: "Kurikulum" | "Formulir" | "Peraturan" | "Lainnya";
  ukuran: string;
  tanggal: string;
  ekstensi: string;
  jumlahUnduh: number;
}

export default function DownloadPage() {
  // 2. STATE MANAGEMENT
  const [documents, setDocuments] = useState<DownloadDocument[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  // 3. SIMULASI FETCH DATA (Read dari CRUD)
  useEffect(() => {
    const dummyDocs: DownloadDocument[] = [
      {
        id: "doc-01",
        judul: "Kalender Akademik 2025/2026",
        kategori: "Kurikulum",
        ukuran: "1.2 MB",
        tanggal: "15 Jan 2026",
        ekstensi: "PDF",
        jumlahUnduh: 1240,
      },
      {
        id: "doc-02",
        judul: "Formulir Pendaftaran Siswa Baru",
        kategori: "Formulir",
        ukuran: "850 KB",
        tanggal: "02 Feb 2026",
        ekstensi: "DOCX",
        jumlahUnduh: 567,
      },
      {
        id: "doc-03",
        judul: "Tata Tertib Sekolah Revisi 2026",
        kategori: "Peraturan",
        ukuran: "2.5 MB",
        tanggal: "10 Feb 2026",
        ekstensi: "PDF",
        jumlahUnduh: 890,
      },
      {
        id: "doc-04",
        judul: "Silabus Pembelajaran Kelas 1-6",
        kategori: "Kurikulum",
        ukuran: "5.8 MB",
        tanggal: "12 Feb 2026",
        ekstensi: "ZIP",
        jumlahUnduh: 432,
      },
    ];
    setDocuments(dummyDocs);
  }, []);

  // 4. LOGIC FILTERING
  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = doc.judul
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "Semua" || doc.kategori === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["Semua", "Kurikulum", "Formulir", "Peraturan", "Lainnya"];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24">
      {/* HERO SECTION */}
      <section className="relative bg-white border-b border-slate-100 py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <Badge className="mb-4 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-none px-3 py-1 text-xs font-bold uppercase tracking-wider">
              Pusat Dokumen
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
              Layanan <span className="text-indigo-600">Download</span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-2xl">
              Akses cepat untuk mengunduh dokumen kurikulum, formulir resmi,
              hingga peraturan sekolah SD Negeri 1 Batu Rakit dalam berbagai
              format.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="container mx-auto px-4 -mt-10 relative z-20 max-w-6xl">
        {/* STATS SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-none shadow-xl shadow-slate-200/50 bg-white rounded-3xl overflow-hidden">
            <CardContent className="p-6 flex items-center gap-5">
              <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl">
                <FileArchive className="w-7 h-7" />
              </div>
              <div>
                <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">
                  Total File
                </p>
                <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
                  {documents.length} Dokumen
                </h3>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl shadow-slate-200/50 bg-white rounded-3xl overflow-hidden">
            <CardContent className="p-6 flex items-center gap-5">
              <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
                <FileDown className="w-7 h-7" />
              </div>
              <div>
                <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">
                  Total Download
                </p>
                <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
                  3,129 Kali
                </h3>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl shadow-slate-200/50 bg-white rounded-3xl overflow-hidden">
            <CardContent className="p-6 flex items-center gap-5">
              <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl">
                <Clock className="w-7 h-7" />
              </div>
              <div>
                <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">
                  Pembaruan Terakhir
                </p>
                <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
                  Hari Ini
                </h3>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* SEARCH & DOCUMENTS (LEFT) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
              {/* TOOLBAR */}
              <div className="flex flex-col gap-6 mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h2 className="text-2xl font-bold text-slate-800">
                    Daftar Berkas
                  </h2>
                  <div className="relative w-full md:max-w-xs">
                    <Search className="absolute left-3 top-3 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Cari nama dokumen..."
                      className="pl-10 h-11 rounded-xl border-slate-200 bg-slate-50/50"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* CATEGORY FILTER */}
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-2 mr-2 text-slate-400">
                    <Filter className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">
                      Filter:
                    </span>
                  </div>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                        activeCategory === cat
                          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* DOCUMENTS LIST */}
              <div className="space-y-4">
                {filteredDocs.length > 0 ? (
                  filteredDocs.map((doc) => (
                    <div
                      key={doc.id}
                      className="group p-4 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-indigo-600 font-bold shadow-sm">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">
                            {doc.judul}
                          </h4>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                            <span className="text-xs font-bold text-indigo-500 uppercase">
                              {doc.kategori}
                            </span>
                            <span className="text-[11px] text-slate-400 flex items-center gap-1">
                              <HardDrive className="w-3 h-3" /> {doc.ukuran}
                            </span>
                            <span className="text-[11px] text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {doc.tanggal}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="outline"
                          className="hidden sm:flex border-slate-200 text-slate-500 font-bold"
                        >
                          {doc.ekstensi}
                        </Badge>
                        <Button className="rounded-xl bg-indigo-600 hover:bg-indigo-700 h-10 px-4 shadow-sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20">
                    <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <HelpCircle className="w-8 h-8 text-slate-300" />
                    </div>
                    <p className="text-slate-500 font-medium">
                      Dokumen tidak ditemukan
                    </p>
                    <Button
                      variant="link"
                      onClick={() => {
                        setSearchQuery("");
                        setActiveCategory("Semua");
                      }}
                      className="text-indigo-600"
                    >
                      Reset Pencarian
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SIDEBAR (RIGHT) */}
          <div className="space-y-6">
            <Card className="border-none bg-indigo-600 rounded-3xl text-white shadow-xl shadow-indigo-100 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <FileDown size={140} />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Info className="w-5 h-5" /> Bantuan Download
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                <div className="space-y-4">
                  {[
                    "Pilih kategori dokumen yang sesuai.",
                    "Gunakan fitur cari jika nama berkas spesifik.",
                    "Pastikan Anda memiliki aplikasi pembuka PDF.",
                    "Hubungi admin jika link rusak.",
                  ].map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-sm text-indigo-50">{step}</p>
                    </div>
                  ))}
                </div>
                <Button
                  variant="secondary"
                  className="w-full rounded-xl font-bold text-indigo-700 bg-white hover:bg-indigo-50"
                >
                  Panduan Lengkap <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-slate-100 rounded-3xl bg-white p-6">
              <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-500" /> Dokumen
                Hilang?
              </h4>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                Jika Anda memerlukan dokumen tertentu yang tidak tersedia di
                sini, silakan ajukan permintaan ke Operator Sekolah.
              </p>
              <Button
                variant="outline"
                className="w-full rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
              >
                Hubungi Admin <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
