"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface PremiumBackgroundProps {
  children: ReactNode;
  variant?: "light" | "dark" | "gradient";
  showGrid?: boolean;
  showOrbs?: boolean;
  showNoise?: boolean;
  className?: string;
}

export function PremiumBackground({
  children,
  variant = "light",
  showGrid = true,
  showOrbs = true,
  showNoise = true,
  className = "",
}: PremiumBackgroundProps) {
  const prefersReducedMotion = useReducedMotion();

  const backgrounds = {
    light: "bg-gradient-to-b from-slate-50 via-white to-slate-50/50",
    dark: "bg-gradient-to-b from-[#030710] via-[#0a0f1a] to-[#030710]",
    gradient: "bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50",
  };

  const gridColors = {
    light: "rgba(0, 102, 204, 0.04)",
    dark: "rgba(255, 255, 255, 0.03)",
    gradient: "rgba(0, 102, 204, 0.03)",
  };

  const orbColors = {
    light: {
      primary: "rgba(0, 102, 204, 0.12)",
      secondary: "rgba(0, 212, 255, 0.08)",
    },
    dark: {
      primary: "rgba(0, 102, 204, 0.2)",
      secondary: "rgba(0, 212, 255, 0.15)",
    },
    gradient: {
      primary: "rgba(0, 102, 204, 0.1)",
      secondary: "rgba(16, 185, 129, 0.08)",
    },
  };

  return (
    <div className={`relative overflow-hidden ${backgrounds[variant]} ${className}`}>
      {/* Animated gradient orbs */}
      {showOrbs && (
        <>
          <motion.div
            className="pointer-events-none absolute -top-[300px] -left-[200px] h-[600px] w-[600px] rounded-full"
            style={{
              background: `radial-gradient(circle, ${orbColors[variant].primary} 0%, transparent 70%)`,
              filter: "blur(80px)",
            }}
            animate={prefersReducedMotion ? {} : {
              scale: [1, 1.1, 1],
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut" as const,
            }}
            aria-hidden="true"
          />
          <motion.div
            className="pointer-events-none absolute -bottom-[200px] -right-[200px] h-[500px] w-[500px] rounded-full"
            style={{
              background: `radial-gradient(circle, ${orbColors[variant].secondary} 0%, transparent 70%)`,
              filter: "blur(60px)",
            }}
            animate={prefersReducedMotion ? {} : {
              scale: [1, 1.15, 1],
              x: [0, -25, 0],
              y: [0, 25, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut" as const,
            }}
            aria-hidden="true"
          />
          <motion.div
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full"
            style={{
              background: `radial-gradient(circle, ${orbColors[variant].primary} 0%, transparent 60%)`,
              filter: "blur(100px)",
              opacity: 0.5,
            }}
            animate={prefersReducedMotion ? {} : {
              scale: [0.8, 1.2, 0.8],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut" as const,
            }}
            aria-hidden="true"
          />
        </>
      )}

      {/* Animated grid pattern */}
      {showGrid && (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: `linear-gradient(${gridColors[variant]} 1px, transparent 1px), linear-gradient(90deg, ${gridColors[variant]} 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
              maskImage: "radial-gradient(ellipse at 50% 50%, black 0%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black 0%, transparent 75%)",
            }}
          />

          {/* Scanning line effect */}
          {!prefersReducedMotion && (
            <motion.div
              className="absolute h-px w-full opacity-30"
              style={{
                background: `linear-gradient(90deg, transparent 0%, ${variant === "dark" ? "rgba(0, 212, 255, 0.3)" : "rgba(0, 102, 204, 0.2)"} 50%, transparent 100%)`,
              }}
              animate={{
                top: ["0%", "100%", "0%"],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          )}
        </div>
      )}

      {/* Noise texture */}
      {showNoise && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            opacity: variant === "dark" ? 0.03 : 0.02,
          }}
          aria-hidden="true"
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/* Animated section divider */
export function SectionDivider({ variant = "light" }: { variant?: "light" | "dark" }) {
  const prefersReducedMotion = useReducedMotion();
  const color = variant === "dark" ? "rgba(0, 212, 255, 0.3)" : "rgba(0, 102, 204, 0.15)";

  return (
    <div className="relative h-px w-full overflow-hidden" aria-hidden="true">
      <div className={`absolute inset-0 ${variant === "dark" ? "bg-white/5" : "bg-gray-200/50"}`} />
      {!prefersReducedMotion && (
        <motion.div
          className="absolute h-full w-32"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          }}
          animate={{
            x: ["-100%", "calc(100vw + 100%)"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 2,
          }}
        />
      )}
    </div>
  );
}

/* Glowing card wrapper for premium feel */
export function GlowCard({
  children,
  className = "",
  glowColor = "rgba(0, 102, 204, 0.15)",
}: {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}) {
  return (
    <div className={`group relative ${className}`}>
      {/* Glow effect on hover */}
      <div
        className="absolute -inset-0.5 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: glowColor }}
        aria-hidden="true"
      />
      <div className="relative rounded-2xl border border-gray-100 bg-white p-6 shadow-lg shadow-gray-100/50 transition-all duration-300 group-hover:border-accent-primary/20 group-hover:shadow-xl">
        {children}
      </div>
    </div>
  );
}
