"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogOut, Menu, X, Home, Zap, Flag } from "lucide-react";

export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/users/me");
        const data = await response.json();
        if (data.success) {
          setUser(data.data);
        } else {
          router.push("/login");
        }
      } catch (error) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Portal Siswa</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">{user?.fullName}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Selamat Datang, {user?.fullName}!
          </h2>
          <p className="text-gray-600">
            Lihat nilai, kehadiran, dan informasi akademik Anda
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link href="/dashboard/nilai">
            <Card className="p-6 bg-white cursor-pointer hover:shadow-lg transition h-full">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Zap className="text-blue-600" size={24} />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Nilai Saya</p>
                  <p className="text-xl font-bold text-gray-900">Lihat</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/dashboard/kehadiran">
            <Card className="p-6 bg-white cursor-pointer hover:shadow-lg transition h-full">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Flag className="text-green-600" size={24} />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Kehadiran</p>
                  <p className="text-xl font-bold text-gray-900">Lihat</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/dashboard/profil">
            <Card className="p-6 bg-white cursor-pointer hover:shadow-lg transition h-full">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Home className="text-purple-600" size={24} />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Profil Saya</p>
                  <p className="text-xl font-bold text-gray-900">Edit</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/dashboard/dokumen">
            <Card className="p-6 bg-white cursor-pointer hover:shadow-lg transition h-full">
              <div className="flex items-center gap-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Menu className="text-orange-600" size={24} />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Dokumen</p>
                  <p className="text-xl font-bold text-gray-900">Download</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-blue-50 border-blue-200">
            <h3 className="font-bold text-blue-900 mb-2">Nilai Terbaru</h3>
            <p className="text-gray-600 text-sm">Belum ada data nilai</p>
          </Card>

          <Card className="p-6 bg-green-50 border-green-200">
            <h3 className="font-bold text-green-900 mb-2">
              Kehadiran Bulan Ini
            </h3>
            <p className="text-gray-600 text-sm flex items-center gap-2">
              <span className="text-2xl font-bold text-green-600">0</span> Hadir
            </p>
          </Card>

          <Card className="p-6 bg-purple-50 border-purple-200">
            <h3 className="font-bold text-purple-900 mb-2">Info Penting</h3>
            <p className="text-gray-600 text-sm">
              Periksa pengumuman dan undangan terbaru
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
