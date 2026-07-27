import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const about = await prisma.aboutContent.findFirst();
  const techIcons = await prisma.techIcon.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json({ ...about, techIcons });
}
