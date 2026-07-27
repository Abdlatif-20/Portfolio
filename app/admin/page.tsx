import AdminShell from "@/components/admin/AdminShell";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [projects, education, experience, skillCategories, socialLinks, contactInfo, faq] =
    await Promise.all([
      prisma.project.count(),
      prisma.educationItem.count(),
      prisma.experienceCompany.count(),
      prisma.skillCategory.count(),
      prisma.socialLink.count(),
      prisma.contactInfoItem.count(),
      prisma.faqItem.count(),
    ]);

  const cards = [
    { label: "Projects", count: projects, href: "/admin/projects" },
    { label: "Education", count: education, href: "/admin/education" },
    { label: "Experience", count: experience, href: "/admin/experience" },
    { label: "Skill Categories", count: skillCategories, href: "/admin/skills" },
    { label: "Social Links", count: socialLinks, href: "/admin/social-links" },
    { label: "Contact Info", count: contactInfo, href: "/admin/contact-info" },
    { label: "FAQ", count: faq, href: "/admin/faq" },
  ];

  return (
    <AdminShell>
      <h1 className="mb-6 text-xl font-bold text-white">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-xl border border-slate-800 bg-slate-900 p-5 transition hover:border-[#00BD95]/50"
          >
            <div className="text-3xl font-bold text-[#00BD95]">{c.count}</div>
            <div className="mt-1 text-xs text-slate-400">{c.label}</div>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
