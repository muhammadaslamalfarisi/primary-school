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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Trophy,
  Music,
  Palette,
  Search,
  ArrowRight,
  CalendarDays,
  User,
  MapPin,
  Heart,
  Star,
  Activity,
} from "lucide-react";

// Interface Data (Schema Database untuk Admin Panel nanti)
interface Ekstrakurikuler {
  id: string;
  name: string;
  category: "Olahraga" | "Seni" | "Keagamaan" | "Akademik";
  schedule: string;
  location: string;
  coach: string;
  description: string;
  status: "Buka" | "Penuh";
  color: string; // Tailwind color class untuk styling dinamis
  icon: React.ReactNode;
}

export default function EkstrakurikulerPage() {
  // 1. STATE MANAGEMENT (CRUD READY)
  const [dataEkskul, setDataEkskul] = useState<Ekstrakurikuler[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  // 2. SIMULASI FETCH DATA
  useEffect(() => {
    // Data ini nanti diambil dari API database Anda
    const dummyData: Ekstrakurikuler[] = [
      {
        id: "eks-01",
        name: "Pramuka Inti",
        category: "Akademik",
        schedule: "Jumat, 15:00",
        location: "Lapangan Utama",
        coach: "Kak Budi",
        description:
          "Membentuk karakter disiplin, mandiri, dan cinta alam melalui kegiatan kepramukaan.",
        status: "Buka",
        color: "text-orange-600 bg-orange-50",
        icon: <Star className="w-6 h-6" />,
      },
      {
        id: "eks-02",
        name: "Futsal Junior",
        category: "Olahraga",
        schedule: "Sabtu, 08:00",
        location: "GOR Sekolah",
        coach: "Pak Rian",
        description:
          "Melatih ketangkasan fisik, kerjasama tim, dan strategi permainan bola.",
        status: "Buka",
        color: "text-blue-600 bg-blue-50",
        icon: <Trophy className="w-6 h-6" />,
      },
      {
        id: "eks-03",
        name: "Seni Tari Tradisional",
        category: "Seni",
        schedule: "Rabu, 14:00",
        location: "Aula Serbaguna",
        coach: "Ibu Sinta",
        description:
          "Melestarikan budaya lokal melalui gerak tari yang indah dan bermakna.",
        status: "Buka",
        color: "text-pink-600 bg-pink-50",
        icon: <Music className="w-6 h-6" />,
      },
      {
        id: "eks-04",
        name: "Tahfidz Al-Qur'an",
        category: "Keagamaan",
        schedule: "Senin & Kamis, 16:00",
        location: "Musholla Sekolah",
        coach: "Ustadz Hidayat",
        description:
          "Program hafalan Al-Qur'an juz 30 dengan metode murojaah yang menyenangkan.",
        status: "Penuh",
        color: "text-emerald-600 bg-emerald-50",
        icon: <Heart className="w-6 h-6" />,
      },
      {
        id: "eks-05",
        name: "Melukis & Kriya",
        category: "Seni",
        schedule: "Selasa, 14:00",
        location: "Ruang Seni",
        coach: "Pak Dedi",
        description:
          "Mengembangkan imajinasi dan kreativitas siswa melalui warna dan kerajinan tangan.",
        status: "Buka",
        color: "text-purple-600 bg-purple-50",
        icon: <Palette className="w-6 h-6" />,
      },
    ];
    setDataEkskul(dummyData);
  }, []);

  // 3. LOGIC FILTERING
  const filteredData = dataEkskul.filter((item) => {
    const matchSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchCategory =
      activeCategory === "Semua" ? true : item.category === activeCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24">
      {/* HERO SECTION */}
      <section className="relative bg-white border-b border-slate-100 py-20 overflow-hidden">
        {/* Dekorasi Latar Belakang (Standard CSS classes) */}
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Activity size={320} />
        </div>
        <div className="absolute -left-20 top-20 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-30 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-200 border-none px-3 py-1 text-xs font-bold uppercase tracking-wider">
              Bakat & Minat Siswa
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
              Ekstrakurikuler <span className="text-orange-600">Sekolah</span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-2xl">
              Kami percaya setiap anak memiliki potensi unik. Temukan berbagai
              kegiatan seru untuk mengembangkan bakat, kepemimpinan, dan
              kreativitas di luar jam pelajaran.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="rounded-full bg-orange-600 hover:bg-orange-700 px-8 font-semibold shadow-lg shadow-orange-100 transition-transform hover:scale-105"
              >
                Daftar Sekarang <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                Lihat Jadwal
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="container mx-auto px-4 -mt-8 relative z-20">
        {/* STATS SUMMARY */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="mb-2 p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Trophy size={20} />
            </div>
            <span className="text-2xl font-bold text-slate-800">5+</span>
            <span className="text-xs text-slate-500 font-medium uppercase">
              Cabang Olahraga
            </span>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="mb-2 p-2 bg-pink-50 text-pink-600 rounded-lg">
              <Music size={20} />
            </div>
            <span className="text-2xl font-bold text-slate-800">4</span>
            <span className="text-xs text-slate-500 font-medium uppercase">
              Seni & Budaya
            </span>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="mb-2 p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <Heart size={20} />
            </div>
            <span className="text-2xl font-bold text-slate-800">3</span>
            <span className="text-xs text-slate-500 font-medium uppercase">
              Keagamaan
            </span>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="mb-2 p-2 bg-orange-50 text-orange-600 rounded-lg">
              <User size={20} />
            </div>
            <span className="text-2xl font-bold text-slate-800">150+</span>
            <span className="text-xs text-slate-500 font-medium uppercase">
              Siswa Aktif
            </span>
          </div>
        </div>

        {/* TOOLBAR */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <Tabs
            defaultValue="Semua"
            className="w-full lg:w-auto"
            onValueChange={setActiveCategory}
          >
            <TabsList className="bg-white border border-slate-200 p-1 rounded-xl h-auto flex flex-wrap gap-1">
              {["Semua", "Olahraga", "Seni", "Keagamaan", "Akademik"].map(
                (tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="rounded-lg px-4 py-2 text-sm font-medium data-[state=active]:bg-orange-600 data-[state=active]:text-white transition-all"
                  >
                    {tab}
                  </TabsTrigger>
                ),
              )}
            </TabsList>
          </Tabs>

          <div className="relative w-full lg:max-w-xs">
            <Search className="absolute left-3 top-3 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Cari ekstrakurikuler..."
              className="pl-10 h-11 rounded-xl border-slate-200 focus:ring-2 focus:ring-orange-500 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* GRID CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group h-full flex flex-col bg-white rounded-3xl border border-slate-100 hover:shadow-xl transition-all duration-300 overflow-hidden relative">
                {/* Status Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <Badge
                    variant={item.status === "Buka" ? "default" : "destructive"}
                    className={`rounded-full px-3 ${item.status === "Buka" ? "bg-emerald-500 hover:bg-emerald-600" : "bg-red-500"}`}
                  >
                    {item.status === "Buka"
                      ? "Pendaftaran Dibuka"
                      : "Kuota Penuh"}
                  </Badge>
                </div>

                <CardHeader className="pb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color} mb-6 transition-transform group-hover:scale-110 shadow-sm`}
                  >
                    {item.icon}
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {item.category}
                    </p>
                    <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-orange-600 transition-colors">
                      {item.name}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-slate-600 p-2 rounded-lg bg-slate-50/50">
                    <CalendarDays className="w-4 h-4 text-orange-500" />
                    <span className="font-medium">{item.schedule}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 px-2">
                    <User className="w-4 h-4 text-slate-400" />
                    <span>Pembina: {item.coach}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 px-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>{item.location}</span>
                  </div>
                </CardContent>

                <CardFooter className="pt-4 pb-6 px-6 border-t border-slate-50 mt-auto">
                  <Button
                    className="w-full rounded-xl h-11 font-semibold shadow-sm transition-all"
                    variant={item.status === "Buka" ? "default" : "secondary"}
                    disabled={item.status === "Penuh"}
                    style={{
                      backgroundColor: item.status === "Buka" ? "" : "#f1f5f9",
                      color: item.status === "Buka" ? "" : "#94a3b8",
                    }}
                  >
                    {item.status === "Buka"
                      ? "Daftar Sekarang"
                      : "Pendaftaran Tutup"}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filteredData.length === 0 && (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200 mt-8">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Kegiatan tidak ditemukan
            </h3>
            <p className="text-slate-500 max-w-md mx-auto mt-2">
              Maaf, ekstrakurikuler yang Anda cari belum tersedia atau coba
              gunakan kata kunci lain.
            </p>
            <Button
              variant="link"
              className="mt-4 text-orange-600"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("Semua");
              }}
            >
              Reset Pencarian
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
