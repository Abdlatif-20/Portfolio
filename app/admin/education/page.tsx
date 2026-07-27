"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import ResourceList from "@/components/admin/ResourceList";

type EducationItem = {
  id: string;
  institution: string;
  degree: string;
  period: string;
  status: string | null;
};

export default function EducationListPage() {
  const [items, setItems] = useState<EducationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/education")
      .then((res) => res.json())
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminShell>
      {loading ? (
        <p className="text-slate-500">Loading...</p>
      ) : (
        <ResourceList<EducationItem>
          title="Education"
          basePath="/admin/education"
          apiPath="/api/admin/education"
          items={items}
          columns={[
            { header: "Institution", render: (e) => e.institution },
            { header: "Degree", render: (e) => e.degree },
            { header: "Period", render: (e) => e.period },
            { header: "Status", render: (e) => e.status || "—" },
          ]}
          onDeleted={(id) => setItems((prev) => prev.filter((e) => e.id !== id))}
        />
      )}
    </AdminShell>
  );
}
