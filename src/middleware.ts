import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/auth";

// Routes yang tidak perlu autentikasi
const publicRoutes = [
  "/",
  "/login",
  "/api/auth/login",
  "/api/auth/register-siswa",
  "/api/kontak",
  "/api/pengumuman",
  "/api/undangan",
  "/api/inovasi",
  "/api/program",
  "/api/download",
  "/api/jdih",
  "/berita",
  "/profil",
  "/login",
  "/kontak",
  "/download",
  "/jdih",
  "/program",
];

const adminRoutes = ["/admin"];
const teacherRoutes = ["/guru"];
const studentRoutes = ["/dashboard"];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Allow public routes
  if (
    publicRoutes.some((route) => path === route || path.startsWith(route + "/"))
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get("auth-token")?.value;

  // Check if token exists
  if (!token) {
    if (
      path.startsWith("/admin") ||
      path.startsWith("/guru") ||
      path.startsWith("/dashboard")
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // Verify token
  const user = verifyToken(token);

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Check role-based access
  if (path.startsWith("/admin") && user.role !== "SUPER_ADMIN") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (path.startsWith("/guru") && user.role !== "PENDIDIK") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (path.startsWith("/dashboard") && user.role !== "SISWA") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
