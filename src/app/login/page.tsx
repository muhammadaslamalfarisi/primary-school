"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, Mail, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login gagal");
        return;
      }

      setSuccess("Login berhasil! Mengalihkan...");

      // Redirect berdasarkan role
      setTimeout(() => {
        if (data.data.user.role === "SUPER_ADMIN") {
          router.push("/admin/dashboard");
        } else if (data.data.user.role === "PENDIDIK") {
          router.push("/guru/dashboard");
        } else if (data.data.user.role === "TENAGA_KEPENDIDIKAN") {
          router.push("/staff/dashboard");
        } else {
          router.push("/dashboard");
        }
      }, 500);
    } catch (err) {
      setError("Terjadi kesalahan server");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 rounded-full p-3">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Login</h1>
          <p className="text-gray-600">
            Masukkan kredensial Anda untuk melanjutkan
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {error && (
            <Alert className="mb-4 border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-4 border-green-200 bg-green-50">
              <AlertDescription className="text-green-800">
                {success}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label
                htmlFor="email"
                className="text-gray-700 font-medium mb-1 block"
              >
                Email atau Username
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="text"
                  placeholder="Masukkan email atau username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 border-gray-300"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <Label
                htmlFor="password"
                className="text-gray-700 font-medium mb-1 block"
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 border-gray-300"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 h-10 mt-6"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sedang login...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          {/* Test Credentials */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3">
              Akun Demo untuk Testing:
            </p>
            <div className="space-y-2 text-xs text-gray-600 bg-gray-50 p-3 rounded">
              <div>
                <strong>Admin:</strong> admin@sekolah.id / admin123
              </div>
              <div>
                <strong>Guru:</strong> guru1@sekolah.id / guru123
              </div>
              <div>
                <strong>Staff:</strong> staff1@sekolah.id / staff123
              </div>
              <div>
                <strong>Siswa:</strong> siswa1@sekolah.id / siswa123
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Belum punya akun?{" "}
              <Link
                href="/register-siswa"
                className="text-blue-600 hover:underline font-medium"
              >
                Daftar sebagai Siswa
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-gray-600 text-sm">
          <Link href="/" className="hover:text-blue-600">
            ← Kembali ke halaman utama
          </Link>
        </div>
      </div>
    </div>
  );
}
