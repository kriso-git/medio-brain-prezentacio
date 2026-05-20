"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ParallaxBlob({
  position,
  color,
  size = 720,
  intensity = 1,
}: {
  position: "top-right" | "bottom-left";
  color: string;
  size?: number;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [-50 * intensity, 80 * intensity],
  );
  const top = position === "top-right" ? -240 : "auto";
  const bottom = position === "bottom-left" ? -300 : "auto";
  const left = position === "bottom-left" ? -200 : "auto";
  const right = position === "top-right" ? -200 : "auto";

  return (
    <motion.div
      ref={ref}
      aria-hidden
      style={{
        position: "absolute",
        top,
        right,
        bottom,
        left,
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, rgba(0,0,0,0) 70%)`,
        pointerEvents: "none",
        zIndex: 0,
        y,
      }}
    />
  );
}
