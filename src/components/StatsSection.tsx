"use client";

import { motion, useReducedMotion } from "framer-motion";
import { stats } from "@/data/testimonials";
import { AnimatedCounter } from "@/components/ui";

export function StatsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative py-24 md:py-32 px-6 bg-surface-elevated border-y border-border">
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-light text-text-primary mb-3 tracking-tight">
            Built on <span className="text-accent-primary">Expertise & Trust</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            As a boutique firm specializing in agentic solutions, we deliver faster than Big4 consultancies —
            at a fraction of the cost. What takes them 500 meetings and a year, we ship in weeks.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: prefersReducedMotion ? 0 : index * 0.06 }}
              className="relative"
            >
              {/* Card */}
              <div className="relative h-full px-4 py-8 md:p-8 rounded-2xl bg-surface border border-border shadow-sm text-center">
                <div className="relative z-10">
                  <AnimatedCounter
                    target={stat.value}
                    duration={1200}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                    className="text-4xl md:text-5xl font-light text-accent-primary tabular-nums"
                  />
                  <span className="block text-sm md:text-base text-text-secondary mt-3">
                    {stat.label}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Why Boutique Section */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: 0.3 }}
          className="mt-16 p-8 rounded-2xl bg-surface border border-border"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-light text-text-primary mb-4">
                Why Choose a Boutique Firm?
              </h3>
              <p className="text-text-secondary leading-relaxed">
                Big4 consultancies will take 500 meetings, involve 50 people, and deliver something
                similar in 12+ months at twice the cost. We&apos;re product-focused specialists who
                get you to market faster with solutions that work from day one.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-surface-elevated text-center">
                <div className="text-2xl font-light text-accent-primary">2-4 weeks</div>
                <div className="text-xs text-text-muted mt-1">Our Delivery Time</div>
              </div>
              <div className="p-4 rounded-xl bg-surface-elevated text-center">
                <div className="text-2xl font-light text-text-muted">12+ months</div>
                <div className="text-xs text-text-muted mt-1">Big4 Timeline</div>
              </div>
              <div className="p-4 rounded-xl bg-surface-elevated text-center">
                <div className="text-2xl font-light text-accent-primary">Fixed Price</div>
                <div className="text-xs text-text-muted mt-1">No Surprises</div>
              </div>
              <div className="p-4 rounded-xl bg-surface-elevated text-center">
                <div className="text-2xl font-light text-text-muted">T&M Billing</div>
                <div className="text-xs text-text-muted mt-1">Big4 Model</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
