"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogOut, Menu, X, Home, Users, Database, FileText } from "lucide-react";

export default function StaffDashboard() {
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
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/staff/dashboard" },
    { icon: Users, label: "Data Siswa", href: "/staff/siswa" },
    { icon: FileText, label: "Data Guru", href: "/staff/guru" },
    { icon: Database, label: "Inventaris", href: "/staff/inventaris" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-purple-900 text-white transition-all duration-300 flex flex-col`}
      >
        <div className="p-6 border-b border-purple-800 flex items-center justify-between">
          {sidebarOpen && <h2 className="text-xl font-bold">Portal Staff</h2>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-purple-800 rounded"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-purple-800 transition"
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-purple-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-purple-800 transition"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Staff</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-700">
                {user?.fullName}
              </p>
              <p className="text-xs text-gray-500">
                {user?.tenagaKependidikan?.jabatan}
              </p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Selamat Datang, {user?.fullName}!
            </h2>
            <p className="text-gray-600">
              Kelola data administratif sekolah Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 bg-white cursor-pointer hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Siswa</p>
                  <p className="text-3xl font-bold text-gray-900">0</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Users className="text-blue-600" size={24} />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white cursor-pointer hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Guru</p>
                  <p className="text-3xl font-bold text-gray-900">0</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <FileText className="text-green-600" size={24} />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white cursor-pointer hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Sarana</p>
                  <p className="text-3xl font-bold text-gray-900">0</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Database className="text-purple-600" size={24} />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white cursor-pointer hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Dokumen</p>
                  <p className="text-3xl font-bold text-gray-900">0</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-lg">
                  <FileText className="text-orange-600" size={24} />
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-white">
              <h3 className="font-bold text-lg mb-4">Tugas Cepat</h3>
              <div className="space-y-2">
                <Link href="/staff/siswa">
                  <Button variant="outline" className="w-full justify-start">
                    Kelola Data Siswa
                  </Button>
                </Link>
                <Link href="/staff/guru">
                  <Button variant="outline" className="w-full justify-start">
                    Kelola Data Guru
                  </Button>
                </Link>
                <Link href="/staff/inventaris">
                  <Button variant="outline" className="w-full justify-start">
                    Kelola Inventaris
                  </Button>
                </Link>
              </div>
            </Card>

            <Card className="p-6 bg-white">
              <h3 className="font-bold text-lg mb-4">Info Statistik</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-sm text-gray-600">Siswa Aktif</span>
                  <span className="font-bold">0</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-sm text-gray-600">Guru Aktif</span>
                  <span className="font-bold">0</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-sm text-gray-600">Sarana Baik</span>
                  <span className="font-bold">0</span>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
