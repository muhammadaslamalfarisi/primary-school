"use client";

import React, { useEffect, useState } from "react"; // Tambahkan useEffect
import { useRouter } from "next/navigation"; // Tambahkan useRouter
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DataPTKPage() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  // PROTEKSI HALAMAN: Cek apakah sudah login atau belum
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (!loggedIn) {
      router.push("/login"); // Tendang balik ke login jika nakal
    } else {
      setIsReady(true); // Tampilkan data jika aman
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // Hapus tanda login
    router.push("/login");
  };

  // Jika belum dicek, jangan tampilkan apa-apa dulu (mencegah kedipan data)
  if (!isReady) return null;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <header className="bg-white border-b py-6 mb-10">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">
            Data PTK
          </h1>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="text-red-500 hover:text-red-600 hover:bg-red-50 gap-2"
          >
            <LogOut size={18} /> Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 max-w-6xl">
        <Card className="border-none shadow-md bg-white overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Users className="text-blue-600" size={20} />
              Daftar Pegawai Terverifikasi
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {/* Tabel PTK Anda di sini (Gunakan kodingan tabel sebelumnya) */}
            <div className="p-10 text-center text-slate-400">
              Tabel Data PTK Tampil di Sini
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
