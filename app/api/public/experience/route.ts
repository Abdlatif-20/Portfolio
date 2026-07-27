import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const companies = await prisma.experienceCompany.findMany({
    orderBy: { order: "asc" },
    include: { roles: { orderBy: { order: "asc" } } },
  });
  return NextResponse.json(companies);
}
