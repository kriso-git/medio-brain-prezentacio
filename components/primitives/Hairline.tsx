export function Hairline({ full = false }: { full?: boolean }) {
  if (full) {
    return (
      <div
        className="h-px w-full"
        style={{
          background: "linear-gradient(90deg, var(--border-strong), transparent)",
        }}
      />
    );
  }
  return (
    <div
      className="h-0.5 w-14 rounded-sm"
      style={{ background: "var(--blue)" }}
    />
  );
}
