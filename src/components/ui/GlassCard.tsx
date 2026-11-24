"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

export interface GlassCardProps {
  children: ReactNode;
  className?: string;
  /** Backdrop blur intensity in px (8-20) */
  blur?: number;
  /** Background opacity percentage (60-80) */
  opacity?: number;
  /** Enable hover lift animation */
  interactive?: boolean;
  /** Render as a specific HTML element */
  as?: "div" | "article" | "section";
  /** Emphasize the card border */
  gradientBorder?: boolean;
}

export function GlassCard({
  children,
  className = "",
  blur = 16,
  opacity = 60,
  interactive = false,
  as: Component = "div",
  gradientBorder = false,
}: GlassCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const baseClasses = `relative rounded-2xl overflow-hidden bg-surface text-text-primary border shadow-sm ${
    gradientBorder ? "border-accent-primary/30" : "border-border"
  }`;

  const baseStyle = {
    backgroundColor: `color-mix(in srgb, var(--surface) ${opacity}%, var(--background))`,
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
  };

  if (!interactive || prefersReducedMotion) {
    return (
      <Component
        className={`${baseClasses} ${className}`}
        style={baseStyle}
      >
        {children}
      </Component>
    );
  }

  return (
    <motion.div
      className={`${baseClasses} group hover:border-accent-primary/30 hover:shadow-md transition-colors duration-300 ${className}`}
      style={baseStyle}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" as const }}
    >
      {children}
    </motion.div>
  );
}
