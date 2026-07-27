import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.educationItem.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const item = await prisma.educationItem.create({
    data: {
      institution: data.institution,
      degree: data.degree,
      period: data.period,
      note: data.note || null,
      location: data.location || null,
      status: data.status || null,
      skills: data.skills ?? [],
      order: data.order ?? 0,
    },
  });
  return NextResponse.json(item, { status: 201 });
}
