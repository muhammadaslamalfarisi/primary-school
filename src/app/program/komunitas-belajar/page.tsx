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
  Users,
  Search,
  ArrowRight,
  MessageSquare,
  Sparkles,
  BookOpen,
  Calendar,
  Bookmark,
} from "lucide-react";

// Interface agar struktur data konsisten saat di-CRUD
interface Komunitas {
  id: string;
  title: string;
  focus: string;
  members: string;
  schedule: string;
  category: "Guru" | "Siswa" | "Umum";
  color: string;
  bgColor: string;
}

export default function KomunitasBelajarPage() {
  // 1. STATE UNTUK DATA (Siap diisi dari API Admin Panel)
  const [komunitas, setKomunitas] = useState<Komunitas[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // 2. SIMULASI FETCH DATA (Nanti diganti dengan fetch/axios ke database)
  useEffect(() => {
    const dataDummy: Komunitas[] = [
      {
        id: "kb-01",
        title: "Komunitas Literasi Digital",
        focus: "Pemanfaatan AI dalam Pembelajaran",
        members: "12 Anggota Aktif",
        schedule: "Setiap Kamis",
        category: "Guru",
        color: "text-orange-600",
        bgColor: "bg-orange-50",
      },
      {
        id: "kb-02",
        title: "Kelompok Kerja Guru (KKG)",
        focus: "Pengembangan Kurikulum Merdeka",
        members: "18 Anggota Aktif",
        schedule: "Setiap Sabtu Pertama",
        category: "Guru",
        color: "text-blue-600",
        bgColor: "bg-blue-50",
      },
      {
        id: "kb-03",
        title: "Klub Sains Inovatif",
        focus: "Praktikum Sains Kreatif & Lingkungan",
        members: "8 Anggota Aktif",
        schedule: "Selasa Sore",
        category: "Siswa",
        color: "text-emerald-600",
        bgColor: "bg-emerald-50",
      },
    ];
    setKomunitas(dataDummy);
  }, []);

  // 3. LOGIKA FILTER (Pencarian Real-time)
  const filteredKomunitas = komunitas.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.focus.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-white border-b py-20 mb-12">
        <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none">
          <Users size={400} />
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <Badge className="mb-6 border-none bg-orange-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-orange-700 hover:bg-orange-100">
              Kolaborasi & Inovasi
            </Badge>
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
              Komunitas <span className="text-orange-600">Belajar</span>
            </h1>
            <p className="text-lg leading-relaxed text-slate-500 mb-8">
              Wadah kolaborasi antar pendidik untuk berbagi praktik baik,
              mendiskusikan tantangan, dan menciptakan solusi pembelajaran yang
              kreatif.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-orange-600 hover:bg-orange-700 rounded-full px-8 shadow-lg shadow-orange-100 transition-all hover:scale-105"
              >
                Gabung Sekarang <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <main className="container mx-auto max-w-6xl px-4">
        {/* TOOLBAR: Search & Info */}
        <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="relative w-full md:max-w-md">
            <Search
              className="absolute left-4 top-3.5 text-slate-400"
              size={18}
            />
            <Input
              placeholder="Cari komunitas atau topik..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 rounded-2xl border-slate-200 bg-white pl-12 shadow-sm focus:ring-2 focus:ring-orange-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-6 bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Aktif
              </p>
              <p className="text-sm font-bold text-slate-700">
                {filteredKomunitas.length} Komunitas
              </p>
            </div>
            <div className="w-px h-8 bg-slate-100" />
            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Total
              </p>
              <p className="text-sm font-bold text-slate-700">45 Anggota</p>
            </div>
          </div>
        </div>

        {/* COMMUNITY GRID */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredKomunitas.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group flex h-full flex-col overflow-hidden rounded-3xl border-none bg-white shadow-sm hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="mb-6 flex items-start justify-between">
                    <div
                      className={`rounded-2xl ${item.bgColor} ${item.color} p-4 transition-transform group-hover:scale-110 duration-300`}
                    >
                      {item.id === "kb-01" ? (
                        <Sparkles size={24} />
                      ) : item.id === "kb-02" ? (
                        <Users size={24} />
                      ) : (
                        <BookOpen size={24} />
                      )}
                    </div>
                    <Badge
                      variant="secondary"
                      className="rounded-lg text-[10px] uppercase font-bold tracking-tighter"
                    >
                      {item.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-bold tracking-tight text-slate-800 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-sm font-medium text-slate-500 leading-relaxed line-clamp-2">
                    Fokus: {item.focus}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 pt-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-slate-600">
                      <Users size={18} className="text-slate-400" />
                      <span className="text-sm font-medium">
                        {item.members}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <Calendar size={18} className="text-slate-400" />
                      <span className="text-sm font-medium">
                        {item.schedule}
                      </span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex items-center gap-2 border-t border-slate-50 p-6 bg-slate-50/30">
                  <Button className="w-full rounded-xl bg-white border border-slate-200 text-slate-700 shadow-sm hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all font-bold py-5">
                    Detail Komunitas
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-xl border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200 py-5 px-6 shrink-0"
                  >
                    <MessageSquare size={20} />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* EMPTY STATE (Muncul jika hasil pencarian kosong) */}
        {filteredKomunitas.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <Search size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500 font-medium">
              Tidak ada komunitas yang ditemukan.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
