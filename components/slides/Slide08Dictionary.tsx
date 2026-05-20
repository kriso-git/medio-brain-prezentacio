"use client";
import { motion } from "framer-motion";
import { DICTIONARY, SLIDES_META } from "@/lib/content";
import { SlideSection } from "@/components/layout/SlideSection";
import { SlideHeader } from "@/components/primitives/SlideHeader";

export function Slide08Dictionary() {
  return (
    <SlideSection meta={SLIDES_META[7]}>
      <div className="flex h-full flex-col gap-9">
        <SlideHeader title={DICTIONARY.title} subtitle={DICTIONARY.subtitle} />

        <div className="grid flex-1 grid-cols-1 gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {DICTIONARY.entries.map((entry, i) => (
              <motion.div
                key={entry.short}
                className="rounded-2xl border p-6"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--border)",
                  boxShadow: "var(--shadow-sm)",
                }}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--type-subtitle)",
                    color: "var(--blue)",
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                    marginBottom: 6,
                  }}
                >
                  {entry.short}
                </div>
                <div
                  style={{
                    fontSize: "var(--type-small)",
                    color: "var(--ink-2)",
                    lineHeight: 1.4,
                  }}
                >
                  {entry.long}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col gap-7">
            <p
              style={{
                fontSize: "var(--type-body)",
                color: "var(--ink-2)",
                lineHeight: 1.5,
              }}
            >
              {DICTIONARY.side}
            </p>
            <div
              className="rounded-2xl border p-5"
              style={{
                background: "var(--blue-tint)",
                borderColor: "rgba(0,168,225,0.18)",
                fontFamily: "var(--font-mono)",
                fontSize: "var(--type-small)",
                color: "var(--blue-dark)",
              }}
            >
              {DICTIONARY.footer}
            </div>
          </div>
        </div>
      </div>
    </SlideSection>
  );
}
