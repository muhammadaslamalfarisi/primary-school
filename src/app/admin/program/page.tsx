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
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  ChevronLeft,
  FileText,
  Tag,
} from "lucide-react";
import { PROGRAMS } from "@/lib/constants";

interface Program {
  id: number;
  name: string;
  description: string;
  slug: string;
  color: string;
}

export default function AdminProgram() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    slug: "",
    color: "bg-blue-100",
  });

  const colorOptions = [
    "bg-blue-100",
    "bg-purple-100",
    "bg-pink-100",
    "bg-green-100",
    "bg-yellow-100",
    "bg-red-100",
  ];

  useEffect(() => {
    const stored = localStorage.getItem("programs");
    if (stored) {
      setPrograms(JSON.parse(stored));
    } else {
      const initial = PROGRAMS.map((p, idx) => ({
        id: idx + 1,
        name: p.title,
        description: p.description,
        slug: p.slug,
        color: p.color,
      }));
      setPrograms(initial);
      localStorage.setItem("programs", JSON.stringify(initial));
    }
  }, []);

  const handleAdd = () => {
    if (!formData.name || !formData.slug) return;

    const newProgram: Program = {
      id: Math.max(...programs.map((p) => p.id), 0) + 1,
      ...formData,
    };

    const updated = [newProgram, ...programs];
    setPrograms(updated);
    localStorage.setItem("programs", JSON.stringify(updated));
    resetForm();
  };

  const handleEdit = (id: number) => {
    const item = programs.find((p) => p.id === id);
    if (item) {
      setFormData({
        name: item.name,
        description: item.description,
        slug: item.slug,
        color: item.color,
      });
      setEditingId(id);
      setIsAddingNew(true);
    }
  };

  const handleUpdate = () => {
    if (!formData.name || !formData.slug) return;

    const updated = programs.map((p) =>
      p.id === editingId ? { ...p, ...formData } : p,
    );

    setPrograms(updated);
    localStorage.setItem("programs", JSON.stringify(updated));
    resetForm();
  };

  const handleDelete = (id: number) => {
    const updated = programs.filter((p) => p.id !== id);
    setPrograms(updated);
    localStorage.setItem("programs", JSON.stringify(updated));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      slug: "",
      color: "bg-blue-100",
    });
    setEditingId(null);
    setIsAddingNew(false);
  };

  const filteredPrograms = programs.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()),
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
              <BookOpen className="text-pink-600" />
              Kelola Program
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Tambah, edit, atau hapus program pendidikan sekolah
            </p>
          </div>
        </div>
        <Button
          onClick={() => setIsAddingNew(true)}
          className="gap-2 bg-pink-600 hover:bg-pink-700"
        >
          <Plus size={16} />
          Tambah Program
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
                  {editingId ? "Edit Program" : "Tambah Program Baru"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Nama Program
                  </label>
                  <Input
                    placeholder="Nama program"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Slug (URL)
                  </label>
                  <Input
                    placeholder="slug-program"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Deskripsi
                  </label>
                  <textarea
                    placeholder="Deskripsi program"
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
                    Warna Badge
                  </label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color}
                        onClick={() => setFormData({ ...formData, color })}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          formData.color === color
                            ? "border-slate-900"
                            : "border-transparent"
                        } ${color}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={editingId ? handleUpdate : handleAdd}
                    className="flex-1 bg-pink-600 hover:bg-pink-700"
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
              <CardTitle>Daftar Program</CardTitle>
              <CardDescription>
                Total: {filteredPrograms.length} program
              </CardDescription>
              <Input
                placeholder="Cari program..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mt-4"
              />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredPrograms.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText
                      className="mx-auto text-slate-300 mb-3"
                      size={32}
                    />
                    <p className="text-slate-500">Tidak ada program</p>
                  </div>
                ) : (
                  filteredPrograms.map((item, index) => (
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
                            <h3 className="font-bold text-slate-900">
                              {item.name}
                            </h3>
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${item.color}`}
                            >
                              Badge
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 line-clamp-2 mt-1">
                            {item.description}
                          </p>
                          <div className="mt-3 flex items-center gap-1 text-xs text-slate-500">
                            <Tag size={14} />
                            <code className="font-mono">/{item.slug}</code>
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
