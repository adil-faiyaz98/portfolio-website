"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

interface FloatingShape {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  opacity: number;
  blur: number;
  color: string;
  type: "circle" | "ring" | "gradient" | "glow";
}

const colors = [
  "rgba(0, 102, 204, 0.15)",   // Primary blue
  "rgba(0, 212, 255, 0.12)",   // Cyan
  "rgba(16, 185, 129, 0.10)",  // Emerald
  "rgba(139, 92, 246, 0.10)",  // Purple
  "rgba(0, 102, 204, 0.08)",   // Lighter blue
];

function generateShapes(count: number): FloatingShape[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 300 + 100,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 25, // 25-45 seconds
    delay: Math.random() * -20,
    opacity: Math.random() * 0.5 + 0.3,
    blur: Math.random() * 60 + 40,
    color: colors[Math.floor(Math.random() * colors.length)],
    type: ["circle", "ring", "gradient", "glow"][Math.floor(Math.random() * 4)] as FloatingShape["type"],
  }));
}

interface FloatingElementsProps {
  variant?: "hero" | "section" | "subtle";
  className?: string;
}

export function FloatingElements({ variant = "hero", className = "" }: FloatingElementsProps) {
  const prefersReducedMotion = useReducedMotion();
  const [shapes, setShapes] = useState<FloatingShape[]>([]);

  useEffect(() => {
    const count = variant === "hero" ? 8 : variant === "section" ? 5 : 3;
    setShapes(generateShapes(count));
  }, [variant]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
          }}
          animate={{
            x: [0, 30, -20, 15, 0],
            y: [0, -25, 20, -15, 0],
            scale: [1, 1.05, 0.95, 1.02, 1],
            rotate: [0, 5, -5, 3, 0],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut" as const,
          }}
        >
          {shape.type === "circle" && (
            <div
              className="h-full w-full rounded-full"
              style={{
                background: shape.color,
                filter: `blur(${shape.blur}px)`,
                opacity: shape.opacity,
              }}
            />
          )}
          {shape.type === "ring" && (
            <div
              className="h-full w-full rounded-full border-2"
              style={{
                borderColor: shape.color,
                filter: `blur(${shape.blur * 0.5}px)`,
                opacity: shape.opacity * 0.6,
              }}
            />
          )}
          {shape.type === "gradient" && (
            <div
              className="h-full w-full rounded-full"
              style={{
                background: `radial-gradient(circle, ${shape.color} 0%, transparent 70%)`,
                filter: `blur(${shape.blur * 0.8}px)`,
                opacity: shape.opacity,
              }}
            />
          )}
          {shape.type === "glow" && (
            <div
              className="h-full w-full"
              style={{
                background: `radial-gradient(ellipse at center, ${shape.color} 0%, transparent 60%)`,
                filter: `blur(${shape.blur}px)`,
                opacity: shape.opacity * 0.8,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

/* Animated gradient orb for hero sections */
export function GradientOrb({ className = "" }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`pointer-events-none absolute ${className}`}
      animate={prefersReducedMotion ? {} : {
        scale: [1, 1.1, 1],
        opacity: [0.4, 0.6, 0.4],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut" as const,
      }}
      aria-hidden="true"
    >
      <div
        className="h-[600px] w-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0, 102, 204, 0.15) 0%, rgba(0, 212, 255, 0.08) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
    </motion.div>
  );
}

/* Animated lines/rays for premium feel */
export function AnimatedRays({ className = "" }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px origin-left"
          style={{
            left: "20%",
            top: `${20 + i * 12}%`,
            width: "60%",
            background: `linear-gradient(90deg, transparent, rgba(0, 102, 204, ${0.03 + i * 0.01}), transparent)`,
            transform: `rotate(${-15 + i * 6}deg)`,
          }}
          animate={{
            opacity: [0, 0.6, 0],
            scaleX: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 8 + i * 2,
            delay: i * 1.5,
            repeat: Infinity,
            ease: "easeInOut" as const,
          }}
        />
      ))}
    </div>
  );
}

/* Premium grid pattern with subtle animation */
export function AnimatedGrid({ className = "" }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      {/* Base grid */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 102, 204, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 102, 204, 0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at 50% 30%, black 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 30%, black 0%, transparent 70%)",
        }}
      />

      {/* Animated highlight line */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute h-px w-full"
          style={{
            top: "30%",
            background: "linear-gradient(90deg, transparent 0%, rgba(0, 102, 204, 0.2) 50%, transparent 100%)",
          }}
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}
    </div>
  );
}

/* Particle field for background ambiance */
export function ParticleField({ count = 30, className = "" }: { count?: number; className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * -10,
      }))
    );
  }, [count]);

  if (prefersReducedMotion) return null;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-accent-primary/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut" as const,
          }}
        />
      ))}
    </div>
  );
}
