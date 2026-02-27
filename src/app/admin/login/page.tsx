"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LockKeyhole, User, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Demo credentials
  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "admin123";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      if (
        form.username === ADMIN_USERNAME &&
        form.password === ADMIN_PASSWORD
      ) {
        localStorage.setItem("adminToken", "true");
        localStorage.setItem("adminName", form.username);
        router.push("/admin/dashboard");
      } else {
        setError("Username atau password salah");
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-0 shadow-2xl">
          {/* Header */}
          <CardHeader className="bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-white/20 rounded-lg">
                <LockKeyhole size={32} />
              </div>
            </div>
            <CardTitle className="text-center text-2xl font-bold">
              Admin Panel
            </CardTitle>
            <p className="text-center text-blue-100 text-sm mt-2">
              SD Negeri 1 Batu Rakit
            </p>
          </CardHeader>

          {/* Form */}
          <CardContent className="pt-8">
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-3 text-slate-400"
                    size={18}
                  />
                  <Input
                    placeholder="Masukkan username"
                    className="pl-10 h-10 rounded-lg"
                    value={form.username}
                    onChange={(e) =>
                      setForm({ ...form, username: e.target.value })
                    }
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <LockKeyhole
                    className="absolute left-3 top-3 text-slate-400"
                    size={18}
                  />
                  <Input
                    type="password"
                    placeholder="Masukkan password"
                    className="pl-10 h-10 rounded-lg"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700"
                >
                  <AlertCircle size={16} />
                  <span className="text-sm">{error}</span>
                </motion.div>
              )}

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 font-bold mt-6"
              >
                {isLoading ? "Memverifikasi..." : "Login"}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs font-semibold text-slate-700 mb-2">
                📝 Demo Credentials:
              </p>
              <p className="text-xs text-slate-600">
                Username: <code className="font-mono font-bold">admin</code>
              </p>
              <p className="text-xs text-slate-600">
                Password: <code className="font-mono font-bold">admin123</code>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-slate-400 text-sm">
          <p>© 2026 SD Negeri 1 Batu Rakit - Admin Panel</p>
        </div>
      </motion.div>
    </div>
  );
}
