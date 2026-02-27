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
import {
  Users,
  Plus,
  Edit2,
  Trash2,
  ChevronLeft,
  FileText,
  User,
  BadgeCheck,
} from "lucide-react";
import { PTK_DATA } from "@/lib/constants";

interface PTKItem {
  id: number;
  name: string;
  position: string;
  nip: string;
  qualification: string;
}

export default function AdminPTK() {
  const [ptk, setPTK] = useState<PTKItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    nip: "",
    qualification: "S1",
  });

  useEffect(() => {
    const stored = localStorage.getItem("ptk");
    if (stored) {
      setPTK(JSON.parse(stored));
    } else {
      const initial = PTK_DATA.map((p, idx) => ({
        id: idx + 1,
        name: p.name,
        position: p.position,
        nip: p.nip,
        qualification: p.qualification,
      }));
      setPTK(initial);
      localStorage.setItem("ptk", JSON.stringify(initial));
    }
  }, []);

  const handleAdd = () => {
    if (!formData.name || !formData.nip) return;

    const newPTK: PTKItem = {
      id: Math.max(...ptk.map((p) => p.id), 0) + 1,
      ...formData,
    };

    const updated = [newPTK, ...ptk];
    setPTK(updated);
    localStorage.setItem("ptk", JSON.stringify(updated));
    resetForm();
  };

  const handleEdit = (id: number) => {
    const item = ptk.find((p) => p.id === id);
    if (item) {
      setFormData({
        name: item.name,
        position: item.position,
        nip: item.nip,
        qualification: item.qualification,
      });
      setEditingId(id);
      setIsAddingNew(true);
    }
  };

  const handleUpdate = () => {
    if (!formData.name || !formData.nip) return;

    const updated = ptk.map((p) =>
      p.id === editingId ? { ...p, ...formData } : p,
    );

    setPTK(updated);
    localStorage.setItem("ptk", JSON.stringify(updated));
    resetForm();
  };

  const handleDelete = (id: number) => {
    const updated = ptk.filter((p) => p.id !== id);
    setPTK(updated);
    localStorage.setItem("ptk", JSON.stringify(updated));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      position: "",
      nip: "",
      qualification: "S1",
    });
    setEditingId(null);
    setIsAddingNew(false);
  };

  const filteredPTK = ptk.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.nip.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="sm" className="gap-2">
              <ChevronLeft size={16} />
              Kembali
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
              <Users className="text-violet-600" />
              Kelola PTK
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Data Pendidik dan Tenaga Kependidikan
            </p>
          </div>
        </div>
        <Button
          onClick={() => setIsAddingNew(true)}
          className="gap-2 bg-violet-600 hover:bg-violet-700"
        >
          <Plus size={16} />
          Tambah PTK
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Card */}
        {isAddingNew && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="shadow-lg sticky top-8">
              <CardHeader>
                <CardTitle>
                  {editingId ? "Edit PTK" : "Tambah PTK Baru"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Nama Lengkap
                  </label>
                  <Input
                    placeholder="Nama lengkap"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Jabatan
                  </label>
                  <Input
                    placeholder="Guru, Kepala Sekolah, dll"
                    value={formData.position}
                    onChange={(e) =>
                      setFormData({ ...formData, position: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    NIP
                  </label>
                  <Input
                    placeholder="Nomor Induk Pegawai"
                    value={formData.nip}
                    onChange={(e) =>
                      setFormData({ ...formData, nip: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Pendidikan Terakhir
                  </label>
                  <select
                    value={formData.qualification}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        qualification: e.target.value,
                      })
                    }
                    className="mt-1 w-full p-2 border rounded-lg text-sm"
                  >
                    <option value="SMA">SMA</option>
                    <option value="D3">D3</option>
                    <option value="S1">S1 (Strata 1)</option>
                    <option value="S2">S2 (Strata 2)</option>
                    <option value="S3">S3 (Strata 3)</option>
                  </select>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={editingId ? handleUpdate : handleAdd}
                    className="flex-1 bg-violet-600 hover:bg-violet-700"
                  >
                    {editingId ? "Update" : "Simpan"}
                  </Button>
                  <Button
                    onClick={resetForm}
                    variant="outline"
                    className="flex-1"
                  >
                    Batal
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* List Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className={isAddingNew ? "lg:col-span-2" : "lg:col-span-3"}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Daftar PTK</CardTitle>
              <CardDescription>Total: {filteredPTK.length} PTK</CardDescription>
              <Input
                placeholder="Cari nama atau NIP..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mt-4"
              />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredPTK.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText
                      className="mx-auto text-slate-300 mb-3"
                      size={32}
                    />
                    <p className="text-slate-500">Tidak ada PTK</p>
                  </div>
                ) : (
                  filteredPTK.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <User size={18} className="text-violet-600" />
                            <h3 className="font-bold text-slate-900">
                              {item.name}
                            </h3>
                          </div>
                          <div className="ml-6 mt-2 space-y-1">
                            <p className="text-sm text-slate-600">
                              {item.position}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
                              <span>NIP: {item.nip}</span>
                              <div className="flex items-center gap-1">
                                <BadgeCheck
                                  size={14}
                                  className="text-green-600"
                                />
                                {item.qualification}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(item.id)}
                            className="gap-1"
                          >
                            <Edit2 size={14} />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(item.id)}
                            className="gap-1 text-red-600 hover:text-red-700"
                          >
                            <Trash2 size={14} />
                            Hapus
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
