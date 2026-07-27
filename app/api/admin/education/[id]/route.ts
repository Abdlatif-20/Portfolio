import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await req.json();
  const item = await prisma.educationItem.update({
    where: { id },
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
  return NextResponse.json(item);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.educationItem.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
