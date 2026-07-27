"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { FaFilePdf, FaUpload } from "react-icons/fa";
import AdminShell from "@/components/admin/AdminShell";

type ResumeMeta = {
  filename: string;
  mimeType: string;
  size: number;
  updatedAt: string;
} | null;

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ResumeAdminPage() {
  const [resume, setResume] = useState<ResumeMeta>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = () => {
    fetch("/api/admin/resume")
      .then((r) => r.json())
      .then((data) => setResume(data))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleUpload = async (file: File) => {
    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are accepted");
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/admin/resume", { method: "POST", body: formData });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Upload failed");
      }
      const data = await res.json();
      setResume(data);
      toast.success("Resume updated");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <AdminShell>
      <h1 className="mb-6 text-xl font-bold text-white">Resume</h1>

      {loading ? (
        <p className="text-slate-500">Loading...</p>
      ) : (
        <div className="max-w-lg rounded-xl border border-slate-800 bg-slate-900 p-6">
          {resume ? (
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-800 text-[#00BD95]">
                <FaFilePdf size={22} />
              </div>
              <div>
                <div className="text-sm font-bold text-white">{resume.filename}</div>
                <div className="text-xs text-slate-400">
                  {formatSize(resume.size)} · updated{" "}
                  {new Date(resume.updatedAt).toLocaleString()}
                </div>
                <a
                  href="/api/public/resume"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#00BD95] hover:underline"
                >
                  View current resume
                </a>
              </div>
            </div>
          ) : (
            <p className="mb-6 text-sm text-slate-400">No resume uploaded yet.</p>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUpload(file);
            }}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 rounded-lg bg-[#00BD95] px-4 py-2 text-xs font-bold text-white hover:bg-cyan-600 disabled:opacity-50"
          >
            <FaUpload size={12} />
            {uploading ? "Uploading..." : resume ? "Replace PDF" : "Upload PDF"}
          </button>
          <p className="mt-3 text-xs text-slate-500">PDF only, max 10MB. Replaces the file the whole site links to.</p>
        </div>
      )}
    </AdminShell>
  );
}
