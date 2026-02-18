"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Info,
  CheckCircle2,
  CreditCard,
  Users,
  Calendar,
  Download,
  HelpCircle,
  ArrowRight,
  UserCheck,
  ExternalLink,
} from "lucide-react";

// Interface Data (Struktur Database untuk Admin Panel)
interface PenerimaPIP {
  id: string;
  nama: string;
  nisn: string;
  kelas: string;
  tahap: string;
  status: "Cair" | "Proses" | "Belum Aktivasi";
}

export default function PIPPage() {
  // 1. STATE MANAGEMENT
  const [dataPenerima, setDataPenerima] = useState<PenerimaPIP[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // 2. SIMULASI FETCH DATA (Read dari CRUD)
  useEffect(() => {
    const dummyData: PenerimaPIP[] = [
      {
        id: "pip-01",
        nama: "Ahmad Fadhil",
        nisn: "0123456xxx",
        kelas: "Kelas 6A",
        tahap: "Tahap 1 - 2026",
        status: "Cair",
      },
      {
        id: "pip-02",
        nama: "Siti Aminah",
        nisn: "0128876xxx",
        kelas: "Kelas 4B",
        tahap: "Tahap 1 - 2026",
        status: "Proses",
      },
      {
        id: "pip-03",
        nama: "Budi Santoso",
        nisn: "0112233xxx",
        kelas: "Kelas 2A",
        tahap: "Tahap 1 - 2026",
        status: "Belum Aktivasi",
      },
    ];
    setDataPenerima(dummyData);
  }, []);

  // 3. LOGIC FILTERING
  const filteredPenerima = dataPenerima.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nisn.includes(searchQuery),
  );

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24">
      {/* HERO SECTION */}
      <section className="relative bg-white border-b border-slate-100 py-20 overflow-hidden">
        {/* Dekorasi Background Latar */}
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-200 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-violet-100 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <Badge className="mb-4 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-none px-3 py-1 text-xs font-bold uppercase tracking-wider">
              Bantuan Sosial Pendidikan
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
              Program <span className="text-indigo-600">Indonesia Pintar</span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-2xl">
              Komitmen kami memastikan tidak ada anak yang putus sekolah karena
              kendala biaya. Temukan informasi pendaftaran, pengecekan status,
              dan prosedur pencairan dana PIP.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="rounded-full bg-indigo-600 hover:bg-indigo-700 px-8 font-semibold shadow-lg shadow-indigo-100 transition-all"
              >
                Cek Penerima <Search className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                Panduan Aktivasi
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <main className="container mx-auto px-4 -mt-10 relative z-20">
        {/* STATS SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-none shadow-xl shadow-slate-200/50 bg-white rounded-3xl overflow-hidden">
            <CardContent className="p-6 flex items-center gap-5">
              <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl">
                <Users className="w-8 h-8" />
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">
                  Total Penerima
                </p>
                <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
                  124 Siswa
                </h3>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl shadow-slate-200/50 bg-white rounded-3xl overflow-hidden">
            <CardContent className="p-6 flex items-center gap-5">
              <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">
                  Sudah Cair
                </p>
                <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
                  86 Siswa
                </h3>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl shadow-slate-200/50 bg-white rounded-3xl overflow-hidden">
            <CardContent className="p-6 flex items-center gap-5">
              <div className="p-4 bg-orange-50 text-orange-600 rounded-2xl">
                <Calendar className="w-8 h-8" />
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">
                  Tahap Berjalan
                </p>
                <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
                  Tahap 1 - 2026
                </h3>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* SEARCH & LIST (LEFT) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    Daftar Penerima PIP
                  </h2>
                  <p className="text-sm text-slate-500">
                    Gunakan NISN untuk hasil yang lebih akurat.
                  </p>
                </div>
                <div className="relative w-full md:max-w-xs">
                  <Search className="absolute left-3 top-3 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Cari Nama atau NISN..."
                    className="pl-10 h-11 rounded-xl border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                {filteredPenerima.length > 0 ? (
                  filteredPenerima.map((penerima) => (
                    <div
                      key={penerima.id}
                      className="group p-4 rounded-2xl border border-slate-50 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center text-indigo-600 font-bold shadow-sm">
                          <UserCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800">
                            {penerima.nama}
                          </h4>
                          <p className="text-xs text-slate-400 font-medium uppercase">
                            NISN: {penerima.nisn} • {penerima.kelas}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-none pt-3 md:pt-0">
                        <div className="text-right">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                            {penerima.tahap}
                          </p>
                          <Badge
                            className={`mt-1 font-bold ${
                              penerima.status === "Cair"
                                ? "bg-emerald-500"
                                : penerima.status === "Proses"
                                  ? "bg-orange-500"
                                  : "bg-slate-400"
                            }`}
                          >
                            {penerima.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <HelpCircle className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                    <p className="text-slate-500 font-medium">
                      Data tidak ditemukan
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SIDEBAR INFO (RIGHT) */}
          <div className="space-y-6">
            <Card className="border-none bg-indigo-600 rounded-3xl text-white shadow-xl shadow-indigo-100 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
                <CreditCard size={120} />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Info className="w-5 h-5" /> Alur Pencairan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                <div className="space-y-4">
                  {[
                    "Cek daftar penerima di halaman ini.",
                    "Siapkan KTP Orang Tua & KK.",
                    "Aktivasi rekening di Bank BRI terdekat.",
                    "Konfirmasi aktivasi ke Admin Sekolah.",
                    "Dana cair ke rekening SimPel.",
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
                  Unduh SOP Lengkap <Download className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-slate-100 rounded-3xl bg-white p-6">
              <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-500" /> Butuh
                Bantuan?
              </h4>
              <p className="text-sm text-slate-500 mb-6">
                Jika nama siswa tidak tercantum namun memenuhi syarat (punya
                KIP/KKS), silakan hubungi operator sekolah.
              </p>
              <Button
                variant="outline"
                className="w-full rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold mb-4"
              >
                Hubungi Admin PIP <ArrowRight className="ml-2 w-4 h-4" />
              </Button>

              {/* SEKSI BARU: KUNJUNGI SITUS RESMI PIP */}
              <div className="pt-4 border-t border-slate-100">
                <p className="text-[10px] text-slate-400 mb-3 font-bold uppercase tracking-widest">
                  Informasi Pusat
                </p>
                <a
                  href="https://pip.kemendikdasmen.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-indigo-50/50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-xs font-bold">Portal Resmi PIP</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
