"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Sparkles, Shield, Building2, Brain, Lock, FileCheck, Zap, TrendingUp } from "lucide-react";
import { FloatingElements, GradientOrb, AnimatedGrid } from "@/components/ui/FloatingElements";

const reassurances = [
  "SAP-native AI agents",
  "Human-in-the-loop oversight",
  "Quebec Law 25 compliant",
];

const heroStats = [
  { value: "7", label: "AI Agents" },
  { value: "30+", label: "Years SAP" },
  { value: "10x", label: "Faster" },
  { value: "Q4", label: "2026" },
];

const agentShowcase = [
  { label: "Supplier Risk", icon: TrendingUp, color: "#F59E0B", badge: "NEW" },
  { label: "Blockchain Platform", icon: Lock, color: "#8B5CF6" },
  { label: "SAP Guardian", icon: Shield, color: "#DC2626" },
  { label: "NFC Access", icon: Zap, color: "#00d4ff" },
  { label: "Chantier AI", icon: Building2, color: "#0EA5E9" },
  { label: "PolicyBridge", icon: FileCheck, color: "#A855F7" },
  { label: "Contractor Hub", icon: Brain, color: "#10B981" },
];

/* AI Agent showcase grid */
function AgentShowcase() {
  const reduce = useReducedMotion();

  return (
    <motion.figure
      initial={reduce ? undefined : { opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-lg mx-auto"
    >
      {/* Card with glass effect */}
      <div className="relative rounded-2xl border border-white/10 bg-white/80 backdrop-blur-xl p-6 shadow-2xl shadow-accent-primary/5">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-primary/[0.02] via-transparent to-cyan-500/[0.02]" />

        <figcaption className="relative mb-5 flex items-center justify-between text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
          <span>Enterprise AI Agents</span>
          <span className="flex items-center gap-1.5 text-accent-primary">
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="h-3.5 w-3.5" />
            </motion.span>
            Launching Q4 2026
          </span>
        </figcaption>

        <div className="relative grid grid-cols-2 gap-3">
          {agentShowcase.map((agent, i) => {
            const Icon = agent.icon;
            return (
              <motion.div
                key={agent.label}
                initial={reduce ? undefined : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.06, duration: 0.4, ease: "easeOut" as const }}
                className="group relative flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3.5 transition-all duration-300 hover:border-accent-primary/20 hover:shadow-lg hover:shadow-accent-primary/5 hover:-translate-y-0.5"
              >
                {/* Badge for new agents */}
                {agent.badge && (
                  <span className="absolute -top-2 -right-2 px-2 py-0.5 text-[10px] font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full shadow-sm">
                    {agent.badge}
                  </span>
                )}

                <motion.div
                  className="flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${agent.color}12` }}
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  <Icon className="h-5 w-5 transition-colors" style={{ color: agent.color }} />
                </motion.div>
                <span className="text-sm font-medium text-text-primary">{agent.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      <span className="sr-only">
        Seven enterprise AI agents: Supplier Risk, Blockchain Platform, SAP Guardian, NFC Access, Chantier AI, PolicyBridge, and Contractor Hub.
      </span>
    </motion.figure>
  );
}

export function HeroSection() {
  const reduce = useReducedMotion();
  const fade = (delay: number) => ({
    initial: reduce ? undefined : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 px-6 pb-24 pt-32"
    >
      {/* Premium floating background elements */}
      <FloatingElements variant="hero" />

      {/* Gradient orbs */}
      <GradientOrb className="-top-[200px] -left-[200px]" />
      <GradientOrb className="-bottom-[300px] -right-[200px]" />

      {/* Animated grid pattern */}
      <AnimatedGrid />

      {/* Noise texture for premium feel */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-7">
          {/* Eyebrow with animated dot */}
          <motion.div
            {...fade(0)}
            className="flex items-center gap-2"
          >
            <motion.span
              className="h-2 w-2 rounded-full bg-accent-primary"
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-primary">
              Enterprise AI Agents for SAP
            </p>
          </motion.div>

          <motion.h1
            {...fade(0.1)}
            className="text-5xl leading-[1.05] sm:text-6xl lg:text-7xl"
          >
            AI agents that{" "}
            <span className="relative">
              <span className="relative z-10 text-accent-primary">automate</span>
              <motion.span
                className="absolute -bottom-2 left-0 h-3 w-full bg-accent-primary/10 -skew-x-3"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" as const }}
              />
            </span>{" "}
            your SAP operations.
          </motion.h1>

          <motion.p
            {...fade(0.2)}
            className="max-w-xl text-lg leading-relaxed text-text-secondary md:text-xl"
          >
            Boutique developers with 30+ years of SAP experience. We deliver
            purpose-built AI agents 10x faster than Big4 consultancies — at
            fixed pricing.
          </motion.p>

          <motion.ul {...fade(0.3)} className="space-y-3">
            {reassurances.map((item, i) => (
              <motion.li
                key={item}
                className="flex items-center gap-3 text-text-secondary"
                initial={reduce ? undefined : { opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-primary/10">
                  <Check className="h-3 w-3 text-accent-primary" aria-hidden="true" />
                </span>
                {item}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div {...fade(0.4)} className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="#products"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-accent-primary px-8 py-4 font-medium text-white shadow-lg shadow-accent-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-accent-primary/30 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {/* Button shine effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">Explore Solutions</span>
              <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/demo"
              className="group inline-flex items-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-7 py-3.5 font-medium text-text-primary transition-all duration-300 hover:border-accent-primary/30 hover:bg-accent-primary/5 hover:shadow-lg"
            >
              Book a Demo
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>

          <motion.dl
            {...fade(0.5)}
            className="mt-6 grid grid-cols-2 gap-6 border-t border-gray-100 pt-8 sm:grid-cols-4"
          >
            {heroStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="flex flex-col"
                initial={reduce ? undefined : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
              >
                <dt className="order-2 mt-1 text-xs uppercase tracking-[0.14em] text-text-muted">
                  {stat.label}
                </dt>
                <dd className="font-serif text-3xl text-text-primary">{stat.value}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>

        <AgentShowcase />
      </div>
    </section>
  );
}
