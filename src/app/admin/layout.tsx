"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminToken");
    if (
      !isAuthenticated &&
      !window.location.pathname.includes("/admin/login")
    ) {
      router.push("/admin/login");
    }
  }, [router]);

  return <>{children}</>;
}
