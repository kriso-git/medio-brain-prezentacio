import type { ReactNode } from "react";

export function ButtonPill({
  children,
  href,
}: {
  children: ReactNode;
  href?: string;
}) {
  const className =
    "inline-flex items-center gap-3.5 rounded-full px-8 py-4 text-white font-medium transition-transform hover:scale-105";
  const style = {
    background: "var(--blue)",
    boxShadow: "var(--shadow-blue)",
    fontSize: "var(--type-small)",
  };
  if (href) {
    return (
      <a href={href} className={className} style={style}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={className} style={style}>
      {children}
    </button>
  );
}
