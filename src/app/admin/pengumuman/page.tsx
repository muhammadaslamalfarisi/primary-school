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
  Megaphone,
  Plus,
  Edit2,
  Trash2,
  ChevronLeft,
  CalendarDays,
  FileText,
} from "lucide-react";
import { ANNOUNCEMENTS } from "@/lib/constants";

interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  category: string;
}

export default function AdminPengumuman() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    date: new Date().toISOString().split("T")[0],
    category: "Pengumuman",
  });

  useEffect(() => {
    const stored = localStorage.getItem("announcements");
    if (stored) {
      setAnnouncements(JSON.parse(stored));
    } else {
      const initial = ANNOUNCEMENTS.map((a, i) => ({
        id: i + 1,
        title: a.title,
        content: a.content,
        date: a.date,
        category: "Pengumuman",
      }));
      setAnnouncements(initial);
      localStorage.setItem("announcements", JSON.stringify(initial));
    }
  }, []);

  const handleAdd = () => {
    if (!formData.title || !formData.content) return;

    const newAnnouncement: Announcement = {
      id: Math.max(...announcements.map((a) => a.id), 0) + 1,
      ...formData,
    };

    const updated = [newAnnouncement, ...announcements];
    setAnnouncements(updated);
    localStorage.setItem("announcements", JSON.stringify(updated));
    resetForm();
  };

  const handleEdit = (id: number) => {
    const item = announcements.find((a) => a.id === id);
    if (item) {
      setFormData({
        title: item.title,
        content: item.content,
        date: item.date,
        category: item.category,
      });
      setEditingId(id);
      setIsAddingNew(true);
    }
  };

  const handleUpdate = () => {
    if (!formData.title || !formData.content) return;

    const updated = announcements.map((a) =>
      a.id === editingId ? { ...a, ...formData } : a,
    );

    setAnnouncements(updated);
    localStorage.setItem("announcements", JSON.stringify(updated));
    resetForm();
  };

  const handleDelete = (id: number) => {
    const updated = announcements.filter((a) => a.id !== id);
    setAnnouncements(updated);
    localStorage.setItem("announcements", JSON.stringify(updated));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      date: new Date().toISOString().split("T")[0],
      category: "Pengumuman",
    });
    setEditingId(null);
    setIsAddingNew(false);
  };

  const filteredAnnouncements = announcements.filter(
    (a) =>
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.content.toLowerCase().includes(searchTerm.toLowerCase()),
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
              <Megaphone className="text-orange-600" />
              Kelola Pengumuman
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Tambah, edit, atau hapus pengumuman sekolah
            </p>
          </div>
        </div>
        <Button
          onClick={() => setIsAddingNew(true)}
          className="gap-2 bg-orange-600 hover:bg-orange-700"
        >
          <Plus size={16} />
          Tambah Pengumuman
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
                  {editingId ? "Edit Pengumuman" : "Tambah Pengumuman Baru"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Judul
                  </label>
                  <Input
                    placeholder="Judul pengumuman"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Isi Pengumuman
                  </label>
                  <textarea
                    placeholder="Isi pengumuman"
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    className="mt-1 w-full p-3 border rounded-lg text-sm"
                    rows={6}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Tanggal
                  </label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={editingId ? handleUpdate : handleAdd}
                    className="flex-1 bg-orange-600 hover:bg-orange-700"
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
              <CardTitle>Daftar Pengumuman</CardTitle>
              <CardDescription>
                Total: {filteredAnnouncements.length} pengumuman
              </CardDescription>
              <Input
                placeholder="Cari pengumuman..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mt-4"
              />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredAnnouncements.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText
                      className="mx-auto text-slate-300 mb-3"
                      size={32}
                    />
                    <p className="text-slate-500">Tidak ada pengumuman</p>
                  </div>
                ) : (
                  filteredAnnouncements.map((item, index) => (
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
                            {item.content}
                          </p>
                          <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <CalendarDays size={14} />
                              {new Date(item.date).toLocaleDateString("id-ID")}
                            </span>
                            <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded">
                              {item.category}
                            </span>
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
