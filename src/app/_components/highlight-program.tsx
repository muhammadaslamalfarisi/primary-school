"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Trophy, Target, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PROGRAMS = [
  {
    title: "Kurikulum Merdeka",
    description:
      "Pendekatan pembelajaran yang fleksibel dan berfokus pada materi esensial.",
    icon: Target,
    link: "/program/pembelajaran",
    color: "blue",
  },
  {
    title: "Komunitas Belajar",
    description:
      "Wadah kolaborasi guru untuk meningkatkan kualitas pengajaran.",
    icon: Star,
    link: "/program/komunitas-belajar",
    color: "purple",
  },
  {
    title: "Prestasi Siswa",
    description: "Pembinaan intensif untuk berbagai perlombaan akademik.",
    icon: Trophy,
    link: "/program/pembelajaran",
    color: "emerald",
  },
];

const getColorClasses = (color: string) => {
  const colors: Record<string, { bg: string; hover: string; icon: string }> = {
    blue: {
      bg: "bg-blue-50",
      hover: "group-hover:bg-blue-600",
      icon: "text-blue-600",
    },
    purple: {
      bg: "bg-purple-50",
      hover: "group-hover:bg-purple-600",
      icon: "text-purple-600",
    },
    emerald: {
      bg: "bg-emerald-50",
      hover: "group-hover:bg-emerald-600",
      icon: "text-emerald-600",
    },
  };
  return colors[color] || colors.blue;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
};

export default function HighlightProgram() {
  return (
    <section className="py-24 relative overflow-hidden bg-linear-to-b from-slate-50 to-white">
      {/* Background Decoration */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
                <Sparkles size={16} />
                Keunggulan Sekolah
              </div>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="mb-8 text-4xl md:text-5xl font-extrabold leading-tight text-slate-900"
            >
              Membangun Potensi{" "}
              <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Terbaik
              </span>{" "}
              Peserta Didik
            </motion.h2>

            <motion.div
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {PROGRAMS.map((item, index) => {
                const colors = getColorClasses(item.color);
                return (
                  <Link key={index} href={item.link}>
                    <motion.div
                      variants={itemVariants}
                      className="group cursor-pointer relative"
                      whileHover={{ x: 8 }}
                    >
                      {/* Card Background */}
                      <div
                        className={`absolute inset-0 ${colors.bg} rounded-2xl transition-all duration-300 group-hover:shadow-xl group-hover:scale-105`}
                      />

                      {/* Card Content */}
                      <div className="relative flex gap-5 p-6">
                        <motion.div
                          className={`flex size-14 shrink-0 items-center justify-center rounded-2xl ${colors.bg} transition-all duration-300 ${colors.hover} group-hover:text-white`}
                          whileHover={{ rotate: 12 }}
                        >
                          <item.icon className="size-7" />
                        </motion.div>

                        <div className="flex-1">
                          <h3
                            className={`mb-2 text-lg font-bold text-slate-900 ${colors.icon} transition-colors`}
                          >
                            {item.title}
                          </h3>
                          <p className="leading-relaxed text-slate-600 group-hover:text-slate-700 transition-colors">
                            {item.description}
                          </p>
                        </div>

                        <ArrowRight className="size-5 text-slate-400 group-hover:text-slate-900 transition-all group-hover:translate-x-2 self-center" />
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </motion.div>

            <motion.div variants={itemVariants} className="mt-10">
              <Link href="/program">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="h-14 rounded-2xl bg-linear-to-r from-slate-900 to-slate-800 px-8 font-bold text-white shadow-lg hover:shadow-xl"
                  >
                    Lihat Semua Program <ArrowRight className="ml-2 size-5" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <motion.div
              className="aspect-video w-full rounded-3xl bg-linear-to-br from-blue-100 to-purple-100 border-2 border-white shadow-2xl flex items-center justify-center group overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div className="absolute inset-0 bg-linear-to-br from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Target size={64} className="text-blue-500 mx-auto mb-4" />
                </motion.div>
                <p className="text-slate-600 font-semibold">
                  Galeri Program Unggulan
                </p>
                <p className="text-sm text-slate-400 mt-2">
                  Foto & Video Kegiatan Pembelajaran
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
