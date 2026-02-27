"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Award } from "lucide-react";

const floatingAnimation = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

export default function HeroSection() {
  return (
    <section className="min-h-screen relative overflow-hidden bg-linear-to-b from-blue-50 via-white to-slate-50 flex items-center justify-center px-4 py-20">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          x: [0, 50, -50, 0],
          y: [0, 50, -50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          x: [0, -50, 50, 0],
          y: [0, -50, 50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
      />

      <motion.div
        className="relative z-10 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
            <Award size={16} />
            Pendidikan Berkualitas Sejak 1976
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div variants={itemVariants} className="text-center mb-6">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-linear-to-r from-blue-600 via-blue-700 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
            Selamat Datang di SDN 1 Batu Rakit
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Membangun generasi yang{" "}
            <span className="font-bold text-blue-600">berakhlak mulia</span>,{" "}
            <span className="font-bold text-purple-600">cerdas</span>, dan{" "}
            <span className="font-bold text-emerald-600">kreatif</span> melalui
            pendidikan inovatif
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          <Link href="/program/spmb">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="h-14 px-8 rounded-2xl bg-linear-to-r from-blue-600 to-blue-700 hover:shadow-2xl hover:shadow-blue-300 font-bold text-white shadow-xl group"
              >
                <ArrowRight className="mr-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                Daftar Sekarang
              </Button>
            </motion.div>
          </Link>
          <Link href="/profil/profil-sekolah">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-8 rounded-2xl font-bold border-2 border-slate-300 hover:bg-slate-50 hover:border-blue-400"
              >
                <BookOpen className="mr-2 w-5 h-5" />
                Profil Sekolah
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        {/* Hero Image */}
        <motion.div variants={itemVariants} className="relative">
          <motion.div
            className="w-full max-w-5xl mx-auto aspect-video bg-linear-to-br from-blue-100 to-purple-100 rounded-3xl overflow-hidden border-2 border-white shadow-2xl flex items-center justify-center group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div className="absolute inset-0 bg-linear-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <motion.div
              animate={floatingAnimation.animate}
              className="text-center"
            >
              <BookOpen size={64} className="text-blue-500 mx-auto mb-4" />
              <p className="text-slate-500 font-semibold">
                Area Dokumentasi Sekolah
              </p>
              <p className="text-sm text-slate-400 mt-2">
                Galeri & Video Kegiatan Sekolah
              </p>
            </motion.div>
          </motion.div>

          {/* Floating Stats */}
          <motion.div
            className="absolute -left-8 -bottom-8 bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <p className="text-3xl font-bold text-blue-600">152+</p>
            <p className="text-sm text-slate-600 font-medium">Siswa Aktif</p>
          </motion.div>

          <motion.div
            className="absolute -right-8 top-8 bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
          >
            <p className="text-3xl font-bold text-purple-600">50</p>
            <p className="text-sm text-slate-600 font-medium">Tahun Melayani</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
