"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import ResourceList from "@/components/admin/ResourceList";
import { Icon } from "@/lib/icon-registry";

type ContactInfoItem = {
  id: string;
  icon: string;
  label: string;
  value: string;
  link: string | null;
};

export default function ContactInfoListPage() {
  const [items, setItems] = useState<ContactInfoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/contact-info")
      .then((res) => res.json())
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminShell>
      {loading ? (
        <p className="text-slate-500">Loading...</p>
      ) : (
        <ResourceList<ContactInfoItem>
          title="Contact Info"
          basePath="/admin/contact-info"
          apiPath="/api/admin/contact-info"
          items={items}
          columns={[
            { header: "Icon", render: (c) => <Icon name={c.icon} size={16} /> },
            { header: "Label", render: (c) => c.label },
            { header: "Value", render: (c) => c.value },
          ]}
          onDeleted={(id) => setItems((prev) => prev.filter((c) => c.id !== id))}
        />
      )}
    </AdminShell>
  );
}
