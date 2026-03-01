import { NextRequest } from "next/server";
import { removeAuthCookie } from "@/lib/auth";
import { createResponse, createErrorResponse } from "@/lib/api-helpers";

export async function POST(request: NextRequest) {
  try {
    await removeAuthCookie();
    return createResponse(null, "Logout berhasil");
  } catch (error) {
    console.error("Logout error:", error);
    return createErrorResponse("Terjadi kesalahan server", 500);
  }
}
