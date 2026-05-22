import { prisma } from "@/lib/prisma";
import { comparePassword, signAccessToken, signRefreshToken } from "@/lib/auth";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const { email, password } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await comparePassword(password, user.passwordHash))) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  const payload = { sub: user.id, role: user.role, email: user.email };
  return NextResponse.json({ accessToken: signAccessToken(payload), refreshToken: signRefreshToken(payload) });
}
