"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { SLIDES_META } from "@/lib/content";

export function SlideIndicator() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sections = SLIDES_META.map((s) =>
      document.getElementById(`slide-${s.id}`),
    ).filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!top) return;
        const idx = sections.indexOf(top.target as HTMLElement);
        if (idx >= 0) setActive(idx);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <nav
      aria-label="Dia navigáció"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
    >
      {SLIDES_META.map((s, i) => (
        <a
          key={s.id}
          href={`#slide-${s.id}`}
          aria-label={`Dia ${s.num}: ${s.tag}`}
          className={clsx(
            "block rounded-full transition-all duration-300",
            i === active ? "h-8 w-2.5" : "h-2.5 w-2.5",
          )}
          style={{
            background:
              i === active ? "var(--blue)" : "rgba(10, 25, 41, 0.25)",
            boxShadow:
              i === active ? "0 0 12px rgba(0,168,225,0.6)" : "none",
          }}
        />
      ))}
    </nav>
  );
}
