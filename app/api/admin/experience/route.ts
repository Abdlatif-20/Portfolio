import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const companies = await prisma.experienceCompany.findMany({
    orderBy: { order: "asc" },
    include: { roles: { orderBy: { order: "asc" } } },
  });
  return NextResponse.json(companies);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const company = await prisma.experienceCompany.create({
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
    include: { roles: true },
  });
  return NextResponse.json(company, { status: 201 });
}
