"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users, Briefcase, Camera } from "lucide-react";

export default function StrukturOrganisasiPage() {
  // Data ini disimulasikan sebagai hasil input/CRUD
  const pimpinan = {
    nama: "Raden Irawangsa, S.Pd.",
    jabatan: "Kepala Sekolah",
  };

  const pendidik = [
    { nama: "Baiq Yuli Isdaeni, S.Pd.", jabatan: "Guru Kelas I" },
    { nama: "Nurul Hidayah, S.Pd.", jabatan: "Guru Kelas II" },
    { nama: "Ari Hindarti M, S.Pd.", jabatan: "Guru Kelas III" },
    { nama: "Sabariah, S.Pd.", jabatan: "Guru Kelas IV.A" },
    { nama: "Ratningsih, S.Pd.", jabatan: "Guru Kelas IV.B" },
    { nama: "Agus Febriawan, S.Pd.", jabatan: "Guru Kelas V.A" },
    { nama: "Ramdan, S.Pd.", jabatan: "Guru Kelas V.B" },
    { nama: "Isnan Satriawan, S.Pd.", jabatan: "Guru Kelas VI" },
    { nama: "Faizul Wathoni, S.Pd.", jabatan: "Guru Agama Islam" },
    { nama: "Fitriatul Khaerani, S.Pd.", jabatan: "Guru Bahasa Inggris" },
  ];

  const staf = [
    { nama: "Muhammad Aslam Alfarisi", jabatan: "Operator Sekolah" },
    { nama: "Mertanep", jabatan: "Penjaga Sekolah" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20 overflow-x-hidden">
      <section className="bg-white border-b py-12 mb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Struktur Organisasi
          </h1>
          <p className="text-sm font-medium tracking-widest text-slate-500">
            SD Negeri 1 Batu Rakit
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          {/* LEVEL 1: KEPALA SEKOLAH */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-64 md:w-72"
            >
              <Card className="shadow-xl border-t-4 border-primary overflow-hidden">
                <CardContent className="p-0 text-center">
                  <div className="relative aspect-square bg-slate-100">
                    <Avatar className="h-full w-full rounded-none">
                      <AvatarImage src="" className="object-cover" />
                      <AvatarFallback className="rounded-none bg-slate-50 text-slate-400">
                        <GraduationCap className="h-12 w-12" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="p-5 bg-white">
                    <Badge
                      variant="secondary"
                      className="mb-2 uppercase text-xs"
                    >
                      Kepala Sekolah
                    </Badge>
                    <h3 className="font-bold text-slate-800 tracking-tight">
                      {pimpinan.nama}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* LEVEL 2: TENAGA PENDIDIK */}
          <section className="w-full max-w-6xl mb-20">
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-px bg-slate-200 flex-1 max-w-24"></div>
              <h2 className="text-xl font-bold text-slate-700 flex items-center gap-2">
                <Users size={20} className="text-blue-600" /> Tenaga Pendidik
              </h2>
              <div className="h-px bg-slate-200 flex-1 max-w-24"></div>
            </div>

            {/* Efek Tengah ke Samping menggunakan justify-center dan AnimatePresence */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              <AnimatePresence>
                {pendidik.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8, x: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="w-44 md:w-52"
                  >
                    <Card className="shadow-md border-none overflow-hidden group">
                      <div className="relative aspect-square bg-slate-50">
                        <Avatar className="h-full w-full rounded-none">
                          <AvatarFallback className="rounded-none text-slate-300 group-hover:text-blue-400 transition-colors">
                            <Camera size={32} />
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <CardContent className="p-4 text-center bg-white border-t">
                        <p className="text-sm font-bold text-slate-800 leading-tight mb-1">
                          {item.nama}
                        </p>
                        <p className="text-xs text-blue-600 font-semibold uppercase">
                          {item.jabatan}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>

          {/* LEVEL 3: TENAGA KEPENDIDIKAN */}
          <section className="w-full max-w-6xl mb-20">
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-px bg-slate-200 flex-1 max-w-24"></div>
              <h2 className="text-xl font-bold text-slate-700 flex items-center gap-2">
                <Briefcase size={20} className="text-emerald-600" /> Tenaga
                Kependidikan
              </h2>
              <div className="h-px bg-slate-200 flex-1 max-w-24"></div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {staf.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, x: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="w-44 md:w-52"
                >
                  <Card className="shadow-md border-none overflow-hidden group">
                    <div className="relative aspect-square bg-slate-50">
                      <Avatar className="h-full w-full rounded-none">
                        <AvatarFallback className="rounded-none text-slate-300 group-hover:text-blue-400 transition-colors">
                          <Camera size={32} />
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <CardContent className="p-4 text-center bg-white border-t">
                      <p className="text-sm font-bold text-slate-800 leading-tight mb-1">
                        {item.nama}
                      </p>
                      <p className="text-xs text-blue-600 font-semibold uppercase">
                        {item.jabatan}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
