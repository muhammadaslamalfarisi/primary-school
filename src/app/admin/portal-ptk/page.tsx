"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Lock,
  User,
  Save,
  Shield,
  AlertCircle,
  CheckCircle2,
  Edit2,
  Trash2,
  Plus,
} from "lucide-react";

interface PTKCredential {
  id: string;
  username: string;
  password: string;
  active: boolean;
  createdAt: string;
}

export default function PortalPTKPage() {
  const router = useRouter();
  const [isAuthed, setIsAuthed] = useState(false);
  const [credentials, setCredentials] = useState<PTKCredential[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success",
  );
  const [showPassword, setShowPassword] = useState<string | null>(null);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    // Cek authentikasi admin
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      router.push("/admin/login");
    } else {
      setIsAuthed(true);
      loadCredentials();
    }
  }, [router]);

  const loadCredentials = () => {
    const saved = localStorage.getItem("portalPTKCredentials");
    if (saved) {
      setCredentials(JSON.parse(saved));
    } else {
      // Set default credential
      const defaultCred: PTKCredential = {
        id: "1",
        username: "ptk",
        password: "12345",
        active: true,
        createdAt: new Date().toISOString(),
      };
      setCredentials([defaultCred]);
      localStorage.setItem(
        "portalPTKCredentials",
        JSON.stringify([defaultCred]),
      );
    }
  };

  const handleAddNew = () => {
    setForm({ username: "", password: "" });
    setSelectedId(null);
    setIsEditing(true);
  };

  const handleEdit = (id: string) => {
    const cred = credentials.find((c) => c.id === id);
    if (cred) {
      setForm({ username: cred.username, password: cred.password });
      setSelectedId(id);
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    if (!form.username.trim() || !form.password.trim()) {
      setMessage("Username dan password tidak boleh kosong");
      setMessageType("error");
      return;
    }

    if (selectedId) {
      // Update existing
      const updated = credentials.map((c) =>
        c.id === selectedId
          ? { ...c, username: form.username, password: form.password }
          : { ...c, active: false },
      );
      setCredentials(updated);
      localStorage.setItem("portalPTKCredentials", JSON.stringify(updated));
      setMessage("Kredensial berhasil diupdate");
    } else {
      // Add new
      const newCred: PTKCredential = {
        id: Date.now().toString(),
        username: form.username,
        password: form.password,
        active: true,
        createdAt: new Date().toISOString(),
      };
      const updated = [
        ...credentials.map((c) => ({ ...c, active: false })),
        newCred,
      ];
      setCredentials(updated);
      localStorage.setItem("portalPTKCredentials", JSON.stringify(updated));
      setMessage("Kredensial baru berhasil ditambahkan");
    }

    setMessageType("success");
    setIsEditing(false);
    setForm({ username: "", password: "" });
    setSelectedId(null);

    // Clear message after 3 seconds
    setTimeout(() => setMessage(""), 3000);
  };

  const handleDelete = (id: string) => {
    const updated = credentials.filter((c) => c.id !== id);
    if (updated.length === 0) {
      setMessage("Minimal harus ada satu kredensial aktif");
      setMessageType("error");
      return;
    }
    setCredentials(updated);
    localStorage.setItem("portalPTKCredentials", JSON.stringify(updated));
    setMessage("Kredensial berhasil dihapus");
    setMessageType("success");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setForm({ username: "", password: "" });
    setSelectedId(null);
  };

  const setActive = (id: string) => {
    const updated = credentials.map((c) => ({
      ...c,
      active: c.id === id,
    }));
    setCredentials(updated);
    localStorage.setItem("portalPTKCredentials", JSON.stringify(updated));
    setMessage("Kredensial aktif berhasil diubah");
    setMessageType("success");
    setTimeout(() => setMessage(""), 3000);
  };

  if (!isAuthed) return null;

  const activeCredential = credentials.find((c) => c.active);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b py-6 mb-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Shield className="text-blue-600" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              Portal PTK - Manajemen Kredensial
            </h1>
          </div>
          <p className="text-slate-500">
            Kelola username dan password Portal PTK
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4">
        {/* Alert Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-lg border flex items-start gap-3"
          >
            {messageType === "success" ? (
              <>
                <CheckCircle2
                  className="text-emerald-600 flex-shrink-0 mt-0.5"
                  size={20}
                />
                <p className="text-emerald-700 font-medium">{message}</p>
              </>
            ) : (
              <>
                <AlertCircle
                  className="text-red-600 flex-shrink-0 mt-0.5"
                  size={20}
                />
                <p className="text-red-700 font-medium">{message}</p>
              </>
            )}
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Credential Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="bg-linear-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="text-blue-600" size={20} />
                  Kredensial Aktif
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeCredential ? (
                  <>
                    <div>
                      <p className="text-xs text-slate-600 uppercase tracking-wider font-semibold mb-1">
                        Username
                      </p>
                      <p className="text-xl font-bold text-slate-900">
                        {activeCredential.username}
                      </p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-xs text-slate-600 uppercase tracking-wider font-semibold mb-1">
                        Password
                      </p>
                      <p className="text-lg font-mono font-bold text-slate-900">
                        {showPassword === activeCredential.id ? (
                          activeCredential.password
                        ) : (
                          <span>••••••••</span>
                        )}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setShowPassword(
                          showPassword === activeCredential.id
                            ? null
                            : activeCredential.id,
                        )
                      }
                      className="w-full"
                    >
                      {showPassword === activeCredential.id
                        ? "Sembunyikan"
                        : "Tampilkan"}{" "}
                      Password
                    </Button>
                    <div className="pt-2">
                      <Badge className="bg-emerald-100 text-emerald-700 w-full justify-center">
                        ✓ Aktif
                      </Badge>
                    </div>
                  </>
                ) : (
                  <p className="text-slate-500">Belum ada kredensial aktif</p>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Form Tambah/Edit */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle>
                  {isEditing ? "Edit Kredensial" : "Tambah Kredensial Baru"}
                </CardTitle>
                <CardDescription>
                  {isEditing
                    ? "Update kredensial yang ada"
                    : "Atau buat alternatif kredensial baru"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isEditing && (
                  <Button
                    onClick={handleAddNew}
                    className="w-full bg-blue-600 gap-2"
                  >
                    <Plus size={18} />
                    Tambah Kredensial Baru
                  </Button>
                )}

                {isEditing && (
                  <div className="space-y-4 p-4 bg-slate-50 rounded-lg border">
                    <div>
                      <label className="text-sm font-semibold text-slate-700 block mb-2">
                        Username
                      </label>
                      <div className="relative">
                        <User
                          className="absolute left-3 top-3 text-slate-400"
                          size={18}
                        />
                        <Input
                          placeholder="Masukkan username"
                          value={form.username}
                          onChange={(e) =>
                            setForm({ ...form, username: e.target.value })
                          }
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-slate-700 block mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock
                          className="absolute left-3 top-3 text-slate-400"
                          size={18}
                        />
                        <Input
                          type="password"
                          placeholder="Masukkan password"
                          value={form.password}
                          onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                          }
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        onClick={handleSave}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 gap-2"
                      >
                        <Save size={18} />
                        Simpan
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        className="flex-1"
                      >
                        Batal
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Tabel Kredensial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Daftar Semua Kredensial</CardTitle>
              <CardDescription>
                {credentials.length} kredensial tersimpan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Username</TableHead>
                      <TableHead>Password</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-center">Dibuat</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {credentials.map((cred) => (
                      <TableRow key={cred.id}>
                        <TableCell className="font-semibold">
                          {cred.username}
                        </TableCell>
                        <TableCell>
                          <code className="bg-slate-100 px-2 py-1 rounded text-sm">
                            {showPassword === cred.id
                              ? cred.password
                              : "••••••••"}
                          </code>
                        </TableCell>
                        <TableCell className="text-center">
                          {cred.active ? (
                            <Badge className="bg-emerald-100 text-emerald-700">
                              Aktif
                            </Badge>
                          ) : (
                            <Badge variant="outline">Tidak Aktif</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-center text-sm text-slate-500">
                          {new Date(cred.createdAt).toLocaleDateString("id-ID")}
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          {!cred.active && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setActive(cred.id)}
                              className="text-xs"
                            >
                              Aktifkan
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(cred.id)}
                            className="text-blue-600"
                          >
                            <Edit2 size={16} />
                          </Button>
                          {credentials.length > 1 && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDelete(cred.id)}
                              className="text-red-600"
                            >
                              <Trash2 size={16} />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
