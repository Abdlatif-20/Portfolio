"use client";

import Link from "next/link";
import { toast } from "react-toastify";
import { FaPlus, FaTrash, FaPen } from "react-icons/fa";

export default function ResourceList<T extends { id: string }>({
  title,
  basePath,
  apiPath,
  items,
  columns,
  onDeleted,
}: {
  title: string;
  basePath: string;
  apiPath: string;
  items: T[];
  columns: { header: string; render: (item: T) => React.ReactNode }[];
  onDeleted: (id: string) => void;
}) {
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this item? This cannot be undone.")) return;
    const res = await fetch(`${apiPath}/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Deleted");
      onDeleted(id);
    } else {
      toast.error("Failed to delete");
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">{title}</h1>
        <Link
          href={`${basePath}/new`}
          className="flex items-center gap-2 rounded-lg bg-[#00BD95] px-4 py-2 text-xs font-bold text-white hover:bg-cyan-600"
        >
          <FaPlus size={12} /> New
        </Link>
      </div>
      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900 text-xs text-slate-400">
            <tr>
              {columns.map((c) => (
                <th key={c.header} className="px-4 py-3">
                  {c.header}
                </th>
              ))}
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-4 py-8 text-center text-slate-500"
                >
                  No items yet.
                </td>
              </tr>
            )}
            {items.map((item) => (
              <tr key={item.id} className="border-t border-slate-800 hover:bg-slate-900/50">
                {columns.map((c) => (
                  <td key={c.header} className="px-4 py-3 text-slate-300">
                    {c.render(item)}
                  </td>
                ))}
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`${basePath}/${item.id}`}
                      className="rounded-lg border border-slate-700 p-2 text-slate-300 hover:border-[#00BD95] hover:text-[#00BD95]"
                    >
                      <FaPen size={12} />
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="rounded-lg border border-slate-700 p-2 text-slate-300 hover:border-red-500 hover:text-red-400"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
