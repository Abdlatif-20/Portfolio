"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import ResourceList from "@/components/admin/ResourceList";
import { Icon } from "@/lib/icon-registry";

type SkillCategory = {
  id: string;
  title: string;
  icon: string;
  skills: { id: string }[];
};

export default function SkillsListPage() {
  const [items, setItems] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/skill-categories")
      .then((res) => res.json())
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminShell>
      {loading ? (
        <p className="text-slate-500">Loading...</p>
      ) : (
        <ResourceList<SkillCategory>
          title="Skill Categories"
          basePath="/admin/skills"
          apiPath="/api/admin/skill-categories"
          items={items}
          columns={[
            { header: "Icon", render: (c) => <Icon name={c.icon} size={16} /> },
            { header: "Title", render: (c) => c.title },
            { header: "Skills", render: (c) => c.skills.length },
          ]}
          onDeleted={(id) => setItems((prev) => prev.filter((c) => c.id !== id))}
        />
      )}
    </AdminShell>
  );
}
