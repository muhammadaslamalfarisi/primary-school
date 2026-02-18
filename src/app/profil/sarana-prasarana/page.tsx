"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Map, Home, DoorOpen, CheckCircle2, Boxes } from "lucide-react";

export default function SaranaPrasaranaPage() {
  // Pastikan ID setiap item unik (Gunakan string atau ID unik dari database nanti)
  const [dataSarana] = useState({
    tanah: [
      {
        id: "t1",
        nama: "Lahan Utama Sekolah",
        luas: "2500 m2",
        status: "Milik Sendiri",
      },
      {
        id: "t2",
        nama: "Lahan Kebun & Taman",
        luas: "300 m2",
        status: "Milik Sendiri",
      },
    ],
    bangunan: [
      {
        id: "b1",
        nama: "Gedung A (Ruang Belajar)",
        luas: "800 m2",
        kondisi: "Sangat Baik",
      },
      {
        id: "b2",
        nama: "Gedung B (Kantor & Lab)",
        luas: "400 m2",
        kondisi: "Baik",
      },
    ],
    ruangan: [
      { id: "r1", nama: "Ruang Kelas 1-6", jumlah: "6", kondisi: "Baik" },
      { id: "r2", nama: "Perpustakaan", jumlah: "1", kondisi: "Sangat Baik" },
      { id: "r3", nama: "Laboratorium Komputer", jumlah: "1", kondisi: "Baik" },
    ],
    fasilitas: [
      {
        id: "f1",
        nama: "Perangkat Komputer",
        jumlah: "25",
        kondisi: "Berfungsi",
      },
      { id: "f2", nama: "Akses Internet Fiber", jumlah: "1", kondisi: "Aktif" },
    ],
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-20 overflow-x-hidden">
      <section className="bg-white border-b py-12 mb-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-2"
        >
          Sarana & Prasarana
        </motion.h1>
        <p className="text-slate-500 font-medium tracking-widest text-xs">
          SD Negeri 1 Batu Rakit
        </p>
      </section>

      <main className="container mx-auto px-4 max-w-6xl">
        <Tabs defaultValue="tanah" className="w-full">
          <div className="flex justify-center mb-10">
            <TabsList className="bg-white border shadow-sm p-1">
              <TabsTrigger value="tanah" className="gap-2 text-xs md:text-sm">
                <Map size={14} /> Tanah
              </TabsTrigger>
              <TabsTrigger
                value="bangunan"
                className="gap-2 text-xs md:text-sm"
              >
                <Home size={14} /> Bangunan
              </TabsTrigger>
              <TabsTrigger value="ruangan" className="gap-2 text-xs md:text-sm">
                <DoorOpen size={14} /> Ruangan
              </TabsTrigger>
              <TabsTrigger
                value="fasilitas"
                className="gap-2 text-xs md:text-sm"
              >
                <Boxes size={14} /> Fasilitas
              </TabsTrigger>
            </TabsList>
          </div>

          <AnimatePresence mode="wait">
            <TabsContent value="tanah" key="tab-tanah">
              <GridContainer items={dataSarana.tanah} category="tanah" />
            </TabsContent>
            <TabsContent value="bangunan" key="tab-bangunan">
              <GridContainer items={dataSarana.bangunan} category="bangunan" />
            </TabsContent>
            <TabsContent value="ruangan" key="tab-ruangan">
              <GridContainer items={dataSarana.ruangan} category="ruangan" />
            </TabsContent>
            <TabsContent value="fasilitas" key="tab-fasilitas">
              <GridContainer
                items={dataSarana.fasilitas}
                category="fasilitas"
              />
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </main>
    </div>
  );
}

function GridContainer({
  items,
  category,
}: {
  items: any[];
  category: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-wrap justify-center gap-6"
    >
      {items.map((item) => (
        <motion.div
          key={item.id} // SOLUSI: Menggunakan item.id unik, bukan index
          layout
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full sm:w-72"
        >
          <Card className="border-none shadow-md bg-white overflow-hidden group">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-50 transition-colors">
                {category === "tanah" && (
                  <Map className="text-blue-600" size={24} />
                )}
                {category === "bangunan" && (
                  <Home className="text-emerald-600" size={24} />
                )}
                {category === "ruangan" && (
                  <DoorOpen className="text-orange-600" size={24} />
                )}
                {category === "fasilitas" && (
                  <Boxes className="text-purple-600" size={24} />
                )}
              </div>

              <Badge
                variant="secondary"
                className="mb-2 text-[10px] font-bold uppercase bg-slate-100 text-slate-500 border-none"
              >
                {category}
              </Badge>

              <h3 className="font-bold text-slate-800 mb-4">{item.nama}</h3>

              <div className="w-full border-t pt-4 space-y-2">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400 uppercase font-bold">
                    Kondisi
                  </span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 size={12} /> {item.status || item.kondisi}
                  </span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400 uppercase font-bold">
                    Keterangan
                  </span>
                  <span className="text-slate-900 font-bold">
                    {item.luas || `${item.jumlah} Unit`}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
