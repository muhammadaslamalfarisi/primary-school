import { NextRequest, NextResponse } from "next/server";
import { verifyToken, JWTPayload } from "./auth";

export const withAuth = async (
  request: NextRequest,
  requiredRoles?: string[],
) => {
  const token = request.cookies.get("auth-token")?.value;

  if (!token) {
    return {
      error: "Unauthorized",
      status: 401,
      user: null,
    };
  }

  const payload = verifyToken(token);
  if (!payload) {
    return {
      error: "Invalid token",
      status: 401,
      user: null,
    };
  }

  if (requiredRoles && !requiredRoles.includes(payload.role)) {
    return {
      error: "Forbidden",
      status: 403,
      user: null,
    };
  }

  return {
    error: null,
    status: 200,
    user: payload,
  };
};

export const createResponse = (
  data: any,
  message: string = "Success",
  status: number = 200,
) => {
  return NextResponse.json(
    {
      success: status >= 200 && status < 300,
      message,
      data,
    },
    { status },
  );
};

export const createErrorResponse = (
  message: string = "Error",
  status: number = 400,
  data: any = null,
) => {
  return NextResponse.json(
    {
      success: false,
      message,
      data,
    },
    { status },
  );
};
