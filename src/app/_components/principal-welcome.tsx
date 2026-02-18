"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";

export default function PrincipalWelcome() {
  return (
    <section className="py-24 bg-slate-50/50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Foto Kepala Sekolah */}
          <motion.div
            className="w-full md:w-1/3"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-600 rounded-3xl rotate-3 group-hover:rotate-0 transition-transform duration-300 -z-10" />
              <div className="aspect-3/4 rounded-3xl bg-slate-200 border-4 border-white shadow-xl overflow-hidden flex items-center justify-center italic text-slate-400">
                <Image
                  src="/images/kepala-sekolah.jpg"
                  alt="Foto Kepala Sekolah"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Teks Sambutan */}
          <motion.div
            className="w-full md:w-2/3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Quote className="size-12 text-blue-200 mb-6" />
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Sambutan Kepala Sekolah
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed italic text-lg">
              <p>
                "Selamat datang di portal resmi SD Negeri 1 Batu Rakit. Kami
                percaya bahwa setiap anak memiliki potensi unik yang harus
                diasah dengan penuh kasih sayang dan dedikasi."
              </p>
              <p>
                "Melalui sinergi antara guru, orang tua, dan teknologi, kami
                berkomitmen menciptakan lingkungan sekolah yang tidak hanya
                unggul secara akademik, tetapi juga kaya akan budi pekerti."
              </p>
            </div>
            <div className="mt-8">
              <h4 className="font-bold text-slate-900 text-xl">
                Raden Irawangsa, S.Pd.
              </h4>
              <p className="text-blue-600 font-medium">
                Kepala SD Negeri 1 Batu Rakit
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
