import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const categories = await prisma.skillCategory.findMany({
    orderBy: { order: "asc" },
    include: { skills: { orderBy: { order: "asc" } } },
  });
  return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const category = await prisma.skillCategory.create({
    data: {
      title: data.title,
      icon: data.icon,
      color: data.color,
      order: data.order ?? 0,
      skills: {
        create: (data.skills ?? []).map((skill: any, index: number) => ({
          name: skill.name,
          icon: skill.icon,
          level: skill.level ?? 0,
          color: skill.color,
          order: skill.order ?? index,
        })),
      },
    },
    include: { skills: true },
  });
  return NextResponse.json(category, { status: 201 });
}
