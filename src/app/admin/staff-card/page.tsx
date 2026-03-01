"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Wifi,
  Plus,
  Edit2,
  Trash2,
  PrinterIcon,
  ChevronLeft,
  Search,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

interface StaffCard {
  id: string;
  userId: string;
  user: User;
  nomorUrut: string;
  tahunPelajaran: string;
  role: string;
  nip?: string;
  jabatan?: string;
  departemen?: string;
  statusAktif: boolean;
  jumlah_cetak: number;
  dibuat_tanggal: string;
  dicetak_terakhir: string | null;
}

const ROLE_CONFIG = {
  SUPER_ADMIN: { label: "Admin", color: "from-red-600 to-red-800", icon: "👨‍💼" },
  KEPALA_SEKOLAH: {
    label: "Kepala Sekolah",
    color: "from-amber-600 to-amber-800",
    icon: "👔",
  },
  PENDIDIK: {
    label: "Pendidik/Guru",
    color: "from-green-600 to-green-800",
    icon: "👨‍🏫",
  },
  TENAGA_KEPENDIDIKAN: {
    label: "Tenaga Kependidikan",
    color: "from-blue-600 to-blue-800",
    icon: "👨‍💻",
  },
};

export default function AdminStaffCard() {
  const [cards, setCards] = useState<StaffCard[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("KEPALA_SEKOLAH");
  const [selectedTahunPelajaran, setSelectedTahunPelajaran] = useState(
    new Date().getFullYear() + "/" + (new Date().getFullYear() + 1),
  );

  const [formData, setFormData] = useState({
    userId: "",
    nomorUrut: "",
    tahunPelajaran: selectedTahunPelajaran,
    role: selectedRole,
    nip: "",
    jabatan: "",
    departemen: "",
    statusAktif: true,
  });

  // Fetch staff cards and users
  useEffect(() => {
    fetchCards();
    fetchUsers();
  }, [selectedTahunPelajaran, selectedRole]);

  const fetchCards = async () => {
    try {
      const res = await fetch(
        `/api/staff-card?tahunPelajaran=${selectedTahunPelajaran}&role=${selectedRole}`,
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

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users?limit=200", {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok && data.data) {
        // Filter users by selected role
        const filtered = data.data.filter((u: User) => u.role === selectedRole);
        setUsers(filtered);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.userId) {
      alert("Pilih pengguna terlebih dahulu");
      return;
    }

    setLoading(true);
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `/api/staff-card/${editingId}`
        : "/api/staff-card";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          tahunPelajaran: selectedTahunPelajaran,
          role: selectedRole,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(editingId ? "Kartu diperbarui!" : "Kartu dibuat!");
        fetchCards();
        resetForm();
      } else {
        alert(data.message || "Error menyimpan kartu");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error menyimpan kartu");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin hapus kartu staf ini?")) return;

    try {
      const res = await fetch(`/api/staff-card/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        alert("Kartu dihapus!");
        fetchCards();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error menghapus kartu");
    }
  };

  const handleEdit = (card: StaffCard) => {
    setEditingId(card.id);
    setFormData({
      userId: card.userId,
      nomorUrut: card.nomorUrut,
      tahunPelajaran: card.tahunPelajaran,
      role: card.role,
      nip: card.nip || "",
      jabatan: card.jabatan || "",
      departemen: card.departemen || "",
      statusAktif: card.statusAktif,
    });
    setIsAddingNew(true);
  };

  const handlePrint = (cardId: string) => {
    window.open(`/print/staff-card/${cardId}`, "_blank");
    // Update dicetak_terakhir
    fetch(`/api/staff-card/${cardId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ dicetak_terakhir: new Date().toISOString() }),
    }).catch(console.error);
  };

  const resetForm = () => {
    setFormData({
      userId: "",
      nomorUrut: "",
      tahunPelajaran: selectedTahunPelajaran,
      role: selectedRole,
      nip: "",
      jabatan: "",
      departemen: "",
      statusAktif: true,
    });
    setEditingId(null);
    setIsAddingNew(false);
  };

  const filteredCards = cards.filter(
    (card) =>
      card.user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.nomorUrut.includes(searchTerm),
  );

  const roleConfig =
    ROLE_CONFIG[selectedRole as keyof typeof ROLE_CONFIG] ||
    ROLE_CONFIG.KEPALA_SEKOLAH;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b mb-8"
      >
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard">
              <ChevronLeft className="text-slate-400 hover:text-slate-600 cursor-pointer" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-3xl">{roleConfig.icon}</span>
                Kelola Kartu {roleConfig.label}
              </h1>
              <p className="text-slate-500 text-sm">
                Buat dan kelola kartu identitas {roleConfig.label.toLowerCase()}
              </p>
            </div>
          </div>
          <Button
            onClick={() => setIsAddingNew(!isAddingNew)}
            className="gap-2 bg-blue-600"
          >
            <Plus size={18} />
            {isAddingNew ? "Batal" : "Buat Kartu"}
          </Button>
        </div>
      </motion.div>

      <main className="container mx-auto px-4 max-w-6xl">
        {/* Filter Tahun Pelajaran */}
        <Card className="mb-6 border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1">
                <Label className="text-sm font-medium">Tahun Pelajaran</Label>
                <Input
                  type="text"
                  value={selectedTahunPelajaran}
                  onChange={(e) => setSelectedTahunPelajaran(e.target.value)}
                  placeholder="2025/2026"
                  className="mt-2"
                />
              </div>
              <Button onClick={fetchCards} variant="outline">
                Terapkan
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Form Tambah/Edit */}
        {isAddingNew && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Card className="border-none shadow-md">
              <CardHeader className="bg-blue-50 border-b">
                <CardTitle className="text-base">
                  {editingId ? "Edit Kartu" : "Buat Kartu"} {roleConfig.label}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Pilih {roleConfig.label}</Label>
                      <select
                        value={formData.userId}
                        onChange={(e) =>
                          setFormData({ ...formData, userId: e.target.value })
                        }
                        className="mt-2 w-full px-3 py-2 border border-slate-300 rounded-md"
                      >
                        <option value="">-- Pilih --</option>
                        {users
                          .filter(
                            (u) =>
                              !cards.some(
                                (c) =>
                                  c.userId === u.id &&
                                  c.tahunPelajaran === selectedTahunPelajaran &&
                                  c.id !== editingId,
                              ),
                          )
                          .map((user) => (
                            <option key={user.id} value={user.id}>
                              {user.fullName}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div>
                      <Label>Nomor Urut Kartu</Label>
                      <Input
                        type="text"
                        value={formData.nomorUrut}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            nomorUrut: e.target.value,
                          })
                        }
                        placeholder="001, 002, dst"
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>NIP</Label>
                      <Input
                        type="text"
                        value={formData.nip}
                        onChange={(e) =>
                          setFormData({ ...formData, nip: e.target.value })
                        }
                        placeholder="Nomor Identitas Pegawai (opsional)"
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>Jabatan</Label>
                      <Input
                        type="text"
                        value={formData.jabatan}
                        onChange={(e) =>
                          setFormData({ ...formData, jabatan: e.target.value })
                        }
                        placeholder="Contoh: Kepala Sekolah, Guru Kelas 1 (opsional)"
                        className="mt-2"
                      />
                    </div>

                    {selectedRole === "TENAGA_KEPENDIDIKAN" && (
                      <div>
                        <Label>Departemen</Label>
                        <Input
                          type="text"
                          value={formData.departemen}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              departemen: e.target.value,
                            })
                          }
                          placeholder="Contoh: Administrasi, Perpustakaan"
                          className="mt-2"
                        />
                      </div>
                    )}

                    <div className="md:col-span-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.statusAktif}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              statusAktif: e.target.checked,
                            })
                          }
                          className="w-4 h-4"
                        />
                        <span className="text-sm">Kartu aktif</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end">
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Batal
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="bg-blue-600"
                    >
                      {editingId ? "Perbarui" : "Buat"} Kartu
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Search */}
        <Card className="mb-6 border-none shadow-sm">
          <CardContent className="p-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-3 text-slate-400"
                size={18}
              />
              <Input
                placeholder="Cari nama atau nomor urut..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="border-none shadow-md overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b">
            <CardTitle className="text-base">
              Daftar Kartu {roleConfig.label} ({filteredCards.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead>No Urut</TableHead>
                    <TableHead>Nama Lengkap</TableHead>
                    <TableHead>NIP</TableHead>
                    <TableHead>Jabatan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Cetak</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCards.length > 0 ? (
                    filteredCards.map((card, index) => (
                      <TableRow
                        key={card.id}
                        className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}
                      >
                        <TableCell className="font-semibold">
                          {card.nomorUrut}
                        </TableCell>
                        <TableCell>{card.user.fullName}</TableCell>
                        <TableCell className="font-mono text-sm">
                          {card.nip || "—"}
                        </TableCell>
                        <TableCell>{card.jabatan || "—"}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              card.statusAktif
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {card.statusAktif ? "Aktif" : "Nonaktif"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <button
                            onClick={() => handlePrint(card.id)}
                            className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-xs hover:bg-purple-200 flex items-center gap-1"
                          >
                            <PrinterIcon size={14} />
                            {card.jumlah_cetak}x
                          </button>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(card)}
                              className="p-1 hover:bg-blue-100 rounded text-blue-600"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(card.id)}
                              className="p-1 hover:bg-red-100 rounded text-red-600"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <p className="text-slate-500">
                          Tidak ada kartu. Buat yang baru untuk memulai.
                        </p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
