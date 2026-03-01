"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Users,
  BookOpen,
  Users2,
  BarChart3,
  LogOut,
  Menu,
  X,
  Home,
  Settings,
  MessageSquare,
  FileText,
  LayoutDashboard,
  Megaphone,
  Mail,
  Newspaper,
  Download,
  Gavel,
  Award,
  IdCard,
  UserCheck,
  Lock,
  Shield,
  BookMarked,
  GraduationCap,
} from "lucide-react";

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/admin/dashboard",
    color: "text-blue-600",
  },
  {
    icon: Megaphone,
    label: "Pengumuman",
    href: "/admin/pengumuman",
    color: "text-orange-600",
  },
  {
    icon: Mail,
    label: "Undangan",
    href: "/admin/undangan",
    color: "text-emerald-600",
  },
  {
    icon: Newspaper,
    label: "Inovasi",
    href: "/admin/inovasi",
    color: "text-purple-600",
  },
  {
    icon: BookOpen,
    label: "Program",
    href: "/admin/program",
    color: "text-pink-600",
  },
  {
    icon: Download,
    label: "Download",
    href: "/admin/download",
    color: "text-cyan-600",
  },
  { icon: Gavel, label: "JDIH", href: "/admin/jdih", color: "text-indigo-600" },
  { icon: Users, label: "PTK", href: "/admin/ptk", color: "text-violet-600" },
  { icon: Award, label: "Siswa", href: "/admin/siswa", color: "text-red-600" },
  {
    icon: IdCard,
    label: "Kartu Siswa",
    href: "/admin/student-card",
    color: "text-teal-600",
  },
  {
    icon: UserCheck,
    label: "Kartu Pegawai",
    href: "/admin/staff-card",
    color: "text-emerald-600",
  },
  {
    icon: Shield,
    label: "Akun Admin",
    href: "/admin/account-admin",
    color: "text-red-600",
  },
  {
    icon: BookMarked,
    label: "Akun Guru",
    href: "/admin/account-guru",
    color: "text-green-600",
  },
  {
    icon: Users,
    label: "Akun Tendik",
    href: "/admin/account-tendik",
    color: "text-indigo-600",
  },
  {
    icon: GraduationCap,
    label: "Akun Siswa",
    href: "/admin/account-siswa",
    color: "text-purple-600",
  },
  {
    icon: Lock,
    label: "Portal PTK",
    href: "/admin/portal-ptk",
    color: "text-sky-600",
  },
  {
    icon: Settings,
    label: "Pengaturan",
    href: "/admin/settings",
    color: "text-slate-600",
  },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [adminName, setAdminName] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const name = localStorage.getItem("adminName");
    setAdminName(name || "Administrator");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminName");
    router.push("/admin/login");
  };

  const stats = [
    {
      title: "Total Pengumuman",
      value: "12",
      icon: Megaphone,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Total Program",
      value: "6",
      icon: BookOpen,
      color: "bg-pink-100 text-pink-600",
    },
    {
      title: "Total PTK",
      value: "13",
      icon: Users,
      color: "bg-violet-100 text-violet-600",
    },
    {
      title: "Total Siswa",
      value: "150+",
      icon: Award,
      color: "bg-red-100 text-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navbar - Dapodik Style */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-slate-200/50 z-40 shadow-sm">
        <div className="px-6 h-20 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <LayoutDashboard className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900">ADMIN</h1>
                <p className="text-xs text-slate-500">SD Negeri 1 Batu Rakit</p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900">
                {adminName}
              </p>
              <p className="text-xs text-slate-500">Administrator</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-2 text-red-600 border-red-200 hover:bg-red-50"
            >
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="relative pt-20">
        {/* floating hamburger toggle when sidebar is closed */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="fixed top-24 left-4 z-60 p-2 bg-white rounded-lg shadow-lg hover:bg-slate-100 transition-colors"
          >
            <Menu size={24} />
          </button>
        )}
        {/* Sidebar - Dapodik Style */}
        <motion.aside
          initial={{ x: -280 }}
          animate={{ x: sidebarOpen ? 0 : -280 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed left-0 top-20 bottom-0 w-72 bg-white border-r border-slate-200 overflow-y-auto z-50 shadow-lg"
        >
          {/* Sidebar Header */}
          <div className="p-6 border-b border-slate-200 bg-linear-to-br from-blue-50 to-indigo-50">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Menu Utama
            </h3>
            <p className="text-xs text-slate-500">{menuItems.length} Modul</p>
          </div>

          {/* Menu Items */}
          <div className="p-3 space-y-1">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group border border-transparent hover:border-blue-200"
              >
                <div
                  className={`p-2 rounded-lg ${item.color} bg-opacity-10 group-hover:scale-110 transition-transform`}
                >
                  {(() => {
                    const IconComponent = item.icon as React.ComponentType<any>;
                    return <IconComponent size={18} className={item.color} />;
                  })()}
                </div>
                <span className="font-medium text-sm flex-1">{item.label}</span>
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full group-hover:bg-blue-500 transition-colors" />
              </Link>
            ))}
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 bg-slate-50">
            <p className="text-xs text-slate-500 text-center">
              Admin Panel v1.0
            </p>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 transition-all duration-300">
          <div className="p-8">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10"
            >
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-4xl font-extrabold text-white mb-2">
                    Dashboard
                  </h2>
                  <p className="text-slate-300 flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    Selamat datang di panel administrasi
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400 mb-1">Hari ini</p>
                  <p className="text-2xl font-bold text-white">
                    {new Date().toLocaleDateString("id-ID", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Stats Grid - Dapodik Style */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ translateY: -4 }}
                >
                  <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`p-3 rounded-xl ${stat.color} bg-opacity-15`}
                        >
                          <stat.icon size={28} className={stat.color} />
                        </div>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                          +12%
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 font-medium mb-1">
                        {stat.title}
                      </p>
                      <h3 className="text-3xl font-extrabold text-slate-900 mb-3">
                        {stat.value}
                      </h3>
                      <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${stat.color.replace("text-", "bg-").replace("-600", "-500")} w-3/4 rounded-full`}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Quick Actions & Modules */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* Quick Actions */}
              <div className="lg:col-span-2">
                <Card className="bg-white border-0 shadow-lg">
                  <CardHeader className="border-b border-slate-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">Akses Cepat</CardTitle>
                        <CardDescription>
                          Kelola konten utama sekolah
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Link href="/admin/pengumuman">
                        <Button
                          variant="outline"
                          className="w-full justify-start hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600 group"
                        >
                          <div className="p-2 bg-orange-100 rounded-lg mr-3 group-hover:bg-orange-200 transition-colors">
                            <Megaphone size={18} className="text-orange-600" />
                          </div>
                          <div className="text-left">
                            <p className="font-semibold text-sm">Pengumuman</p>
                            <p className="text-xs text-slate-500">
                              Buat pengumuman baru
                            </p>
                          </div>
                        </Button>
                      </Link>
                      <Link href="/admin/undangan">
                        <Button
                          variant="outline"
                          className="w-full justify-start hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-600 group"
                        >
                          <div className="p-2 bg-emerald-100 rounded-lg mr-3 group-hover:bg-emerald-200 transition-colors">
                            <Mail size={18} className="text-emerald-600" />
                          </div>
                          <div className="text-left">
                            <p className="font-semibold text-sm">Undangan</p>
                            <p className="text-xs text-slate-500">
                              Buat undangan acara
                            </p>
                          </div>
                        </Button>
                      </Link>
                      <Link href="/admin/program">
                        <Button
                          variant="outline"
                          className="w-full justify-start hover:bg-pink-50 hover:border-pink-200 hover:text-pink-600 group"
                        >
                          <div className="p-2 bg-pink-100 rounded-lg mr-3 group-hover:bg-pink-200 transition-colors">
                            <BookOpen size={18} className="text-pink-600" />
                          </div>
                          <div className="text-left">
                            <p className="font-semibold text-sm">Program</p>
                            <p className="text-xs text-slate-500">
                              Kelola program sekolah
                            </p>
                          </div>
                        </Button>
                      </Link>
                      <Link href="/admin/inovasi">
                        <Button
                          variant="outline"
                          className="w-full justify-start hover:bg-purple-50 hover:border-purple-200 hover:text-purple-600 group"
                        >
                          <div className="p-2 bg-purple-100 rounded-lg mr-3 group-hover:bg-purple-200 transition-colors">
                            <Newspaper size={18} className="text-purple-600" />
                          </div>
                          <div className="text-left">
                            <p className="font-semibold text-sm">Inovasi</p>
                            <p className="text-xs text-slate-500">
                              Catat inovasi sekolah
                            </p>
                          </div>
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* System Status */}
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader className="border-b border-slate-100 pb-4">
                  <CardTitle className="text-lg">Status Sistem</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Status */}
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                      <p className="text-xs text-slate-600 mb-1">Status</p>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                        <p className="font-bold text-emerald-700">
                          Sistem Normal
                        </p>
                      </div>
                    </div>

                    {/* Version */}
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="text-xs text-slate-600">Versi</span>
                      <span className="font-bold text-slate-700">v1.0.0</span>
                    </div>

                    {/* User */}
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="text-xs text-slate-600">Pengguna</span>
                      <span className="font-bold text-slate-700">
                        {adminName}
                      </span>
                    </div>

                    {/* Last Login */}
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="text-xs text-slate-600">Login</span>
                      <span className="font-bold text-slate-700">Hari ini</span>
                    </div>

                    <Button
                      onClick={handleLogout}
                      className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white"
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
