"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Globe,
} from "lucide-react";

const FOOTER_DATA = {
  schoolName: "SD Negeri 1 Batu Rakit",
  tagline: "Media komunikasi resmi Sekolah Dasar Negeri 1 Batu Rakit.",
  address:
    "Jln. Batu Rakit, Desa Batu Rakit, Kecamatan Bayan, Kabupaten Lombok Utara, Kode Pos 83354.",
  phone: "+62 821-4791-5101",
  email: "sdnegeri1baturakit@gmail.com",
  socials: [
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://www.facebook.com/profile.php?id=61587799717188",
      target: "_blank",
      rel: "noopener noreferrer",
      color: "hover:bg-blue-600",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/sdnegeri1baturakit/",
      target: "_blank",
      rel: "noopener noreferrer",
      color:
        "hover:bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://x.com/sdn1baturakit",
      target: "_blank",
      rel: "noopener noreferrer",
      color: "hover:bg-black",
    },
    {
      name: "Youtube",
      icon: Youtube,
      href: "https://www.youtube.com/@sdnegeri1baturakit",
      target: "_blank",
      rel: "noopener noreferrer",
      color: "hover:bg-red-600",
    },
  ],
  links: [
    { name: "Profil Sekolah", href: "/profil" },
    { name: "Berita Terbaru", href: "/berita" },
    { name: "Program PIP", href: "/program/pip" },
    { name: "Layanan JDIH", href: "/jdih" },
    { name: "Pusat Unduhan", href: "/download" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-[#fcfcfd] border-t border-slate-200 pt-20 pb-10 overflow-hidden">
      {/* Dekorasi Background Halus */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 size-500px bg-blue-50/50 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          {/* Kolom 1: Branding & Identitas */}
          <div className="space-y-7">
            <div className="flex items-center gap-4">
              <div className="relative size-14 p-1 bg-white rounded-2xl shadow-sm border border-slate-100 shrink-0">
                <Image
                  src="/logo-sekolah.png"
                  alt="Logo Sekolah"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight text-slate-900 leading-none">
                  SD Negeri 1 Batu Rakit
                </span>
              </div>
            </div>

            <p className="text-slate-500 leading-relaxed text-[15px] max-w-xs">
              {FOOTER_DATA.tagline}
            </p>

            <div className="flex gap-3">
              {FOOTER_DATA.socials.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target={social.target}
                  rel={social.rel}
                  className={`group size-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 transition-all duration-300 shadow-sm ${social.color} hover:text-white hover:-translate-y-1 hover:shadow-md`}
                >
                  <social.icon className="size-5 transition-transform group-hover:scale-110" />
                </Link>
              ))}
            </div>
          </div>

          {/* Kolom 2: Tautan Cepat (Centered Alignment) */}
          <div className="lg:justify-self-center">
            <h4 className="font-bold text-slate-900 mb-8 uppercase text-[12px] tracking-[0.2em] relative inline-block">
              Tautan Cepat
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-blue-500 rounded-full" />
            </h4>
            <ul className="space-y-4">
              {FOOTER_DATA.links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-500 hover:text-blue-600 transition-all text-[15px] flex items-center group w-fit"
                  >
                    <span className="size-1.5 rounded-full bg-slate-300 mr-3 group-hover:bg-blue-500 group-hover:scale-125 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Kontak Resmi */}
          <div className="lg:justify-self-center">
            <h4 className="font-bold text-slate-900 mb-8 uppercase text-[12px] tracking-[0.2em] relative inline-block">
              Hubungi Kami
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-blue-500 rounded-full" />
            </h4>
            <div className="space-y-6">
              <div className="flex gap-4 group">
                <div className="size-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors duration-300">
                  <MapPin className="size-5 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <span className="text-slate-500 text-[14px] leading-relaxed group-hover:text-slate-800 transition-colors">
                  {FOOTER_DATA.address}
                </span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="size-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 transition-colors duration-300">
                  <Phone className="size-5 text-emerald-600 group-hover:text-white transition-colors" />
                </div>
                <span className="text-slate-500 text-[14px] font-medium group-hover:text-slate-800 transition-colors">
                  {FOOTER_DATA.phone}
                </span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="size-10 rounded-lg bg-orange-50 flex items-center justify-center shrink-0 group-hover:bg-orange-600 transition-colors duration-300">
                  <Mail className="size-5 text-orange-600 group-hover:text-white transition-colors" />
                </div>
                <span className="text-slate-500 text-[14px] break-all group-hover:text-slate-800 transition-colors">
                  {FOOTER_DATA.email}
                </span>
              </div>
            </div>
          </div>

          {/* Kolom 4: Lokasi (Google Maps) */}
          <div className="lg:justify-self-end w-full">
            <h4 className="font-bold text-slate-900 mb-8 uppercase text-[12px] tracking-[0.2em] relative inline-block">
              Lokasi Sekolah
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-blue-500 rounded-full" />
            </h4>
            <div className="relative w-full h-52 rounded-3xl overflow-hidden shadow-lg border border-white group">
              <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1974.1720393924545!2d116.38291597366334!3d-8.268509389209504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dcdd5128c1bfd85%3A0xcde2f3b32a95d0e2!2sSD%20Negeri%202%20Sukadana!5e0!3m2!1sid!2sus!4v1771349048467!5m2!1sid!2sus"
                className="w-full h-full border-0 grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Policy */}
        <div className="pt-10 border-t border-slate-200/60 flex flex-col md:flex-row justify-between items-center gap-6 text-[13px] font-medium text-slate-400">
          <div className="flex items-center gap-2">
            <Globe className="size-4 text-slate-300" />
            <p>© 2026 {FOOTER_DATA.schoolName}. All Rights Reserved.</p>
          </div>

          <div className="flex items-center gap-8">
            <Link
              href="/privacy"
              className="hover:text-blue-600 transition-colors relative group"
            >
              Kebijakan Privasi
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
            </Link>
            <Link
              href="/terms"
              className="hover:text-blue-600 transition-colors relative group"
            >
              Syarat & Ketentuan
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
