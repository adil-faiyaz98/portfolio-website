"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { products } from "@/data/products";
import { ArrowRight, Lock, Zap, Shield, Building2, FileCheck, Brain, TrendingUp, Sparkles } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════════════
   PRODUCT SHOWCASE SECTION
   Displays all AI Agent Solutions with premium animations
   ═══════════════════════════════════════════════════════════════════════════ */

// Icon mapping for products
const iconMap: Record<string, React.ElementType> = {
  "supplier-risk": TrendingUp,
  "blockchain-platform-agent": Lock,
  "nfc-mobile-access": Zap,
  "sap-guardian": Shield,
  "contractor-integrator-hub": Building2,
  "policybridge-agent": FileCheck,
  "chantier-ai": Brain,
};

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const prefersReducedMotion = useReducedMotion();
  const Icon = iconMap[product.id] || Brain;
  const isNew = product.id === "supplier-risk";

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="relative group"
    >
      {/* Glow effect on hover */}
      <div
        className="absolute -inset-0.5 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `linear-gradient(135deg, ${product.accentColor}30, transparent)` }}
        aria-hidden="true"
      />

      <div className="relative p-6 rounded-2xl bg-white border border-gray-100 shadow-lg shadow-gray-100/50 h-full flex flex-col transition-all duration-300 group-hover:shadow-xl group-hover:border-accent-primary/20 group-hover:-translate-y-1">
        {/* Badge */}
        {product.badge && (
          <motion.span
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className={`absolute -top-3 right-6 px-3 py-1 rounded-full text-white text-xs font-semibold shadow-lg ${
              isNew ? "bg-gradient-to-r from-amber-500 to-orange-500 shadow-orange-500/30" : ""
            }`}
            style={!isNew ? { backgroundColor: product.accentColor, boxShadow: `0 4px 12px ${product.accentColor}40` } : undefined}
          >
            {product.badge}
          </motion.span>
        )}

        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <motion.div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
            style={{ backgroundColor: `${product.accentColor}12` }}
            whileHover={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.4 }}
          >
            <Icon size={24} style={{ color: product.accentColor }} />
          </motion.div>
          <div className="flex-1 min-w-0">
            <span className="text-xs text-text-muted uppercase tracking-wider font-medium">{product.tagline}</span>
            <h3 className="text-xl font-medium text-text-primary mt-0.5 leading-tight">{product.name}</h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-text-secondary leading-relaxed mb-5 flex-1 line-clamp-3">
          {product.shortDescription}
        </p>

        {/* Key Stats - Show first 2 */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {product.stats.slice(0, 2).map((stat) => (
            <div
              key={stat.label}
              className="text-center px-2 py-3 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100/50 border border-gray-100"
            >
              <div
                className="text-lg font-semibold"
                style={{ color: product.accentColor }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-text-muted mt-0.5 line-clamp-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Compliance tags - show first 3 */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {product.compliance.slice(0, 3).map((item) => (
            <span
              key={item}
              className="px-2 py-0.5 rounded-full text-xs bg-gray-50 text-text-muted border border-gray-100"
            >
              {item}
            </span>
          ))}
          {product.compliance.length > 3 && (
            <span className="px-2 py-0.5 rounded-full text-xs bg-gray-50 text-text-muted border border-gray-100">
              +{product.compliance.length - 3}
            </span>
          )}
        </div>

        {/* CTA */}
        <Link
          href={`/products/${product.slug}`}
          className="group/btn inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-white font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 overflow-hidden relative"
          style={{
            backgroundColor: product.accentColor,
            boxShadow: `0 4px 14px ${product.accentColor}30`
          }}
        >
          {/* Shine effect */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
          <span className="relative">Learn More</span>
          <ArrowRight size={16} className="relative transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}


export function ProductShowcase() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="products" className="relative py-24 md:py-32 px-6 overflow-hidden">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />

      {/* Animated gradient orbs */}
      <motion.div
        className="pointer-events-none absolute top-1/4 -left-[200px] h-[500px] w-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0, 102, 204, 0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.15, 1],
          y: [0, 30, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" as const }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute bottom-1/4 -right-[200px] h-[400px] w-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.2, 1],
          y: [0, -25, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" as const }}
        aria-hidden="true"
      />

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 102, 204, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 102, 204, 0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at 50% 50%, black 0%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black 0%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-gray-200 shadow-sm text-sm text-accent-primary font-medium mb-6"
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles size={16} className="text-accent-primary" />
            AI Agent Suite
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-light text-text-primary mb-4 tracking-tight">
            Enterprise <span className="text-accent-primary">AI Agents</span>
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Purpose-built agents for regulated industries. Supply chain risk intelligence, blockchain audit trails, aerospace counterfeit detection,
            Quebec construction compliance, and SAP finance transformation.
          </p>
        </motion.div>

        {/* Products Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Bottom CTA with premium styling */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="inline-flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br from-accent-primary/5 to-transparent border border-accent-primary/10">
            <p className="text-text-secondary mb-4">Need a custom AI agent for your enterprise?</p>
            <Link
              href="/request-agent"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-primary text-white font-medium shadow-lg shadow-accent-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-accent-primary/30 hover:-translate-y-0.5"
            >
              <span>Request a Custom Agent</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
