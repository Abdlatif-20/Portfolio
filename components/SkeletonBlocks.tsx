"use client";

import { useDarkMode } from "./context";

// Shared loading-skeleton grid used by every DB-backed section while its
// usePublicContent() fetch is in flight, so sections never show a blank gap.
export function SkeletonGrid({
  count,
  itemClassName,
  gridClassName,
}: {
  count: number;
  itemClassName: string;
  gridClassName: string;
}) {
  const { isDarkMode } = useDarkMode();
  return (
    <div className={gridClassName}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`animate-pulse rounded-2xl ${isDarkMode ? "bg-slate-800/50" : "bg-slate-100"} ${itemClassName}`}
        />
      ))}
    </div>
  );
}
