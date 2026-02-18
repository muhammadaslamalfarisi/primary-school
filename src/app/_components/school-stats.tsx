"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, GraduationCap, Trophy, Award } from "lucide-react";

const STATS = [
  {
    label: "Siswa Aktif",
    value: "150+",
    icon: Users,
    color: "text-blue-600 bg-blue-50",
  },
  {
    label: "Tenaga Pendidik",
    value: "13",
    icon: GraduationCap,
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    label: "Prestasi Nasional",
    value: "12+",
    icon: Trophy,
    color: "text-orange-600 bg-orange-50",
  },
  {
    label: "Tahun Berdiri",
    value: "1976",
    icon: Award,
    color: "text-purple-600 bg-purple-50",
  },
];

export default function SchoolStats() {
  return (
    <section className="pb-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div
                className={`size-12 rounded-2xl ${stat.color} flex items-center justify-center mx-auto mb-4`}
              >
                <stat.icon className="size-6" />
              </div>
              <h3 className="text-3xl font-extrabold text-slate-900 mb-1">
                {stat.value}
              </h3>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
