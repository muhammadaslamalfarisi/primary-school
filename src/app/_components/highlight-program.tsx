"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Trophy, Target, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PROGRAMS = [
  {
    title: "Kurikulum Merdeka",
    description:
      "Pendekatan pembelajaran yang fleksibel dan berfokus pada materi esensial.",
    icon: Target,
  },
  {
    title: "Komunitas Belajar",
    description:
      "Wadah kolaborasi guru untuk meningkatkan kualitas pengajaran.",
    icon: Star,
  },
  {
    title: "Prestasi Siswa",
    description: "Pembinaan intensif untuk berbagai perlombaan akademik.",
    icon: Trophy,
  },
];

export default function HighlightProgram() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <Badge
              variant="secondary"
              className="mb-6 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-100"
            >
              Keunggulan Sekolah
            </Badge>

            <h2 className="mb-6 text-3xl font-extrabold leading-tight text-slate-900 md:text-5xl">
              Membangun Potensi <span className="text-blue-600">Terbaik</span>{" "}
              Peserta Didik
            </h2>

            <div className="grid gap-8">
              {PROGRAMS.map((item, index) => (
                <div key={index} className="group flex gap-5">
                  {/* Bagian yang sebelumnya kuning sudah diperbaiki di sini */}
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-slate-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <item.icon className="size-7" />
                  </div>

                  <div>
                    <h3 className="mb-1 text-xl font-bold text-slate-800">
                      {item.title}
                    </h3>
                    <p className="leading-relaxed text-slate-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              size="lg"
              className="mt-10 h-14 rounded-2xl bg-slate-900 px-8 font-bold text-white transition-all hover:bg-slate-800"
            >
              Selengkapnya <ArrowRight className="ml-2 size-5" />
            </Button>
          </div>

          {/* Area Gambar */}
          <div className="w-full lg:w-1/2">
            <div className="aspect-video w-full rounded-3xl bg-slate-100 border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400">
              [ Foto Kegiatan ]
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
