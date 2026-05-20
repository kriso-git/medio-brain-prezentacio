"use client";
import clsx from "clsx";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { SlideMeta as SlideMetaType } from "@/lib/content";
import { ParallaxBlob } from "./ParallaxBlob";
import { SlideMeta } from "./SlideMeta";

export function SlideSection({
  meta,
  children,
  className,
}: {
  meta: SlideMetaType;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={`slide-${meta.id}`}
      data-theme={meta.dark ? "dark" : undefined}
      className={clsx(
        "relative flex w-full snap-start overflow-hidden",
        "min-h-screen lg:h-screen",
        className,
      )}
      style={{
        background: "var(--bg-tint)",
        color: "var(--ink)",
        scrollSnapAlign: "start",
      }}
    >
      <ParallaxBlob
        position="top-right"
        color={meta.dark ? "rgba(0,168,225,0.18)" : "rgba(0,168,225,0.10)"}
      />
      <ParallaxBlob
        position="bottom-left"
        color={meta.dark ? "rgba(183,168,240,0.12)" : "rgba(183,168,240,0.10)"}
        size={800}
      />

      <span
        className="absolute z-30 inline-flex items-center gap-3 rounded-full border uppercase tracking-widest"
        style={{
          top: 40,
          left: "var(--pad-x)",
          padding: "10px 22px",
          background: meta.dark ? "rgba(0,168,225,0.12)" : "var(--blue-tint)",
          borderColor: meta.dark
            ? "rgba(0,168,225,0.3)"
            : "rgba(0,168,225,0.18)",
          color: meta.dark ? "var(--blue)" : "var(--blue-dark)",
          fontSize: "var(--type-small)",
          fontWeight: 500,
        }}
      >
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: "var(--blue)" }}
        />
        {meta.tag}
      </span>

      <SlideMeta num={meta.num} total={meta.total} />

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-[1920px] flex-col"
        style={{
          padding:
            "var(--pad-top) var(--pad-x) var(--pad-bottom) var(--pad-x)",
        }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
}
