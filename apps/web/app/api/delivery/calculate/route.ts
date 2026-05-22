import { requireAuth } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const auth = await requireAuth();
  if (!auth.ok) return auth.response;
  const { city, weight } = await req.json();
  return NextResponse.json({ provider: "CDEK", city, weight, tariff: 320, etaDays: 3 });
}
