"use client";
import { useEffect, useState, useSyncExternalStore } from "react";

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduced(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia(REDUCED_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getReducedSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia(REDUCED_QUERY).matches;
}

export function useCountUp(
  target: number,
  durationMs: number,
  active: boolean,
  respectReducedMotion = true,
): number {
  const reducedMotion = useSyncExternalStore(
    subscribeReduced,
    getReducedSnapshot,
    () => false,
  );
  const skipAnimation = respectReducedMotion && reducedMotion;
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (skipAnimation) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs, active, skipAnimation]);

  if (skipAnimation && active) return target;
  return value;
}
