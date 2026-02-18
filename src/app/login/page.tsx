"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LockKeyhole, User, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulasi pengecekan akun (Nanti disesuaikan dengan CRUD Admin)
    setTimeout(() => {
      if (form.username === "admin" && form.password === "12345") {
        // SIMPAN STATUS LOGIN: Memberi tanda di browser
        localStorage.setItem("isLoggedIn", "true");

        // HUBUNGKAN: Langsung lempar ke halaman Data PTK
        router.push("/profil/data-ptk");
      } else {
        setError("Kredensial salah. Silakan hubungi Admin.");
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="border-none shadow-xl bg-white">
          <CardHeader className="text-center pt-8">
            <div className="mx-auto bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <LockKeyhole className="text-white" size={24} />
            </div>
            <CardTitle className="text-2xl font-bold">Portal PTK</CardTitle>
            <CardDescription>Masukkan akun untuk melihat data</CardDescription>
          </CardHeader>
          <CardContent className="pb-8">
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg text-center font-bold">
                  {error}
                </div>
              )}
              <div className="space-y-4">
                <div className="relative">
                  <User
                    className="absolute left-3 top-3 text-slate-400"
                    size={18}
                  />
                  <Input
                    placeholder="Username"
                    className="pl-10 h-11 bg-slate-50"
                    onChange={(e) =>
                      setForm({ ...form, username: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="relative">
                  <LockKeyhole
                    className="absolute left-3 top-3 text-slate-400"
                    size={18}
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    className="pl-10 h-11 bg-slate-50"
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <Button
                disabled={isLoading}
                className="w-full bg-blue-600 h-11 gap-2 shadow-lg shadow-blue-100"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    Masuk Ke Data PTK <ArrowRight size={16} />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
