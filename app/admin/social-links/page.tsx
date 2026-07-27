"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import ResourceList from "@/components/admin/ResourceList";
import { Icon } from "@/lib/icon-registry";

type SocialLink = {
  id: string;
  platform: string;
  icon: string;
  url: string;
  username: string | null;
};

export default function SocialLinksListPage() {
  const [items, setItems] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/social-links")
      .then((res) => res.json())
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminShell>
      {loading ? (
        <p className="text-slate-500">Loading...</p>
      ) : (
        <ResourceList<SocialLink>
          title="Social Links"
          basePath="/admin/social-links"
          apiPath="/api/admin/social-links"
          items={items}
          columns={[
            {
              header: "Icon",
              render: (s) => <Icon name={s.icon} size={16} />,
            },
            { header: "Platform", render: (s) => s.platform },
            { header: "Username", render: (s) => s.username || "—" },
            { header: "URL", render: (s) => s.url },
          ]}
          onDeleted={(id) => setItems((prev) => prev.filter((s) => s.id !== id))}
        />
      )}
    </AdminShell>
  );
}
