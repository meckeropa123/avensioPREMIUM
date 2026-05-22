import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const { amount, orderId } = await req.json();
  return NextResponse.json({ provider: "YooKassa", orderId, amount, paymentUrl: "https://yookassa.ru/demo-redirect", status: "pending" });
}
