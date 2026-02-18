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
  Megaphone,
  Calendar,
  Search,
  ChevronRight,
  BellRing,
  ArrowRight,
} from "lucide-react";

export default function PengumumanPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Data ini nantinya akan diambil dari database via Admin Panel
  const allPengumuman = [
    {
      id: "p-1",
      title: "Sistem Penerimaan Murid Baru (SPMB) Tahun Ajaran 2026/2027",
      date: "1 Juli 2026",
      category: "Penting",
      desc: "Informasi mengenai persyaratan, alur pendaftaran, dan jadwal seleksi calon siswa baru SD Negeri 1 Batu Rakit.",
    },
    {
      id: "p-2",
      title: "Libur Akhir Semester Genap dan Pembagian Rapor",
      date: "28 Juni 2026",
      category: "Akademik",
      desc: "Diberitahukan kepada seluruh orang tua siswa bahwa pembagian rapor akan dilaksanakan pada hari Sabtu mendatang.",
    },
    {
      id: "p-3",
      title: "Kegiatan Ekstrakurikuler Pramuka Wajib Kelas 4-6",
      date: "08 Mei 2026",
      category: "Kegiatan",
      desc: "Pengumuman mengenai jadwal rutin mingguan dan perlengkapan yang harus dibawa oleh peserta didik.",
    },
  ];

  const filteredData = allPengumuman.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* HEADER SECTION */}
      <section className="bg-white border-b py-16 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
          <Megaphone size={300} />
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <Badge className="mb-4 bg-blue-100 text-blue-700 border-none px-4 py-1">
              Pusat Informasi
            </Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Pengumuman{" "}
              <span className="text-blue-600 text-3xl italic font-normal block md:inline">
                Sekolah
              </span>
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed">
              Dapatkan informasi terbaru mengenai kegiatan, kebijakan, dan
              agenda akademik SD Negeri 1 Batu Rakit di sini.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="container mx-auto px-4 max-w-5xl">
        {/* TOOLBAR: SEARCH */}
        <div className="mb-10 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search
              className="absolute left-3 top-3 text-slate-400"
              size={18}
            />
            <Input
              placeholder="Cari pengumuman..."
              className="pl-10 bg-white border-slate-200 h-11 shadow-sm rounded-xl focus:ring-2 focus:ring-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
            <BellRing size={16} className="text-orange-400" />
            {filteredData.length} Pengumuman ditemukan
          </div>
        </div>

        {/* LIST PENGUMUMAN */}
        <div className="grid grid-cols-1 gap-6">
          {filteredData.map((item, index) => (
            <motion.div
              key={item.id} // ID Unik untuk mencegah console error
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white overflow-hidden border-l-4 border-l-transparent hover:border-l-blue-600">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge
                        variant="outline"
                        className="rounded-md border-slate-200 text-slate-500 font-bold uppercase text-[10px]"
                      >
                        {item.category}
                      </Badge>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Calendar size={14} />
                        {item.date}
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                    {item.desc}
                  </p>
                </CardContent>
                <CardFooter className="bg-slate-50/50 px-6 py-3 flex justify-end">
                  <Button
                    variant="ghost"
                    className="text-blue-600 font-bold hover:text-blue-700 hover:bg-transparent group/btn p-0 h-auto"
                  >
                    Baca Selengkapnya
                    <ArrowRight
                      size={16}
                      className="ml-2 transform group-hover/btn:translate-x-1 transition-transform"
                    />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}

          {filteredData.length === 0 && (
            <div className="text-center py-20">
              <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-slate-300" size={32} />
              </div>
              <p className="text-slate-400 font-medium italic">
                Pengumuman tidak ditemukan...
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
