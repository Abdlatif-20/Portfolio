"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AdminShell from "@/components/admin/AdminShell";
import { Field, TextInput } from "@/components/admin/Field";
import RoleEditor, { Role } from "@/components/admin/RoleEditor";

export default function NewExperiencePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    logo: "",
    totalDuration: "",
    startDate: "",
    endDate: "",
    order: 0,
    roles: [] as Role[],
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/experience", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      toast.success("Company created");
      router.push("/admin/experience");
    } else {
      toast.error("Failed to create company");
    }
  };

  return (
    <AdminShell>
      <h1 className="mb-6 text-xl font-bold text-white">New Company</h1>
      <form onSubmit={handleSubmit} className="max-w-3xl">
        <Field label="Company Name">
          <TextInput
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </Field>
        <Field label="Logo path or URL">
          <TextInput
            value={form.logo}
            onChange={(e) => setForm({ ...form, logo: e.target.value })}
            placeholder="/images/logos/company.jpeg"
          />
        </Field>
        <Field label="Total Duration">
          <TextInput
            required
            value={form.totalDuration}
            onChange={(e) => setForm({ ...form, totalDuration: e.target.value })}
            placeholder="8 months"
          />
        </Field>
        <Field label="Start Date">
          <TextInput
            required
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            placeholder="2025/12"
          />
        </Field>
        <Field label="End Date">
          <TextInput
            required
            value={form.endDate}
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            placeholder="Present"
          />
        </Field>
        <Field label="Order">
          <TextInput
            type="number"
            value={form.order}
            onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
          />
        </Field>
        <RoleEditor roles={form.roles} onChange={(roles) => setForm({ ...form, roles })} />
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
