"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AdminShell from "@/components/admin/AdminShell";
import { Field, TextInput } from "@/components/admin/Field";
import IconSelect from "@/components/admin/IconSelect";
import SkillEditor from "@/components/admin/SkillEditor";

export default function EditSkillCategoryPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/skill-categories")
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
    const res = await fetch(`/api/admin/skill-categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      toast.success("Skill category updated");
      router.push("/admin/skills");
    } else {
      toast.error("Failed to update category");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this category and all its skills? This cannot be undone.")) return;
    const res = await fetch(`/api/admin/skill-categories/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Deleted");
      router.push("/admin/skills");
    } else {
      toast.error("Failed to delete");
    }
  };

  return (
    <AdminShell>
      <h1 className="mb-6 text-xl font-bold text-white">Edit Skill Category</h1>
      <form onSubmit={handleSubmit} className="max-w-3xl">
        <Field label="Title">
          <TextInput
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </Field>
        <IconSelect
          label="Category Icon"
          value={form.icon}
          onChange={(icon) => setForm({ ...form, icon })}
        />
        <Field label="Color (Tailwind gradient classes)">
          <TextInput
            required
            value={form.color}
            onChange={(e) => setForm({ ...form, color: e.target.value })}
          />
        </Field>
        <Field label="Order">
          <TextInput
            type="number"
            value={form.order}
            onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
          />
        </Field>
        <SkillEditor skills={form.skills ?? []} onChange={(skills) => setForm({ ...form, skills })} />
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
