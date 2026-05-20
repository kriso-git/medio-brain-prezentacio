"use client";
import { motion } from "framer-motion";
import { COVER, SLIDES_META } from "@/lib/content";
import { SlideSection } from "@/components/layout/SlideSection";
import { BrainNetwork } from "@/components/svg/BrainNetwork";

export function Slide01Cover() {
  const meta = SLIDES_META[0];
  return (
    <SlideSection meta={meta}>
      <div className="grid h-full w-full grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div
            className="mb-10 inline-flex items-center gap-3 rounded-full border px-6 py-3 uppercase"
            style={{
              background: "rgba(0,168,225,0.14)",
              borderColor: "rgba(0,168,225,0.30)",
              color: "var(--blue)",
              fontSize: "var(--type-small)",
              fontWeight: 500,
              letterSpacing: "0.10em",
            }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: "var(--blue)" }}
            />
            {COVER.eyebrow}
          </div>
          <h1
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 300,
              fontSize: "var(--type-display)",
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              margin: 0,
            }}
          >
            <span style={{ display: "block", color: "var(--ink)" }}>
              {COVER.display1}
            </span>
            <span
              style={{
                display: "block",
                color: "var(--blue)",
                fontWeight: 400,
              }}
            >
              {COVER.display2}
            </span>
          </h1>
          <p
            className="mt-12"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--type-subtitle)",
              fontWeight: 300,
              color: "var(--ink-2)",
              lineHeight: 1.3,
              maxWidth: 740,
            }}
          >
            {COVER.lead}
          </p>
          <div
            className="mt-9 border-t pt-7"
            style={{
              borderColor: "var(--border-strong)",
              fontSize: "var(--type-small)",
              color: "var(--muted)",
              maxWidth: 740,
              lineHeight: 1.5,
            }}
          >
            {COVER.tagline}
          </div>
          <div
            className="mt-10"
            style={{
              fontSize: "var(--type-small)",
              color: "var(--muted)",
              letterSpacing: "0.06em",
            }}
          >
            {COVER.signoff}
          </div>
        </div>

        <div className="relative flex h-full items-center justify-center">
          <div className="relative aspect-square w-full max-w-[640px]">
            <BrainNetwork />
            {COVER.orbiters.map((label, i) => {
              const positions = [
                { top: "8%", left: "0%" },
                { top: "22%", right: "0%" },
                { bottom: "30%", left: "-6%" },
                { bottom: "12%", right: "4%" },
                { top: "50%", right: "-12%", transform: "translateY(-50%)" },
              ];
              const p = positions[i];
              return (
                <motion.div
                  key={label}
                  className="absolute inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-5 py-3"
                  data-magnetic
                  style={{
                    ...p,
                    background: meta.dark
                      ? "rgba(255,255,255,0.06)"
                      : "var(--bg-card)",
                    backdropFilter: "blur(10px)",
                    borderColor: "var(--border-strong)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "var(--type-small)",
                    color: meta.dark ? "#FFFFFF" : "var(--ink)",
                    fontWeight: 500,
                    boxShadow: "var(--shadow-md)",
                  }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 4 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                >
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ background: "var(--blue)" }}
                  />
                  {label}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </SlideSection>
  );
}
