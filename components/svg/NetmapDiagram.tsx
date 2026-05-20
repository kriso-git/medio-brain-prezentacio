"use client";
import { motion } from "framer-motion";
import { FOLDERS } from "@/lib/content";

const positions = [
  { x: 50, y: 14 },
  { x: 82, y: 28 },
  { x: 92, y: 56 },
  { x: 80, y: 82 },
  { x: 50, y: 92 },
  { x: 20, y: 82 },
  { x: 8, y: 56 },
  { x: 18, y: 28 },
  { x: 50, y: 50 },
];

export function NetmapDiagram() {
  return (
    <div className="relative aspect-[640/720] w-full max-w-[720px]">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 640 720"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        {positions.slice(0, 8).map((p, i) => (
          <motion.line
            key={i}
            x1="320"
            y1="360"
            x2={(p.x / 100) * 640}
            y2={(p.y / 100) * 720}
            stroke="rgba(0,168,225,0.30)"
            strokeWidth="1.2"
            strokeDasharray="500"
            initial={{ strokeDashoffset: 500 }}
            whileInView={{ strokeDashoffset: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, delay: i * 0.08, ease: "easeOut" }}
          />
        ))}
      </svg>

      {FOLDERS.list.map((folder, i) => {
        const p = positions[i];
        const isCenter = i === FOLDERS.list.length - 1;
        return (
          <motion.div
            key={folder.path}
            className="absolute flex flex-col items-center justify-center rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              transform: "translate(-50%, -50%)",
              width: isCenter ? 188 : 132,
              height: isCenter ? 188 : 132,
              background: isCenter
                ? "linear-gradient(135deg, var(--blue), var(--blue-deep))"
                : "var(--bg-card)",
              border: isCenter
                ? "none"
                : "1.5px solid rgba(0,168,225,0.35)",
              color: isCenter ? "#FFFFFF" : "var(--ink)",
              boxShadow: "var(--shadow-md)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.4,
              delay: isCenter ? 0.9 : i * 0.08,
              ease: "backOut",
            }}
          >
            {isCenter ? (
              <>
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 38,
                    fontWeight: 400,
                    color: "#FFFFFF",
                    lineHeight: 1,
                  }}
                >
                  Brain
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.8)",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    marginTop: 6,
                  }}
                >
                  vault root
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    color: "var(--blue)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 16,
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                  }}
                >
                  {folder.num}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    textAlign: "center",
                    padding: "0 8px",
                  }}
                >
                  {folder.path.split("_")[0].slice(0, 10)}
                </div>
              </>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
