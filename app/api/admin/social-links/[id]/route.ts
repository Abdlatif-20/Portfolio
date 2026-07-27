import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await req.json();
  const item = await prisma.socialLink.update({
    where: { id },
    data: {
      platform: data.platform,
      icon: data.icon,
      url: data.url,
      username: data.username || null,
      color: data.color || null,
      order: data.order ?? 0,
    },
  });
  return NextResponse.json(item);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.socialLink.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
