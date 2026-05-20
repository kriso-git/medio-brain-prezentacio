"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useSyncExternalStore } from "react";

function subscribeMedia(query: string) {
  return (callback: () => void) => {
    if (typeof window === "undefined") return () => {};
    const mql = window.matchMedia(query);
    mql.addEventListener("change", callback);
    return () => mql.removeEventListener("change", callback);
  };
}

function getMediaSnapshot(query: string) {
  if (typeof window === "undefined") return false;
  return window.matchMedia(query).matches;
}

const subscribeHover = subscribeMedia("(hover: hover)");
const subscribeReduced = subscribeMedia("(prefers-reduced-motion: reduce)");

export function MagneticCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 400, damping: 28 });
  const springY = useSpring(y, { stiffness: 400, damping: 28 });
  const [hovering, setHovering] = useState(false);

  const supportsHover = useSyncExternalStore(
    subscribeHover,
    () => getMediaSnapshot("(hover: hover)"),
    () => false,
  );
  const reduced = useSyncExternalStore(
    subscribeReduced,
    () => getMediaSnapshot("(prefers-reduced-motion: reduce)"),
    () => false,
  );
  const enabled = supportsHover && !reduced;

  useEffect(() => {
    if (!enabled) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (
        t.closest("a, button, [role='button'], [data-magnetic]")
      ) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-50 rounded-full mix-blend-difference"
      style={{
        translateX: springX,
        translateY: springY,
        x: "-50%",
        y: "-50%",
        width: hovering ? 56 : 14,
        height: hovering ? 56 : 14,
        background: hovering
          ? "rgba(0,168,225,0.85)"
          : "rgba(0,168,225,0.95)",
        transition: "width 200ms ease, height 200ms ease, background 200ms ease",
      }}
    />
  );
}
