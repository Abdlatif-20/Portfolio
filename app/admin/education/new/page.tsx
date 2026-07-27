"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AdminShell from "@/components/admin/AdminShell";
import { Field, TextInput, TextArea } from "@/components/admin/Field";
import TagInput from "@/components/admin/TagInput";

export default function NewEducationPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    institution: "",
    degree: "",
    period: "",
    note: "",
    location: "",
    status: "",
    skills: [] as string[],
    order: 0,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/education", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      toast.success("Education item created");
      router.push("/admin/education");
    } else {
      toast.error("Failed to create item");
    }
  };

  return (
    <AdminShell>
      <h1 className="mb-6 text-xl font-bold text-white">New Education Item</h1>
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
            placeholder="2022 — PRESENT"
          />
        </Field>
        <Field label="Location">
          <TextInput
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
        </Field>
        <Field label="Status">
          <TextInput
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            placeholder="In Progress / Completed / Graduated"
          />
        </Field>
        <Field label="Note">
          <TextArea
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
          />
        </Field>
        <TagInput
          label="Skills"
          values={form.skills}
          onChange={(skills) => setForm({ ...form, skills })}
        />
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
