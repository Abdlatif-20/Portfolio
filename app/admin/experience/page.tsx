"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import ResourceList from "@/components/admin/ResourceList";

type ExperienceCompany = {
  id: string;
  name: string;
  totalDuration: string;
  roles: { id: string }[];
};

export default function ExperienceListPage() {
  const [items, setItems] = useState<ExperienceCompany[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/experience")
      .then((res) => res.json())
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminShell>
      {loading ? (
        <p className="text-slate-500">Loading...</p>
      ) : (
        <ResourceList<ExperienceCompany>
          title="Experience"
          basePath="/admin/experience"
          apiPath="/api/admin/experience"
          items={items}
          columns={[
            { header: "Company", render: (c) => c.name },
            { header: "Duration", render: (c) => c.totalDuration },
            { header: "Roles", render: (c) => c.roles.length },
          ]}
          onDeleted={(id) => setItems((prev) => prev.filter((c) => c.id !== id))}
        />
      )}
    </AdminShell>
  );
}
