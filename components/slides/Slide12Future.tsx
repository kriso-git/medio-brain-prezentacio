"use client";
import { motion } from "framer-motion";
import { FUTURE, SLIDES_META } from "@/lib/content";
import { SlideSection } from "@/components/layout/SlideSection";
import { SlideHeader } from "@/components/primitives/SlideHeader";

export function Slide12Future() {
  return (
    <SlideSection meta={SLIDES_META[11]}>
      <div className="flex h-full flex-col gap-9">
        <SlideHeader title={FUTURE.title} subtitle={FUTURE.subtitle} />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {[FUTURE.split.left, FUTURE.split.right].map((side, i) => (
            <motion.div
              key={side.label}
              className="rounded-3xl border p-8"
              style={{
                background:
                  i === 1
                    ? "linear-gradient(135deg, rgba(0,168,225,0.10), var(--bg-card))"
                    : "var(--bg-card)",
                borderColor: i === 1 ? "var(--blue)" : "var(--border)",
                boxShadow: i === 1 ? "var(--shadow-blue)" : "var(--shadow-md)",
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
            >
              <div
                style={{
                  color: i === 1 ? "var(--blue)" : "var(--muted)",
                  letterSpacing: "0.12em",
                  fontSize: "var(--type-small)",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  marginBottom: 12,
                }}
              >
                {side.label}
              </div>
              <div
                style={{
                  fontSize: "var(--type-subtitle)",
                  color: "var(--ink)",
                  lineHeight: 1.3,
                  fontWeight: 400,
                }}
              >
                {side.body}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {FUTURE.list.map((item, i) => (
            <motion.div
              key={item.body}
              className="grid items-center gap-5 rounded-2xl border px-6 py-4"
              style={{
                gridTemplateColumns: "140px 1fr",
                background: "var(--bg-card)",
                borderColor: "var(--border)",
                fontSize: "var(--type-body)",
                boxShadow: "var(--shadow-sm)",
              }}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
            >
              <span
                className="rounded-full text-center"
                style={{
                  background: "var(--blue-tint)",
                  color: "var(--blue-dark)",
                  padding: "6px 14px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--type-small)",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                }}
              >
                {item.freq}
              </span>
              <span style={{ color: "var(--ink)" }}>{item.body}</span>
            </motion.div>
          ))}
        </div>

        <div
          className="mt-auto flex flex-col gap-4 border-t pt-7"
          style={{ borderColor: "var(--border-strong)" }}
        >
          <div
            style={{
              fontSize: "var(--type-subtitle)",
              color: "var(--blue)",
              fontWeight: 400,
              letterSpacing: "-0.01em",
            }}
          >
            {FUTURE.signoff}
          </div>
          <div
            style={{
              fontSize: "var(--type-small)",
              color: "var(--muted)",
              letterSpacing: "0.04em",
            }}
          >
            {FUTURE.contact}
          </div>
        </div>
      </div>
    </SlideSection>
  );
}
