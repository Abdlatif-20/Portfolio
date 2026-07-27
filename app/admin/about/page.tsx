"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminShell from "@/components/admin/AdminShell";
import { Field, TextInput, TextArea } from "@/components/admin/Field";
import TagInput from "@/components/admin/TagInput";
import IconSelect from "@/components/admin/IconSelect";
import { FaTrash, FaPlus } from "react-icons/fa";

type TechIconEntry = { name: string; icon: string; order: number };

export default function AboutEditorPage() {
  const [form, setForm] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/about")
      .then((res) => res.json())
      .then(setForm);
  }, []);

  if (!form) {
    return (
      <AdminShell>
        <p className="text-slate-500">Loading...</p>
      </AdminShell>
    );
  }

  const techIcons: TechIconEntry[] = form.techIcons ?? [];

  const updateTechIcon = (index: number, patch: Partial<TechIconEntry>) => {
    setForm({
      ...form,
      techIcons: techIcons.map((t, i) => (i === index ? { ...t, ...patch } : t)),
    });
  };

  const removeTechIcon = (index: number) => {
    setForm({ ...form, techIcons: techIcons.filter((_, i) => i !== index) });
  };

  const addTechIcon = () => {
    setForm({
      ...form,
      techIcons: [...techIcons, { name: "", icon: "", order: techIcons.length }],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/about", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      toast.success("About content updated");
    } else {
      toast.error("Failed to update about content");
    }
  };

  return (
    <AdminShell>
      <h1 className="mb-6 text-xl font-bold text-white">About Content</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <TagInput
          label="Typewriter Phrases"
          values={form.typewriterPhrases ?? []}
          onChange={(typewriterPhrases) => setForm({ ...form, typewriterPhrases })}
        />
        <Field label="Bio">
          <TextArea
            value={form.bio ?? ""}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
          />
        </Field>
        <div className="grid grid-cols-3 gap-3">
          <Field label="Project Count">
            <TextInput
              type="number"
              value={form.projectCount ?? 0}
              onChange={(e) => setForm({ ...form, projectCount: Number(e.target.value) })}
            />
          </Field>
          <Field label="Years Count">
            <TextInput
              type="number"
              value={form.yearsCount ?? 0}
              onChange={(e) => setForm({ ...form, yearsCount: Number(e.target.value) })}
            />
          </Field>
          <Field label="Tech Count">
            <TextInput
              type="number"
              value={form.techCount ?? 0}
              onChange={(e) => setForm({ ...form, techCount: Number(e.target.value) })}
            />
          </Field>
        </div>

        <div className="mb-4 mt-2">
          <div className="mb-2 flex items-center justify-between">
            <label className="text-xs text-slate-400">Tech Icons</label>
            <button
              type="button"
              onClick={addTechIcon}
              className="flex items-center gap-1 rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-300 hover:border-[#00BD95] hover:text-[#00BD95]"
            >
              <FaPlus size={10} /> Add
            </button>
          </div>
          <div className="space-y-3">
            {techIcons.map((t, index) => (
              <div key={index} className="flex items-end gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                <div className="flex-1">
                  <Field label="Name">
                    <TextInput
                      value={t.name}
                      onChange={(e) => updateTechIcon(index, { name: e.target.value })}
                    />
                  </Field>
                </div>
                <div className="flex-1">
                  <IconSelect
                    label="Icon"
                    value={t.icon}
                    onChange={(icon) => updateTechIcon(index, { icon })}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeTechIcon(index)}
                  className="mb-4 text-slate-500 hover:text-red-400"
                >
                  <FaTrash size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="mt-2 rounded-lg bg-[#00BD95] px-5 py-2 text-sm font-bold text-white hover:bg-cyan-600 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </AdminShell>
  );
}
