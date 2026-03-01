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
  Newspaper,
  Plus,
  Edit2,
  Trash2,
  ChevronLeft,
  Trophy,
  FileText,
} from "lucide-react";
import { INNOVATIONS } from "@/lib/constants";

interface Innovation {
  id: number;
  title: string;
  description: string;
  benefits: string;
  year: string;
}

export default function AdminInovasi() {
  const [innovations, setInnovations] = useState<Innovation[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    benefits: "",
    year: new Date().getFullYear().toString(),
  });

  useEffect(() => {
    fetchInnovations();
  }, []);

  const fetchInnovations = async () => {
    try {
      const res = await fetch("/api/inovasi", { credentials: "include" });
      const data = await res.json();
      if (res.ok && data.data) {
        const list: Innovation[] = data.data.map((i: any) => ({
          id: i.id,
          title: i.judul,
          description: i.deskripsi,
          benefits: i.tujuan || "",
          year: new Date(i.createdAt).getFullYear().toString(),
        }));
        setInnovations(list);
      }
    } catch (err) {
      console.error("fetchInnovations error", err);
    }
  };

  const handleAdd = async () => {
    if (!formData.title || !formData.description) return;
    try {
      const res = await fetch("/api/inovasi", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          judul: formData.title,
          deskripsi: formData.description,
          tujuan: formData.benefits,
        }),
      });
      const result = await res.json();
      if (res.ok) {
        fetchInnovations();
        resetForm();
      } else {
        console.error("add innovation error", result);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (id: number) => {
    const item = innovations.find((i) => i.id === id);
    if (item) {
      setFormData({
        title: item.title,
        description: item.description,
        benefits: item.benefits,
        year: item.year,
      });
      setEditingId(id);
      setIsAddingNew(true);
    }
  };

  const handleUpdate = async () => {
    if (!formData.title || !formData.description || editingId == null) return;
    try {
      const res = await fetch(`/api/inovasi/${editingId}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          judul: formData.title,
          deskripsi: formData.description,
          tujuan: formData.benefits,
        }),
      });
      const result = await res.json();
      if (res.ok) {
        fetchInnovations();
        resetForm();
      } else {
        console.error("update innovation error", result);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/inovasi/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        fetchInnovations();
      } else {
        const result = await res.json();
        console.error("delete innovation error", result);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      benefits: "",
      year: new Date().getFullYear().toString(),
    });
    setEditingId(null);
    setIsAddingNew(false);
  };

  const filteredInnovations = innovations.filter(
    (i) =>
      i.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.description.toLowerCase().includes(searchTerm.toLowerCase()),
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
              <Newspaper className="text-purple-600" />
              Kelola Inovasi
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Tambah, edit, atau hapus inovasi program sekolah
            </p>
          </div>
        </div>
        <Button
          onClick={() => setIsAddingNew(true)}
          className="gap-2 bg-purple-600 hover:bg-purple-700"
        >
          <Plus size={16} />
          Tambah Inovasi
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
                  {editingId ? "Edit Inovasi" : "Tambah Inovasi Baru"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Judul
                  </label>
                  <Input
                    placeholder="Judul inovasi"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Deskripsi
                  </label>
                  <textarea
                    placeholder="Deskripsi inovasi"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="mt-1 w-full p-3 border rounded-lg text-sm"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Manfaat
                  </label>
                  <textarea
                    placeholder="Manfaat inovasi ini"
                    value={formData.benefits}
                    onChange={(e) =>
                      setFormData({ ...formData, benefits: e.target.value })
                    }
                    className="mt-1 w-full p-3 border rounded-lg text-sm"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Tahun
                  </label>
                  <Input
                    type="number"
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({ ...formData, year: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={editingId ? handleUpdate : handleAdd}
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
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
              <CardTitle>Daftar Inovasi</CardTitle>
              <CardDescription>
                Total: {filteredInnovations.length} inovasi
              </CardDescription>
              <Input
                placeholder="Cari inovasi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mt-4"
              />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredInnovations.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText
                      className="mx-auto text-slate-300 mb-3"
                      size={32}
                    />
                    <p className="text-slate-500">Tidak ada inovasi</p>
                  </div>
                ) : (
                  filteredInnovations.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-slate-900">
                            {item.title}
                          </h3>
                          <p className="text-sm text-slate-600 line-clamp-2 mt-1">
                            {item.description}
                          </p>
                          {item.benefits && (
                            <div className="mt-2 text-xs text-slate-500 flex items-center gap-1">
                              <Trophy size={14} className="text-purple-600" />
                              <span className="line-clamp-1">
                                {item.benefits}
                              </span>
                            </div>
                          )}
                          <span className="inline-block mt-3 px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded font-medium">
                            {item.year}
                          </span>
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
