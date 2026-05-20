"use client";
import { motion } from "framer-motion";

export function BrainNetwork() {
  return (
    <svg
      viewBox="0 0 640 640"
      fill="none"
      className="h-full w-full"
      aria-hidden
    >
      <defs>
        <radialGradient id="brain-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(0,168,225,0.35)" />
          <stop offset="100%" stopColor="rgba(0,168,225,0)" />
        </radialGradient>
      </defs>
      <circle cx="320" cy="320" r="240" fill="url(#brain-glow)" />
      <motion.circle
        cx="320"
        cy="320"
        r="160"
        stroke="rgba(0,168,225,0.45)"
        strokeWidth="1.5"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx="320"
        cy="320"
        r="110"
        stroke="rgba(0,168,225,0.7)"
        strokeWidth="1.5"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <circle cx="320" cy="320" r="60" fill="rgba(0,168,225,0.15)" stroke="var(--blue)" strokeWidth="2" />
      {[
        [320, 100],
        [540, 280],
        [460, 520],
        [180, 520],
        [100, 280],
      ].map(([cx, cy], i) => (
        <motion.g key={i}>
          <line
            x1="320"
            y1="320"
            x2={cx}
            y2={cy}
            stroke="rgba(0,168,225,0.35)"
            strokeWidth="1.2"
            strokeDasharray="4 6"
          />
          <motion.circle
            cx={cx}
            cy={cy}
            r="14"
            fill="var(--blue)"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        </motion.g>
      ))}
    </svg>
  );
}
