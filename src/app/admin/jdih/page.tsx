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
  Gavel,
  Plus,
  Edit2,
  Trash2,
  ChevronLeft,
  FileText,
  Scale,
} from "lucide-react";
import { LEGAL_DOCS } from "@/lib/constants";

interface LegalDoc {
  id: number;
  title: string;
  description: string;
  category: string;
  year: string;
}

export default function AdminJDIH() {
  const [docs, setDocs] = useState<LegalDoc[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Peraturan",
    year: new Date().getFullYear().toString(),
  });

  const categoryOptions = [
    "Peraturan",
    "Keputusan",
    "Instruksi",
    "Surat Edaran",
  ];

  useEffect(() => {
    const stored = localStorage.getItem("legaldocs");
    if (stored) {
      setDocs(JSON.parse(stored));
    } else {
      const initial = LEGAL_DOCS.map((doc, idx) => ({
        id: idx + 1,
        title: doc.title,
        description: doc.description,
        category: doc.category,
        year: "2024",
      }));
      setDocs(initial);
      localStorage.setItem("legaldocs", JSON.stringify(initial));
    }
  }, []);

  const handleAdd = () => {
    if (!formData.title) return;

    const newDoc: LegalDoc = {
      id: Math.max(...docs.map((d) => d.id), 0) + 1,
      ...formData,
    };

    const updated = [newDoc, ...docs];
    setDocs(updated);
    localStorage.setItem("legaldocs", JSON.stringify(updated));
    resetForm();
  };

  const handleEdit = (id: number) => {
    const item = docs.find((d) => d.id === id);
    if (item) {
      setFormData({
        title: item.title,
        description: item.description,
        category: item.category,
        year: item.year,
      });
      setEditingId(id);
      setIsAddingNew(true);
    }
  };

  const handleUpdate = () => {
    if (!formData.title) return;

    const updated = docs.map((d) =>
      d.id === editingId ? { ...d, ...formData } : d,
    );

    setDocs(updated);
    localStorage.setItem("legaldocs", JSON.stringify(updated));
    resetForm();
  };

  const handleDelete = (id: number) => {
    const updated = docs.filter((d) => d.id !== id);
    setDocs(updated);
    localStorage.setItem("legaldocs", JSON.stringify(updated));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "Peraturan",
      year: new Date().getFullYear().toString(),
    });
    setEditingId(null);
    setIsAddingNew(false);
  };

  const filteredDocs = docs.filter(
    (d) =>
      d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Peraturan: "bg-indigo-100 text-indigo-700",
      Keputusan: "bg-blue-100 text-blue-700",
      Instruksi: "bg-purple-100 text-purple-700",
      "Surat Edaran": "bg-violet-100 text-violet-700",
    };
    return colors[category] || "bg-slate-100 text-slate-700";
  };

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
              <Gavel className="text-indigo-600" />
              Kelola JDIH
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Jaringan Dokumentasi dan Informasi Hukum
            </p>
          </div>
        </div>
        <Button
          onClick={() => setIsAddingNew(true)}
          className="gap-2 bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus size={16} />
          Tambah Dokumen
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
                  {editingId ? "Edit Dokumen" : "Tambah Dokumen Baru"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Judul
                  </label>
                  <Input
                    placeholder="Judul dokumen"
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
                    placeholder="Deskripsi dokumen"
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
                    Kategori
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="mt-1 w-full p-2 border rounded-lg text-sm"
                  >
                    {categoryOptions.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
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
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700"
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
              <CardTitle>Daftar Dokumen</CardTitle>
              <CardDescription>
                Total: {filteredDocs.length} dokumen
              </CardDescription>
              <Input
                placeholder="Cari dokumen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mt-4"
              />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredDocs.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText
                      className="mx-auto text-slate-300 mb-3"
                      size={32}
                    />
                    <p className="text-slate-500">Tidak ada dokumen</p>
                  </div>
                ) : (
                  filteredDocs.map((item, index) => (
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
                            <Scale size={18} className="text-indigo-600" />
                            <h3 className="font-bold text-slate-900">
                              {item.title}
                            </h3>
                          </div>
                          <p className="text-sm text-slate-600 line-clamp-1 mt-1 ml-6">
                            {item.description}
                          </p>
                          <div className="flex items-center gap-2 mt-3 ml-6 text-xs text-slate-500">
                            <span
                              className={`px-2 py-1 rounded font-medium ${getCategoryColor(item.category)}`}
                            >
                              {item.category}
                            </span>
                            <span>{item.year}</span>
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
