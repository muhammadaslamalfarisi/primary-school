import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Flag, Rocket, Heart, Star, CheckCircle2 } from "lucide-react";

export default function VisiMisiPage() {
  const misiList = [
    "Menyelenggarakan proses pembelajaran yang aktif, inovatif, kreatif, dan menyenangkan.",
    "Menanamkan nilai-nilai keagamaan dan budi pekerti luhur dalam kehidupan sehari-hari.",
    "Mengembangkan potensi minat dan bakat siswa melalui kegiatan ekstrakurikuler.",
    "Menciptakan lingkungan sekolah yang bersih, sehat, hijau, dan asri.",
    "Menjalin kerjasama yang harmonis antara sekolah, orang tua, dan masyarakat.",
  ];

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Hero Section Visi Misi */}
      <section className="bg-white border-b py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full text-blue-600">
              <Target size={32} />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            Visi & Misi
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto italic">
            "Panduan kami dalam melangkah untuk mencetak generasi unggul di SD
            Negeri 1 Batu Rakit."
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Section Visi */}
          <div className="text-center space-y-6">
            <Badge
              variant="outline"
              className="px-4 py-1 border-blue-500 text-blue-600 uppercase tracking-widest"
            >
              Visi Sekolah
            </Badge>
            <div className="relative p-8 md:p-12 bg-blue-600 rounded-3xl shadow-xl overflow-hidden">
              {/* Dekorasi Background */}
              <div className="absolute top-[-20%] right-[-10%] opacity-10">
                <Rocket size={200} className="rotate-12 text-white" />
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white leading-relaxed relative z-10">
                "Terwujudnya Peserta Didik yang Cerdas, Terampil, Mandiri,
                Berakhlak Mulia, dan Berwawasan Lingkungan pada Tahun 2028."
              </h2>
            </div>
          </div>

          {/* Section Misi */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="h-px bg-slate-200 flex-1"></div>
              <Badge
                variant="outline"
                className="px-4 py-1 border-orange-500 text-orange-600 uppercase tracking-widest"
              >
                Misi Sekolah
              </Badge>
              <div className="h-px bg-slate-200 flex-1"></div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {misiList.map((misi, index) => (
                <Card
                  key={index}
                  className="border-none shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="bg-orange-100 text-orange-600 p-2 rounded-lg shrink-0">
                      <Flag size={20} />
                    </div>
                    <p className="text-slate-700 font-medium leading-relaxed pt-1">
                      {misi}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Section Tujuan (Optional Addition) */}
          <section className="bg-white p-8 md:p-10 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Star className="text-yellow-500 fill-yellow-500" />
              <h3 className="text-xl font-bold text-slate-800">
                Tujuan Strategis
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <CheckCircle2 className="text-green-500 shrink-0" size={18} />
                <p className="text-sm text-slate-600">
                  Meningkatkan skor rata-rata nilai akademik siswa di setiap
                  semester.
                </p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="text-green-500 shrink-0" size={18} />
                <p className="text-sm text-slate-600">
                  Memenangkan minimal 3 kompetisi non-akademik tingkat kabupaten
                  tiap tahun.
                </p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="text-green-500 shrink-0" size={18} />
                <p className="text-sm text-slate-600">
                  Mewujudkan sekolah ramah anak dan bebas perundungan
                  (bullying).
                </p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="text-green-500 shrink-0" size={18} />
                <p className="text-sm text-slate-600">
                  Mengintegrasikan teknologi IT dalam 80% proses kegiatan
                  belajar mengajar.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
