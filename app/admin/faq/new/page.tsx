"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AdminShell from "@/components/admin/AdminShell";
import { Field, TextInput, TextArea } from "@/components/admin/Field";

export default function NewFaqPage() {
  const router = useRouter();
  const [form, setForm] = useState({ question: "", answer: "", order: 0 });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/faq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      toast.success("FAQ item created");
      router.push("/admin/faq");
    } else {
      toast.error("Failed to create item");
    }
  };

  return (
    <AdminShell>
      <h1 className="mb-6 text-xl font-bold text-white">New FAQ Item</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <Field label="Question">
          <TextInput
            required
            value={form.question}
            onChange={(e) => setForm({ ...form, question: e.target.value })}
          />
        </Field>
        <Field label="Answer">
          <TextArea
            required
            value={form.answer}
            onChange={(e) => setForm({ ...form, answer: e.target.value })}
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
