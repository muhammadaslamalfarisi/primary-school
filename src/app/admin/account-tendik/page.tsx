"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { AccountCredentialsForm } from "@/components/account-credentials-form";
import { Users, Search, AlertCircle } from "lucide-react";

interface TendikData {
  id: string;
  email: string;
  username: string;
  fullName: string;
  role: string;
}

export default function TendikAccountPage() {
  const [tendik, setTendik] = useState<TendikData | null>(null);
  const [tendikList, setTendikList] = useState<TendikData[]>([]);
  const [selectedTendik, setSelectedTendik] = useState<TendikData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch current user
        const meResponse = await fetch("/api/users/me", {
          method: "GET",
          credentials: "include",
        });

        const meResult = await meResponse.json();

        if (!meResponse.ok) {
          setError(meResult.message || "Gagal memuat data");
          setLoading(false);
          return;
        }

        setTendik(meResult.data);

        // Fetch tendik list (admin only feature)
        if (meResult.data.role === "SUPER_ADMIN") {
          const tendikResponse = await fetch(
            "/api/users?role=TENAGA_KEPENDIDIKAN",
            {
              method: "GET",
              credentials: "include",
            },
          );

          const tendikResult = await tendikResponse.json();
          if (tendikResponse.ok && tendikResult.data) {
            setTendikList(tendikResult.data);
          }
        }

        setError("");
      } catch (err) {
        setError("Terjadi kesalahan saat memuat data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredTendik = tendikList.filter(
    (t) =>
      t.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.username.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const isAdmin = tendik?.role === "SUPER_ADMIN";
  const editingTendik = selectedTendik || tendik;

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
      <div className="bg-gradient-to-r from-indigo-900 to-indigo-800 text-white p-6 rounded-lg">
        <div className="flex items-center gap-3 mb-2">
          <Users size={28} />
          <h1 className="text-3xl font-bold">
            Manajemen Akun Tenaga Kependidikan
          </h1>
        </div>
        <p className="text-indigo-100">
          {isAdmin
            ? "Kelola akun tenaga kependidikan"
            : "Kelola akun Anda sebagai tenaga kependidikan"}
        </p>
      </div>

      {/* Admin View - Tendik List */}
      {isAdmin && (
        <>
          {/* Search */}
          <Card className="border border-slate-200">
            <CardHeader className="bg-slate-50">
              <CardTitle className="text-lg">
                Daftar Tenaga Kependidikan
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex gap-2 mb-4">
                <div className="relative flex-1">
                  <Search
                    className="absolute left-3 top-3 text-slate-400"
                    size={18}
                  />
                  <Input
                    placeholder="Cari nama, email, atau username..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {filteredTendik.length === 0 ? (
                <p className="text-center text-slate-600 py-8">
                  Tidak ada tenaga kependidikan ditemukan
                </p>
              ) : (
                <div className="space-y-2">
                  {filteredTendik.map((t) => (
                    <div
                      key={t.id}
                      className={`p-4 border rounded-lg cursor-pointer transition ${
                        selectedTendik?.id === t.id
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-slate-200 hover:border-indigo-300"
                      }`}
                      onClick={() => setSelectedTendik(t)}
                    >
                      <p className="font-semibold text-slate-900">
                        {t.fullName}
                      </p>
                      <p className="text-sm text-slate-600">
                        {t.email} • {t.username}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {/* Own Account Info */}
      {!isAdmin && tendik && (
        <Card className="border border-slate-200">
          <CardHeader className="bg-indigo-50">
            <CardTitle className="text-lg">Informasi Akun Anda</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-slate-600">
                  Nama Lengkap
                </label>
                <p className="text-lg font-semibold text-slate-900 mt-1">
                  {tendik.fullName}
                </p>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-600">
                  Email
                </label>
                <p className="text-base text-slate-900 mt-1">{tendik.email}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-600">
                  Username
                </label>
                <p className="text-base text-slate-900 mt-1">
                  {tendik.username}
                </p>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-600">
                  Role
                </label>
                <div className="mt-1">
                  <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold">
                    Tenaga Kependidikan
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Credentials Form */}
      {editingTendik && (
        <div>
          {isAdmin && selectedTendik && (
            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900">
                Mengedit akun:{" "}
                <span className="font-semibold">{selectedTendik.fullName}</span>
              </p>
            </div>
          )}

          <AccountCredentialsForm
            userId={editingTendik.id}
            currentEmail={editingTendik.email}
            currentUsername={editingTendik.username}
            onSuccess={() => {
              if (isAdmin && selectedTendik) {
                setSelectedTendik(null);
              }
            }}
          />
        </div>
      )}
    </div>
  );
}
