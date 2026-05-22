import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const { city, weight } = await req.json();
  return NextResponse.json({ provider: "CDEK", city, weight, tariff: 320, etaDays: 3 });
}
