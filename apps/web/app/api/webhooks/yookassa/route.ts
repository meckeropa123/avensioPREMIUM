import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const event = await req.json();
  return NextResponse.json({ received: true, type: event?.event });
}
