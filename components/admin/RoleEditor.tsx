"use client";

import { Field, TextInput, TextArea } from "@/components/admin/Field";
import TagInput from "@/components/admin/TagInput";
import { FaTrash, FaPlus } from "react-icons/fa";

export type Role = {
  title: string;
  type: string;
  period: string;
  duration: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
  order: number;
};

export const emptyRole = (order: number): Role => ({
  title: "",
  type: "",
  period: "",
  duration: "",
  location: "",
  description: "",
  achievements: [],
  technologies: [],
  order,
});

export default function RoleEditor({
  roles,
  onChange,
}: {
  roles: Role[];
  onChange: (roles: Role[]) => void;
}) {
  const updateRole = (index: number, patch: Partial<Role>) => {
    onChange(roles.map((r, i) => (i === index ? { ...r, ...patch } : r)));
  };

  const removeRole = (index: number) => {
    onChange(roles.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-4">
      <div className="mb-2 flex items-center justify-between">
        <label className="text-xs text-slate-400">Roles</label>
        <button
          type="button"
          onClick={() => onChange([...roles, emptyRole(roles.length)])}
          className="flex items-center gap-1 rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-300 hover:border-[#00BD95] hover:text-[#00BD95]"
        >
          <FaPlus size={10} /> Add Role
        </button>
      </div>
      <div className="space-y-4">
        {roles.map((role, index) => (
          <div key={index} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">Role {index + 1}</span>
              <button
                type="button"
                onClick={() => removeRole(index)}
                className="text-slate-500 hover:text-red-400"
              >
                <FaTrash size={12} />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label="Title">
                <TextInput
                  value={role.title}
                  onChange={(e) => updateRole(index, { title: e.target.value })}
                />
              </Field>
              <Field label="Type">
                <TextInput
                  value={role.type}
                  onChange={(e) => updateRole(index, { type: e.target.value })}
                  placeholder="Full-time / Internship / Freelance"
                />
              </Field>
              <Field label="Period">
                <TextInput
                  value={role.period}
                  onChange={(e) => updateRole(index, { period: e.target.value })}
                />
              </Field>
              <Field label="Duration">
                <TextInput
                  value={role.duration}
                  onChange={(e) => updateRole(index, { duration: e.target.value })}
                />
              </Field>
              <Field label="Location">
                <TextInput
                  value={role.location}
                  onChange={(e) => updateRole(index, { location: e.target.value })}
                />
              </Field>
            </div>
            <Field label="Description">
              <TextArea
                value={role.description}
                onChange={(e) => updateRole(index, { description: e.target.value })}
              />
            </Field>
            <TagInput
              label="Achievements"
              values={role.achievements}
              onChange={(achievements) => updateRole(index, { achievements })}
            />
            <TagInput
              label="Technologies"
              values={role.technologies}
              onChange={(technologies) => updateRole(index, { technologies })}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
