import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const resume = await prisma.resume.findFirst();
  if (!resume) return NextResponse.json(null);
  return NextResponse.json({
    filename: resume.filename,
    mimeType: resume.mimeType,
    size: resume.data.length,
    updatedAt: resume.updatedAt,
  });
}

export async function POST(req: NextRequest) {
  const formData = await req.formData().catch(() => null);
  const file = formData?.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (file.type !== "application/pdf") {
    return NextResponse.json({ error: "Only PDF files are accepted" }, { status: 400 });
  }

  const MAX_SIZE = 10 * 1024 * 1024; // 10MB
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File is too large (max 10MB)" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const existing = await prisma.resume.findFirst();
  const resume = existing
    ? await prisma.resume.update({
        where: { id: existing.id },
        data: { filename: file.name, mimeType: file.type, data: buffer },
      })
    : await prisma.resume.create({
        data: { filename: file.name, mimeType: file.type, data: buffer },
      });

  return NextResponse.json({
    filename: resume.filename,
    mimeType: resume.mimeType,
    size: resume.data.length,
    updatedAt: resume.updatedAt,
  });
}
