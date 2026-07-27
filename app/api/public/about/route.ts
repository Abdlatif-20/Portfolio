import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const about = await prisma.aboutContent.findFirst();
  const techIcons = await prisma.techIcon.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json({ ...about, techIcons });
}
