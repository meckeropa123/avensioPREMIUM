import { requireAuth } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const auth = await requireAuth();
  if (!auth.ok) return auth.response;
  const { amount, orderId } = await req.json();
  return NextResponse.json({ provider: "YooKassa", orderId, amount, paymentUrl: "https://yookassa.ru/demo-redirect", status: "pending" });
}
