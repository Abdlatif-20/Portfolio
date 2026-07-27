"use client";

import { Field, TextInput } from "@/components/admin/Field";
import IconSelect from "@/components/admin/IconSelect";
import { FaTrash, FaPlus } from "react-icons/fa";

export type SkillEntry = {
  name: string;
  icon: string;
  level: number;
  color: string;
  order: number;
};

export const emptySkill = (order: number): SkillEntry => ({
  name: "",
  icon: "",
  level: 50,
  color: "",
  order,
});

export default function SkillEditor({
  skills,
  onChange,
}: {
  skills: SkillEntry[];
  onChange: (skills: SkillEntry[]) => void;
}) {
  const updateSkill = (index: number, patch: Partial<SkillEntry>) => {
    onChange(skills.map((s, i) => (i === index ? { ...s, ...patch } : s)));
  };

  const removeSkill = (index: number) => {
    onChange(skills.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-4">
      <div className="mb-2 flex items-center justify-between">
        <label className="text-xs text-slate-400">Skills</label>
        <button
          type="button"
          onClick={() => onChange([...skills, emptySkill(skills.length)])}
          className="flex items-center gap-1 rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-300 hover:border-[#00BD95] hover:text-[#00BD95]"
        >
          <FaPlus size={10} /> Add Skill
        </button>
      </div>
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">Skill {index + 1}</span>
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="text-slate-500 hover:text-red-400"
              >
                <FaTrash size={12} />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label="Name">
                <TextInput
                  value={skill.name}
                  onChange={(e) => updateSkill(index, { name: e.target.value })}
                />
              </Field>
              <IconSelect
                label="Icon"
                value={skill.icon}
                onChange={(icon) => updateSkill(index, { icon })}
              />
              <Field label="Level (0-100)">
                <TextInput
                  type="number"
                  min={0}
                  max={100}
                  value={skill.level}
                  onChange={(e) => updateSkill(index, { level: Number(e.target.value) })}
                />
              </Field>
              <Field label="Color (hex)">
                <TextInput
                  value={skill.color}
                  onChange={(e) => updateSkill(index, { color: e.target.value })}
                  placeholder="#61DAFB"
                />
              </Field>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
