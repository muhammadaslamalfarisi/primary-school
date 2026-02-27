"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Lock,
  Shield,
  BarChart3,
  AlertCircle,
} from "lucide-react";

export default function AdminAccessPage() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Shield size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Admin Panel</h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Sistem manajemen konten terpadu untuk SD Negeri 1 Batu Rakit
          </p>
        </motion.div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-md mx-auto mb-16"
        >
          <Link href="/admin/login">
            <Button className="w-full h-14 text-lg gap-3 bg-blue-600 hover:bg-blue-700 shadow-lg">
              <Lock size={20} />
              Masuk ke Admin Panel
              <ChevronRight size={20} />
            </Button>
          </Link>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {[
            {
              icon: Newspaper,
              title: "Pengumuman",
              desc: "Kelola pengumuman sekolah dengan mudah",
            },
            {
              icon: Mail,
              title: "Undangan",
              desc: "Atur undangan acara dan gathering",
            },
            {
              icon: BookOpen,
              title: "Program",
              desc: "Kelola 6 program pendidikan utama",
            },
            {
              icon: Download,
              title: "Download",
              desc: "Kelola file yang dapat diunduh",
            },
            {
              icon: Users,
              title: "PTK & Siswa",
              desc: "Jaga data guru dan siswa tetap update",
            },
            {
              icon: Gavel,
              title: "JDIH",
              desc: "Kelola dokumen legal dan peraturan",
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.05 }}
            >
              <Card className="bg-slate-800 border-slate-700 hover:border-blue-500 transition-colors h-full">
                <CardContent className="pt-6">
                  <div className="p-3 bg-blue-600/20 w-fit rounded-lg mb-4">
                    <feature.icon className="text-blue-400" size={24} />
                  </div>
                  <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm">{feature.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Demo Credentials Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-blue-600/10 border-blue-600/30">
            <CardContent className="pt-6">
              <button
                onClick={() => setShowDemo(!showDemo)}
                className="w-full flex items-center justify-between text-left group hover:text-blue-300 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <AlertCircle size={20} className="text-blue-400" />
                  <span className="font-semibold text-white">
                    Demo Credentials
                  </span>
                </div>
                <ChevronRight
                  size={20}
                  className={`transform transition-transform ${
                    showDemo ? "rotate-90" : ""
                  }`}
                />
              </button>

              {showDemo && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 p-4 bg-slate-900 rounded-lg border border-blue-600/20"
                >
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-slate-400">Username</p>
                      <code className="text-blue-300 font-mono font-bold">
                        admin
                      </code>
                    </div>
                    <div>
                      <p className="text-slate-400">Password</p>
                      <code className="text-blue-300 font-mono font-bold">
                        admin123
                      </code>
                    </div>
                    <div className="mt-4 p-3 bg-yellow-600/10 border border-yellow-600/20 rounded text-yellow-300 text-xs">
                      ⚠️ Untuk demo saja. Jangan gunakan di production.
                    </div>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link href="/admin/login">
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
              <BarChart3 size={18} />
              Buka Admin Dashboard
              <ChevronRight size={18} />
            </Button>
          </Link>
        </motion.div>

        {/* Footer */}
        <div className="text-center text-slate-500 text-sm mt-16">
          <p>© 2026 SD Negeri 1 Batu Rakit - Admin Panel</p>
        </div>
      </div>
    </div>
  );
}

import {
  Newspaper,
  Mail,
  BookOpen,
  Download,
  Users,
  Gavel,
} from "lucide-react";
