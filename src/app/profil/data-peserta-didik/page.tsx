"use client";

import React from "react";
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
import { Users, Venus, Mars, GraduationCap } from "lucide-react";

export default function DataPesertaDidikPage() {
  // Data ini nantinya akan di-fetch dari database/API yang diinput via Admin Panel
  const dataSiswa = [
    { kelas: "Kelas 1", laki: 25, perempuan: 20 },
    { kelas: "Kelas 2", laki: 22, perempuan: 24 },
    { kelas: "Kelas 3", laki: 28, perempuan: 18 },
    { kelas: "Kelas 4", laki: 20, perempuan: 25 },
    { kelas: "Kelas 5", laki: 23, perempuan: 22 },
    { kelas: "Kelas 6", laki: 24, perempuan: 26 },
  ];

  // Kalkulasi Otomatis untuk Dashboard
  const totalLaki = dataSiswa.reduce((acc, curr) => acc + curr.laki, 0);
  const totalPerempuan = dataSiswa.reduce(
    (acc, curr) => acc + curr.perempuan,
    0,
  );
  const totalSemua = totalLaki + totalPerempuan;

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

      <main className="container mx-auto px-4 max-w-5xl">
        {/* Dashboard Ringkasan (Otomatis menyesuaikan data) */}
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

        {/* Tabel Tampilan Publik (Read-Only) */}
        <Card className="border-none shadow-md overflow-hidden bg-white">
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

        <p className="mt-6 text-center text-xs text-slate-400 italic">
          * Data di atas sesuai dengan data yang ada di DAPODIK.
        </p>
      </main>
    </div>
  );
}
