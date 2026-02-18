"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MailOpen,
  Calendar,
  MapPin,
  Clock,
  Search,
  ArrowRight,
  Info,
} from "lucide-react";

export default function UndanganPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock Data: Nantinya ditarik dari Database lewat Admin Panel
  const allUndangan = [
    {
      id: "und-1",
      title: "Rapat Pleno Komite & Orang Tua Murid Kelas 6",
      date: "25 Mei 2024",
      time: "08:00 - 11:00 WITA",
      location: "Aula Serbaguna SD Negeri 1 Batu Rakit",
      status: "Penting",
      excerpt:
        "Membahas persiapan ujian akhir dan perpisahan siswa-siswi kelas 6 tahun ajaran 2023/2024.",
    },
    {
      id: "und-2",
      title: "Undangan Pentas Seni & Kreativitas Siswa",
      date: "01 Juni 2024",
      time: "09:00 WITA - Selesai",
      location: "Halaman Utama Sekolah",
      status: "Terbuka",
      excerpt:
        "Menampilkan bakat seni tari, musik, dan pameran karya tangan seluruh siswa SDN 1 Batu Rakit.",
    },
    {
      id: "und-3",
      title: "Sosialisasi Program Imunisasi Anak Sekolah (BIAS)",
      date: "12 Juni 2024",
      time: "08:30 WITA",
      location: "Ruang Kelas 1A & 1B",
      status: "Khusus",
      excerpt:
        "Pertemuan khusus orang tua siswa kelas 1 mengenai jadwal dan teknis pelaksanaan imunisasi.",
    },
  ];

  const filteredUndangan = allUndangan.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* HEADER SECTION */}
      <section className="bg-white border-b py-16 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-[0.03] pointer-events-none">
          <MailOpen size={350} />
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <Badge className="mb-4 bg-emerald-100 text-emerald-700 border-none px-4 py-1 hover:bg-emerald-100">
              Agenda & Kegiatan
            </Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Daftar <span className="text-emerald-600">Undangan</span>
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed">
              Informasi pertemuan resmi, rapat komite, dan berbagai kegiatan
              undangan bagi wali murid serta tamu undangan SD Negeri 1 Batu
              Rakit.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="container mx-auto px-4 max-w-5xl">
        {/* SEARCH & FILTER TOOLBAR */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search
              className="absolute left-3 top-3 text-slate-400"
              size={18}
            />
            <Input
              placeholder="Cari judul undangan..."
              className="pl-10 bg-white border-slate-200 h-11 shadow-sm rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400 font-medium bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
            <Info size={16} className="text-emerald-500" />
            {filteredUndangan.length} Undangan Aktif
          </div>
        </div>

        {/* LIST UNDANGAN */}
        <div className="grid grid-cols-1 gap-6">
          {filteredUndangan.map((item, index) => (
            <motion.div
              key={item.id} // ID Unik untuk mencegah key error
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="group border-none shadow-sm hover:shadow-md transition-all duration-300 bg-white overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Bagian Tanggal (Kiri) */}
                  <div className="md:w-48 bg-emerald-50 flex flex-col items-center justify-center p-6 border-r border-emerald-100/50">
                    <Calendar className="text-emerald-600 mb-2" size={24} />
                    <span className="text-sm font-bold text-emerald-700 text-center uppercase tracking-wider leading-tight">
                      {item.date}
                    </span>
                  </div>

                  {/* Bagian Isi (Kanan) */}
                  <div className="flex-1 p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge
                        variant="secondary"
                        className="bg-slate-100 text-slate-600 hover:bg-slate-200 border-none text-[10px] font-bold"
                      >
                        {item.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-800 mb-4 group-hover:text-emerald-600 transition-colors leading-snug">
                      {item.title}
                    </CardTitle>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Clock size={16} className="text-slate-400" />
                        {item.time}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <MapPin size={16} className="text-slate-400" />
                        {item.location}
                      </div>
                    </div>

                    <p className="text-slate-500 text-sm leading-relaxed mb-6 italic">
                      "{item.excerpt}"
                    </p>

                    <div className="flex justify-between items-center border-t pt-4 border-slate-50">
                      <Button
                        variant="link"
                        className="text-emerald-600 p-0 h-auto font-bold group/btn"
                      >
                        Detail Undangan
                        <ArrowRight
                          size={16}
                          className="ml-2 transform group-hover/btn:translate-x-1 transition-transform"
                        />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-slate-900 hover:bg-emerald-600 text-white transition-colors"
                      >
                        Download PDF
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}

          {filteredUndangan.length === 0 && (
            <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200">
              <MailOpen className="mx-auto text-slate-200 mb-4" size={64} />
              <p className="text-slate-400 font-medium">
                Belum ada undangan yang sesuai dengan pencarian Anda.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
