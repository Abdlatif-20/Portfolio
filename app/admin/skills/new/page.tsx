"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AdminShell from "@/components/admin/AdminShell";
import { Field, TextInput } from "@/components/admin/Field";
import IconSelect from "@/components/admin/IconSelect";
import SkillEditor, { SkillEntry } from "@/components/admin/SkillEditor";

export default function NewSkillCategoryPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    icon: "",
    color: "",
    order: 0,
    skills: [] as SkillEntry[],
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/skill-categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      toast.success("Skill category created");
      router.push("/admin/skills");
    } else {
      toast.error("Failed to create category");
    }
  };

  return (
    <AdminShell>
      <h1 className="mb-6 text-xl font-bold text-white">New Skill Category</h1>
      <form onSubmit={handleSubmit} className="max-w-3xl">
        <Field label="Title">
          <TextInput
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Frontend & Mobile"
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
            placeholder="from-cyan-500 to-blue-500"
          />
        </Field>
        <Field label="Order">
          <TextInput
            type="number"
            value={form.order}
            onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
          />
        </Field>
        <SkillEditor skills={form.skills} onChange={(skills) => setForm({ ...form, skills })} />
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
