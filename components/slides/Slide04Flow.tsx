"use client";
import { motion } from "framer-motion";
import { FLOW, SLIDES_META } from "@/lib/content";
import { SlideSection } from "@/components/layout/SlideSection";

export function Slide04Flow() {
  return (
    <SlideSection meta={SLIDES_META[3]}>
      <div className="flex h-full flex-col gap-12">
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
            {FLOW.title}
          </h2>
          <p
            className="mt-3"
            style={{
              fontSize: "var(--type-subtitle)",
              color: "var(--muted)",
              fontWeight: 300,
            }}
          >
            {FLOW.subtitle}
          </p>
        </header>

        <div className="relative grid flex-1 grid-cols-1 items-stretch gap-4 md:grid-cols-5 md:gap-3">
          <svg
            className="pointer-events-none absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 md:block"
            viewBox="0 0 1000 2"
            preserveAspectRatio="none"
            aria-hidden
          >
            <motion.line
              x1="0"
              y1="1"
              x2="1000"
              y2="1"
              stroke="var(--blue)"
              strokeWidth="1.5"
              strokeDasharray="1000"
              initial={{ strokeDashoffset: 1000 }}
              whileInView={{ strokeDashoffset: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          </svg>

          {FLOW.steps.map((step, i) => (
            <motion.div
              key={step.verb}
              className="relative flex flex-col gap-4 rounded-3xl border p-7"
              style={{
                background: "var(--bg-card)",
                borderColor: "var(--border)",
                boxShadow: "var(--shadow-md)",
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div
                style={{
                  color: "var(--muted)",
                  letterSpacing: "0.1em",
                  fontSize: "var(--type-small)",
                  fontWeight: 500,
                  textTransform: "uppercase",
                }}
              >
                {step.num}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "calc(var(--type-title) * 0.55)",
                  fontWeight: 400,
                  color: "var(--blue)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1,
                }}
              >
                {step.verb}
              </div>
              <p
                style={{
                  fontSize: "var(--type-body)",
                  color: "var(--ink-2)",
                  lineHeight: 1.45,
                  margin: 0,
                }}
              >
                {step.body}
              </p>
              <div
                className="mt-auto border-t pt-4"
                style={{
                  borderColor: "var(--border)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--type-small)",
                  color: "var(--muted)",
                  lineHeight: 1.6,
                }}
              >
                {step.mono}
              </div>
            </motion.div>
          ))}
        </div>

        <div
          className="flex flex-wrap items-center justify-between gap-4 rounded-full border px-8 py-5"
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--border)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <span
            style={{
              color: "var(--muted)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontSize: "var(--type-small)",
              fontWeight: 500,
            }}
          >
            {FLOW.meta.left}
          </span>
          <span
            style={{
              color: "var(--blue)",
              fontFamily: "var(--font-mono)",
              fontWeight: 500,
              fontSize: "var(--type-body)",
            }}
          >
            {FLOW.meta.right}
          </span>
        </div>
      </div>
    </SlideSection>
  );
}
