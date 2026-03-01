"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  LogOut,
  Menu,
  X,
  Home,
  BookOpen,
  Users,
  GraduationCap,
} from "lucide-react";

export default function GuruDashboard() {
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

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/guru/dashboard" },
    { icon: Users, label: "Kelas Saya", href: "/guru/kelas" },
    { icon: GraduationCap, label: "Siswa", href: "/guru/siswa" },
    { icon: BookOpen, label: "Nilai", href: "/guru/nilai" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-green-900 text-white transition-all duration-300 flex flex-col`}
      >
        <div className="p-6 border-b border-green-800 flex items-center justify-between">
          {sidebarOpen && <h2 className="text-xl font-bold">Portal Guru</h2>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-green-800 rounded"
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
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-800 transition"
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-green-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-800 transition"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Guru</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-700">
                {user?.fullName}
              </p>
              <p className="text-xs text-gray-500">{user?.role}</p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Selamat Datang, {user?.fullName}!
            </h2>
            <p className="text-gray-600">
              Kelola kelas dan siswa Anda dari sini
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 bg-white cursor-pointer hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Kelas Diampu</p>
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
                  <p className="text-gray-600 text-sm">Total Siswa</p>
                  <p className="text-3xl font-bold text-gray-900">0</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <GraduationCap className="text-green-600" size={24} />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white cursor-pointer hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Mata Pelajaran</p>
                  <p className="text-3xl font-bold text-gray-900">0</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <BookOpen className="text-purple-600" size={24} />
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
