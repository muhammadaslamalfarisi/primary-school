"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NavMenu } from "./nav-menu";
import {
  Home,
  User,
  Newspaper,
  LayoutGrid,
  Download,
  Gavel,
  Mail,
  ChevronRight,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeSheet = () => setIsOpen(false);

  return (
    /* PERBAIKAN: Ditambahkan fixed, top-0, left-0, right-0, z-50, dan background */
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 md:h-32">
          {/* LOGO & NAMA SEKOLAH (DESKTOP) */}
          <div className="flex items-center gap-4">
            <div className="shrink-0">
              <Image
                src="/logo-sekolah.png"
                alt="Logo Sekolah"
                width={65}
                height={65}
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl font-bold text-black leading-tight">
              SD Negeri 1 Batu Rakit
            </span>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center">
            <NavMenu />
          </div>

          {/* MOBILE MENU */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  className="relative flex h-10 w-10 flex-col items-center justify-center rounded-md hover:bg-accent transition-colors outline-none group"
                  aria-label="Toggle Menu"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <div className="relative flex items-center justify-center w-6 h-6">
                    <span
                      className={`absolute block h-0.5 w-6 rounded-full bg-black transition-all duration-500 ease-in-out ${
                        isOpen ? "rotate-45" : "-translate-y-2"
                      }`}
                    />
                    <span
                      className={`absolute block h-0.5 w-6 rounded-full bg-black transition-all duration-500 ease-in-out ${
                        isOpen ? "opacity-0" : "opacity-100"
                      }`}
                    />
                    <span
                      className={`absolute block h-0.5 w-6 rounded-full bg-black transition-all duration-500 ease-in-out ${
                        isOpen ? "-rotate-45" : "translate-y-2"
                      }`}
                    />
                  </div>
                </button>
              </SheetTrigger>

              <SheetContent side="left" className="w-80 p-0 flex flex-col">
                <SheetHeader className="p-6 pb-2 flex flex-row items-center gap-3 space-y-0">
                  <Image
                    src="/logo-sekolah.png"
                    alt="Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                  <SheetTitle className="text-left text-base font-bold text-black leading-tight">
                    SD Negeri 1 Batu Rakit
                  </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-4 py-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full space-y-1"
                  >
                    <Link
                      href="/"
                      onClick={closeSheet}
                      className="flex items-center gap-4 px-4 py-3 text-md font-semibold text-black hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                    >
                      <Home className="w-5 h-5 text-muted-foreground" /> Beranda
                    </Link>

                    {/* Profil */}
                    <AccordionItem value="profil" className="border-none">
                      <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-accent hover:text-accent-foreground rounded-md group transition-all duration-200">
                        <div className="flex items-center gap-4 text-md font-semibold text-black group-hover:text-accent-foreground">
                          <User className="w-5 h-5 text-muted-foreground group-hover:text-accent-foreground" />
                          Profil
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pl-12 pb-1">
                        <div className="flex flex-col gap-0 pt-1">
                          <Link
                            href="/profil/profil-sekolah"
                            onClick={closeSheet}
                            className="py-2 text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
                          >
                            <ChevronRight className="w-3 h-3" /> Profil Sekolah
                          </Link>
                          <Link
                            href="/profil/visi-misi"
                            onClick={closeSheet}
                            className="py-2 text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
                          >
                            <ChevronRight className="w-3 h-3" /> Visi & Misi
                          </Link>
                          <Link
                            href="/profil/struktur-organisasi"
                            onClick={closeSheet}
                            className="py-2 text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
                          >
                            <ChevronRight className="w-3 h-3" /> Struktur
                            Organisasi
                          </Link>
                          <Link
                            href="/profil/data-peserta-didik"
                            onClick={closeSheet}
                            className="py-2 text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
                          >
                            <ChevronRight className="w-3 h-3" /> Data Peserta
                            Didik
                          </Link>
                          <Link
                            href="/profil/sarana-prasarana"
                            onClick={closeSheet}
                            className="py-2 text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
                          >
                            <ChevronRight className="w-3 h-3" /> Sarana &
                            Prasarana
                          </Link>
                          <Link
                            href="/profil/data-ptk"
                            onClick={closeSheet}
                            className="py-2 text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
                          >
                            <ChevronRight className="w-3 h-3" /> PTK
                          </Link>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Berita */}
                    <AccordionItem value="berita" className="border-none">
                      <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-accent hover:text-accent-foreground rounded-md group transition-all duration-200">
                        <div className="flex items-center gap-4 text-md font-semibold text-black group-hover:text-accent-foreground">
                          <Newspaper className="w-5 h-5 text-muted-foreground group-hover:text-accent-foreground" />
                          Berita
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pl-12 pb-1">
                        <div className="flex flex-col gap-0 pt-1">
                          <Link
                            href="/berita/pengumuman"
                            onClick={closeSheet}
                            className="py-2 text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
                          >
                            <ChevronRight className="w-3 h-3" /> Pengumuman
                          </Link>
                          <Link
                            href="/berita/undangan"
                            onClick={closeSheet}
                            className="py-2 text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
                          >
                            <ChevronRight className="w-3 h-3" /> Undangan
                          </Link>
                          <Link
                            href="/berita/inovasi"
                            onClick={closeSheet}
                            className="py-2 text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
                          >
                            <ChevronRight className="w-3 h-3" /> Inovasi
                          </Link>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Program */}
                    <AccordionItem value="program" className="border-none">
                      <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-accent hover:text-accent-foreground rounded-md group transition-all duration-200">
                        <div className="flex items-center gap-4 text-md font-semibold text-black group-hover:text-accent-foreground">
                          <LayoutGrid className="w-5 h-5 text-muted-foreground group-hover:text-accent-foreground" />
                          Program
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pl-12 pb-1">
                        <div className="flex flex-col gap-0 pt-1">
                          <Link
                            href="/program/spmb"
                            onClick={closeSheet}
                            className="py-2 text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
                          >
                            <ChevronRight className="w-3 h-3" /> SPMB
                          </Link>
                          <Link
                            href="/program/komunitas-belajar"
                            onClick={closeSheet}
                            className="py-2 text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
                          >
                            <ChevronRight className="w-3 h-3" /> Komunitas
                            Belajar
                          </Link>
                          <Link
                            href="/program/pembelajaran"
                            onClick={closeSheet}
                            className="py-2 text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
                          >
                            <ChevronRight className="w-3 h-3" /> Pembelajaran
                          </Link>
                          <Link
                            href="/program/ekstrakurikuler"
                            onClick={closeSheet}
                            className="py-2 text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
                          >
                            <ChevronRight className="w-3 h-3" /> Ekstrakurikuler
                          </Link>
                          <Link
                            href="/program/bosp"
                            onClick={closeSheet}
                            className="py-2 text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
                          >
                            <ChevronRight className="w-3 h-3" /> BOSP
                          </Link>
                          <Link
                            href="/program/pip"
                            onClick={closeSheet}
                            className="py-2 text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
                          >
                            <ChevronRight className="w-3 h-3" /> PIP
                          </Link>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <Link
                      href="/download"
                      onClick={closeSheet}
                      className="flex items-center gap-4 px-4 py-3 text-md font-semibold text-black hover:bg-accent rounded-md transition-colors"
                    >
                      <Download className="w-5 h-5 text-muted-foreground" />{" "}
                      Download
                    </Link>
                    <Link
                      href="/jdih"
                      onClick={closeSheet}
                      className="flex items-center gap-4 px-4 py-3 text-md font-semibold text-black hover:bg-accent rounded-md transition-colors"
                    >
                      <Gavel className="w-5 h-5 text-muted-foreground" /> JDIH
                    </Link>
                    <Link
                      href="/kontak"
                      onClick={closeSheet}
                      className="flex items-center gap-4 px-4 py-3 text-md font-semibold text-black hover:bg-accent rounded-md transition-colors"
                    >
                      <Mail className="w-5 h-5 text-muted-foreground" /> Kontak
                    </Link>
                  </Accordion>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
