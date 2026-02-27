"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, MessageCircle } from "lucide-react";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function PrincipalWelcome() {
  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Background Elements */}
      <motion.div
        className="absolute -left-40 top-1/2 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              className="absolute inset-0 bg-linear-to-br from-blue-600 to-purple-600 rounded-3xl"
              animate={{ rotate: [0, 2, -2, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{ zIndex: -1, scale: 1.05 }}
            />

            <div className="relative aspect-3/4 rounded-3xl bg-slate-200 border-4 border-white shadow-2xl overflow-hidden flex items-center justify-center group">
              <motion.div className="absolute inset-0 bg-linear-to-t from-blue-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Image
                src="/images/kepala-sekolah.jpg"
                alt="Foto Kepala Sekolah"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                priority
              />

              {/* Badge */}
              <motion.div
                className="absolute bottom-6 right-6 bg-white rounded-2xl p-4 shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <p className="text-2xl font-bold text-blue-600">50+</p>
                <p className="text-xs text-slate-600 font-medium">
                  Tahun Pengalaman
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <MessageCircle size={16} />
              Sambutan Kepala Sekolah
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Visi Kami untuk{" "}
              <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Pendidikan Berkualitas
              </span>
            </motion.h2>

            <motion.div
              className="space-y-4 text-lg text-slate-600 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex gap-4">
                <Quote className="size-8 text-blue-400 flex-shrink-0 mt-1" />
                <p className="italic pl-4 border-l-4 border-blue-400">
                  "Selamat datang di portal resmi SD Negeri 1 Batu Rakit. Kami
                  percaya bahwa setiap anak memiliki potensi unik yang harus
                  diasah dengan penuh kasih sayang dan dedikasi."
                </p>
              </div>

              <p>
                Melalui sinergi antara guru, orang tua, dan teknologi, kami
                berkomitmen menciptakan lingkungan sekolah yang tidak hanya
                unggul secara akademik, tetapi juga kaya akan budi pekerti dan
                karakter yang kuat.
              </p>
            </motion.div>

            {/* Profile Info */}
            <motion.div
              className="pt-8 border-t-2 border-slate-200"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-2xl font-bold text-slate-900">
                Raden Irawangsa, S.Pd.
              </p>
              <p className="text-lg font-semibold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mt-1">
                Kepala SD Negeri 1 Batu Rakit
              </p>
              <motion.div
                className="mt-4 flex gap-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-blue-600 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{
                      delay: i * 0.1,
                      duration: 1,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
