"use client";
import { motion } from "framer-motion";
import { TIMELINE, SLIDES_META } from "@/lib/content";
import { SlideSection } from "@/components/layout/SlideSection";

export function Slide10Timeline() {
  return (
    <SlideSection meta={SLIDES_META[9]}>
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
            {TIMELINE.title}
          </h2>
          <p
            className="mt-3"
            style={{
              fontSize: "var(--type-subtitle)",
              color: "var(--muted)",
              fontWeight: 300,
            }}
          >
            {TIMELINE.subtitle}
          </p>
        </header>

        <div className="grid flex-1 grid-cols-1 gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="relative pl-12">
            <motion.div
              className="absolute left-3 top-0 w-0.5"
              style={{ background: "var(--blue)" }}
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
            {TIMELINE.milestones.map((m, i) => (
              <motion.div
                key={i}
                className="relative mb-6 pl-6"
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
              >
                <span
                  className="absolute -left-[33px] top-1.5 h-3 w-3 rounded-full"
                  style={{
                    background: "var(--blue)",
                    boxShadow: "0 0 0 4px var(--bg-tint)",
                  }}
                />
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--type-small)",
                    color: "var(--muted)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div
                  style={{
                    fontSize: "var(--type-body)",
                    color: "var(--ink)",
                    lineHeight: 1.45,
                    marginTop: 2,
                  }}
                >
                  {m}
                </div>
              </motion.div>
            ))}
          </div>

          <div
            className="flex flex-col gap-6 rounded-3xl border p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,168,225,0.06), var(--bg-card))",
              borderColor: "var(--border)",
              boxShadow: "var(--shadow-md)",
              height: "fit-content",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "calc(var(--type-num) * 0.85)",
                  color: "var(--blue)",
                  fontWeight: 400,
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                }}
              >
                {TIMELINE.stats.big}
              </div>
              <div
                style={{
                  fontSize: "var(--type-subtitle)",
                  color: "var(--ink-2)",
                  marginTop: 6,
                  fontWeight: 400,
                }}
              >
                {TIMELINE.stats.label}
              </div>
            </div>
            <ul
              className="flex flex-col gap-2"
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                color: "var(--ink-2)",
                fontSize: "var(--type-small)",
                lineHeight: 1.5,
              }}
            >
              {TIMELINE.stats.items.map((it) => (
                <li key={it}>· {it}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SlideSection>
  );
}
