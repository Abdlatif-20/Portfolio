"use client";

import { useEffect, useState } from "react";

const cache: Record<string, any> = {};
const inflight: Record<string, Promise<any> | undefined> = {};
const listeners: Record<string, Set<() => void>> = {};

function notify(path: string) {
  listeners[path]?.forEach((fn) => fn());
}

function load(path: string) {
  if (cache[path] !== undefined) return Promise.resolve(cache[path]);
  if (inflight[path]) return inflight[path];

  inflight[path] = fetch(`/api/public/${path}`)
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => {
      cache[path] = data;
      delete inflight[path];
      notify(path);
      return data;
    })
    .catch(() => {
      delete inflight[path];
      return null;
    });

  return inflight[path];
}

export function usePublicContent<T = any>(path: string): { data: T | null; loading: boolean } {
  const [data, setData] = useState<T | null>(cache[path] ?? null);
  const [loading, setLoading] = useState(cache[path] === undefined);

  useEffect(() => {
    let mounted = true;

    if (!listeners[path]) listeners[path] = new Set();
    const onUpdate = () => {
      if (mounted) {
        setData(cache[path] ?? null);
        setLoading(false);
      }
    };
    listeners[path].add(onUpdate);

    if (cache[path] !== undefined) {
      setData(cache[path]);
      setLoading(false);
    } else {
      load(path).then(() => {
        if (mounted) {
          setData(cache[path] ?? null);
          setLoading(false);
        }
      });
    }

    return () => {
      mounted = false;
      listeners[path]?.delete(onUpdate);
    };
  }, [path]);

  return { data, loading };
}
