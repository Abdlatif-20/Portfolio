"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AdminShell from "@/components/admin/AdminShell";
import { Field, TextInput } from "@/components/admin/Field";
import RoleEditor from "@/components/admin/RoleEditor";

export default function EditExperiencePage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/experience")
      .then((res) => res.json())
      .then((list) => {
        const found = list.find((c: any) => c.id === id);
        if (found) setForm(found);
      });
  }, [id]);

  if (!form) {
    return (
      <AdminShell>
        <p className="text-slate-500">Loading...</p>
      </AdminShell>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch(`/api/admin/experience/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      toast.success("Company updated");
      router.push("/admin/experience");
    } else {
      toast.error("Failed to update company");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this company and all its roles? This cannot be undone.")) return;
    const res = await fetch(`/api/admin/experience/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Deleted");
      router.push("/admin/experience");
    } else {
      toast.error("Failed to delete");
    }
  };

  return (
    <AdminShell>
      <h1 className="mb-6 text-xl font-bold text-white">Edit Company</h1>
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
            value={form.logo ?? ""}
            onChange={(e) => setForm({ ...form, logo: e.target.value })}
          />
        </Field>
        <Field label="Total Duration">
          <TextInput
            required
            value={form.totalDuration}
            onChange={(e) => setForm({ ...form, totalDuration: e.target.value })}
          />
        </Field>
        <Field label="Start Date">
          <TextInput
            required
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
          />
        </Field>
        <Field label="End Date">
          <TextInput
            required
            value={form.endDate}
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
          />
        </Field>
        <Field label="Order">
          <TextInput
            type="number"
            value={form.order}
            onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
          />
        </Field>
        <RoleEditor roles={form.roles ?? []} onChange={(roles) => setForm({ ...form, roles })} />
        <div className="mt-2 flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-[#00BD95] px-5 py-2 text-sm font-bold text-white hover:bg-cyan-600 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-lg border border-red-500/50 px-5 py-2 text-sm font-bold text-red-400 hover:bg-red-500/10"
          >
            Delete
          </button>
        </div>
      </form>
    </AdminShell>
  );
}
