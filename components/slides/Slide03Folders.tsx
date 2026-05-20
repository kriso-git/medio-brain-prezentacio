"use client";
import { motion } from "framer-motion";
import { FOLDERS, SLIDES_META } from "@/lib/content";
import { SlideSection } from "@/components/layout/SlideSection";
import { NetmapDiagram } from "@/components/svg/NetmapDiagram";

export function Slide03Folders() {
  return (
    <SlideSection meta={SLIDES_META[2]}>
      <div className="grid h-full grid-cols-1 gap-12 lg:grid-cols-[0.55fr_0.45fr]">
        <div className="flex flex-col gap-7">
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
              {FOLDERS.title}
            </h2>
            <p
              className="mt-3"
              style={{
                fontSize: "var(--type-subtitle)",
                color: "var(--muted)",
                fontWeight: 300,
              }}
            >
              {FOLDERS.subtitle}
            </p>
          </header>

          <div className="flex flex-col gap-2.5">
            {FOLDERS.list.map((f, i) => (
              <motion.div
                key={f.path}
                className="grid items-center gap-4 rounded-2xl border px-6 py-4"
                style={{
                  gridTemplateColumns: "56px 1fr auto",
                  background: "var(--bg-card)",
                  borderColor: "var(--border)",
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--type-small)",
                  boxShadow: "var(--shadow-sm)",
                }}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
              >
                <span
                  style={{
                    color: "var(--blue)",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                  }}
                >
                  {f.num}
                </span>
                <span
                  style={{
                    color: "var(--ink)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {f.path}
                </span>
                <span style={{ color: "var(--muted)" }}>{f.count}</span>
              </motion.div>
            ))}
          </div>

          <div
            className="mt-2 flex flex-wrap gap-3 text-sm"
            style={{ color: "var(--muted)" }}
          >
            {FOLDERS.annotations.map((a) => (
              <span
                key={a}
                className="rounded-full border px-4 py-1.5"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--bg-card)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--type-small)",
                }}
              >
                {a}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <NetmapDiagram />
        </div>
      </div>
    </SlideSection>
  );
}
