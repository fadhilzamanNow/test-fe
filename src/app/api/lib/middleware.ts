import { NextRequest, NextResponse } from "next/server";
import { verifyToken, extractTokenFromHeader } from "./jwt";

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    userId: string;
    username: string;
    role: string;
  };
}

type Handler<T = {}> = (
  req: AuthenticatedRequest,
  context: T,
) => Promise<NextResponse>;

export function authenticate<T extends {}>(handler: Handler<T>) {
  return async (
    req: AuthenticatedRequest,
    context: T,
  ): Promise<NextResponse> => {
    const authorization = req.headers.get("authorization");
    const token = extractTokenFromHeader(authorization);

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized - No token provided" },
        { status: 401 },
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: "Unauthorized - Invalid token" },
        { status: 401 },
      );
    }

    req.user = {
      userId: payload.userId,
      username: payload.username,
      role: payload.role,
    };

    return handler(req, context);
  };
}

export function requireAdmin<T extends {}>(handler: Handler<T>) {
  return authenticate<T>(
    async (req: AuthenticatedRequest, context: T): Promise<NextResponse> => {
      if (req.user?.role !== "Admin") {
        return NextResponse.json(
          { error: "Forbidden - Admin access required" },
          { status: 403 },
        );
      }

      return handler(req, context);
    },
  );
}
