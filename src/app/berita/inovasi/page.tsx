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
import { Lightbulb, Search, ArrowRight, Rocket, Zap, Cpu } from "lucide-react";

export default function InovasiPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const allInovasi = [
    {
      id: "inv-001",
      title: "Pemanfaatan Panel Surya untuk Laboratorium Komputer",
      category: "Teknologi",
      date: "14 Februari 2026",
      author: "Tim IT Sekolah",
      description:
        "Implementasi energi terbarukan untuk mendukung operasional perangkat IT sekolah secara mandiri dan ramah lingkungan.",
      impact: "Efisiensi energi 30%",
    },
    {
      id: "inv-002",
      title: "Sistem Aquaponik Cerdas Berbasis IoT",
      category: "Lingkungan",
      date: "10 Februari 2026",
      author: "Ekskul Sains",
      description:
        "Integrasi budidaya ikan dan sayuran dengan sensor kelembapan otomatis yang dapat dipantau melalui smartphone.",
      impact: "Edukasi Berkelanjutan",
    },
    {
      id: "inv-003",
      title: "Aplikasi Perpustakaan Digital 'Batu Rakit Reading'",
      category: "Literasi",
      date: "05 Februari 2026",
      author: "Pustakawan",
      description:
        "Memudahkan siswa meminjam e-book dan melihat katalog buku fisik hanya dengan memindai QR Code di kartu pelajar.",
      impact: "Meningkatkan Minat Baca",
    },
  ];

  const filteredInovasi = allInovasi.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* HEADER SECTION */}
      <section className="relative overflow-hidden border-b bg-white py-16 mb-12">
        <div className="absolute top-0 right-0 p-20 opacity-[0.03] pointer-events-none rotate-12">
          <Lightbulb size={400} />
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <Badge className="mb-4 border-none bg-indigo-100 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-indigo-700 hover:bg-indigo-100">
              Kreativitas & Masa Depan
            </Badge>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              Ruang <span className="text-indigo-600">Inovasi</span>
            </h1>
            <p className="text-lg leading-relaxed text-slate-500">
              Kumpulan terobosan, proyek kreatif, dan pemanfaatan teknologi di
              lingkungan SD Negeri 1 Batu Rakit.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="container mx-auto max-w-6xl px-4">
        {/* TOOLBAR */}
        <div className="mb-10 flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* PERBAIKAN: Menggunakan w-md daripada w-[450px] untuk menghindari peringatan kuning */}
          <div className="relative w-full md:max-w-md">
            <Search
              className="absolute left-4 top-3.5 text-slate-400"
              size={20}
            />
            <Input
              placeholder="Cari inovasi atau kategori..."
              className="h-12 rounded-2xl border-slate-200 bg-white pl-12 text-base shadow-sm transition-all focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-indigo-500 text-[10px] font-bold text-white"
                >
                  {i}
                </div>
              ))}
            </div>
            <p className="text-sm font-semibold tracking-tight text-slate-600">
              {filteredInovasi.length} Inovasi Terbaru
            </p>
          </div>
        </div>

        {/* GRID INOVASI */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredInovasi.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group flex h-full flex-col overflow-hidden rounded-3xl border-none bg-white shadow-sm transition-all duration-500 hover:shadow-2xl">
                <CardHeader className="pb-4">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="rounded-2xl bg-indigo-50 p-3 text-indigo-600 transition-colors duration-300 group-hover:bg-indigo-600 group-hover:text-white">
                      {item.category === "Teknologi" && <Cpu size={24} />}
                      {item.category === "Lingkungan" && <Zap size={24} />}
                      {item.category === "Literasi" && <Rocket size={24} />}
                    </div>
                    <Badge
                      variant="outline"
                      className="border-slate-100 font-medium text-slate-400"
                    >
                      {item.date}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold leading-tight text-slate-800 transition-colors group-hover:text-indigo-600">
                    {item.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1">
                  <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-slate-500">
                    {item.description}
                  </p>
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <p className="mb-1 text-[10px] font-bold uppercase text-slate-400">
                      Dampak Inovasi
                    </p>
                    <p className="text-sm font-bold text-indigo-600">
                      {item.impact}
                    </p>
                  </div>
                </CardContent>

                <CardFooter className="flex items-center justify-between border-t border-slate-50 bg-slate-50/30 p-6">
                  <span className="flex items-center gap-1 text-xs font-medium text-slate-400">
                    By: <span className="text-slate-600">{item.author}</span>
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="group/btn rounded-full hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    Detail{" "}
                    <ArrowRight
                      size={14}
                      className="ml-1 transition-transform transform group-hover/btn:translate-x-1"
                    />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
