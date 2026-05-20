export function SlideMeta({ num, total }: { num: string; total: string }) {
  return (
    <div
      className="absolute z-30"
      style={{
        top: 48,
        right: "var(--pad-x)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--type-small)",
        color: "var(--muted-2)",
        letterSpacing: "0.04em",
        fontWeight: 400,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ color: "var(--blue)", fontWeight: 500 }}>{num}</span> /{" "}
      {total}
    </div>
  );
}
