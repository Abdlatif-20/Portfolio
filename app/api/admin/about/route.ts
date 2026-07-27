import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function getOrCreateAbout() {
  const existing = await prisma.aboutContent.findFirst();
  if (existing) return existing;
  return prisma.aboutContent.create({
    data: { typewriterPhrases: [], bio: "" },
  });
}

export async function GET() {
  const about = await getOrCreateAbout();
  const techIcons = await prisma.techIcon.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json({ ...about, techIcons });
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const about = await getOrCreateAbout();

  const updated = await prisma.$transaction(async (tx) => {
    await tx.techIcon.deleteMany();
    const record = await tx.aboutContent.update({
      where: { id: about.id },
      data: {
        typewriterPhrases: data.typewriterPhrases ?? [],
        bio: data.bio ?? "",
        projectCount: data.projectCount ?? 0,
        yearsCount: data.yearsCount ?? 0,
        techCount: data.techCount ?? 0,
      },
    });
    const techIcons = await Promise.all(
      (data.techIcons ?? []).map((t: any, index: number) =>
        tx.techIcon.create({
          data: { name: t.name, icon: t.icon, order: t.order ?? index },
        })
      )
    );
    return { ...record, techIcons };
  });

  return NextResponse.json(updated);
}
