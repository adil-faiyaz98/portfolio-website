"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { solutions } from "@/data/platforms";
import { SectionHeader } from "@/components/ui";

// Background images for each solution (using Unsplash for high-quality free images)
const solutionBackgrounds: Record<string, string> = {
  "supplier-risk": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80", // Supply chain logistics
  "sap-guardian": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80", // Airplane in sky
  "nfc-mobile-access": "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80", // Glass skyscraper
  "contractor-hub": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80", // Construction workers
  "policybridge": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80", // Finance documents
  "chantier-ai": "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80", // Construction site
  "immutability-layer": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80", // Blockchain/abstract network
};

export function PlatformsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="solutions" className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Premium dark background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030710] via-[#0a0f1a] to-[#030710]" />

      {/* Animated gradient orbs */}
      <motion.div
        className="pointer-events-none absolute -top-[200px] -left-[200px] h-[500px] w-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0, 102, 204, 0.15) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" as const }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute -bottom-[200px] -right-[200px] h-[600px] w-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0, 212, 255, 0.12) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.15, 1],
          x: [0, -40, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" as const }}
        aria-hidden="true"
      />

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at 50% 50%, black 0%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black 0%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header with premium styling */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6"
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="h-4 w-4 text-[#7fc8ff]" />
            <span className="text-sm font-medium text-white/80">Enterprise Solutions</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
            AI Agent Solutions
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Seven specialized AI agents designed to transform enterprise operations across industries
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                delay: prefersReducedMotion ? 0 : index * 0.08,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="group relative h-[420px] rounded-2xl overflow-hidden"
            >
              <Link href={solution.href} className="block h-full">
                {/* Background Image with parallax-like scale on hover */}
                <motion.div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${solutionBackgrounds[solution.id]})`,
                  }}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                  transition={{ duration: 0.7, ease: "easeOut" as const }}
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030710] via-[#030710]/70 to-transparent" />
                <div className="absolute inset-0 bg-[#030710]/40 group-hover:bg-[#030710]/30 transition-colors duration-500" />

                {/* Accent gradient on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, #006ddd 0%, transparent 60%)`
                  }}
                />

                {/* Animated border glow on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 rounded-2xl border border-[#7fc8ff]/30" />
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-6">
                  {/* Industry Badge - positioned at top */}
                  <div className="absolute top-6 left-6 flex items-center gap-2">
                    <motion.span
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 backdrop-blur-md text-white/90 border border-white/10"
                      whileHover={{ scale: 1.05 }}
                    >
                      {solution.industry}
                    </motion.span>
                    {solution.id === "supplier-risk" && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-orange-500/30">
                        NEW
                      </span>
                    )}
                  </div>

                  {/* Main Content */}
                  <div className="space-y-3">
                    {/* Tagline */}
                    <p className="text-sm font-medium text-[#7fc8ff] tracking-wide uppercase">
                      {solution.tagline}
                    </p>

                    {/* Title */}
                    <h3 className="text-2xl font-semibold text-white leading-tight group-hover:text-[#cce9ff] transition-colors duration-300">
                      {solution.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-white/70 leading-relaxed line-clamp-3">
                      {solution.description}
                    </p>

                    {/* CTA */}
                    <motion.div
                      className="flex items-center gap-2 pt-2"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="text-sm font-medium text-[#7fc8ff] group-hover:text-white transition-colors duration-300">
                        Explore Solution
                      </span>
                      <ArrowRight
                        className="w-4 h-4 text-[#7fc8ff] group-hover:text-white transition-all duration-300"
                      />
                    </motion.div>
                  </div>

                  {/* Bottom border accent */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#006ddd] to-[#7fc8ff]"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ transformOrigin: "left" }}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Link with premium styling */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <Link
            href="/request-agent"
            className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-white/5 border border-[#7fc8ff]/30 rounded-xl backdrop-blur-sm transition-all duration-300 group-hover:bg-white/10 group-hover:border-[#7fc8ff]/50" />

            {/* Shine effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </div>

            <span className="relative text-[#7fc8ff] font-medium group-hover:text-white transition-colors">
              Need a Custom Agent?
            </span>
            <ArrowRight className="relative w-4 h-4 text-[#7fc8ff] group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
