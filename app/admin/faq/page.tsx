"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import ResourceList from "@/components/admin/ResourceList";

type FaqItem = { id: string; question: string; answer: string };

export default function FaqListPage() {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/faq")
      .then((res) => res.json())
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminShell>
      {loading ? (
        <p className="text-slate-500">Loading...</p>
      ) : (
        <ResourceList<FaqItem>
          title="FAQ"
          basePath="/admin/faq"
          apiPath="/api/admin/faq"
          items={items}
          columns={[
            { header: "Question", render: (f) => f.question },
            {
              header: "Answer",
              render: (f) => (f.answer.length > 60 ? `${f.answer.slice(0, 60)}…` : f.answer),
            },
          ]}
          onDeleted={(id) => setItems((prev) => prev.filter((f) => f.id !== id))}
        />
      )}
    </AdminShell>
  );
}
