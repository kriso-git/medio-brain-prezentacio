import clsx from "clsx";
import type { ReactNode } from "react";

export function Card({
  children,
  dense = false,
  featured = false,
  className,
}: {
  children: ReactNode;
  dense?: boolean;
  featured?: boolean;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden border",
        dense ? "rounded-3xl p-8" : "rounded-[28px] p-10",
        className,
      )}
      style={{
        background: featured
          ? "linear-gradient(180deg, rgba(0,168,225,0.06), var(--bg-card) 50%)"
          : "var(--bg-card)",
        borderColor: featured ? "rgba(0,168,225,0.30)" : "var(--border)",
        boxShadow: featured ? "var(--shadow-blue)" : "var(--shadow-md)",
      }}
    >
      {children}
    </div>
  );
}
