"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AdminShell from "@/components/admin/AdminShell";
import { Field, TextInput, TextArea, Checkbox } from "@/components/admin/Field";
import TagInput from "@/components/admin/TagInput";

export default function EditProjectPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/projects")
      .then((res) => res.json())
      .then((list) => {
        const found = list.find((p: any) => p.id === id);
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
    const res = await fetch(`/api/admin/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      toast.success("Project updated");
      router.push("/admin/projects");
    } else {
      toast.error("Failed to update project");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Project deleted");
      router.push("/admin/projects");
    } else {
      toast.error("Failed to delete project");
    }
  };

  return (
    <AdminShell>
      <h1 className="mb-6 text-xl font-bold text-white">Edit Project</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <Field label="Title">
          <TextInput
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </Field>
        <Field label="Description">
          <TextArea
            required
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </Field>
        <Field label="Link (href)">
          <TextInput
            required
            value={form.href}
            onChange={(e) => setForm({ ...form, href: e.target.value })}
          />
        </Field>
        <TagInput
          label="Tech Stack"
          values={form.techStack ?? []}
          onChange={(techStack) => setForm({ ...form, techStack })}
        />
        <Field label="Image path or URL">
          <TextInput
            value={form.image ?? ""}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
        </Field>
        <Field label="Category">
          <TextInput
            value={form.category ?? ""}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
        </Field>
        <Field label="Order">
          <TextInput
            type="number"
            value={form.order}
            onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
          />
        </Field>
        <Checkbox
          label="Live (has a live deployment)"
          checked={!!form.live}
          onChange={(live) => setForm({ ...form, live })}
        />
        <Checkbox
          label="Featured"
          checked={!!form.featured}
          onChange={(featured) => setForm({ ...form, featured })}
        />
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
