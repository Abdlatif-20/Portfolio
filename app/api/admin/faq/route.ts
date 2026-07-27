import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.faqItem.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const item = await prisma.faqItem.create({
    data: {
      question: data.question,
      answer: data.answer,
      order: data.order ?? 0,
    },
  });
  return NextResponse.json(item, { status: 201 });
}
