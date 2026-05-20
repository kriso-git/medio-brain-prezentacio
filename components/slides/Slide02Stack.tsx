"use client";
import { motion } from "framer-motion";
import { STACK, SLIDES_META } from "@/lib/content";
import { SlideSection } from "@/components/layout/SlideSection";
import { Card } from "@/components/primitives/Card";

export function Slide02Stack() {
  return (
    <SlideSection meta={SLIDES_META[1]}>
      <div className="flex h-full flex-col gap-9">
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
            {STACK.title}
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
            {STACK.subtitle}
          </p>
        </header>

        <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-3">
          {STACK.columns.map((col, i) => (
            <motion.div
              key={col.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            >
              <Card featured={col.featured} className="h-full">
                <div className="flex h-full flex-col gap-6">
                  <div
                    style={{
                      color: "var(--blue)",
                      letterSpacing: "0.12em",
                      fontSize: "var(--type-small)",
                      textTransform: "uppercase",
                      fontWeight: 500,
                    }}
                  >
                    {col.layer}
                  </div>
                  <div
                    style={{
                      fontSize: "calc(var(--type-title) * 0.6)",
                      fontWeight: 400,
                      lineHeight: 1.05,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {col.name}
                  </div>
                  <p
                    style={{
                      fontSize: "var(--type-body)",
                      color: "var(--ink-2)",
                      lineHeight: 1.45,
                      margin: 0,
                    }}
                  >
                    {col.body}
                  </p>
                  <div
                    className="mt-auto flex flex-col gap-3 pt-2"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "var(--type-small)",
                      color: "var(--muted)",
                    }}
                  >
                    {col.stats.map((s) => (
                      <div key={s.k} className="flex items-baseline gap-3.5">
                        <span
                          style={{
                            color: "var(--blue)",
                            fontWeight: 500,
                            minWidth: 90,
                          }}
                        >
                          {s.k}
                        </span>
                        <span>{s.v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div
          className="flex flex-wrap items-center gap-4 rounded-full border px-7 py-5"
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--border)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <span
            style={{
              fontSize: "var(--type-small)",
              color: "var(--muted)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 500,
              marginRight: 12,
            }}
          >
            {STACK.supportRow.label}
          </span>
          {STACK.supportRow.items.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2"
              style={{
                background: "var(--blue-tint)",
                color: "var(--blue-dark)",
                fontFamily: "var(--font-mono)",
                fontSize: "var(--type-small)",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </SlideSection>
  );
}
