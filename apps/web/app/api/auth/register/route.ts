import { prisma } from "@/lib/prisma";
import { hashPassword, signAccessToken, signRefreshToken } from "@/lib/auth";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const body = await req.json();
  const passwordHash = await hashPassword(body.password);
  const user = await prisma.user.create({ data: { email: body.email, passwordHash, role: body.role ?? "BUYER" } });
  const payload = { sub: user.id, role: user.role, email: user.email };
  return NextResponse.json({ accessToken: signAccessToken(payload), refreshToken: signRefreshToken(payload) });
}
