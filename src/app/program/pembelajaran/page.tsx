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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  BookOpen,
  Search,
  ArrowRight,
  FileText,
  GraduationCap,
  PlayCircle,
  Clock,
  CheckCircle2,
  LayoutGrid,
} from "lucide-react";

// Interface Data (Siap untuk Database/API)
interface Pelajaran {
  id: string;
  title: string;
  description: string;
  grade: string; // Misal: "Kelas 1", "Kelas 6"
  category: "Merdeka" | "K13" | "Projek";
  duration: string;
  modulesCount: number;
  color: string; // Untuk aksen visual
  icon: React.ReactNode;
}

export default function PembelajaranPage() {
  // 1. STATE MANAGEMENT
  const [dataPelajaran, setDataPelajaran] = useState<Pelajaran[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // 2. SIMULASI FETCH DATA (CRUD READ)
  useEffect(() => {
    // Nanti diganti dengan: const res = await fetch('/api/pembelajaran')
    const dummyData: Pelajaran[] = [
      {
        id: "p-01",
        title: "Matematika Ceria",
        description:
          "Konsep dasar berhitung dengan metode gasing dan permainan interaktif.",
        grade: "Kelas 1",
        category: "Merdeka",
        duration: "2 Semeter",
        modulesCount: 12,
        color: "text-blue-600 bg-blue-50",
        icon: <LayoutGrid className="w-6 h-6" />,
      },
      {
        id: "p-02",
        title: "IPAS: Alam & Sekitarku",
        description:
          "Eksplorasi lingkungan sekolah dan pengenalan sains dasar.",
        grade: "Kelas 4",
        category: "Merdeka",
        duration: "1 Semester",
        modulesCount: 8,
        color: "text-emerald-600 bg-emerald-50",
        icon: <BookOpen className="w-6 h-6" />,
      },
      {
        id: "p-03",
        title: "Bahasa Indonesia",
        description:
          "Literasi lanjut, menulis kreatif, dan apresiasi puisi anak.",
        grade: "Kelas 6",
        category: "K13",
        duration: "2 Semester",
        modulesCount: 16,
        color: "text-orange-600 bg-orange-50",
        icon: <FileText className="w-6 h-6" />,
      },
      {
        id: "p-04",
        title: "P5: Gaya Hidup Berkelanjutan",
        description:
          "Projek penguatan profil pelajar pancasila fokus pada sampah plastik.",
        grade: "Semua Kelas",
        category: "Projek",
        duration: "3 Bulan",
        modulesCount: 4,
        color: "text-purple-600 bg-purple-50",
        icon: <GraduationCap className="w-6 h-6" />,
      },
    ];
    setDataPelajaran(dummyData);
  }, []);

  // 3. LOGIC FILTERING
  const filteredData = dataPelajaran.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTab =
      activeTab === "all" ? true : item.category.toLowerCase() === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24">
      {/* HEADER / HERO SECTION */}
      <section className="relative bg-white border-b border-slate-100 py-20 lg:py-24 overflow-hidden">
        {/* Dekorasi Latar Belakang Standar (Aman Linter) */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-50 rounded-full opacity-50 blur-3xl" />
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-orange-50 rounded-full opacity-50 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200 border-none px-3 py-1 text-xs font-bold uppercase tracking-wider">
              Kurikulum & Akademik
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
              Program <span className="text-blue-600">Pembelajaran</span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-2xl">
              Menyajikan kurikulum yang adaptif dan berpusat pada murid. Temukan
              silabus, bahan ajar, dan metode pembelajaran yang diterapkan di SD
              Negeri 1 Batu Rakit.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="rounded-full bg-blue-600 hover:bg-blue-700 px-8 font-semibold shadow-lg shadow-blue-100"
              >
                Unduh Kurikulum <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                Kalender Akademik
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="container mx-auto px-4 -mt-8 relative z-20">
        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-none shadow-md bg-white rounded-2xl">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <BookOpen className="w-8 h-8" />
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium">
                  Total Mata Pelajaran
                </p>
                <h3 className="text-2xl font-bold text-slate-800">14 Mapel</h3>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md bg-white rounded-2xl">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                <GraduationCap className="w-8 h-8" />
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium">
                  Metode Belajar
                </p>
                <h3 className="text-2xl font-bold text-slate-800">Hybrid</h3>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md bg-white rounded-2xl">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium">
                  Status Akreditasi
                </p>
                <h3 className="text-2xl font-bold text-slate-800">
                  Unggul (A)
                </h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CONTROLS: TABS & SEARCH */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <Tabs
            defaultValue="all"
            className="w-full lg:w-auto"
            onValueChange={setActiveTab}
          >
            <TabsList className="bg-white border border-slate-200 p-1 rounded-xl h-auto flex-wrap">
              <TabsTrigger
                value="all"
                className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white px-4 py-2"
              >
                Semua
              </TabsTrigger>
              <TabsTrigger
                value="merdeka"
                className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white px-4 py-2"
              >
                Kurikulum Merdeka
              </TabsTrigger>
              <TabsTrigger
                value="k13"
                className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white px-4 py-2"
              >
                K-13
              </TabsTrigger>
              <TabsTrigger
                value="projek"
                className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white px-4 py-2"
              >
                Projek P5
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative w-full lg:max-w-xs">
            <Search className="absolute left-3 top-3 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Cari mata pelajaran..."
              className="pl-10 h-11 rounded-xl border-slate-200 focus:ring-2 focus:ring-blue-500 bg-white"
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
              <Card className="group h-full flex flex-col bg-white rounded-3xl border border-slate-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
                <CardHeader className="pb-4 relative">
                  <div className="flex justify-between items-start">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color} mb-4 transition-transform group-hover:scale-110`}
                    >
                      {item.icon}
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-slate-100 text-slate-600 hover:bg-slate-200"
                    >
                      {item.grade}
                    </Badge>
                  </div>

                  <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-slate-500 line-clamp-2 mt-2">
                    {item.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 py-2">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>{item.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <PlayCircle className="w-4 h-4 text-slate-400" />
                      <span>{item.modulesCount} Modul</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-4 pb-6 px-6 bg-slate-50/50 mt-auto border-t border-slate-50">
                  <Button className="w-full rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 shadow-sm transition-all font-semibold">
                    Lihat Silabus
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filteredData.length === 0 && (
          <div className="text-center py-24">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Program tidak ditemukan
            </h3>
            <p className="text-slate-500">
              Coba ubah kata kunci atau filter pencarian Anda.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
