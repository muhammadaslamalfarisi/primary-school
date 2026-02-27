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
  Mail,
  Plus,
  Edit2,
  Trash2,
  ChevronLeft,
  CalendarDays,
  MapPin,
  FileText,
} from "lucide-react";
import { INVITATIONS } from "@/lib/constants";

interface Invitation {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  place: string;
}

export default function AdminUndangan() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    time: "09:00",
    place: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("invitations");
    if (stored) {
      setInvitations(JSON.parse(stored));
    } else {
      const initial = INVITATIONS.map((i, idx) => ({
        id: idx + 1,
        title: i.title,
        description: i.description,
        date: i.date,
        time: i.time,
        place: i.place,
      }));
      setInvitations(initial);
      localStorage.setItem("invitations", JSON.stringify(initial));
    }
  }, []);

  const handleAdd = () => {
    if (!formData.title || !formData.description) return;

    const newInvitation: Invitation = {
      id: Math.max(...invitations.map((i) => i.id), 0) + 1,
      ...formData,
    };

    const updated = [newInvitation, ...invitations];
    setInvitations(updated);
    localStorage.setItem("invitations", JSON.stringify(updated));
    resetForm();
  };

  const handleEdit = (id: number) => {
    const item = invitations.find((i) => i.id === id);
    if (item) {
      setFormData({
        title: item.title,
        description: item.description,
        date: item.date,
        time: item.time,
        place: item.place,
      });
      setEditingId(id);
      setIsAddingNew(true);
    }
  };

  const handleUpdate = () => {
    if (!formData.title || !formData.description) return;

    const updated = invitations.map((i) =>
      i.id === editingId ? { ...i, ...formData } : i,
    );

    setInvitations(updated);
    localStorage.setItem("invitations", JSON.stringify(updated));
    resetForm();
  };

  const handleDelete = (id: number) => {
    const updated = invitations.filter((i) => i.id !== id);
    setInvitations(updated);
    localStorage.setItem("invitations", JSON.stringify(updated));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      time: "09:00",
      place: "",
    });
    setEditingId(null);
    setIsAddingNew(false);
  };

  const filteredInvitations = invitations.filter(
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
              <Mail className="text-emerald-600" />
              Kelola Undangan
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Tambah, edit, atau hapus undangan acara sekolah
            </p>
          </div>
        </div>
        <Button
          onClick={() => setIsAddingNew(true)}
          className="gap-2 bg-emerald-600 hover:bg-emerald-700"
        >
          <Plus size={16} />
          Tambah Undangan
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
                  {editingId ? "Edit Undangan" : "Tambah Undangan Baru"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Judul
                  </label>
                  <Input
                    placeholder="Judul undangan"
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
                    placeholder="Deskripsi undangan"
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

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Waktu
                  </label>
                  <Input
                    type="time"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Lokasi
                  </label>
                  <Input
                    placeholder="Lokasi acara"
                    value={formData.place}
                    onChange={(e) =>
                      setFormData({ ...formData, place: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={editingId ? handleUpdate : handleAdd}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700"
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
              <CardTitle>Daftar Undangan</CardTitle>
              <CardDescription>
                Total: {filteredInvitations.length} undangan
              </CardDescription>
              <Input
                placeholder="Cari undangan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mt-4"
              />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredInvitations.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText
                      className="mx-auto text-slate-300 mb-3"
                      size={32}
                    />
                    <p className="text-slate-500">Tidak ada undangan</p>
                  </div>
                ) : (
                  filteredInvitations.map((item, index) => (
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
                          <div className="flex items-center gap-4 mt-3 text-xs text-slate-500 flex-wrap">
                            <span className="flex items-center gap-1">
                              <CalendarDays size={14} />
                              {new Date(item.date).toLocaleDateString("id-ID")}
                            </span>
                            <span className="flex items-center gap-1">
                              <CalendarDays size={14} />
                              {item.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin size={14} />
                              {item.place}
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
