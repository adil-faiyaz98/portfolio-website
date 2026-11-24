"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Product } from "@/data/products";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Shield,
  Zap,
  Brain,
  Lock,
  Building2,
  FileCheck,
  Play,
  Users,
  Target,
  Layers,
  CheckCircle2,
  Sparkles,
  Database,
  Network,
  Cpu,
  Settings,
  BarChart3,
  Globe,
  Key,
  Scan,
  FileText,
  AlertTriangle,
  Clock,
  Workflow,
  TrendingUp,
  Search,
  DollarSign
} from "lucide-react";
import { FloatingElements, GradientOrb, AnimatedGrid } from "@/components/ui/FloatingElements";

interface ProductPageClientProps {
  product: Product;
}

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

// Feature icon mapping (maps feature icon names to Lucide icons)
const featureIconMap: Record<string, React.ElementType> = {
  // Default/common icons
  "check": Check,
  "shield": Shield,
  "lock": Lock,
  "database": Database,
  "network": Network,
  "cpu": Cpu,
  "settings": Settings,
  "chart": BarChart3,
  "chart-axis": BarChart3,
  "globe": Globe,
  "world": Globe,
  "key": Key,
  "scan": Scan,
  "file": FileText,
  "alert": AlertTriangle,
  "clock": Clock,
  "workflow": Workflow,
  "sparkles": Sparkles,
  "brain": Brain,
  "zap": Zap,
  "building": Building2,
  "users": Users,
  "target": Target,
  "layers": Layers,
  "search": Search,
  "trending-up": TrendingUp,
  "money-bills": DollarSign,
  "decision": Workflow,
};

/* ─────────────────────────────────────────────
   Hero Section - Product Overview
   ───────────────────────────────────────────── */

function ProductHero({ product }: { product: Product }) {
  const prefersReducedMotion = useReducedMotion();
  const Icon = iconMap[product.id] || Brain;

  return (
    <section className="relative min-h-[80vh] flex items-center pt-32 pb-20 px-6 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50">
      {/* Premium floating background elements */}
      <FloatingElements variant="hero" />

      {/* Gradient orbs */}
      <GradientOrb className="-top-[200px] -left-[200px]" />

      {/* Product accent orb */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${product.accentColor}15 0%, transparent 70%)`,
          top: "-20%",
          right: "-15%",
          filter: "blur(80px)",
        }}
        animate={prefersReducedMotion ? {} : {
          x: [0, 40, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" as const }}
      />

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

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-gray-500 mb-8"
        >
          <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/#products" className="hover:text-gray-700 transition-colors">AI Agents</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            {/* Badge */}
            {product.badge && (
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 border border-gray-200 shadow-sm text-sm mb-6"
                style={{ color: product.accentColor }}
              >
                <Icon className="w-4 h-4" />
                {product.badge}
              </motion.span>
            )}

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 mb-4 tracking-tight"
            >
              {product.name}
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl font-medium mb-6"
              style={{ color: product.accentColor }}
            >
              {product.tagline}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-gray-600 mb-8 leading-relaxed"
            >
              {product.fullDescription}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/demo"
                className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-medium overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${product.accentColor}, ${product.accentColor}cc)`,
                  boxShadow: `0 8px 32px ${product.accentColor}30`
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">Request Demo</span>
                <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/80 border border-gray-200 text-gray-700 font-medium hover:bg-white hover:border-gray-300 transition-all duration-300 shadow-sm"
              >
                <Play className="w-4 h-4" />
                Watch Overview
              </button>
            </motion.div>
          </div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            {product.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="p-6 rounded-2xl bg-white/80 border border-gray-100 text-center group hover:border-gray-200 hover:shadow-xl transition-all duration-300 shadow-lg shadow-gray-200/30"
              >
                <div
                  className="text-4xl font-light mb-2 group-hover:scale-110 transition-transform"
                  style={{ color: product.accentColor }}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wider font-medium">
                  {stat.label}
                </div>
                {stat.description && (
                  <div className="text-xs text-gray-400 mt-1">
                    {stat.description}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Problem Statement Section
   ───────────────────────────────────────────── */

function ProblemSection({ product }: { product: Product }) {
  return (
    <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-slate-50/50 via-white to-slate-50/50">
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 border border-gray-200 shadow-sm text-sm text-gray-700 mb-6">
            <Target className="w-4 h-4" style={{ color: product.accentColor }} />
            The Challenge
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            Why This <span style={{ color: product.accentColor }}>Matters</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-3xl bg-white/80 border border-gray-100 shadow-xl shadow-gray-200/50"
        >
          <p className="text-lg text-gray-600 leading-relaxed">
            {product.problemStatement}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Features Section - Glassmorphism Cards
   ───────────────────────────────────────────── */

function FeaturesSection({ product }: { product: Product }) {
  return (
    <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-slate-50/50 via-white to-slate-50/50">
      {/* Subtle gradient */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${product.accentColor}10 0%, transparent 70%)`
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 border border-gray-200 shadow-sm text-sm text-gray-700 mb-6">
            <Layers className="w-4 h-4" style={{ color: product.accentColor }} />
            Core Features
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            Intelligent <span style={{ color: product.accentColor }}>Capabilities</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Purpose-built features that deliver real business value
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {product.features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-6 rounded-2xl bg-white/80 border border-gray-100 hover:bg-white hover:border-gray-200 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-gray-200/30 hover:shadow-xl"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{
                  background: `${product.accentColor}15`,
                  border: `1px solid ${product.accentColor}25`
                }}
              >
                {(() => {
                  const FeatureIcon = featureIconMap[feature.icon] || Sparkles;
                  return <FeatureIcon size={24} style={{ color: product.accentColor }} />;
                })()}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Use Cases Section
   ───────────────────────────────────────────── */

function UseCasesSection({ product }: { product: Product }) {
  return (
    <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-slate-50/50 via-white to-slate-50/50">
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 border border-gray-200 shadow-sm text-sm text-gray-700 mb-6">
            <Users className="w-4 h-4" style={{ color: product.accentColor }} />
            Use Cases
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            Real-World <span style={{ color: product.accentColor }}>Applications</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {product.useCases.map((useCase, i) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="p-6 rounded-2xl bg-white/80 border border-gray-100 hover:bg-white hover:border-gray-200 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-gray-200/30 hover:shadow-xl"
            >
              {useCase.industry && (
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4"
                  style={{
                    background: `${product.accentColor}15`,
                    color: product.accentColor
                  }}
                >
                  {useCase.industry}
                </span>
              )}
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                {useCase.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {useCase.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Security & Compliance Section
   ───────────────────────────────────────────── */

function SecuritySection({ product }: { product: Product }) {
  return (
    <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-slate-50/50 via-white to-slate-50/50">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Security Features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 border border-gray-200 shadow-sm text-sm text-gray-700 mb-6">
              <Shield className="w-4 h-4" style={{ color: product.accentColor }} />
              Security
            </span>
            <h3 className="text-2xl font-light text-gray-900 mb-6">
              Enterprise-Grade <span style={{ color: product.accentColor }}>Security</span>
            </h3>
            <div className="space-y-3">
              {product.securityFeatures.map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/80 border border-gray-100 shadow-sm"
                >
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: product.accentColor }} />
                  <span className="text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Compliance */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 border border-gray-200 shadow-sm text-sm text-gray-700 mb-6">
              <FileCheck className="w-4 h-4" style={{ color: product.accentColor }} />
              Compliance
            </span>
            <h3 className="text-2xl font-light text-gray-900 mb-6">
              Regulatory <span style={{ color: product.accentColor }}>Standards</span>
            </h3>
            <div className="flex flex-wrap gap-3">
              {product.compliance.map((standard, i) => (
                <motion.span
                  key={standard}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="px-4 py-2 rounded-xl bg-white/80 border border-gray-100 text-gray-700 text-sm font-medium shadow-sm"
                >
                  {standard}
                </motion.span>
              ))}
            </div>

            {/* Target Roles */}
            <div className="mt-8">
              <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-4">
                Built For
              </h4>
              <div className="flex flex-wrap gap-2">
                {product.targetRoles.map((role) => (
                  <span
                    key={role}
                    className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-100 text-xs text-gray-600"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Integrations Section
   ───────────────────────────────────────────── */

function IntegrationsSection({ product }: { product: Product }) {
  return (
    <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-slate-50/50 via-white to-slate-50/50">
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            Seamless <span style={{ color: product.accentColor }}>Integrations</span>
          </h2>
          <p className="text-lg text-gray-600">
            Connects with your existing enterprise ecosystem
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4"
        >
          {product.integrations.map((integration, i) => (
            <motion.div
              key={integration}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="px-6 py-3 rounded-xl bg-white/80 border border-gray-100 text-gray-700 font-medium hover:border-gray-200 hover:shadow-lg transition-all duration-300 shadow-sm"
            >
              {integration}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CTA Section
   ───────────────────────────────────────────── */

function CTASection({ product }: { product: Product }) {
  return (
    <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-slate-50/50 via-white to-slate-50/50">
      {/* Gradient backdrop */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(ellipse at 50% 100%, ${product.accentColor}15 0%, transparent 70%)`
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-12 rounded-3xl bg-white/80 border border-gray-100 shadow-xl shadow-gray-200/50"
        >
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            Ready to Deploy <span style={{ color: product.accentColor }}>{product.name}</span>?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Our team will guide you through implementation, integration, and optimization
            to ensure you get maximum value from this AI agent.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/demo"
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-medium overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${product.accentColor}, ${product.accentColor}cc)`,
                boxShadow: `0 8px 32px ${product.accentColor}30`
              }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">Schedule Demo</span>
              <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/company/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/80 border border-gray-200 text-gray-700 font-medium hover:bg-white hover:border-gray-300 transition-all duration-300 shadow-sm"
            >
              Contact Sales
            </Link>
          </div>
        </motion.div>

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <Link
            href="/#products"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Explore All AI Agents
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Main Product Page Component
   ───────────────────────────────────────────── */

export function ProductPageClient({ product }: ProductPageClientProps) {
  return (
    <main className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/50">
      <ProductHero product={product} />
      <ProblemSection product={product} />
      <FeaturesSection product={product} />
      <UseCasesSection product={product} />
      <SecuritySection product={product} />
      <IntegrationsSection product={product} />
      <CTASection product={product} />
    </main>
  );
}
