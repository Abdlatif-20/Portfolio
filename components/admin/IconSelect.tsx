"use client";

import { iconNames, Icon } from "@/lib/icon-registry";

export default function IconSelect({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="mb-4">
      <label className="mb-2 block text-xs text-slate-400">{label}</label>
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-950 text-[#00BD95]">
          {value ? <Icon name={value} size={18} /> : null}
        </div>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-[#00BD95]"
        >
          <option value="">Select icon...</option>
          {iconNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
