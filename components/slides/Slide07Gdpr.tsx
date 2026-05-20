"use client";
import { motion } from "framer-motion";
import { GDPR, SLIDES_META } from "@/lib/content";
import { SlideSection } from "@/components/layout/SlideSection";
import { SlideHeader } from "@/components/primitives/SlideHeader";

export function Slide07Gdpr() {
  return (
    <SlideSection meta={SLIDES_META[6]}>
      <div className="flex h-full flex-col gap-8">
        <SlideHeader title={GDPR.title} subtitle={GDPR.subtitle} />

        <div className="grid flex-1 grid-cols-1 gap-7 lg:grid-cols-[1.2fr_0.8fr]">
          <div
            className="overflow-hidden rounded-3xl border"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border)",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <div
              className="border-b px-6 py-4"
              style={{
                borderColor: "var(--border)",
                fontFamily: "var(--font-mono)",
                fontSize: "var(--type-small)",
                color: "var(--muted)",
              }}
            >
              {GDPR.tableNote}
            </div>
            <div className="divide-y" style={{ borderColor: "var(--border)" }}>
              {GDPR.columns.map((col, i) => {
                const placeholder = col.placeholder;
                return (
                  <motion.div
                    key={col.name}
                    className="grid items-center gap-4 px-6 py-3.5"
                    style={{
                      gridTemplateColumns: "1.5fr 0.8fr 1fr",
                      background: col.masked
                        ? "rgba(255,120,73,0.06)"
                        : "transparent",
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--type-small)",
                    }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                  >
                    <span
                      style={{
                        color: col.masked ? "var(--amber)" : "var(--ink)",
                        fontWeight: col.masked ? 500 : 400,
                      }}
                    >
                      {col.name}
                    </span>
                    <span style={{ color: "var(--muted)" }}>{col.type}</span>
                    <span
                      style={{
                        color: col.masked ? "var(--amber)" : "var(--muted)",
                        fontWeight: col.masked ? 500 : 400,
                      }}
                    >
                      {placeholder ?? "-"}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <ul
            className="flex flex-col gap-4"
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              fontSize: "var(--type-body)",
              color: "var(--ink-2)",
              lineHeight: 1.45,
            }}
          >
            {GDPR.bullets.map((b, i) => (
              <motion.li
                key={b}
                className="flex gap-4"
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <span
                  className="mt-3 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: "var(--blue)" }}
                />
                <span>{b}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div
          className="rounded-3xl border p-6"
          style={{
            borderColor: "rgba(255,120,73,0.4)",
            background:
              "linear-gradient(135deg, rgba(255,120,73,0.08), var(--bg-card))",
            fontSize: "var(--type-body)",
            color: "var(--ink)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          {GDPR.footer}
        </div>
      </div>
    </SlideSection>
  );
}
