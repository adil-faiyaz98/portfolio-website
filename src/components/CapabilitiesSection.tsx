"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Brain, Plug, Shield, Bot } from "lucide-react";
import { capabilities } from "@/data/capabilities";
import { SectionHeader } from "@/components/ui";

const capabilityIcons: Record<string, React.ReactNode> = {
  intelligence: <Brain className="w-8 h-8" />,
  integration: <Plug className="w-8 h-8" />,
  security: <Shield className="w-8 h-8" />,
  automation: <Bot className="w-8 h-8" />,
};

function CapabilityVisual({ capabilityId }: { capabilityId: string }) {
  const visuals: Record<string, React.ReactNode> = {
    intelligence: (
      <svg viewBox="0 0 280 200" fill="none" className="w-full h-auto">
        <rect width="280" height="200" rx="12" className="fill-surface-elevated" />
        {/* Brain/Neural network visualization */}
        <circle cx="140" cy="100" r="45" className="stroke-accent-primary" strokeWidth="2" fill="none" />
        <circle cx="140" cy="100" r="30" className="stroke-accent-primary" strokeWidth="1.5" fill="none" opacity="0.6" />
        {/* Neural nodes */}
        <circle cx="140" cy="70" r="6" className="fill-accent-primary" />
        <circle cx="165" cy="90" r="5" className="fill-accent-primary" opacity="0.8" />
        <circle cx="160" cy="115" r="5" className="fill-accent-primary" opacity="0.8" />
        <circle cx="130" cy="120" r="5" className="fill-accent-primary" opacity="0.8" />
        <circle cx="115" cy="95" r="5" className="fill-accent-primary" opacity="0.8" />
        {/* Connections */}
        <line x1="140" y1="70" x2="165" y2="90" className="stroke-accent-primary" strokeWidth="1" />
        <line x1="140" y1="70" x2="115" y2="95" className="stroke-accent-primary" strokeWidth="1" />
        <line x1="165" y1="90" x2="160" y2="115" className="stroke-accent-primary" strokeWidth="1" />
        <line x1="115" y1="95" x2="130" y2="120" className="stroke-accent-primary" strokeWidth="1" />
        <line x1="160" y1="115" x2="130" y2="120" className="stroke-accent-primary" strokeWidth="1" />
        {/* Data streams */}
        <rect x="50" y="80" width="40" height="6" rx="3" className="fill-text-muted" opacity="0.4" />
        <rect x="50" y="95" width="30" height="6" rx="3" className="fill-text-muted" opacity="0.3" />
        <rect x="190" y="80" width="40" height="6" rx="3" className="fill-text-muted" opacity="0.4" />
        <rect x="195" y="95" width="35" height="6" rx="3" className="fill-text-muted" opacity="0.3" />
      </svg>
    ),
    integration: (
      <svg viewBox="0 0 280 200" fill="none" className="w-full h-auto">
        <rect width="280" height="200" rx="12" className="fill-surface-elevated" />
        {/* SAP box */}
        <rect x="40" y="75" width="60" height="50" rx="8" className="stroke-accent-primary fill-surface" strokeWidth="1.5" />
        <text x="70" y="100" textAnchor="middle" className="fill-accent-primary" fontSize="12" fontWeight="600">SAP</text>
        <text x="70" y="115" textAnchor="middle" className="fill-text-secondary" fontSize="8">S/4HANA</text>
        {/* AI Agent center */}
        <circle cx="140" cy="100" r="25" className="stroke-accent-primary fill-surface" strokeWidth="2" />
        <path d="M132 95 L140 88 L148 95 L148 107 L140 114 L132 107 Z" className="fill-accent-primary" opacity="0.8" />
        {/* Enterprise box */}
        <rect x="180" y="75" width="60" height="50" rx="8" className="stroke-accent-primary fill-surface" strokeWidth="1.5" />
        <text x="210" y="100" textAnchor="middle" className="fill-accent-primary" fontSize="10" fontWeight="600">Enterprise</text>
        <text x="210" y="115" textAnchor="middle" className="fill-text-secondary" fontSize="8">Systems</text>
        {/* Connecting lines */}
        <path d="M100 100 L115 100" className="stroke-accent-primary" strokeWidth="2" strokeDasharray="4 3" />
        <path d="M165 100 L180 100" className="stroke-accent-primary" strokeWidth="2" strokeDasharray="4 3" />
        {/* Bidirectional arrows */}
        <polygon points="113,96 118,100 113,104" className="fill-accent-primary" />
        <polygon points="167,96 162,100 167,104" className="fill-accent-primary" />
      </svg>
    ),
    security: (
      <svg viewBox="0 0 280 200" fill="none" className="w-full h-auto">
        <rect width="280" height="200" rx="12" className="fill-surface-elevated" />
        {/* Shield shape */}
        <path d="M140 50 L180 65 L180 110 Q180 145 140 160 Q100 145 100 110 L100 65 Z" className="stroke-accent-primary fill-surface" strokeWidth="2" />
        {/* Lock icon inside shield */}
        <rect x="125" y="95" width="30" height="25" rx="4" className="fill-accent-primary" opacity="0.8" />
        <path d="M132 95 L132 85 Q132 75 140 75 Q148 75 148 85 L148 95" className="stroke-accent-primary" strokeWidth="2.5" fill="none" />
        <circle cx="140" cy="107" r="3" className="fill-surface" />
        {/* Checkmarks */}
        <path d="M55 80 L62 87 L75 70" className="stroke-accent-primary" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="65" y="105" textAnchor="middle" className="fill-text-secondary" fontSize="8">Compliant</text>
        <path d="M205 80 L212 87 L225 70" className="stroke-accent-primary" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="215" y="105" textAnchor="middle" className="fill-text-secondary" fontSize="8">Encrypted</text>
      </svg>
    ),
    automation: (
      <svg viewBox="0 0 280 200" fill="none" className="w-full h-auto">
        <rect width="280" height="200" rx="12" className="fill-surface-elevated" />
        {/* Robot/Bot icon */}
        <rect x="110" y="60" width="60" height="50" rx="8" className="stroke-accent-primary fill-surface" strokeWidth="2" />
        <circle cx="127" cy="82" r="6" className="fill-accent-primary" />
        <circle cx="153" cy="82" r="6" className="fill-accent-primary" />
        <rect x="125" y="95" width="30" height="5" rx="2" className="fill-accent-primary" opacity="0.6" />
        {/* Antenna */}
        <line x1="140" y1="60" x2="140" y2="45" className="stroke-accent-primary" strokeWidth="2" />
        <circle cx="140" cy="42" r="4" className="fill-accent-primary" />
        {/* Workflow arrows */}
        <path d="M80 130 L110 130 L110 145 L200 145 L200 130 L170 130" className="stroke-accent-primary" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
        {/* Task boxes */}
        <rect x="50" y="120" width="30" height="20" rx="4" className="fill-surface stroke-accent-primary" strokeWidth="1" />
        <path d="M60 128 L65 133 L72 124" className="stroke-accent-primary" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="200" y="120" width="30" height="20" rx="4" className="fill-surface stroke-accent-primary" strokeWidth="1" />
        <path d="M210 128 L215 133 L222 124" className="stroke-accent-primary" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* 24/7 indicator */}
        <text x="140" y="175" textAnchor="middle" className="fill-text-secondary" fontSize="10" fontWeight="500">24/7</text>
      </svg>
    ),
  };

  return (
    <div className="flex items-center justify-center p-4" aria-hidden="true">
      {visuals[capabilityId] ?? visuals.intelligence}
    </div>
  );
}

const contentVariants = {
  enter: { opacity: 0, y: 6 },
  center: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.15, ease: "easeIn" as const } },
} as const;

export function CapabilitiesSection() {
  const [activeCapability, setActiveCapability] = useState("intelligence");
  const prefersReducedMotion = useReducedMotion();

  const active = capabilities.find((c) => c.id === activeCapability) ?? capabilities[0];

  return (
    <section id="capabilities" className="relative py-24 md:py-32 px-6 bg-surface border-y border-border">
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <SectionHeader
          title="Platform Capabilities"
          subtitle="Enterprise-grade AI agents built on 30+ years of SAP expertise"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_300px] gap-8 mt-12">
          {/* Vertical Nav (desktop) / Horizontal Pills (mobile) */}
          <nav
            className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 -mx-2 px-2 lg:mx-0 lg:px-0"
            aria-label="Capabilities navigation"
          >
            {capabilities.map((cap) => (
              <motion.button
                key={cap.id}
                onClick={() => setActiveCapability(cap.id)}
                className={`relative flex items-center gap-3 px-5 py-4 rounded-xl text-left whitespace-nowrap lg:whitespace-normal transition-colors duration-200 shrink-0 lg:shrink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary ${
                  activeCapability === cap.id
                    ? "text-text-primary"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-elevated"
                }`}
                aria-pressed={activeCapability === cap.id}
              >
                {/* Active background */}
                {activeCapability === cap.id && (
                  <motion.div
                    layoutId={prefersReducedMotion ? undefined : "activeCapability"}
                    className="absolute inset-0 rounded-xl bg-surface-elevated border border-border"
                    transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                  />
                )}

                {/* Active indicator bar */}
                {activeCapability === cap.id && (
                  <motion.div
                    layoutId={prefersReducedMotion ? undefined : "activeIndicator"}
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-full bg-accent-primary"
                    transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                  />
                )}

                <span className={`relative z-10 hidden lg:inline-flex transition-colors duration-300 ${
                  activeCapability === cap.id ? "text-accent-primary" : ""
                }`}>
                  {capabilityIcons[cap.id]}
                </span>
                <span className="relative z-10 text-sm font-medium">{cap.title}</span>
              </motion.button>
            ))}
          </nav>

          {/* Content Panel */}
          <div className="min-h-[300px] relative bg-background border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                variants={prefersReducedMotion ? undefined : contentVariants}
                initial={prefersReducedMotion ? false : "enter"}
                animate={prefersReducedMotion ? undefined : "center"}
                exit={prefersReducedMotion ? undefined : "exit"}
                className="flex flex-col gap-5"
              >
                <h3 className="text-2xl font-medium text-text-primary">{active.title}</h3>
                <p className="text-text-secondary leading-relaxed">
                  {active.description}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  {active.features.map((feature, index) => (
                    <motion.li
                      key={feature}
                      initial={prefersReducedMotion ? false : { opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.2, delay: prefersReducedMotion ? 0 : index * 0.04 }}
                      className="flex items-center gap-3 text-sm text-text-secondary"
                    >
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-surface-elevated flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
                      </span>
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Visual Panel */}
          <div className="hidden lg:flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                className="w-full"
              >
                <div className="rounded-2xl overflow-hidden bg-surface-elevated border border-border shadow-sm">
                  <CapabilityVisual capabilityId={active.id} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
