import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const items = await prisma.educationItem.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(items);
}
