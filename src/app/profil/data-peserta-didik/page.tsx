"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Users,
  Venus,
  Mars,
  GraduationCap,
  PrinterIcon,
  IdCard,
  Plus,
  Search,
} from "lucide-react";

interface Siswa {
  id: string;
  user: {
    fullName: string;
    email: string;
  };
  nisn: string;
  nis: string;
  rombonganBelajar: {
    nama: string;
  } | null;
}

interface StudentCard {
  id: string;
  siswaId: string;
  nomorUrut: string;
  tahunPelajaran: string;
}

export default function DataPesertaDidikPage() {
  const [siswas, setSiswas] = useState<Siswa[]>([]);
  const [cards, setCards] = useState<StudentCard[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [selectedTahunPelajaran, setSelectedTahunPelajaran] = useState(
    new Date().getFullYear() + "/" + (new Date().getFullYear() + 1),
  );
  const [isCreatingCard, setIsCreatingCard] = useState(false);

  // Data dummy untuk statistik
  const dataSiswa = [
    { kelas: "Kelas 1", laki: 25, perempuan: 20 },
    { kelas: "Kelas 2", laki: 22, perempuan: 24 },
    { kelas: "Kelas 3", laki: 28, perempuan: 18 },
    { kelas: "Kelas 4", laki: 20, perempuan: 25 },
    { kelas: "Kelas 5", laki: 23, perempuan: 22 },
    { kelas: "Kelas 6", laki: 24, perempuan: 26 },
  ];

  const totalLaki = dataSiswa.reduce((acc, curr) => acc + curr.laki, 0);
  const totalPerempuan = dataSiswa.reduce(
    (acc, curr) => acc + curr.perempuan,
    0,
  );
  const totalSemua = totalLaki + totalPerempuan;

  useEffect(() => {
    checkAuth();
    fetchSiswas();
    fetchCards();
  }, [selectedTahunPelajaran]);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/users/me", { credentials: "include" });
      const data = await res.json();
      if (res.ok && data.data) {
        setUser(data.data);
      }
    } catch (error) {
      console.error("Error checking auth:", error);
    }
  };

  const fetchSiswas = async () => {
    try {
      const res = await fetch("/api/siswa?limit=200", {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setSiswas(data.data);
      }
    } catch (error) {
      console.error("Error fetching siswas:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCards = async () => {
    try {
      const res = await fetch(
        `/api/student-card?tahunPelajaran=${selectedTahunPelajaran}`,
        { credentials: "include" },
      );
      const data = await res.json();
      if (res.ok && data.data) {
        setCards(data.data);
      }
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  const handlePrintCard = (cardId: string) => {
    window.open(`/print/student-card/${cardId}`, "_blank");
  };

  const handleCreateCard = async (siswaId: string) => {
    if (!user) {
      alert("Anda harus login untuk membuat kartu");
      return;
    }

    const siswa = siswas.find((s) => s.id === siswaId);
    if (!siswa) return;

    const nomorUrut = prompt(
      "Masukkan nomor urut kartu (Contoh: 001, 002, dst):",
    );
    if (!nomorUrut) return;

    try {
      const res = await fetch("/api/student-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          siswaId,
          nomorUrut,
          tahunPelajaran: selectedTahunPelajaran,
          statusAktif: true,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Kartu siswa berhasil dibuat!");
        fetchCards();
      } else {
        alert(data.message || "Error membuat kartu");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error membuat kartu");
    }
  };

  const getCardForSiswa = (siswaId: string) => {
    return cards.find((c) => c.siswaId === siswaId);
  };

  const canCreateCard =
    user &&
    ["SUPER_ADMIN", "PENDIDIK", "TENAGA_KEPENDIDIKAN"].includes(user.role);

  const filteredSiswas = siswas.filter(
    (s) =>
      s.user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.nisn.includes(searchTerm) ||
      s.nis.includes(searchTerm),
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20 overflow-x-hidden">
      {/* Header */}
      <section className="bg-white border-b py-12 mb-10">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-slate-900"
          >
            Data Peserta Didik
          </motion.h1>
          <p className="text-slate-500 text-xs font-medium tracking-widest mt-2">
            Statistik Real-time SD Negeri 1 Batu Rakit
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 max-w-6xl">
        {/* Dashboard Ringkasan */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="border-none shadow-sm bg-white">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">
                  Total Siswa Laki-laki
                </p>
                <h3 className="text-3xl font-bold text-slate-800">
                  {totalLaki}
                </h3>
              </div>
              <Mars size={40} className="text-blue-500 opacity-20" />
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">
                  Total Siswa Perempuan
                </p>
                <h3 className="text-3xl font-bold text-slate-800">
                  {totalPerempuan}
                </h3>
              </div>
              <Venus size={40} className="text-pink-500 opacity-20" />
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-blue-600 text-white">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Siswa</p>
                <h3 className="text-3xl font-bold">{totalSemua}</h3>
              </div>
              <Users size={40} className="opacity-20" />
            </CardContent>
          </Card>
        </div>

        {/* Tabs Navigation */}
        <div className="flex gap-2 mb-6 border-b">
          <button className="px-4 py-2 border-b-2 border-blue-600 text-blue-600 font-medium">
            📊 Statistik
          </button>
          <button className="px-4 py-2 text-slate-500 hover:text-slate-700 font-medium">
            🪪 Daftar Siswa & Kartu
          </button>
        </div>

        {/* Tabel Statistik */}
        <Card className="border-none shadow-md overflow-hidden bg-white mb-10">
          <CardHeader className="bg-slate-50/50 border-b">
            <CardTitle className="text-base font-bold flex items-center gap-2 text-slate-700">
              <GraduationCap className="text-primary" size={20} />
              Rincian Jumlah Siswa Per Kelas
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50/30">
                <TableRow>
                  <TableHead className="w-16 text-center font-bold">
                    No
                  </TableHead>
                  <TableHead className="font-bold">Kelas</TableHead>
                  <TableHead className="text-center font-bold">
                    Laki-laki (♂)
                  </TableHead>
                  <TableHead className="text-center font-bold">
                    Perempuan (♀)
                  </TableHead>
                  <TableHead className="text-right font-bold pr-10 text-primary">
                    Total Siswa
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataSiswa.map((item, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <TableCell className="text-center text-slate-400 font-medium">
                      {index + 1}
                    </TableCell>
                    <TableCell className="font-semibold text-slate-700">
                      {item.kelas}
                    </TableCell>
                    <TableCell className="text-center font-medium text-slate-600">
                      {item.laki}
                    </TableCell>
                    <TableCell className="text-center font-medium text-slate-600">
                      {item.perempuan}
                    </TableCell>
                    <TableCell className="text-right font-bold text-slate-900 pr-10">
                      {item.laki + item.perempuan}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Daftar Siswa dengan Opsi Cetak Kartu */}
        <Card className="border-none shadow-md overflow-hidden bg-white">
          <CardHeader className="bg-slate-50/50 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold flex items-center gap-2 text-slate-700">
                <IdCard size={20} />
                Daftar Siswa & Cetak Kartu
              </CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-3 text-slate-400"
                    size={16}
                  />
                  <Input
                    placeholder="Cari nama atau NISN..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 h-9 w-64"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50/30">
                  <TableRow>
                    <TableHead className="font-bold">No</TableHead>
                    <TableHead className="font-bold">Nama Siswa</TableHead>
                    <TableHead className="font-bold">NISN</TableHead>
                    <TableHead className="font-bold">NIS</TableHead>
                    <TableHead className="font-bold">Kelas</TableHead>
                    <TableHead className="font-bold text-center">
                      Status Kartu
                    </TableHead>
                    <TableHead className="font-bold text-center">
                      Aksi
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <div className="text-slate-500">Loading...</div>
                      </TableCell>
                    </TableRow>
                  ) : filteredSiswas.length > 0 ? (
                    filteredSiswas.map((siswa, index) => {
                      const card = getCardForSiswa(siswa.id);
                      return (
                        <TableRow
                          key={siswa.id}
                          className={
                            index % 2 === 0 ? "bg-white" : "bg-slate-50"
                          }
                        >
                          <TableCell className="text-slate-500 text-sm">
                            {index + 1}
                          </TableCell>
                          <TableCell className="font-semibold">
                            {siswa.user.fullName}
                          </TableCell>
                          <TableCell className="font-mono text-sm">
                            {siswa.nisn}
                          </TableCell>
                          <TableCell className="font-mono text-sm">
                            {siswa.nis}
                          </TableCell>
                          <TableCell>
                            {siswa.rombonganBelajar?.nama || "—"}
                          </TableCell>
                          <TableCell className="text-center">
                            {card ? (
                              <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                                ✓ Sudah Ada
                              </span>
                            ) : (
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">
                                ⊘ Belum Ada
                              </span>
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex gap-2 justify-center">
                              {card && (
                                <button
                                  onClick={() => handlePrintCard(card.id)}
                                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs font-medium flex items-center gap-1"
                                  title="Cetak kartu siswa"
                                >
                                  <PrinterIcon size={14} />
                                  Cetak
                                </button>
                              )}
                              {!card && canCreateCard && (
                                <button
                                  onClick={() => handleCreateCard(siswa.id)}
                                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 text-xs font-medium flex items-center gap-1"
                                  title="Buat kartu siswa"
                                >
                                  <Plus size={14} />
                                  Buat
                                </button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <p className="text-slate-500">Tidak ada data siswa</p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-slate-400 italic">
          * Data di atas sesuai dengan data yang ada di DAPODIK.
        </p>
      </main>
    </div>
  );
}
