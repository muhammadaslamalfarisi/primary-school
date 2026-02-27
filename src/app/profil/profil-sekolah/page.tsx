import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  School,
  Users,
  MapPin,
  Award,
  CheckCircle2,
  Building2,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";
import { SCHOOL_INFO, SCHOOL_PROFILE } from "@/lib/constants";

export default function ProfilSekolahPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Halaman */}
      <section className="bg-slate-50 py-16 border-b">
        <div className="container mx-auto px-4">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            Tentang Kami
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            {SCHOOL_INFO.name}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Mengenal lebih dekat lembaga pendidikan kami yang berkomitmen
            mencetak generasi cerdas, berakhlak mulia, dan siap menghadapi masa
            depan.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Kolom Kiri: Konten Utama */}
          <div className="lg:col-span-2 space-y-12">
            {/* Visual Preview */}
            <div className="relative w-full aspect-video rounded-2xl bg-slate-100 overflow-hidden border flex items-center justify-center">
              <School className="w-20 h-20 text-slate-300" />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-sm border">
                <p className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <MapPin size={14} className="text-primary" /> Gedung Utama SDN
                  1 Batu Rakit
                </p>
              </div>
            </div>

            {/* Narasi Profil */}
            <section className="prose prose-slate max-w-none">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                Sejarah Singkat
              </h2>
              <p className="text-slate-600 leading-relaxed">
                SD Negeri 1 Batu Rakit didirikan dengan tujuan memberikan akses
                pendidikan berkualitas bagi masyarakat di wilayah Batu Rakit.
                Seiring berjalannya waktu, sekolah kami terus berkembang baik
                dari segi infrastruktur maupun kualitas kurikulum yang
                diterapkan.
              </p>
              <p className="text-slate-600 leading-relaxed mt-4">
                Saat ini, kami mengadopsi Kurikulum Merdeka yang dipadukan
                dengan penguatan karakter berbasis kearifan lokal. Kami percaya
                bahwa setiap murid adalah individu unik yang memerlukan metode
                pendekatan yang tepat untuk berkembang.
              </p>
            </section>

            {/* Nilai-Nilai Sekolah */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">
                Budaya Sekolah
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Religius & Berakhlak",
                  "Disiplin & Tanggung Jawab",
                  "Kreatif & Inovatif",
                  "Peduli Lingkungan",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-xl border bg-white shadow-sm"
                  >
                    <CheckCircle2
                      className="text-green-500 shrink-0"
                      size={20}
                    />
                    <span className="font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Kolom Kanan: Sidebar Informasi */}
          <div className="space-y-6">
            <Card className="shadow-md border-slate-200">
              <CardHeader className="bg-slate-50/50">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building2 size={18} className="text-primary" /> Data
                  Identitas
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">NPSN</span>
                  <span className="font-mono font-medium text-slate-800">
                    {SCHOOL_INFO.npsn}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Akreditasi
                  </span>
                  <Badge className="bg-green-600">
                    {SCHOOL_PROFILE.accreditation}
                  </Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Sejak</span>
                  <span className="font-medium">
                    {SCHOOL_PROFILE.establishment}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users size={18} className="text-primary" /> Statistik
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                  <Users className="text-blue-600 shrink-0" />
                  <div>
                    <p className="text-xs text-blue-600 font-bold uppercase">
                      Total Siswa
                    </p>
                    <p className="text-xl font-bold text-slate-800">
                      {SCHOOL_PROFILE.totalStudents}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-orange-50 rounded-lg">
                  <Award className="text-orange-600 shrink-0" />
                  <div>
                    <p className="text-xs text-orange-600 font-bold uppercase">
                      Tenaga PTK
                    </p>
                    <p className="text-xl font-bold text-slate-800">
                      {SCHOOL_PROFILE.totalTeachers}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Kontak Cepat */}
            <Card className="bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="text-lg">Kontak Sekolah</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Phone size={16} /> {SCHOOL_INFO.phone}
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail size={16} /> {SCHOOL_INFO.email}
                </div>
              </CardContent>
            </Card>

            {/* Navigasi ke Halaman Profil Lainnya */}
            <div className="space-y-2 pt-4 border-t">
              <p className="text-sm font-semibold text-slate-700 mb-3">
                Jelajahi Profil
              </p>
              <Link href="/profil/visi-misi">
                <Button variant="outline" className="w-full justify-between">
                  Visi & Misi <ArrowRight size={16} />
                </Button>
              </Link>
              <Link href="/profil/struktur-organisasi">
                <Button variant="outline" className="w-full justify-between">
                  Struktur Organisasi <ArrowRight size={16} />
                </Button>
              </Link>
              <Link href="/profil/sarana-prasarana">
                <Button variant="outline" className="w-full justify-between">
                  Sarana & Prasarana <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
