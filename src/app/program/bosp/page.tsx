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
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  FileText,
  ShieldCheck,
  ArrowUpRight,
  DollarSign,
  Calendar,
  PieChart,
  ClipboardCheck,
  Download,
  ExternalLink,
} from "lucide-react";

// Interface untuk Data Transparansi BOSP
interface DanaBOSP {
  id: string;
  item: string;
  category: "Sarana" | "Gaji" | "Kegiatan" | "Lainnya";
  amount: number;
  date: string;
  status: "Terealisasi" | "Direncanakan";
}

export default function BOSPPage() {
  const [dataDana, setDataDana] = useState<DanaBOSP[]>([]);

  useEffect(() => {
    // Simulasi data untuk CRUD Read
    const dummyData: DanaBOSP[] = [
      {
        id: "bosp-01",
        item: "Pengadaan Laptop ChromeBook",
        category: "Sarana",
        amount: 45000000,
        date: "12 Jan 2026",
        status: "Terealisasi",
      },
      {
        id: "bosp-02",
        item: "Honor GTT & PTT Triwulan I",
        category: "Gaji",
        amount: 28000000,
        date: "05 Feb 2026",
        status: "Terealisasi",
      },
      {
        id: "bosp-03",
        item: "Lomba FLS2N Tingkat Kabupaten",
        category: "Kegiatan",
        amount: 12500000,
        date: "20 Mar 2026",
        status: "Direncanakan",
      },
    ];
    setDataDana(dummyData);
  }, []);

  // Formatter Mata Uang
  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24">
      {/* HERO SECTION */}
      <section className="relative bg-white border-b border-slate-100 py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 skew-x-12 translate-x-20 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <Badge className="mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none px-3 py-1 text-xs font-bold uppercase tracking-wider">
              Akuntabilitas & Transparansi
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
              Program <span className="text-emerald-600">BOSP</span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-2xl">
              Pengelolaan Bantuan Operasional Satuan Pendidikan yang terbuka dan
              tepat sasaran untuk mendukung operasional serta peningkatan mutu
              pendidikan di SDN 1 Batu Rakit.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="rounded-full bg-emerald-600 hover:bg-emerald-700 px-8 font-semibold shadow-lg shadow-emerald-100 transition-all"
              >
                Laporan Tahunan <Download className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 border-slate-200 text-slate-600"
              >
                RKAS Sekolah
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <main className="container mx-auto px-4 -mt-10 relative z-20">
        {/* TOP STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-none shadow-xl shadow-slate-200/50 bg-white rounded-3xl overflow-hidden">
            <div className="h-2 bg-emerald-500 w-full" />
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <Badge
                  variant="outline"
                  className="text-emerald-600 border-emerald-200"
                >
                  Tahap 1
                </Badge>
              </div>
              <p className="text-slate-500 text-sm font-medium">
                Realisasi Anggaran
              </p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">72.4%</h3>
              <Progress value={72} className="h-2 mt-4 bg-slate-100" />
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl shadow-slate-200/50 bg-white rounded-3xl overflow-hidden">
            <div className="h-2 bg-blue-500 w-full" />
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <Badge
                  variant="outline"
                  className="text-blue-600 border-blue-200"
                >
                  2026
                </Badge>
              </div>
              <p className="text-slate-500 text-sm font-medium">Status Audit</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">
                WTP (Clean)
              </h3>
              <p className="text-xs text-slate-400 mt-4 flex items-center gap-1">
                <ClipboardCheck className="w-3 h-3" /> Terverifikasi Inspektorat
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl shadow-slate-200/50 bg-white rounded-3xl overflow-hidden">
            <div className="h-2 bg-orange-500 w-full" />
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl">
                  <PieChart className="w-6 h-6" />
                </div>
              </div>
              <p className="text-slate-500 text-sm font-medium">Fokus Utama</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">
                Digitalisasi
              </h3>
              <p className="text-sm text-slate-500 mt-4">
                Peningkatan sarana TIK sekolah.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: RECENT REALIZATION */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">
                Realisasi Penggunaan
              </h2>
              <Button
                variant="ghost"
                className="text-emerald-600 font-semibold hover:bg-emerald-50"
              >
                Lihat Semua <ArrowUpRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {dataDana.map((data) => (
                <motion.div
                  key={data.id}
                  whileHover={{ x: 5 }}
                  className="transition-all"
                >
                  <Card className="border border-slate-100 shadow-sm bg-white rounded-2xl overflow-hidden">
                    <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                          <DollarSign className="w-6 h-6 text-emerald-500" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800">
                            {data.item}
                          </h4>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                              <Calendar className="w-3 h-3" /> {data.date}
                            </span>
                            <Badge className="h-5 text-[10px] bg-slate-100 text-slate-600 hover:bg-slate-100 border-none">
                              {data.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right w-full sm:w-auto border-t sm:border-none pt-3 sm:pt-0">
                        <p className="text-lg font-bold text-slate-900">
                          {formatIDR(data.amount)}
                        </p>
                        <p
                          className={`text-[10px] font-bold uppercase tracking-wider ${data.status === "Terealisasi" ? "text-emerald-500" : "text-orange-500"}`}
                        >
                          ● {data.status}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT: INFO SIDEBAR */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">
              Informasi BOSP
            </h2>
            <Card className="bg-emerald-600 border-none rounded-3xl text-white shadow-xl shadow-emerald-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <FileText className="w-5 h-5" /> Komponen Penggunaan
                </CardTitle>
                <CardDescription className="text-emerald-100">
                  Berdasarkan Permendikbudristek No. 63 Tahun 2023.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "Penerimaan Peserta Didik Baru",
                  "Pengembangan Perpustakaan",
                  "Kegiatan Pembelajaran & Ekskul",
                  "Administrasi Kegiatan Sekolah",
                  "Pemeliharaan Sarana & Prasarana",
                ].map((info, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <div className="mt-1 bg-emerald-400 rounded-full p-0.5">
                      <ArrowUpRight className="w-3 h-3 text-emerald-900" />
                    </div>
                    <span className="text-emerald-50">{info}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border border-slate-100 rounded-3xl bg-white p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">
                    Layanan Aduan
                  </h4>
                  <p className="text-xs text-slate-500">
                    Laporkan penyalahgunaan dana BOSP.
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 font-bold mb-4"
              >
                Hubungi Kami
              </Button>

              {/* SEKSI TAMBAHAN: SITUS RESMI BOSP */}
              <div className="pt-4 border-t border-slate-100">
                <p className="text-[10px] text-slate-400 mb-3 font-bold uppercase tracking-widest">
                  Informasi Pusat
                </p>
                <a
                  href="https://bosp.kemendikdasmen.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-xs font-bold">Portal Resmi BOSP</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
                  Pantau penyaluran dana secara nasional melalui portal
                  Kemdikbudristek.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
