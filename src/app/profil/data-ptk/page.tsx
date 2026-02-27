"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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
import { Input } from "@/components/ui/input";
import { Users, LogOut, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PTKData {
  id: string;
  nisn?: string;
  name: string;
  class?: string;
  gender: "Laki-laki" | "Perempuan";
  nip?: string;
  education?: string;
  phone?: string;
}

export default function DataPTKPage() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [ptkData, setPtkData] = useState<PTKData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<PTKData[]>([]);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (!loggedIn) {
      router.push("/login");
    } else {
      setIsReady(true);
      loadPTKData();
    }
  }, [router]);

  const loadPTKData = () => {
    // Try to load from portal PTK data storage
    const saved = localStorage.getItem("portalPTKData");
    if (saved) {
      const data = JSON.parse(saved);
      setPtkData(data);
      setFilteredData(data);
    } else {
      // Get data from admin PTK module if available
      const adminPTK = localStorage.getItem("ptk");
      if (adminPTK) {
        const data = JSON.parse(adminPTK);
        setPtkData(data);
        setFilteredData(data);
      }
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredData(ptkData);
    } else {
      const filtered = ptkData.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(term.toLowerCase()),
        ),
      );
      setFilteredData(filtered);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  if (!isReady) return null;

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-slate-50 pb-20">
      <header className="bg-white border-b py-6 mb-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-1">
                Data Pegawai Terverifikasi
              </h1>
              <p className="text-slate-500">
                Total:{" "}
                <span className="font-semibold text-slate-900">
                  {filteredData.length}
                </span>{" "}
                Pegawai
              </p>
            </div>
            <Button
              onClick={handleLogout}
              className="gap-2 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
            >
              <LogOut size={18} /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-none shadow-lg">
            <CardHeader className="bg-linear-to-r from-blue-50 to-indigo-50 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Users className="text-blue-600" size={24} />
                  </div>
                  <CardTitle className="text-xl">Daftar Pegawai</CardTitle>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search
                    className="absolute left-4 top-3.5 text-slate-400"
                    size={18}
                  />
                  <Input
                    placeholder="Cari berdasarkan nama, NIP, atau info lainnya..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-12 h-12 bg-slate-50"
                  />
                </div>
              </div>

              {/* Table */}
              {filteredData.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50 hover:bg-slate-50">
                        <TableHead className="font-bold">No</TableHead>
                        <TableHead className="font-bold">Nama</TableHead>
                        <TableHead className="font-bold">
                          Jenis Kelamin
                        </TableHead>
                        <TableHead className="font-bold">NIP</TableHead>
                        <TableHead className="font-bold">Pendidikan</TableHead>
                        <TableHead className="font-bold text-right">
                          Kontak
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredData.map((item, idx) => (
                        <motion.tr
                          key={item.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          className="hover:bg-blue-50 transition-colors"
                        >
                          <TableCell className="font-semibold text-slate-600">
                            {idx + 1}
                          </TableCell>
                          <TableCell className="font-semibold text-slate-900">
                            <div className="flex items-center gap-2">
                              <div className="p-2 bg-slate-100 rounded-full">
                                <User size={16} className="text-slate-600" />
                              </div>
                              {item.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                item.gender === "Laki-laki"
                                  ? "bg-blue-50 text-blue-700 border-blue-200"
                                  : "bg-pink-50 text-pink-700 border-pink-200"
                              }
                            >
                              {item.gender}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-mono text-sm">
                            {item.nip || "-"}
                          </TableCell>
                          <TableCell className="text-sm text-slate-600">
                            {item.education || "-"}
                          </TableCell>
                          <TableCell className="text-right text-sm">
                            {item.phone ? (
                              <span className="text-slate-900">
                                {item.phone}
                              </span>
                            ) : (
                              <span className="text-slate-400">-</span>
                            )}
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex p-4 bg-slate-100 rounded-full mb-4">
                    <Users className="text-slate-400" size={32} />
                  </div>
                  <p className="text-slate-500 font-semibold">
                    {searchTerm
                      ? "Tidak ada data yang sesuai dengan pencarian"
                      : "Belum ada data pegawai"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
        >
          <p className="text-sm text-blue-900">
            <span className="font-semibold">💡 Informasi:</span> Data pegawai
            ini diperbarui oleh Administrator. Jika menemukan kesalahan data,
            silakan hubungi Admin.
          </p>
        </motion.div>
      </main>
    </div>
  );
}
