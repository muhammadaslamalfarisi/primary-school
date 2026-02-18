"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Gavel,
  FileCheck,
  Download,
  Scale,
  Info,
  ExternalLink,
  BookOpen,
  History,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

// 1. INTERFACE DATA (Struktur Database JDIH)
interface JDIHDocument {
  id: string;
  nomor: string;
  tahun: string;
  judul: string;
  kategori:
    | "Peraturan Sekolah"
    | "Keputusan Kepala Sekolah"
    | "Instruksi"
    | "Surat Edaran";
  status: "Berlaku" | "Tidak Berlaku";
  tanggalPenetapan: string;
  ukuran: string;
}

export default function JDIHPage() {
  // 2. STATE MANAGEMENT
  const [laws, setLaws] = useState<JDIHDocument[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterKategori, setFilterKategori] = useState("Semua");

  // 3. SIMULASI FETCH DATA (Ready for CRUD Integration)
  useEffect(() => {
    const dummyLaws: JDIHDocument[] = [
      {
        id: "jdih-01",
        nomor: "01/SK/2026",
        tahun: "2026",
        judul: "Peraturan Tata Tertib Siswa dan Etika Berbusana",
        kategori: "Peraturan Sekolah",
        status: "Berlaku",
        tanggalPenetapan: "02 Jan 2026",
        ukuran: "1.4 MB",
      },
      {
        id: "jdih-02",
        nomor: "12/Kep/2025",
        tahun: "2025",
        judul:
          "Keputusan Kepala Sekolah tentang Struktur Organisasi Komunitas Belajar",
        kategori: "Keputusan Kepala Sekolah",
        status: "Berlaku",
        tanggalPenetapan: "15 Des 2025",
        ukuran: "950 KB",
      },
      {
        id: "jdih-03",
        nomor: "05/SE/2026",
        tahun: "2026",
        judul: "Surat Edaran Pelaksanaan Ujian Akhir Semester Genap",
        kategori: "Surat Edaran",
        status: "Berlaku",
        tanggalPenetapan: "10 Feb 2026",
        ukuran: "420 KB",
      },
    ];
    setLaws(dummyLaws);
  }, []);

  // 4. LOGIC FILTERING
  const filteredLaws = laws.filter((item) => {
    const matchesSearch =
      item.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nomor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesKategori =
      filterKategori === "Semua" || item.kategori === filterKategori;
    return matchesSearch && matchesKategori;
  });

  const categories = [
    "Semua",
    "Peraturan Sekolah",
    "Keputusan Kepala Sekolah",
    "Surat Edaran",
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24">
      {/* HERO SECTION */}
      <section className="relative bg-white border-b border-slate-100 py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
          <Scale
            size={400}
            className="absolute -top-20 -right-20 text-indigo-600 rotate-12"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <Badge className="mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none px-3 py-1 text-xs font-bold uppercase tracking-wider">
              Legal & Dokumentasi
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
              Layanan <span className="text-indigo-600">JDIH</span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-2xl">
              Pusat referensi hukum dan produk hukum internal SDN 1 Batu Rakit
              yang transparan, akuntabel, dan mudah diakses.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="container mx-auto px-4 -mt-10 relative z-20 max-w-6xl">
        {/* TOP STATS ARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              label: "Produk Hukum",
              val: laws.length,
              icon: Gavel,
              color: "text-indigo-600",
              bg: "bg-indigo-50",
            },
            {
              label: "Status Aktif",
              val: "100%",
              icon: ShieldCheck,
              color: "text-emerald-600",
              bg: "bg-emerald-50",
            },
            {
              label: "Total Akses",
              val: "1.2k",
              icon: History,
              color: "text-blue-600",
              bg: "bg-blue-50",
            },
          ].map((stat, i) => (
            <Card
              key={i}
              className="border-none shadow-xl shadow-slate-200/50 bg-white rounded-3xl"
            >
              <CardContent className="p-6 flex items-center gap-5">
                <div className={`p-4 ${stat.bg} ${stat.color} rounded-2xl`}>
                  <stat.icon className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
                    {stat.val}
                  </h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* MAIN CONTENT (LEFT) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
              {/* SEARCH & FILTER */}
              <div className="flex flex-col gap-6 mb-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h2 className="text-2xl font-bold text-slate-800">
                    Produk Hukum
                  </h2>
                  <div className="relative w-full md:max-w-sm">
                    <Search className="absolute left-3 top-3 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Cari nomor atau judul peraturan..."
                      className="pl-10 h-11 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilterKategori(cat)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                        filterKategori === cat
                          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* LIST ITEM */}
              <div className="space-y-4">
                {filteredLaws.length > 0 ? (
                  filteredLaws.map((law) => (
                    <div
                      key={law.id}
                      className="group p-5 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all"
                    >
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge
                              variant="outline"
                              className="text-[10px] font-bold border-indigo-200 text-indigo-600"
                            >
                              {law.nomor}
                            </Badge>
                            <Badge className="bg-emerald-50 text-emerald-600 hover:bg-emerald-50 border-none text-[10px] font-bold">
                              {law.status}
                            </Badge>
                          </div>
                          <h4 className="font-bold text-slate-800 text-lg leading-snug group-hover:text-indigo-600 transition-colors">
                            {law.judul}
                          </h4>
                          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                              <BookOpen className="w-3.5 h-3.5 text-indigo-500" />{" "}
                              {law.kategori}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                              <FileCheck className="w-3.5 h-3.5 text-indigo-500" />{" "}
                              Ditetapkan: {law.tanggalPenetapan}
                            </div>
                          </div>
                        </div>
                        <div className="flex md:flex-col justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-xl border-slate-200 text-slate-600 hover:bg-white hover:text-indigo-600 h-10 px-4"
                          >
                            <Download className="w-4 h-4 mr-2" /> {law.ukuran}
                          </Button>
                          <Button
                            size="sm"
                            className="rounded-xl bg-indigo-600 hover:bg-indigo-700 h-10 px-4"
                          >
                            Detail <ChevronRight className="ml-1 w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20">
                    <p className="text-slate-400 font-medium">
                      Tidak ada produk hukum yang ditemukan.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SIDEBAR (RIGHT) */}
          <div className="space-y-6">
            <Card className="border-none bg-indigo-600 rounded-3xl text-white shadow-xl shadow-indigo-100 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Gavel size={120} />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Info className="w-5 h-5" /> Informasi JDIH
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 relative z-10">
                <p className="text-sm text-indigo-50 leading-relaxed">
                  JDIH adalah wadah pendayagunaan bersama atas dokumen hukum
                  secara tertib, terpadu, dan berkesinambungan.
                </p>
                <div className="pt-2">
                  <Button
                    variant="secondary"
                    className="w-full rounded-xl font-bold text-indigo-700 bg-white hover:bg-indigo-50"
                  >
                    SOP Pengajuan <ExternalLink className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-100 rounded-3xl bg-white p-6">
              <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Scale className="w-5 h-5 text-indigo-500" /> Dasar Hukum
              </h4>
              <ul className="space-y-3">
                {[
                  "UU No. 20 Tahun 2003",
                  "Permendikbud Ristek",
                  "Peraturan Daerah No. 4",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between text-sm text-slate-500 font-medium p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer group"
                  >
                    <span>{item}</span>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500" />
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
