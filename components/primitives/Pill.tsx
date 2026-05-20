import clsx from "clsx";
import type { ReactNode } from "react";

export function Pill({
  children,
  variant = "default",
  className,
}: {
  children: ReactNode;
  variant?: "default" | "amber" | "tag";
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2.5 rounded-full border",
        variant === "tag" ? "px-6 py-3 text-sm uppercase tracking-widest" : "px-5 py-2.5",
        className,
      )}
      style={{
        background: variant === "tag" ? "var(--blue-tint)" : "var(--bg-card)",
        borderColor: variant === "tag" ? "rgba(0,168,225,0.18)" : "var(--border)",
        color: variant === "tag" ? "var(--blue-dark)" : "var(--ink-2)",
        boxShadow: variant === "tag" ? "none" : "var(--shadow-sm)",
        fontSize: "var(--type-small)",
      }}
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{
          background: variant === "amber" ? "var(--amber)" : "var(--blue)",
        }}
      />
      {children}
    </span>
  );
}
