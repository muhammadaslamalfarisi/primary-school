"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

// 1. DATA INFORMASI KONTAK (Dapat di-CRUD dari Admin)
const CONTACT_INFO = {
  alamat:
    "Jln. Batu Rakit, Desa Batu Rakit, Kecamatan Bayan, Kabupaten Lombok Utara, Kode Pos 83354.",
  email: "sdnegeri1baturakit@gmail.com",
  whatsapp: "+62 821-4791-5101",
  jamKerja: "Senin - Sabtu, 07:30 - 14:00 WITA",
  socials: [
    {
      name: "Facebook",
      icon: Facebook,
      link: "#",
      color: "hover:text-blue-600",
    },
    {
      name: "Instagram",
      icon: Instagram,
      link: "#",
      color: "hover:text-pink-500",
    },
    {
      name: "Twitter",
      icon: Twitter,
      link: "#",
      color: "hover:text-blue-400",
    },
    { name: "Youtube", icon: Youtube, link: "#", color: "hover:text-red-600" },
  ],
};

export default function KontakPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // 2. FORM HANDLER (Ready to connect with Backend/CRUD)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulasi pengiriman pesan
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24">
      {/* HERO SECTION */}
      <section className="relative bg-white border-b border-slate-100 py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
          <MessageSquare
            size={400}
            className="absolute -top-20 -right-20 text-indigo-600 -rotate-12"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200 border-none px-3 py-1 text-xs font-bold uppercase tracking-wider">
              Hubungi Kami
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
              Mari <span className="text-indigo-600">Terhubung</span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-2xl">
              Punya pertanyaan mengenai pendaftaran, program sekolah, atau
              kerjasama? Tim kami siap membantu Anda dengan sepenuh hati.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="container mx-auto px-4 -mt-12 relative z-20 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* KONTAK INFO (LEFT - 5 COLS) */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="border-none shadow-xl shadow-slate-200/50 bg-white rounded-3xl overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold text-slate-800">
                  Informasi Kontak
                </CardTitle>
                <CardDescription>
                  Detail alamat dan saluran komunikasi resmi sekolah.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 pt-4">
                {/* Alamat */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-700 text-sm mb-1">
                      Lokasi Sekolah
                    </h5>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {CONTACT_INFO.alamat}
                    </p>
                  </div>
                </div>

                {/* Jam Kerja */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-700 text-sm mb-1">
                      Jam Operasional
                    </h5>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {CONTACT_INFO.jamKerja}
                    </p>
                  </div>
                </div>

                {/* Email & WA */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-xs font-semibold text-slate-600">
                      {CONTACT_INFO.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-xs font-semibold text-slate-600">
                      {CONTACT_INFO.whatsapp}
                    </span>
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* Social Media */}
                <div className="pt-2">
                  <h5 className="font-bold text-slate-700 text-sm mb-4">
                    Media Sosial Resmi
                  </h5>
                  <div className="flex gap-4">
                    {CONTACT_INFO.socials.map((social, i) => (
                      <a
                        key={i}
                        href={social.link}
                        className={`w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center transition-all hover:border-transparent hover:shadow-md ${social.color}`}
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Google Maps Placeholder */}
            <Card className="border-none shadow-xl shadow-slate-200/50 bg-indigo-600 rounded-3xl overflow-hidden text-white">
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <MapPin size={40} className="text-indigo-200" />
                  <Badge className="bg-white/20 text-white border-none">
                    G-Maps
                  </Badge>
                </div>
                <h4 className="text-xl font-bold mb-2">Lihat Rute Lokasi</h4>
                <p className="text-indigo-100 text-sm mb-6">
                  Buka Google Maps untuk mendapatkan panduan navigasi menuju SD
                  Negeri 1 Batu Rakit.
                </p>
                <Button className="w-full bg-white text-indigo-700 hover:bg-indigo-50 rounded-xl font-bold">
                  Buka Peta <ExternalLinkIcon className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* MESSAGE FORM (RIGHT - 7 COLS) */}
          <div className="lg:col-span-7">
            <Card className="border-none shadow-xl shadow-slate-200/50 bg-white rounded-3xl">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="text-2xl font-bold text-slate-800">
                  Kirim Pesan
                </CardTitle>
                <CardDescription>
                  Pesan Anda akan langsung terkirim ke operator sekolah.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-4">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">
                      Pesan Terkirim!
                    </h3>
                    <p className="text-slate-500 mb-8 max-w-sm mx-auto">
                      Terima kasih telah menghubungi kami. Tim kami akan
                      merespons melalui email/WhatsApp segera.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setIsSuccess(false)}
                      className="rounded-xl border-slate-200 font-bold"
                    >
                      Kirim Pesan Lain
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">
                          Nama Lengkap
                        </label>
                        <Input
                          placeholder="Masukkan nama Anda"
                          required
                          className="h-12 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">
                          Email / WhatsApp
                        </label>
                        <Input
                          placeholder="Untuk kami hubungi balik"
                          required
                          className="h-12 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">
                        Subjek
                      </label>
                      <Input
                        placeholder="Contoh: Info Pendaftaran PIP"
                        required
                        className="h-12 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">
                        Pesan Anda
                      </label>
                      <Textarea
                        placeholder="Tuliskan pertanyaan atau informasi yang Anda butuhkan..."
                        required
                        className="min-h-40 rounded-2xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all py-4 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 font-bold text-lg transition-all"
                    >
                      {isSubmitting ? (
                        "Sedang Mengirim..."
                      ) : (
                        <>
                          Kirim Sekarang <Send className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* QUICK FAQ BOX */}
            <div className="mt-8 flex items-center justify-between p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h6 className="font-bold text-slate-800 text-sm">
                    Butuh jawaban cepat?
                  </h6>
                  <p className="text-xs text-slate-500">
                    Lihat halaman Tanya Jawab kami.
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                className="rounded-xl text-indigo-600 font-bold hover:text-indigo-700 hover:bg-indigo-50"
              >
                Lihat FAQ <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Sub-component icon untuk button (Next.js context)
function ExternalLinkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}
