"use client";
import { motion } from "framer-motion";

export function Gpu3D() {
  return (
    <div
      className="relative w-full"
      style={{
        aspectRatio: "2 / 1",
        perspective: "1200px",
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #14304B 0%, #050F1A 60%, #0A1929 100%)",
          boxShadow:
            "0 30px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.10)",
          transformStyle: "preserve-3d",
        }}
        initial={{ rotateY: -25, rotateX: 8, opacity: 0 }}
        whileInView={{ rotateY: -15, rotateX: 6, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {[0.25, 0.75].map((cx, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${cx * 100}%`,
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "32%",
              aspectRatio: "1",
              border: "2px solid rgba(0,168,225,0.35)",
              background:
                "radial-gradient(circle, rgba(0,168,225,0.18) 0%, rgba(0,0,0,0) 60%)",
            }}
          >
            <motion.div
              className="absolute inset-3 rounded-full border"
              style={{
                borderColor: "rgba(255,255,255,0.15)",
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <div
                  key={deg}
                  className="absolute left-1/2 top-1/2 origin-left"
                  style={{
                    width: "45%",
                    height: 2,
                    background:
                      "linear-gradient(90deg, rgba(255,255,255,0.25), transparent)",
                    transform: `rotate(${deg}deg)`,
                  }}
                />
              ))}
            </motion.div>
          </div>
        ))}
        <div
          className="absolute left-0 right-0 top-0 h-1"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0,168,225,0.6), transparent)",
          }}
        />
        <div
          className="absolute bottom-3 left-4 font-mono"
          style={{
            fontSize: 14,
            color: "rgba(0,168,225,0.7)",
            letterSpacing: "0.2em",
          }}
        >
          RTX 3090 · 24GB
        </div>
      </motion.div>
    </div>
  );
}
