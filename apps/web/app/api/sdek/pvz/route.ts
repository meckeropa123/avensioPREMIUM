import { NextResponse } from "next/server";
export async function GET() { return NextResponse.json([{ id: "PVZ-1", address: "Москва, Тверская 1" }]); }
