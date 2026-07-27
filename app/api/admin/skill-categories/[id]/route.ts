import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await req.json();

  const category = await prisma.$transaction(async (tx) => {
    await tx.skill.deleteMany({ where: { categoryId: id } });
    return tx.skillCategory.update({
      where: { id },
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
      include: { skills: { orderBy: { order: "asc" } } },
    });
  });

  return NextResponse.json(category);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.skillCategory.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
