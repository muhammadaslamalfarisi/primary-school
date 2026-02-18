"use client";

import Link from "next/link";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function NavMenu() {
  const isMobile = useIsMobile();

  return (
    <NavigationMenu viewport={isMobile}>
      <NavigationMenuList className="flex-wrap">
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">Beranda</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="">
          <NavigationMenuTrigger>Profil</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-50 gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/profil/profil-sekolah">Profil Sekolah</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/profil/visi-misi">Visi & Misi</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/profil/struktur-organisasi">
                    Struktur Organisasi
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/profil/data-peserta-didik">
                    Data Peserta Didik
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/profil/sarana-prasarana">
                    Sarana & Prasarana
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/profil/data-ptk">Data PTK</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="">
          <NavigationMenuTrigger>Berita</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-50 gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/berita/pengumuman">Pengumuman</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/berita/undangan">Undangan</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/berita/inovasi">Inovasi</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="">
          <NavigationMenuTrigger>Program</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-50 gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/program/spmb">SPMB</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/program/komunitas-belajar">
                    Komunitas Belajar
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/program/pembelajaran">Pembelajaran</Link>
                </NavigationMenuLink>{" "}
                <NavigationMenuLink asChild>
                  <Link href="/program/ekstrakurikuler">Ekstrakurikuler</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/program/bosp">BOSP</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/program/pip">PIP</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/download">Download</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/jdih">JDIH</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/kontak">Kontak</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
