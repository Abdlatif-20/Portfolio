import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.contactInfoItem.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const item = await prisma.contactInfoItem.create({
    data: {
      icon: data.icon,
      label: data.label,
      value: data.value,
      link: data.link || null,
      order: data.order ?? 0,
    },
  });
  return NextResponse.json(item, { status: 201 });
}
