import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await req.json();
  const item = await prisma.contactInfoItem.update({
    where: { id },
    data: {
      icon: data.icon,
      label: data.label,
      value: data.value,
      link: data.link || null,
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
  await prisma.contactInfoItem.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
