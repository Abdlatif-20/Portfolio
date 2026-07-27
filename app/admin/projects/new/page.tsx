"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AdminShell from "@/components/admin/AdminShell";
import { Field, TextInput, TextArea, Checkbox } from "@/components/admin/Field";
import TagInput from "@/components/admin/TagInput";

export default function NewProjectPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    href: "",
    techStack: [] as string[],
    live: false,
    image: "",
    category: "",
    featured: false,
    order: 0,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      toast.success("Project created");
      router.push("/admin/projects");
    } else {
      toast.error("Failed to create project");
    }
  };

  return (
    <AdminShell>
      <h1 className="mb-6 text-xl font-bold text-white">New Project</h1>
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
          values={form.techStack}
          onChange={(techStack) => setForm({ ...form, techStack })}
        />
        <Field label="Image path or URL">
          <TextInput
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            placeholder="/projects/my-project.webp"
          />
        </Field>
        <Field label="Category">
          <TextInput
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            placeholder="Web Development"
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
          checked={form.live}
          onChange={(live) => setForm({ ...form, live })}
        />
        <Checkbox
          label="Featured"
          checked={form.featured}
          onChange={(featured) => setForm({ ...form, featured })}
        />
        <button
          type="submit"
          disabled={saving}
          className="mt-2 rounded-lg bg-[#00BD95] px-5 py-2 text-sm font-bold text-white hover:bg-cyan-600 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Create Project"}
        </button>
      </form>
    </AdminShell>
  );
}
