import { NextResponse } from "next/server";
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
