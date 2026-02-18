"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Users,
  Newspaper,
  Gavel,
  Download,
  Phone,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";

const MENUS = [
  {
    title: "Profil",
    desc: "Visi, misi, dan struktur organisasi.",
    icon: Users,
    color: "text-blue-600 bg-blue-50",
    link: "/profil",
  },
  {
    title: "Berita",
    desc: "Informasi kegiatan sekolah terbaru.",
    icon: Newspaper,
    color: "text-emerald-600 bg-emerald-50",
    link: "/berita",
  },
  {
    title: "Program",
    desc: "Layanan pendidikan dan bantuan.",
    icon: GraduationCap,
    color: "text-orange-600 bg-orange-50",
    link: "/program/pembelajaran",
  },
  {
    title: "Download",
    desc: "Unduh dokumen dan formulir resmi.",
    icon: Download,
    color: "text-purple-600 bg-purple-50",
    link: "/download",
  },
  {
    title: "JDIH",
    desc: "Produk hukum dan aturan sekolah.",
    icon: Gavel,
    color: "text-indigo-600 bg-indigo-50",
    link: "/jdih",
  },
  {
    title: "Kontak",
    desc: "Hubungi kami untuk informasi.",
    icon: Phone,
    color: "text-rose-600 bg-rose-50",
    link: "/kontak",
  },
];

export default function FeaturesMenu() {
  return (
    <section className="py-24 bg-slate-50/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MENUS.map((item, i) => (
            <Link key={i} href={item.link}>
              <Card className="border-none shadow-sm hover:shadow-md transition-all rounded-3xl p-4 group cursor-pointer bg-white">
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${item.color}`}
                  >
                    <item.icon size={24} />
                  </div>
                  <CardTitle className="text-xl font-bold">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-slate-500 leading-relaxed">
                    {item.desc}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
