"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { AccountCredentialsForm } from "@/components/account-credentials-form";
import { Shield, AlertCircle } from "lucide-react";

interface AdminData {
  id: string;
  email: string;
  username: string;
  fullName: string;
  role: string;
}

export default function AdminAccountPage() {
  const [admin, setAdmin] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await fetch("/api/users/me", {
          method: "GET",
          credentials: "include",
        });

        const result = await response.json();

        if (!response.ok) {
          setError(result.message || "Gagal memuat data admin");
          setLoading(false);
          return;
        }

        if (result.data.role !== "SUPER_ADMIN") {
          setError("Halaman ini hanya untuk admin");
          setLoading(false);
          return;
        }

        setAdmin(result.data);
        setError("");
      } catch (err) {
        setError("Terjadi kesalahan saat memuat data");
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-16 w-full" />
        <div className="grid gap-4">
          <Skeleton className="h-10" />
          <Skeleton className="h-40" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 rounded-lg">
        <div className="flex items-center gap-3 mb-2">
          <Shield size={28} />
          <h1 className="text-3xl font-bold">Manajemen Akun Admin</h1>
        </div>
        <p className="text-slate-300">
          Kelola credentials akun admin Anda dengan aman
        </p>
      </div>

      {/* Admin Info Card */}
      <Card className="border border-slate-200">
        <CardHeader className="bg-blue-50">
          <CardTitle className="text-lg">Informasi Akun</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold text-slate-600">
                Nama Lengkap
              </label>
              <p className="text-lg font-semibold text-slate-900 mt-1">
                {admin?.fullName}
              </p>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-600">
                Role
              </label>
              <div className="mt-1">
                <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                  {admin?.role === "SUPER_ADMIN"
                    ? "Administrator"
                    : admin?.role}
                </span>
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-600">
                Email
              </label>
              <p className="text-base text-slate-900 mt-1">{admin?.email}</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-600">
                Username
              </label>
              <p className="text-base text-slate-900 mt-1">{admin?.username}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Credentials Form */}
      {admin && (
        <AccountCredentialsForm
          userId={admin.id}
          currentEmail={admin.email}
          currentUsername={admin.username}
          onSuccess={() => {
            // Optionally refresh admin data
          }}
        />
      )}

      {/* Information Card */}
      <Card className="border border-slate-200 bg-slate-50">
        <CardContent className="pt-6">
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900">
              ℹ️ Informasi Penting:
            </h3>
            <ul className="text-sm text-slate-700 space-y-2">
              <li>
                • Sebagai administrator, Anda memiliki akses penuh ke seluruh
                sistem
              </li>
              <li>
                • Pastikan email Anda selalu aktif untuk pemberitahuan penting
              </li>
              <li>
                • Ubah password secara berkala dan jangan bagikan ke siapa pun
              </li>
              <li>
                • Selalu logout ketika menggunakan komputer bersama atau publik
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
