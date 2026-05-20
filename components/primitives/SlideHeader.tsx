export function SlideHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <header>
      <h2
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "var(--type-title)",
          fontWeight: 300,
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
          margin: 0,
        }}
      >
        {title}
      </h2>
      <p
        className="mt-3"
        style={{
          fontSize: "var(--type-subtitle)",
          color: "var(--muted)",
          fontWeight: 300,
          lineHeight: 1.3,
        }}
      >
        {subtitle}
      </p>
    </header>
  );
}
