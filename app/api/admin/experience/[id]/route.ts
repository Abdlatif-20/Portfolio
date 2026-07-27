import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await req.json();

  const company = await prisma.$transaction(async (tx) => {
    await tx.experienceRole.deleteMany({ where: { companyId: id } });
    return tx.experienceCompany.update({
      where: { id },
      data: {
        name: data.name,
        logo: data.logo || null,
        totalDuration: data.totalDuration,
        startDate: data.startDate,
        endDate: data.endDate,
        order: data.order ?? 0,
        roles: {
          create: (data.roles ?? []).map((role: any, index: number) => ({
            title: role.title,
            type: role.type,
            period: role.period,
            duration: role.duration,
            location: role.location,
            description: role.description,
            achievements: role.achievements ?? [],
            technologies: role.technologies ?? [],
            order: role.order ?? index,
          })),
        },
      },
      include: { roles: { orderBy: { order: "asc" } } },
    });
  });

  return NextResponse.json(company);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.experienceCompany.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
