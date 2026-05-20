"use client";
import { motion } from "framer-motion";
import { GPU, SLIDES_META } from "@/lib/content";
import { SlideSection } from "@/components/layout/SlideSection";
import { Gpu3D } from "@/components/svg/Gpu3D";
import { Callout } from "@/components/primitives/Callout";

export function Slide05Gpu() {
  return (
    <SlideSection meta={SLIDES_META[4]}>
      <div className="grid h-full grid-cols-1 gap-10 lg:grid-cols-[0.45fr_0.55fr]">
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
              {GPU.title}
            </h2>
            <p
              className="mt-3"
              style={{
                fontSize: "var(--type-subtitle)",
                color: "var(--muted)",
                fontWeight: 300,
              }}
            >
              {GPU.subtitle}
            </p>
          </header>
          <div
            className="rounded-3xl border p-7"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,168,225,0.06), var(--bg-card) 60%)",
              borderColor: "var(--border)",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <Gpu3D />
            <div className="mt-5 grid grid-cols-2 gap-3.5">
              {GPU.gpu.specs.map((s) => (
                <div
                  key={s.k}
                  className="rounded-xl border px-4 py-3.5"
                  style={{
                    background: "var(--bg-card)",
                    borderColor: "var(--border)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <div
                    style={{
                      color: "var(--muted)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      fontSize: 13,
                      fontWeight: 500,
                      marginBottom: 4,
                    }}
                  >
                    {s.k}
                  </div>
                  <div
                    style={{
                      color: "var(--blue)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--type-small)",
                      fontWeight: 500,
                    }}
                  >
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Callout>{GPU.callout}</Callout>
        </div>

        <div className="flex flex-col gap-6">
          {GPU.pipeline.map((box, i) => {
            const isAmber = (box as { color?: string }).color === "amber";
            const isFeatured = (box as { featured?: boolean }).featured;
            return (
              <div key={box.tag} className="flex flex-col items-center">
                <motion.div
                  className="w-full rounded-2xl border px-6 py-5"
                  style={{
                    background: isFeatured
                      ? "linear-gradient(135deg, rgba(0,168,225,0.10), var(--bg-card))"
                      : "var(--bg-card)",
                    borderColor: isFeatured
                      ? "var(--blue)"
                      : isAmber
                        ? "rgba(255,120,73,0.4)"
                        : "var(--border)",
                    boxShadow: isFeatured
                      ? "var(--shadow-blue)"
                      : "var(--shadow-sm)",
                  }}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 14,
                      letterSpacing: "0.08em",
                      color: isAmber
                        ? "var(--amber)"
                        : isFeatured
                          ? "var(--blue)"
                          : "var(--muted)",
                      textTransform: "uppercase",
                      fontWeight: 500,
                    }}
                  >
                    {box.tag}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--type-body)",
                      color: "var(--ink)",
                      marginTop: 6,
                    }}
                  >
                    {box.val}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--type-small)",
                      color: "var(--muted)",
                      marginTop: 2,
                    }}
                  >
                    {box.sub}
                  </div>
                </motion.div>
                {i < GPU.pipeline.length - 1 && (
                  <motion.div
                    className="my-2 flex flex-col items-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.3, delay: i * 0.15 + 0.2 }}
                  >
                    <svg width="24" height="36" viewBox="0 0 24 36" aria-hidden>
                      <line
                        x1="12"
                        y1="0"
                        x2="12"
                        y2="28"
                        stroke="var(--blue)"
                        strokeWidth="2"
                      />
                      <polyline
                        points="6,22 12,32 18,22"
                        fill="none"
                        stroke="var(--blue)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                )}
              </div>
            );
          })}
          <div
            className="rounded-2xl border px-6 py-5"
            style={{
              background:
                "linear-gradient(135deg, rgba(183,168,240,0.10), rgba(0,168,225,0.06))",
              borderColor: "var(--border)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div
              style={{
                fontSize: "calc(var(--type-title) * 0.45)",
                color: "var(--blue)",
                fontWeight: 500,
                letterSpacing: "-0.01em",
                marginBottom: 8,
              }}
            >
              {GPU.metrics.big}
            </div>
            <ul
              className="flex flex-col gap-1"
              style={{
                color: "var(--ink-2)",
                fontSize: "var(--type-small)",
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              {GPU.metrics.items.map((m) => (
                <li key={m}>· {m}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SlideSection>
  );
}
