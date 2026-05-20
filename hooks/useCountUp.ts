"use client";
import { useEffect, useState } from "react";

export function useCountUp(
  target: number,
  durationMs: number,
  active: boolean,
  respectReducedMotion = true,
): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (
      respectReducedMotion &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setValue(target);
      return;
    }
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
  }, [target, durationMs, active, respectReducedMotion]);

  return value;
}
