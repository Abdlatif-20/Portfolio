"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AdminShell from "@/components/admin/AdminShell";
import { Field, TextInput } from "@/components/admin/Field";
import IconSelect from "@/components/admin/IconSelect";

export default function NewSocialLinkPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    platform: "",
    icon: "",
    url: "",
    username: "",
    color: "",
    order: 0,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/social-links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      toast.success("Social link created");
      router.push("/admin/social-links");
    } else {
      toast.error("Failed to create social link");
    }
  };

  return (
    <AdminShell>
      <h1 className="mb-6 text-xl font-bold text-white">New Social Link</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <Field label="Platform">
          <TextInput
            required
            value={form.platform}
            onChange={(e) => setForm({ ...form, platform: e.target.value })}
            placeholder="LinkedIn"
          />
        </Field>
        <IconSelect
          label="Icon"
          value={form.icon}
          onChange={(icon) => setForm({ ...form, icon })}
        />
        <Field label="URL">
          <TextInput
            required
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
          />
        </Field>
        <Field label="Username">
          <TextInput
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </Field>
        <Field label="Color (hex)">
          <TextInput
            value={form.color}
            onChange={(e) => setForm({ ...form, color: e.target.value })}
            placeholder="#0A66C2"
          />
        </Field>
        <Field label="Order">
          <TextInput
            type="number"
            value={form.order}
            onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
          />
        </Field>
        <button
          type="submit"
          disabled={saving}
          className="mt-2 rounded-lg bg-[#00BD95] px-5 py-2 text-sm font-bold text-white hover:bg-cyan-600 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Create"}
        </button>
      </form>
    </AdminShell>
  );
}
