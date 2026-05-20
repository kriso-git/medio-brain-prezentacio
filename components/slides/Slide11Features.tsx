"use client";
import { motion } from "framer-motion";
import { FEATURES, SLIDES_META } from "@/lib/content";
import { SlideSection } from "@/components/layout/SlideSection";
import { Card } from "@/components/primitives/Card";

export function Slide11Features() {
  return (
    <SlideSection meta={SLIDES_META[10]}>
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
            {FEATURES.title}
          </h2>
          <p
            className="mt-3"
            style={{
              fontSize: "var(--type-subtitle)",
              color: "var(--muted)",
              fontWeight: 300,
            }}
          >
            {FEATURES.subtitle}
          </p>
        </header>

        <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-3">
          {FEATURES.cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="h-full">
                <div className="flex h-full flex-col gap-5">
                  <div
                    style={{
                      color: "var(--blue)",
                      letterSpacing: "0.12em",
                      fontSize: "var(--type-small)",
                      textTransform: "uppercase",
                      fontWeight: 500,
                    }}
                  >
                    {c.tag}
                  </div>
                  <div
                    style={{
                      fontSize: "calc(var(--type-title) * 0.55)",
                      fontWeight: 400,
                      lineHeight: 1.05,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {c.title}
                  </div>
                  <p
                    style={{
                      fontSize: "var(--type-body)",
                      color: "var(--ink-2)",
                      lineHeight: 1.45,
                      margin: 0,
                    }}
                  >
                    {c.body}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div
          className="rounded-3xl border p-7"
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--border)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <div
            style={{
              fontSize: "var(--type-small)",
              color: "var(--muted)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 500,
              marginBottom: 12,
            }}
          >
            {FEATURES.arch.label}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {FEATURES.arch.boxes.map((b, i) => (
              <div key={b} className="flex items-center gap-3">
                <span
                  className="rounded-full border px-4 py-2"
                  style={{
                    background: "var(--blue-tint)",
                    borderColor: "rgba(0,168,225,0.18)",
                    color: "var(--blue-dark)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--type-small)",
                  }}
                >
                  {b}
                </span>
                {i < FEATURES.arch.boxes.length - 1 && (
                  <span style={{ color: "var(--muted)" }} aria-hidden>
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            fontSize: "var(--type-small)",
            color: "var(--muted)",
            fontStyle: "italic",
          }}
        >
          {FEATURES.footer}
        </div>
      </div>
    </SlideSection>
  );
}
