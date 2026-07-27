"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AdminShell from "@/components/admin/AdminShell";
import { Field, TextInput, TextArea } from "@/components/admin/Field";
import TagInput from "@/components/admin/TagInput";

export default function EditEducationPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/education")
      .then((res) => res.json())
      .then((list) => {
        const found = list.find((e: any) => e.id === id);
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
    const res = await fetch(`/api/admin/education/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      toast.success("Education item updated");
      router.push("/admin/education");
    } else {
      toast.error("Failed to update item");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this item? This cannot be undone.")) return;
    const res = await fetch(`/api/admin/education/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Deleted");
      router.push("/admin/education");
    } else {
      toast.error("Failed to delete");
    }
  };

  return (
    <AdminShell>
      <h1 className="mb-6 text-xl font-bold text-white">Edit Education Item</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <Field label="Institution">
          <TextInput
            required
            value={form.institution}
            onChange={(e) => setForm({ ...form, institution: e.target.value })}
          />
        </Field>
        <Field label="Degree">
          <TextInput
            required
            value={form.degree}
            onChange={(e) => setForm({ ...form, degree: e.target.value })}
          />
        </Field>
        <Field label="Period">
          <TextInput
            required
            value={form.period}
            onChange={(e) => setForm({ ...form, period: e.target.value })}
          />
        </Field>
        <Field label="Location">
          <TextInput
            value={form.location ?? ""}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
        </Field>
        <Field label="Status">
          <TextInput
            value={form.status ?? ""}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          />
        </Field>
        <Field label="Note">
          <TextArea
            value={form.note ?? ""}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
          />
        </Field>
        <TagInput
          label="Skills"
          values={form.skills ?? []}
          onChange={(skills) => setForm({ ...form, skills })}
        />
        <Field label="Order">
          <TextInput
            type="number"
            value={form.order}
            onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
          />
        </Field>
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
