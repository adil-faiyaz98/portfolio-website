"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, MessageSquare } from "lucide-react";
import Link from "next/link";

export function CTABanner() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative py-24 md:py-32 bg-accent-primary text-surface">
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-surface/30 mb-8"
        >
          <Sparkles className="w-4 h-4 text-surface" />
          <span className="text-sm text-surface font-medium">Launching September 2026</span>
        </motion.div>

        <motion.h2
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: prefersReducedMotion ? 0 : 0.05 }}
          className="text-4xl md:text-5xl lg:text-6xl font-light text-surface mb-6 leading-tight tracking-tight"
        >
          Ready to{" "}
          <span className="font-medium">transform</span>
          {" "}your
          <br className="hidden md:block" />
          enterprise with AI?
        </motion.h2>

        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: prefersReducedMotion ? 0 : 0.1 }}
          className="text-lg md:text-xl text-surface/85 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Schedule a personalized demo to see how our AI agents can automate
          complex SAP processes and deliver 10x faster results than traditional consulting.
        </motion.p>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: prefersReducedMotion ? 0 : 0.15 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary CTA */}
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-surface text-accent-primary font-medium shadow-soft transition-colors duration-200 hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface focus-visible:ring-offset-2 focus-visible:ring-offset-accent-primary"
          >
            <span>Schedule a Demo</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/company/contact"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-lg border border-surface/40 text-surface font-medium hover:bg-accent-primary-hover transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface focus-visible:ring-offset-2 focus-visible:ring-offset-accent-primary"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Contact Us</span>
          </Link>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: prefersReducedMotion ? 0 : 0.2 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-surface/85 text-sm"
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            30+ years SAP expertise
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            6 specialized AI agents
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            10x faster than Big 4
          </span>
        </motion.div>
      </div>
    </section>
  );
}
