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
  Settings,
  ChevronLeft,
  Lock,
  User,
  Mail,
  Phone,
  Save,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

interface SettingsData {
  adminName: string;
  adminEmail: string;
  schoolPhone: string;
  schoolEmail: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<SettingsData>({
    adminName: "",
    adminEmail: "",
    schoolPhone: "",
    schoolEmail: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [activeTab, setActiveTab] = useState("profile");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("adminSettings");
    if (stored) {
      const parsed = JSON.parse(stored);
      setSettings((prev) => ({ ...prev, ...parsed }));
    } else {
      setSettings((prev) => ({
        ...prev,
        adminName: localStorage.getItem("adminName") || "Administrator",
      }));
    }
  }, []);

  const handleProfileSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem(
        "adminSettings",
        JSON.stringify({
          adminName: settings.adminName,
          adminEmail: settings.adminEmail,
          schoolPhone: settings.schoolPhone,
          schoolEmail: settings.schoolEmail,
        }),
      );
      localStorage.setItem("adminName", settings.adminName);
      setMessage({ type: "success", text: "Profil berhasil disimpan!" });
      setIsSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }, 1000);
  };

  const handlePasswordChange = () => {
    if (!settings.oldPassword || !settings.newPassword) {
      setMessage({ type: "error", text: "Silakan isi semua field password!" });
      return;
    }

    if (settings.newPassword !== settings.confirmPassword) {
      setMessage({ type: "error", text: "Password baru tidak cocok!" });
      return;
    }

    if (settings.oldPassword !== "admin123") {
      setMessage({ type: "error", text: "Password lama salah!" });
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem("adminPassword", settings.newPassword);
      setMessage({ type: "success", text: "Password berhasil diubah!" });
      setSettings((prev) => ({
        ...prev,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      setIsSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center gap-4"
      >
        <Link href="/admin/dashboard">
          <Button variant="outline" size="sm" className="gap-2">
            <ChevronLeft size={16} />
            Kembali
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <Settings className="text-slate-600" />
            Pengaturan Admin
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Kelola pengaturan akun dan sistem
          </p>
        </div>
      </motion.div>

      {/* Message Alert */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
            message.type === "success"
              ? "bg-green-50 border border-green-200 text-green-700"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          <span>{message.text}</span>
        </motion.div>
      )}

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex gap-4 mb-8 border-b border-slate-200"
      >
        <button
          onClick={() => setActiveTab("profile")}
          className={`pb-4 px-4 font-medium border-b-2 transition-colors ${
            activeTab === "profile"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <User size={18} className="inline mr-2" />
          Profil
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={`pb-4 px-4 font-medium border-b-2 transition-colors ${
            activeTab === "security"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <Lock size={18} className="inline mr-2" />
          Keamanan
        </button>
      </motion.div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-2xl"
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Informasi Profil Admin</CardTitle>
              <CardDescription>
                Perbarui data profil dan kontak sekolah Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Admin Info */}
              <div className="space-y-4 pb-6 border-b border-slate-200">
                <h3 className="font-semibold text-slate-900">
                  Data Administrator
                </h3>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Nama Admin
                  </label>
                  <div className="relative mt-2">
                    <User
                      className="absolute left-3 top-3 text-slate-400"
                      size={18}
                    />
                    <Input
                      placeholder="Nama administrator"
                      value={settings.adminName}
                      onChange={(e) =>
                        setSettings({ ...settings, adminName: e.target.value })
                      }
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Email Admin
                  </label>
                  <div className="relative mt-2">
                    <Mail
                      className="absolute left-3 top-3 text-slate-400"
                      size={18}
                    />
                    <Input
                      type="email"
                      placeholder="email@sekolah.com"
                      value={settings.adminEmail}
                      onChange={(e) =>
                        setSettings({ ...settings, adminEmail: e.target.value })
                      }
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              {/* School Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-900">Data Sekolah</h3>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Nomor Telepon Sekolah
                  </label>
                  <div className="relative mt-2">
                    <Phone
                      className="absolute left-3 top-3 text-slate-400"
                      size={18}
                    />
                    <Input
                      placeholder="(0254) 123456"
                      value={settings.schoolPhone}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          schoolPhone: e.target.value,
                        })
                      }
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Email Sekolah
                  </label>
                  <div className="relative mt-2">
                    <Mail
                      className="absolute left-3 top-3 text-slate-400"
                      size={18}
                    />
                    <Input
                      type="email"
                      placeholder="info@sekolah.com"
                      value={settings.schoolEmail}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          schoolEmail: e.target.value,
                        })
                      }
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <Button
                onClick={handleProfileSave}
                disabled={isSaving}
                className="w-full gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Save size={18} />
                {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-2xl"
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Keamanan Akun</CardTitle>
              <CardDescription>
                Ubah password akun administrator Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Password Lama
                </label>
                <div className="relative mt-2">
                  <Lock
                    className="absolute left-3 top-3 text-slate-400"
                    size={18}
                  />
                  <Input
                    type="password"
                    placeholder="Masukkan password lama"
                    value={settings.oldPassword}
                    onChange={(e) =>
                      setSettings({ ...settings, oldPassword: e.target.value })
                    }
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Password Baru
                </label>
                <div className="relative mt-2">
                  <Lock
                    className="absolute left-3 top-3 text-slate-400"
                    size={18}
                  />
                  <Input
                    type="password"
                    placeholder="Masukkan password baru"
                    value={settings.newPassword}
                    onChange={(e) =>
                      setSettings({ ...settings, newPassword: e.target.value })
                    }
                    className="pl-10"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Minimal 6 karakter, gunakan kombinasi huruf dan angka
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Konfirmasi Password Baru
                </label>
                <div className="relative mt-2">
                  <Lock
                    className="absolute left-3 top-3 text-slate-400"
                    size={18}
                  />
                  <Input
                    type="password"
                    placeholder="Konfirmasi password baru"
                    value={settings.confirmPassword}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Info Box */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-700">
                💡 Password demo saat ini: <code>admin123</code>
              </div>

              {/* Change Button */}
              <Button
                onClick={handlePasswordChange}
                disabled={isSaving}
                className="w-full gap-2 bg-red-600 hover:bg-red-700"
              >
                <Lock size={18} />
                {isSaving ? "Mengubah..." : "Ubah Password"}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
