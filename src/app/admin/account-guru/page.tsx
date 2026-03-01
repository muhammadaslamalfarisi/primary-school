"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AccountCredentialsForm } from "@/components/account-credentials-form";
import { BookOpen, Search, AlertCircle } from "lucide-react";

interface GuruData {
  id: string;
  email: string;
  username: string;
  fullName: string;
  role: string;
}

export default function GuruAccountPage() {
  const [guru, setGuru] = useState<GuruData | null>(null);
  const [guruList, setGuruList] = useState<GuruData[]>([]);
  const [selectedGuru, setSelectedGuru] = useState<GuruData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);

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

        setGuru(meResult.data);

        // Fetch guru list (admin only feature)
        if (meResult.data.role === "SUPER_ADMIN") {
          const guruResponse = await fetch("/api/users?role=PENDIDIK", {
            method: "GET",
            credentials: "include",
          });

          const guruResult = await guruResponse.json();
          if (guruResponse.ok && guruResult.data) {
            setGuruList(guruResult.data);
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

  const filteredGuru = guruList.filter(
    (g) =>
      g.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.username.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const isAdmin = guru?.role === "SUPER_ADMIN";
  const editingGuru = selectedGuru || guru;

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
      <div className="bg-gradient-to-r from-green-900 to-green-800 text-white p-6 rounded-lg">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen size={28} />
          <h1 className="text-3xl font-bold">Manajemen Akun Guru</h1>
        </div>
        <p className="text-green-100">
          {isAdmin
            ? "Kelola akun guru dan pendidik"
            : "Kelola akun Anda sebagai guru"}
        </p>
      </div>

      {/* Admin View - Teacher List */}
      {isAdmin && (
        <>
          {/* Search */}
          <Card className="border border-slate-200">
            <CardHeader className="bg-slate-50">
              <CardTitle className="text-lg">Daftar Guru</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex gap-2 mb-4">
                <div className="relative flex-1">
                  <Search
                    className="absolute left-3 top-3 text-slate-400"
                    size={18}
                  />
                  <Input
                    placeholder="Cari nama, email, atau username guru..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {filteredGuru.length === 0 ? (
                <p className="text-center text-slate-600 py-8">
                  Tidak ada guru ditemukan
                </p>
              ) : (
                <div className="space-y-2">
                  {filteredGuru.map((g) => (
                    <div
                      key={g.id}
                      className={`p-4 border rounded-lg cursor-pointer transition ${
                        selectedGuru?.id === g.id
                          ? "border-green-500 bg-green-50"
                          : "border-slate-200 hover:border-green-300"
                      }`}
                      onClick={() => {
                        setSelectedGuru(g);
                        setShowForm(true);
                      }}
                    >
                      <p className="font-semibold text-slate-900">
                        {g.fullName}
                      </p>
                      <p className="text-sm text-slate-600">
                        {g.email} • {g.username}
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
      {!isAdmin && guru && (
        <Card className="border border-slate-200">
          <CardHeader className="bg-green-50">
            <CardTitle className="text-lg">Informasi Akun Anda</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-slate-600">
                  Nama Lengkap
                </label>
                <p className="text-lg font-semibold text-slate-900 mt-1">
                  {guru.fullName}
                </p>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-600">
                  Email
                </label>
                <p className="text-base text-slate-900 mt-1">{guru.email}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-600">
                  Username
                </label>
                <p className="text-base text-slate-900 mt-1">{guru.username}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-600">
                  Role
                </label>
                <div className="mt-1">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                    Guru / Pendidik
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Credentials Form */}
      {editingGuru && (
        <div>
          {isAdmin && selectedGuru && (
            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900">
                Mengedit akun:{" "}
                <span className="font-semibold">{selectedGuru.fullName}</span>
              </p>
            </div>
          )}

          <AccountCredentialsForm
            userId={editingGuru.id}
            currentEmail={editingGuru.email}
            currentUsername={editingGuru.username}
            onSuccess={() => {
              if (isAdmin && selectedGuru) {
                // Refresh list
                setSelectedGuru(null);
                setShowForm(false);
              }
            }}
          />
        </div>
      )}
    </div>
  );
}
