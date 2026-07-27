import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const resume = await prisma.resume.findFirst();
  if (!resume) {
    return NextResponse.json({ error: "No resume uploaded yet" }, { status: 404 });
  }

  return new NextResponse(new Uint8Array(resume.data), {
    headers: {
      "Content-Type": resume.mimeType,
      "Content-Disposition": `inline; filename="${resume.filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
