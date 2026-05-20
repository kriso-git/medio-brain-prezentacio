"use client";
import { motion } from "framer-motion";
import { WEB, SLIDES_META } from "@/lib/content";
import { SlideSection } from "@/components/layout/SlideSection";
import { CodeBlock } from "@/components/primitives/CodeBlock";
import { StatNumber } from "@/components/primitives/StatNumber";

export function Slide06Web() {
  return (
    <SlideSection meta={SLIDES_META[5]}>
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
            {WEB.title}
          </h2>
          <p
            className="mt-3"
            style={{
              fontSize: "var(--type-subtitle)",
              color: "var(--muted)",
              fontWeight: 300,
            }}
          >
            {WEB.subtitle}
          </p>
        </header>

        <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {WEB.flow.map((box, i) => {
            const isMid = (box as { mid?: boolean }).mid;
            return (
              <div key={box.label} className="contents">
                <motion.div
                  className="rounded-2xl border p-7 text-center"
                  style={{
                    background: isMid
                      ? "linear-gradient(135deg, rgba(0,168,225,0.08), var(--bg-card))"
                      : "var(--bg-card)",
                    borderColor: isMid ? "var(--blue)" : "var(--border)",
                    boxShadow: isMid ? "var(--shadow-blue)" : "var(--shadow-md)",
                    minHeight: 160,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 8,
                  }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                >
                  <div
                    style={{
                      fontSize: "var(--type-subtitle)",
                      color: isMid ? "var(--blue)" : "var(--ink)",
                      fontWeight: 400,
                    }}
                  >
                    {box.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--type-small)",
                      color: "var(--muted)",
                    }}
                  >
                    {box.sub}
                  </div>
                </motion.div>
                {i < WEB.flow.length - 1 && (
                  <div
                    className="hidden items-center justify-center md:flex"
                    style={{ color: "var(--blue)", fontSize: 28 }}
                    aria-hidden
                  >
                    →
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {WEB.stats.map((s) => (
            <div key={s.label}>
              <StatNumber value={parseInt(s.num)} label={s.label} size="large" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
          <CodeBlock code={WEB.code} />
          <div
            className="rounded-2xl border p-6"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border)",
              color: "var(--ink-2)",
              fontSize: "var(--type-small)",
              lineHeight: 1.5,
              boxShadow: "var(--shadow-sm)",
            }}
          >
            {WEB.side}
          </div>
        </div>
      </div>
    </SlideSection>
  );
}
