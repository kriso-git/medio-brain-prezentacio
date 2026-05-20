export function CodeBlock({ code }: { code: string }) {
  return (
    <pre
      className="overflow-hidden rounded-2xl border"
      style={{
        background: "#0A1929",
        borderColor: "rgba(255,255,255,0.06)",
        padding: "28px 32px",
        margin: 0,
        color: "rgba(255,255,255,0.85)",
        lineHeight: 1.6,
        fontSize: "var(--type-mono)",
        fontFamily: "var(--font-mono)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      <code>{code}</code>
    </pre>
  );
}
