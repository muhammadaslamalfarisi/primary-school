"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="py-20 lg:py-32 bg-white flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
          Selamat Datang di Sekolah Dasar <br />
          <span className="text-blue-600">Negeri 1 Batu Rakit</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10">
          Mewujudkan generasi yang berakhlak mulia, cerdas, dan kreatif melalui
          pendidikan yang inovatif dan kolaboratif di Kabupaten Lombok Utara.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            className="h-14 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 font-bold text-white shadow-xl shadow-blue-100 group"
          >
            Daftar Sekarang{" "}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-14 px-8 rounded-2xl font-bold border-slate-200"
          >
            Profil Sekolah
          </Button>
        </div>
      </motion.div>

      {/* Video/Image Placeholder */}
      <div className="w-full max-w-5xl aspect-video bg-slate-100 rounded-3xl mt-20 border-8 border-slate-50 shadow-2xl flex items-center justify-center italic text-slate-400">
        [ Area Video Dokumentasi Sekolah ]
      </div>
    </section>
  );
}
