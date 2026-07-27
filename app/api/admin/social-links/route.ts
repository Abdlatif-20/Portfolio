import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const items = await prisma.socialLink.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const item = await prisma.socialLink.create({
    data: {
      platform: data.platform,
      icon: data.icon,
      url: data.url,
      username: data.username || null,
      color: data.color || null,
      order: data.order ?? 0,
    },
  });
  return NextResponse.json(item, { status: 201 });
}
