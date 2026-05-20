import clsx from "clsx";
import type { ReactNode } from "react";

export function Callout({
  children,
  variant = "blue",
  className,
}: {
  children: ReactNode;
  variant?: "blue" | "amber";
  className?: string;
}) {
  const isAmber = variant === "amber";
  return (
    <div
      className={clsx("rounded-3xl border p-8", className)}
      style={{
        borderColor: isAmber ? "rgba(255,120,73,0.4)" : "rgba(0,168,225,0.35)",
        background: isAmber
          ? "linear-gradient(135deg, rgba(255,120,73,0.08), var(--bg-card))"
          : "linear-gradient(135deg, rgba(0,168,225,0.08), var(--bg-card))",
        color: "var(--ink)",
        fontSize: "var(--type-body)",
        lineHeight: 1.35,
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {children}
    </div>
  );
}
