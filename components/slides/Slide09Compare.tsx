"use client";
import { motion } from "framer-motion";
import { COMPARE, SLIDES_META } from "@/lib/content";
import { SlideSection } from "@/components/layout/SlideSection";

export function Slide09Compare() {
  return (
    <SlideSection meta={SLIDES_META[8]}>
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
            {COMPARE.title}
          </h2>
          <p
            className="mt-3"
            style={{
              fontSize: "var(--type-subtitle)",
              color: "var(--muted)",
              fontWeight: 300,
            }}
          >
            {COMPARE.subtitle}
          </p>
        </header>

        <div
          className="overflow-hidden rounded-3xl border"
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--border)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <div
            className="grid items-center gap-4 border-b px-7 py-5"
            style={{
              gridTemplateColumns: "1.2fr 1fr 1fr",
              borderColor: "var(--border)",
              fontSize: "var(--type-small)",
              color: "var(--muted)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            <span>Dimenzió</span>
            <span>Cloud AI</span>
            <span style={{ color: "var(--blue)" }}>Medio Brain</span>
          </div>
          {COMPARE.rows.map((r, i) => (
            <motion.div
              key={r.dim}
              className="grid items-center gap-4 border-b px-7 py-5"
              style={{
                gridTemplateColumns: "1.2fr 1fr 1fr",
                borderColor: "var(--border)",
                fontSize: "var(--type-body)",
              }}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.3, delay: i * 0.07 }}
            >
              <span style={{ color: "var(--ink)" }}>{r.dim}</span>
              <span style={{ color: "var(--muted)" }}>{r.cloud}</span>
              <span style={{ color: "var(--blue)", fontWeight: 500 }}>
                {r.local}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideSection>
  );
}
