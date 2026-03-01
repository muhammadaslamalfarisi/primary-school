"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertCircle,
  Check,
  Eye,
  EyeOff,
  Mail,
  User,
  Lock,
} from "lucide-react";

interface AccountCredentialsFormProps {
  userId: string;
  currentEmail: string;
  currentUsername: string;
  onSuccess?: () => void;
}

export const AccountCredentialsForm: React.FC<AccountCredentialsFormProps> = ({
  userId,
  currentEmail,
  currentUsername,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [form, setForm] = useState({
    email: currentEmail,
    username: currentUsername,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const resetMessages = () => {
    setSuccess(false);
    setError("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    resetMessages();
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    resetMessages();

    // Validation
    if (!form.currentPassword) {
      setError("Password saat ini diperlukan untuk keamanan");
      setLoading(false);
      return;
    }

    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      setError("Password baru tidak cocok");
      setLoading(false);
      return;
    }

    if (form.newPassword && form.newPassword.length < 6) {
      setError("Password baru minimal 6 karakter");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/users/${userId}/credentials`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          username: form.username,
          currentPassword: form.currentPassword,
          newPassword: form.newPassword || undefined,
        }),
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Gagal memperbarui kredensial");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setForm({
        ...form,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        setSuccess(false);
        onSuccess?.();
      }, 2000);
    } catch (err) {
      setError("Terjadi kesalahan server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border border-slate-200">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100">
        <CardTitle className="flex items-center gap-2">
          <Lock size={20} className="text-blue-600" />
          Perbarui Kredensial Akun
        </CardTitle>
        <p className="text-sm text-slate-600 mt-1">
          Kelola email, username, dan password Anda
        </p>
      </CardHeader>

      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-3 text-slate-400"
                size={18}
              />
              <Input
                type="email"
                name="email"
                placeholder="Email Anda"
                value={form.email}
                onChange={handleChange}
                className="pl-10 h-10"
                disabled={loading}
              />
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Username
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-3 text-slate-400"
                size={18}
              />
              <Input
                type="text"
                name="username"
                placeholder="Username Anda"
                value={form.username}
                onChange={handleChange}
                className="pl-10 h-10"
                disabled={loading}
              />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-200 my-4 pt-4">
            <p className="text-xs font-semibold text-slate-600 uppercase">
              Perbarui Password
            </p>
          </div>

          {/* Current Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Password Saat Ini <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-3 text-slate-400"
                size={18}
              />
              <Input
                type={showPassword ? "text" : "password"}
                name="currentPassword"
                placeholder="Masukkan password saat ini"
                value={form.currentPassword}
                onChange={handleChange}
                className="pl-10 pr-10 h-10"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Password Baru (Opsional)
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-3 text-slate-400"
                size={18}
              />
              <Input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                placeholder="Masukkan password baru (min. 6 karakter)"
                value={form.newPassword}
                onChange={handleChange}
                className="pl-10 pr-10 h-10"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          {form.newPassword && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Konfirmasi Password Baru
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-3 text-slate-400"
                  size={18}
                />
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Ulangi password baru"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="pl-10 h-10"
                  disabled={loading}
                />
              </div>
            </div>
          )}

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive" className="border-red-300">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Success Alert */}
          {success && (
            <Alert className="border-green-300 bg-green-50">
              <Check className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Kredensial berhasil diperbarui!
              </AlertDescription>
            </Alert>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 h-11 font-semibold"
          >
            {loading ? "Memperbarui..." : "Simpan Perubahan"}
          </Button>
        </form>

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs font-semibold text-slate-700 mb-2">
            🔒 Catatan Keamanan:
          </p>
          <ul className="text-xs text-slate-600 space-y-1">
            <li>• Jangan pernah bagikan password Anda kepada siapa pun</li>
            <li>
              • Gunakan password yang kuat (kombinasi huruf, angka, simbol)
            </li>
            <li>• Ubah password secara berkala untuk keamanan maksimal</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
