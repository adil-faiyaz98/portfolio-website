"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export interface CTAButtonProps {
  label: string;
  variant: "primary" | "secondary" | "ghost";
  size: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
}

const sizeStyles: Record<CTAButtonProps["size"], string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function CTAButton({
  label,
  variant,
  size,
  href,
  onClick,
  className = "",
}: CTAButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-accent-primary text-white shadow-sm hover:bg-accent-primary-hover hover:shadow-md";
      case "secondary":
        return "border border-border text-accent-primary bg-surface hover:bg-surface-elevated hover:border-accent-primary/40";
      case "ghost":
        return "text-text-secondary hover:text-accent-primary hover:bg-surface-elevated";
      default:
        return "";
    }
  };
  
  const baseStyles =
    "group relative inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background overflow-hidden";

  const classes = `${baseStyles} ${getVariantStyles()} ${sizeStyles[size]} ${className}`.trim();

  const content = (
    <span className="relative">{label}</span>
  );

  if (href) {
    if (prefersReducedMotion) {
      return (
        <Link href={href} className={classes}>
          {content}
        </Link>
      );
    }
    
    return (
      <motion.div whileTap={{ scale: 0.98 }}>
        <Link href={href} className={classes}>
          {content}
        </Link>
      </motion.div>
    );
  }

  if (prefersReducedMotion) {
    return (
      <button type="button" onClick={onClick} className={classes}>
        {content}
      </button>
    );
  }

  return (
    <motion.button 
      type="button" 
      onClick={onClick} 
      className={classes}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
}
