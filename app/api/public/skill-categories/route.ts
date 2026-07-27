import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const categories = await prisma.skillCategory.findMany({
    orderBy: { order: "asc" },
    include: { skills: { orderBy: { order: "asc" } } },
  });
  return NextResponse.json(categories);
}
