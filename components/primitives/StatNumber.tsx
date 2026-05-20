"use client";
import { useCountUp } from "@/hooks/useCountUp";
import { useInViewOnce } from "@/hooks/useInViewOnce";

export function StatNumber({
  value,
  suffix = "",
  label,
  size = "default",
}: {
  value: number;
  suffix?: string;
  label?: string;
  size?: "default" | "large";
}) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.3);
  const current = useCountUp(value, 1500, inView);
  return (
    <div ref={ref}>
      <div
        style={{
          fontSize: size === "large" ? "var(--type-num)" : "var(--type-title)",
          color: "var(--blue)",
          fontWeight: 400,
          lineHeight: 1,
          letterSpacing: "-0.03em",
          fontFamily: "var(--font-sans)",
        }}
      >
        {current.toLocaleString("hu-HU")}
        {suffix}
      </div>
      {label ? (
        <div
          style={{
            fontSize: "var(--type-small)",
            color: "var(--ink-2)",
            marginTop: "12px",
          }}
        >
          {label}
        </div>
      ) : null}
    </div>
  );
}
