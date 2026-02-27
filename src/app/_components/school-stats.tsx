"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, GraduationCap, Trophy, Award } from "lucide-react";

const STATS = [
  {
    label: "Siswa Aktif",
    value: 150,
    suffix: "+",
    icon: Users,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    label: "Tenaga Pendidik",
    value: 13,
    icon: GraduationCap,
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    label: "Prestasi Nasional",
    value: 12,
    suffix: "+",
    icon: Trophy,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    label: "Tahun Melayani",
    value: 50,
    suffix: "+",
    icon: Award,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
  },
];

const Counter = ({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2;
    const increment = end / (duration * 60);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(Math.ceil(end));
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function SchoolStats() {
  return (
    <section className="py-24 relative overflow-hidden bg-linear-to-b from-white to-slate-50">
      {/* Background Decoration */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
        animate={{ scale: [1, 1.1, 1], x: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
        animate={{ scale: [1, 1.1, 1], x: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Statistik{" "}
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Sekolah Kami
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Data dan pencapaian yang menunjukkan komitmen kami terhadap
            pendidikan berkualitas
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {STATS.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, translateY: -10 }}
              className="relative group"
            >
              {/* Card Background Gradient */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300`}
              />

              {/* Card Content */}
              <div
                className={`relative p-8 rounded-3xl border-2 border-slate-100 ${stat.bgColor} group-hover:border-transparent transition-all duration-300 shadow-sm group-hover:shadow-xl`}
              >
                {/* Icon */}
                <motion.div
                  className={`inline-flex p-4 rounded-2xl bg-white mb-6 bg-linear-to-br ${stat.color} bg-clip-border`}
                  whileHover={{ rotate: 12 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <stat.icon className="size-8 text-white" />
                </motion.div>

                {/* Value */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                  className="mb-2"
                >
                  <p
                    className={`text-5xl font-extrabold bg-linear-to-r ${stat.color} bg-clip-text text-transparent`}
                  >
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </p>
                </motion.div>

                {/* Label */}
                <motion.p
                  className="text-sm font-bold text-slate-700 uppercase tracking-wider"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  {stat.label}
                </motion.p>

                {/* Decorative Line */}
                <motion.div
                  className={`absolute bottom-0 left-0 h-1 bg-linear-to-r ${stat.color} rounded-b-3xl`}
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.6, duration: 0.8 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
