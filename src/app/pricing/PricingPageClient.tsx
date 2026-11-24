"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { PricingCards } from "./PricingCards";
import { PricingFAQ } from "./PricingFAQ";
import type { ProductPricing } from "@/data/pricing";
import { Shield, Smartphone, Building2, FileText, ChevronUp, ChevronDown, Check, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { FloatingElements, GradientOrb, AnimatedGrid } from "@/components/ui/FloatingElements";

interface PricingPageClientProps {
  products: ProductPricing[];
}

// Icon mapping for products
const iconMap: Record<string, React.ElementType> = {
  "shield": Shield,
  "smartphone": Smartphone,
  "building": Building2,
  "file-text": FileText,
  "trending-up": TrendingUp,
};

const productColors: Record<string, string> = {
  "sap-guardian": "#DC2626",
  "nfc-mobile-access": "#00d4ff",
  "chantier-ai": "#0EA5E9",
  "contractor-hub": "#10B981",
  "policybridge": "#A855F7",
  "blockchain-platform": "#8B5CF6",
  "supplier-risk": "#F59E0B",
};

export function PricingPageClient({ products }: PricingPageClientProps) {
  const [selectedProduct, setSelectedProduct] = useState(products[0]?.id || "sap-guardian");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const activeProduct = products.find((p) => p.id === selectedProduct) || products[0];
  const ActiveIcon = iconMap[activeProduct?.icon || "shield"] || Shield;
  const activeColor = productColors[selectedProduct] || "#0066CC";

  return (
    <main id="main-content" className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50/50 overflow-hidden">
      {/* Premium floating background elements */}
      <FloatingElements variant="section" />
      <GradientOrb className="-top-[200px] -left-[200px]" />
      <GradientOrb className="top-1/2 -right-[200px]" />
      <AnimatedGrid />

      {/* Noise texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <motion.section
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-primary/10 border border-accent-primary/20 mb-6"
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-accent-primary" />
              <span className="text-sm font-medium text-accent-primary">Transparent Pricing</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-text-primary mb-6 tracking-tight">
              Simple, <span className="text-accent-primary">Transparent</span> Pricing
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto font-light leading-relaxed">
              Choose the AI agent and plan that fits your needs. All plans include dedicated support.
            </p>
          </motion.section>

          {/* Product Selector */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center mb-12"
          >
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white border border-gray-200 hover:border-accent-primary/30 shadow-lg transition-all min-w-[380px]"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${activeColor}15` }}
                >
                  <ActiveIcon className="w-6 h-6" style={{ color: activeColor }} />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-text-primary font-medium">{activeProduct.name}</div>
                  <div className="text-xs text-text-muted">{activeProduct.description}</div>
                </div>
                {isDropdownOpen ? (
                  <ChevronUp className="w-5 h-5" style={{ color: activeColor }} />
                ) : (
                  <ChevronDown className="w-5 h-5" style={{ color: activeColor }} />
                )}
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 rounded-2xl bg-white border border-gray-200 shadow-2xl overflow-hidden z-50"
                  >
                    {products.map((product) => {
                      const ProductIcon = iconMap[product.icon] || Shield;
                      const color = productColors[product.id] || "#0066CC";
                      return (
                        <button
                          key={product.id}
                          onClick={() => {
                            setSelectedProduct(product.id);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-5 py-4 hover:bg-slate-50 transition-colors ${
                            selectedProduct === product.id ? "bg-slate-50" : ""
                          }`}
                        >
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: `${color}15` }}
                          >
                            <ProductIcon className="w-5 h-5" style={{ color }} />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="text-text-primary text-sm font-medium">{product.name}</div>
                            <div className="text-xs text-text-muted">{product.description}</div>
                          </div>
                          {selectedProduct === product.id && (
                            <Check className="w-5 h-5" style={{ color }} />
                          )}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Product Badge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProduct}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex justify-center mb-10"
            >
              <div
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border"
                style={{
                  backgroundColor: `${activeColor}10`,
                  borderColor: `${activeColor}30`
                }}
              >
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: activeColor }}
                />
                <span className="text-sm" style={{ color: activeColor }}>
                  {activeProduct.name.includes("Supply") ? "Launching Q4 2026" : "Launching September 2026"}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Pricing Tier Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProduct}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PricingCards tiers={activeProduct.tiers} accentColor={activeColor} />
            </motion.div>
          </AnimatePresence>

          {/* FAQ Section */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`faq-${selectedProduct}`}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <PricingFAQ faqs={activeProduct.faqs} accentColor={activeColor} />
            </motion.div>
          </AnimatePresence>

          {/* Bottom CTA */}
          <motion.section
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <div className="relative p-10 rounded-3xl bg-white border border-gray-100 shadow-xl overflow-hidden">
              {/* Background gradient */}
              <div
                className="absolute inset-0 opacity-40"
                style={{ background: `radial-gradient(ellipse at 50% 100%, ${activeColor}15 0%, transparent 70%)` }}
              />

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-light text-text-primary mb-2">
                    Need a <span style={{ color: activeColor }}>Custom AI Agent?</span>
                  </h3>
                  <p className="text-text-secondary max-w-md">
                    Contact us for custom development and enterprise pricing tailored to your needs.
                  </p>
                </div>
                <Link
                  href="/request-agent"
                  className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 text-white"
                  style={{
                    backgroundColor: activeColor,
                    boxShadow: `0 10px 30px ${activeColor}30`
                  }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Request an Agent</span>
                  <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}
