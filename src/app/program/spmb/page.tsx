"use client";

import React from "react";
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
import {
  UserPlus,
  FileText,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Download,
  Info,
  HelpCircle,
} from "lucide-react";

export default function SPMBPage() {
  // Data ini nantinya dikelola melalui Admin Panel (CRUD)
  const jadwalKegiatan = [
    {
      id: "jdw-1",
      kegiatan: "Pendaftaran Online",
      tanggal: "01 - 15 Juni 2026",
      status: "Mendatang",
    },
    {
      id: "jdw-2",
      kegiatan: "Verifikasi Berkas",
      tanggal: "16 - 20 Juni 2026",
      status: "Mendatang",
    },
    {
      id: "jdw-3",
      kegiatan: "Pengumuman Hasil",
      tanggal: "25 Juni 2026",
      status: "Mendatang",
    },
    {
      id: "jdw-4",
      kegiatan: "Daftar Ulang",
      tanggal: "26 - 30 Juni 2026",
      status: "Mendatang",
    },
  ];

  const persyaratan = [
    "Berusia minimal 6 tahun pada tanggal 1 Juli 2026",
    "Fotocopy Akta Kelahiran (2 Lembar)",
    "Fotocopy Kartu Keluarga (2 Lembar)",
    "Fotocopy Ijazah TK/PAUD (Jika ada)",
    "Pas Foto 3x4 latar belakang merah (4 lembar)",
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* HEADER SECTION */}
      <section className="relative overflow-hidden border-b bg-white py-16 mb-12">
        <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
          <UserPlus size={400} />
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <Badge className="mb-4 border-none bg-blue-100 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-700 hover:bg-blue-100">
              Penerimaan Siswa Baru 2026/2027
            </Badge>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              Sistem Penerimaan{" "}
              <span className="text-blue-600">Murid Baru</span>
            </h1>
            <p className="text-lg leading-relaxed text-slate-500">
              Selamat datang calon siswa-siswi cerdas masa depan. Bergabunglah
              bersama keluarga besar SD Negeri 1 Batu Rakit melalui proses
              seleksi yang transparan dan akuntabel.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 rounded-full px-8 shadow-lg shadow-blue-100"
              >
                Daftar Sekarang <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                Panduan Pendaftaran <Download className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <main className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* KOLOM KIRI: Persyaratan & Alur */}
          <div className="lg:col-span-2 space-y-8">
            {/* Persyaratan */}
            <Card className="rounded-3xl border-none shadow-sm overflow-hidden">
              <CardHeader className="bg-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                    <FileText size={24} />
                  </div>
                  <CardTitle className="text-xl">
                    Persyaratan Pendaftaran
                  </CardTitle>
                </div>
                <CardDescription>
                  Mohon lengkapi seluruh dokumen pendukung berikut untuk proses
                  verifikasi.
                </CardDescription>
              </CardHeader>
              <CardContent className="bg-white">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {persyaratan.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-600"
                    >
                      <CheckCircle2 className="mt-1 h-5 w-5 text-emerald-500 shrink-0" />
                      <span className="text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Alur Pendaftaran - Menggunakan Grid Card untuk menghindari Garis Kuning Pseudo-element */}
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                  <HelpCircle size={24} />
                </div>
                Alur Pendaftaran Online
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    step: "01",
                    title: "Registrasi Akun",
                    desc: "Orang tua murid membuat akun di portal resmi SPMB.",
                  },
                  {
                    step: "02",
                    title: "Pengisian Formulir",
                    desc: "Melengkapi data diri siswa dan data wali secara lengkap.",
                  },
                  {
                    step: "03",
                    title: "Upload Berkas",
                    desc: "Mengunggah hasil scan dokumen persyaratan asli.",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-300 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mb-4 shadow-md group-hover:scale-110 transition-transform">
                      {item.step}
                    </div>
                    <h4 className="font-bold text-slate-800 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: Jadwal & Kontak */}
          <div className="space-y-8">
            {/* Jadwal Penting */}
            <Card className="rounded-3xl border-none shadow-sm bg-slate-900 text-white overflow-hidden">
              <CardHeader className="bg-blue-600 border-none">
                <div className="flex items-center gap-3">
                  <Calendar size={20} />
                  <CardTitle className="text-lg">Jadwal Penting</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6 bg-slate-900">
                <div className="space-y-6">
                  {jadwalKegiatan.map((item) => (
                    <div
                      key={item.id}
                      className="relative pl-6 py-1 border-l-2 border-blue-500/30"
                    >
                      <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">
                        {item.tanggal}
                      </p>
                      <p className="font-semibold text-slate-100 text-sm">
                        {item.kegiatan}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <Info className="text-blue-400 shrink-0" size={18} />
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Jadwal sewaktu-waktu dapat berubah sesuai instruksi Dinas
                    Pendidikan.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Bantuan */}
            <Card className="rounded-3xl border-dashed border-2 border-slate-200 bg-transparent shadow-none">
              <CardContent className="pt-6 text-center">
                <div className="mx-auto w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                  <HelpCircle className="text-blue-600" />
                </div>
                <h4 className="font-bold text-slate-800 mb-2">
                  Butuh Bantuan?
                </h4>
                <p className="text-xs text-slate-500 mb-6">
                  Hubungi panitia kami jika mengalami kendala pendaftaran.
                </p>
                <Button
                  variant="outline"
                  className="w-full rounded-xl border-slate-200 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  Hubungi Helpdesk
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
