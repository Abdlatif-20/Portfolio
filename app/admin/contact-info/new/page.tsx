"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AdminShell from "@/components/admin/AdminShell";
import { Field, TextInput } from "@/components/admin/Field";
import IconSelect from "@/components/admin/IconSelect";

export default function NewContactInfoPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    icon: "",
    label: "",
    value: "",
    link: "",
    order: 0,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/contact-info", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      toast.success("Contact info created");
      router.push("/admin/contact-info");
    } else {
      toast.error("Failed to create item");
    }
  };

  return (
    <AdminShell>
      <h1 className="mb-6 text-xl font-bold text-white">New Contact Info</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <IconSelect
          label="Icon"
          value={form.icon}
          onChange={(icon) => setForm({ ...form, icon })}
        />
        <Field label="Label">
          <TextInput
            required
            value={form.label}
            onChange={(e) => setForm({ ...form, label: e.target.value })}
            placeholder="Email"
          />
        </Field>
        <Field label="Value">
          <TextInput
            required
            value={form.value}
            onChange={(e) => setForm({ ...form, value: e.target.value })}
          />
        </Field>
        <Field label="Link (optional)">
          <TextInput
            value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
            placeholder="mailto:you@example.com"
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
