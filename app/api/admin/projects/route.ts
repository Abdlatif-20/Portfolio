import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const project = await prisma.project.create({
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
  return NextResponse.json(project, { status: 201 });
}
