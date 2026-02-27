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
  Award,
  Plus,
  Edit2,
  Trash2,
  ChevronLeft,
  FileText,
  User,
  BookOpen,
} from "lucide-react";
import { STUDENT_DATA } from "@/lib/constants";

interface Student {
  id: number;
  nisn: string;
  name: string;
  class: string;
  gender: string;
}

export default function AdminSiswa() {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState({
    nisn: "",
    name: "",
    class: "Kelas 1",
    gender: "Laki-laki",
  });

  const classOptions = [
    "Kelas 1",
    "Kelas 2",
    "Kelas 3",
    "Kelas 4",
    "Kelas 5",
    "Kelas 6",
  ];

  useEffect(() => {
    const stored = localStorage.getItem("students");
    if (stored) {
      setStudents(JSON.parse(stored));
    } else {
      const initial: Student[] = [];
      let id = 1;
      STUDENT_DATA.byGrade.forEach((grade) => {
        for (let i = 0; i < grade.total; i++) {
          initial.push({
            id: id++,
            nisn: `${grade.grade.match(/\d+/)?.[0] || "1"}.${i.toString().padStart(4, "0")}`,
            name: `Siswa ${i + 1} ${grade.grade}`,
            class: grade.grade,
            gender: i % 2 === 0 ? "Laki-laki" : "Perempuan",
          });
        }
      });
      setStudents(initial.slice(0, 20));
      localStorage.setItem("students", JSON.stringify(initial.slice(0, 20)));
    }
  }, []);

  const handleAdd = () => {
    if (!formData.nisn || !formData.name) return;

    const newStudent: Student = {
      id: Math.max(...students.map((s) => s.id), 0) + 1,
      ...formData,
    };

    const updated = [newStudent, ...students];
    setStudents(updated);
    localStorage.setItem("students", JSON.stringify(updated));
    resetForm();
  };

  const handleEdit = (id: number) => {
    const item = students.find((s) => s.id === id);
    if (item) {
      setFormData({
        nisn: item.nisn,
        name: item.name,
        class: item.class,
        gender: item.gender,
      });
      setEditingId(id);
      setIsAddingNew(true);
    }
  };

  const handleUpdate = () => {
    if (!formData.nisn || !formData.name) return;

    const updated = students.map((s) =>
      s.id === editingId ? { ...s, ...formData } : s,
    );

    setStudents(updated);
    localStorage.setItem("students", JSON.stringify(updated));
    resetForm();
  };

  const handleDelete = (id: number) => {
    const updated = students.filter((s) => s.id !== id);
    setStudents(updated);
    localStorage.setItem("students", JSON.stringify(updated));
  };

  const resetForm = () => {
    setFormData({
      nisn: "",
      name: "",
      class: "Kelas 1",
      gender: "Laki-laki",
    });
    setEditingId(null);
    setIsAddingNew(false);
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.nisn.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const classCounts = classOptions.map(
    (cls) => students.filter((s) => s.class === cls).length,
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
              <Award className="text-red-600" />
              Kelola Data Siswa
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Tambah, edit, atau hapus data peserta didik
            </p>
          </div>
        </div>
        <Button
          onClick={() => setIsAddingNew(true)}
          className="gap-2 bg-red-600 hover:bg-red-700"
        >
          <Plus size={16} />
          Tambah Siswa
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
      >
        {classOptions.map((cls, idx) => (
          <Card key={cls} className="shadow-sm">
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">
                  {classCounts[idx]}
                </p>
                <p className="text-xs text-slate-600 mt-1">{cls}</p>
              </div>
            </CardContent>
          </Card>
        ))}
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
                  {editingId ? "Edit Data Siswa" : "Tambah Siswa Baru"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    NISN
                  </label>
                  <Input
                    placeholder="Nomor Induk Siswa Nasional"
                    value={formData.nisn}
                    onChange={(e) =>
                      setFormData({ ...formData, nisn: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Nama Lengkap
                  </label>
                  <Input
                    placeholder="Nama lengkap siswa"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Kelas
                  </label>
                  <select
                    value={formData.class}
                    onChange={(e) =>
                      setFormData({ ...formData, class: e.target.value })
                    }
                    className="mt-1 w-full p-2 border rounded-lg text-sm"
                  >
                    {classOptions.map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Jenis Kelamin
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                    className="mt-1 w-full p-2 border rounded-lg text-sm"
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={editingId ? handleUpdate : handleAdd}
                    className="flex-1 bg-red-600 hover:bg-red-700"
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
              <CardTitle>Daftar Siswa</CardTitle>
              <CardDescription>
                Total: {filteredStudents.length} siswa (ditampilkan)
              </CardDescription>
              <Input
                placeholder="Cari nama atau NISN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mt-4"
              />
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredStudents.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText
                      className="mx-auto text-slate-300 mb-3"
                      size={32}
                    />
                    <p className="text-slate-500">Tidak ada siswa</p>
                  </div>
                ) : (
                  filteredStudents.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.02 }}
                      className="p-3 border rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <User
                              size={16}
                              className={
                                item.gender === "Laki-laki"
                                  ? "text-blue-600"
                                  : "text-pink-600"
                              }
                            />
                            <h3 className="font-semibold text-slate-900 text-sm">
                              {item.name}
                            </h3>
                          </div>
                          <div className="ml-6 mt-1 flex items-center gap-3 text-xs text-slate-500">
                            <span>NISN: {item.nisn}</span>
                            <span className="flex items-center gap-1">
                              <BookOpen size={12} />
                              {item.class}
                            </span>
                            <span>{item.gender}</span>
                          </div>
                        </div>
                        <div className="flex gap-1 ml-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(item.id)}
                            className="gap-1 h-8 px-2"
                          >
                            <Edit2 size={12} />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(item.id)}
                            className="gap-1 text-red-600 hover:text-red-700 h-8 px-2"
                          >
                            <Trash2 size={12} />
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
