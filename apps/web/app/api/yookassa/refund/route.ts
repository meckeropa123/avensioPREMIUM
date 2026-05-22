import { requireAuth } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST() {
  const auth = await requireAuth();
  if (!auth.ok) return auth.response;
  return NextResponse.json({ status: "queued_refund" });
}
