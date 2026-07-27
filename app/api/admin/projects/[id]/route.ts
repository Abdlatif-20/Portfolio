import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await req.json();
  const project = await prisma.project.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      href: data.href,
      techStack: data.techStack ?? [],
      live: !!data.live,
      image: data.image || null,
      category: data.category || null,
      featured: !!data.featured,
      order: data.order ?? 0,
    },
  });
  return NextResponse.json(project);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
