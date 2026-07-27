"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import ResourceList from "@/components/admin/ResourceList";

type Project = {
  id: string;
  title: string;
  category: string | null;
  featured: boolean;
  live: boolean;
};

export default function ProjectsListPage() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/projects")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminShell>
      {loading ? (
        <p className="text-slate-500">Loading...</p>
      ) : (
        <ResourceList<Project>
          title="Projects"
          basePath="/admin/projects"
          apiPath="/api/admin/projects"
          items={items}
          columns={[
            { header: "Title", render: (p) => p.title },
            { header: "Category", render: (p) => p.category || "—" },
            {
              header: "Flags",
              render: (p) =>
                [p.featured && "Featured", p.live && "Live"].filter(Boolean).join(", ") || "—",
            },
          ]}
          onDeleted={(id) => setItems((prev) => prev.filter((p) => p.id !== id))}
        />
      )}
    </AdminShell>
  );
}
