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
  Download,
  Plus,
  Edit2,
  Trash2,
  ChevronLeft,
  FileText,
  FileIcon,
} from "lucide-react";
import { DOWNLOADS } from "@/lib/constants";

interface DownloadItem {
  id: number;
  title: string;
  description: string;
  category: string;
  fileSize: string;
  fileType: string;
}

export default function AdminDownload() {
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Dokumen Sekolah",
    fileSize: "1.2 MB",
    fileType: "PDF",
  });

  useEffect(() => {
    const stored = localStorage.getItem("downloads");
    if (stored) {
      setDownloads(JSON.parse(stored));
    } else {
      const initial = DOWNLOADS.map((d, idx) => ({
        id: idx + 1,
        title: d.title,
        description: d.category || "Dokumen",
        category: d.category,
        fileSize: d.size,
        fileType: d.type,
      }));
      setDownloads(initial);
      localStorage.setItem("downloads", JSON.stringify(initial));
    }
  }, []);

  const handleAdd = () => {
    if (!formData.title) return;

    const newDownload: DownloadItem = {
      id: Math.max(...downloads.map((d) => d.id), 0) + 1,
      ...formData,
    };

    const updated = [newDownload, ...downloads];
    setDownloads(updated);
    localStorage.setItem("downloads", JSON.stringify(updated));
    resetForm();
  };

  const handleEdit = (id: number) => {
    const item = downloads.find((d) => d.id === id);
    if (item) {
      setFormData({
        title: item.title,
        description: item.description,
        category: item.category,
        fileSize: item.fileSize,
        fileType: item.fileType,
      });
      setEditingId(id);
      setIsAddingNew(true);
    }
  };

  const handleUpdate = () => {
    if (!formData.title) return;

    const updated = downloads.map((d) =>
      d.id === editingId ? { ...d, ...formData } : d,
    );

    setDownloads(updated);
    localStorage.setItem("downloads", JSON.stringify(updated));
    resetForm();
  };

  const handleDelete = (id: number) => {
    const updated = downloads.filter((d) => d.id !== id);
    setDownloads(updated);
    localStorage.setItem("downloads", JSON.stringify(updated));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "Dokumen Sekolah",
      fileSize: "1.2 MB",
      fileType: "PDF",
    });
    setEditingId(null);
    setIsAddingNew(false);
  };

  const filteredDownloads = downloads.filter(
    (d) =>
      d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.description.toLowerCase().includes(searchTerm.toLowerCase()),
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
              <Download className="text-cyan-600" />
              Kelola Download
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Tambah, edit, atau hapus file yang dapat diunduh
            </p>
          </div>
        </div>
        <Button
          onClick={() => setIsAddingNew(true)}
          className="gap-2 bg-cyan-600 hover:bg-cyan-700"
        >
          <Plus size={16} />
          Tambah File
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
                  {editingId ? "Edit File" : "Tambah File Baru"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Nama File
                  </label>
                  <Input
                    placeholder="Nama file"
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
                    placeholder="Deskripsi file"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="mt-1 w-full p-3 border rounded-lg text-sm"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Kategori
                  </label>
                  <Input
                    placeholder="Kategori"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Ukuran File
                    </label>
                    <Input
                      placeholder="1.2 MB"
                      value={formData.fileSize}
                      onChange={(e) =>
                        setFormData({ ...formData, fileSize: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Tipe File
                    </label>
                    <Input
                      placeholder="PDF"
                      value={formData.fileType}
                      onChange={(e) =>
                        setFormData({ ...formData, fileType: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={editingId ? handleUpdate : handleAdd}
                    className="flex-1 bg-cyan-600 hover:bg-cyan-700"
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
              <CardTitle>Daftar File</CardTitle>
              <CardDescription>
                Total: {filteredDownloads.length} file
              </CardDescription>
              <Input
                placeholder="Cari file..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mt-4"
              />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredDownloads.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText
                      className="mx-auto text-slate-300 mb-3"
                      size={32}
                    />
                    <p className="text-slate-500">Tidak ada file</p>
                  </div>
                ) : (
                  filteredDownloads.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 flex items-start gap-3">
                          <div className="p-2 bg-cyan-100 rounded-lg">
                            <FileIcon size={20} className="text-cyan-600" />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900">
                              {item.title}
                            </h3>
                            <p className="text-sm text-slate-600 line-clamp-1 mt-1">
                              {item.description}
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 flex-wrap">
                              <span className="px-2 py-1 bg-slate-100 rounded">
                                {item.category}
                              </span>
                              <span>{item.fileType}</span>
                              <span>{item.fileSize}</span>
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
