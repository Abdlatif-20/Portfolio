"use client";

import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function TagInput({
  label,
  values,
  onChange,
}: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
}) {
  const [draft, setDraft] = useState("");

  const add = () => {
    const trimmed = draft.trim();
    if (trimmed) onChange([...values, trimmed]);
    setDraft("");
  };

  return (
    <div className="mb-4">
      <label className="mb-2 block text-xs text-slate-400">{label}</label>
      <div className="mb-2 flex flex-wrap gap-2">
        {values.map((v, i) => (
          <span
            key={`${v}-${i}`}
            className="flex items-center gap-1 rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-slate-200"
          >
            {v}
            <button
              type="button"
              onClick={() => onChange(values.filter((_, idx) => idx !== i))}
              className="text-slate-500 hover:text-red-400"
            >
              <FaTimes size={10} />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-[#00BD95]"
          placeholder="Type and press Enter"
        />
        <button
          type="button"
          onClick={add}
          className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-300 hover:border-[#00BD95] hover:text-[#00BD95]"
        >
          Add
        </button>
      </div>
    </div>
  );
}
