"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/education", label: "Education" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/social-links", label: "Social Links" },
  { href: "/admin/contact-info", label: "Contact Info" },
  { href: "/admin/about", label: "About" },
  { href: "/admin/faq", label: "FAQ" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen w-full bg-slate-950 font-mono text-slate-200">
      <aside className="w-56 shrink-0 border-r border-slate-800 bg-slate-900 p-4">
        <div className="mb-6 text-sm font-bold text-white">
          <span className="text-[#00BD95]">{"<"}</span>AE{" "}
          <span className="text-blue-500">{"/>"}</span> Backoffice
        </div>
        <nav className="flex flex-col gap-1">
          {NAV.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-xs transition ${
                  active
                    ? "bg-[#00BD95]/20 text-[#00BD95] border border-[#00BD95]/40"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={handleLogout}
          className="mt-6 w-full rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-400 hover:border-red-500/50 hover:text-red-400"
        >
          Logout
        </button>
      </aside>
      <main className="flex-1 p-6 sm:p-8">{children}</main>
    </div>
  );
}
