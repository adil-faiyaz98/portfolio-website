"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { caseStudies } from "@/data/case-studies";
import { ArrowLeft, ArrowRight, Shield, Zap, Building2, FileText, Brain, Lock, CheckCircle2, TrendingUp, Quote } from "lucide-react";
import { FloatingElements, GradientOrb, AnimatedGrid } from "@/components/ui/FloatingElements";

const agentIcons: Record<string, React.ElementType> = {
  "blockchain-platform-agent": Lock,
  "nfc-mobile-access": Zap,
  "sap-guardian": Shield,
  "contractor-integrator-hub": Building2,
  "policybridge-agent": FileText,
  "chantier-ai": Brain,
};

const agentColors: Record<string, string> = {
  "blockchain-platform-agent": "#8B5CF6",
  "nfc-mobile-access": "#00d4ff",
  "sap-guardian": "#DC2626",
  "contractor-integrator-hub": "#10B981",
  "policybridge-agent": "#A855F7",
  "chantier-ai": "#0EA5E9",
};

const agentLabels: Record<string, string> = {
  "blockchain-platform-agent": "Blockchain Platform Agent",
  "nfc-mobile-access": "NFC Mobile Access",
  "sap-guardian": "SAP Guardian",
  "contractor-integrator-hub": "Contractor Integrator Hub",
  "policybridge-agent": "PolicyBridge Agent",
  "chantier-ai": "Chantier AI",
};

export default function CaseStudyPage() {
  const params = useParams();
  const slug = params.slug as string;
  const prefersReducedMotion = useReducedMotion();

  const study = caseStudies.find((cs) => cs.slug === slug);

  if (!study) {
    notFound();
  }

  const Icon = agentIcons[study.agent] || Shield;
  const color = agentColors[study.agent] || "#0066cc";
  const agentLabel = agentLabels[study.agent] || study.agent;

  // Find related case studies (same agent)
  const relatedStudies = caseStudies
    .filter((cs) => cs.agent === study.agent && cs.slug !== study.slug)
    .slice(0, 2);

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50">
      {/* Premium floating background elements */}
      <FloatingElements variant="hero" />

      {/* Gradient orbs */}
      <GradientOrb className="-top-[200px] -left-[200px]" />

      {/* Case study accent orb */}
      <motion.div
        className="pointer-events-none absolute -top-[200px] -right-[200px] h-[600px] w-[600px] rounded-full"
        style={{
          background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
          filter: "blur(100px)",
        }}
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.2, 1],
          x: [0, -30, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" as const }}
        aria-hidden="true"
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

      <div className="relative z-10 py-32 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-gray-500 mb-8"
          >
            <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/learn/case-studies" className="hover:text-gray-700 transition-colors">Case Studies</Link>
            <span>/</span>
            <span className="text-gray-900">{study.company}</span>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            {/* Agent Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl mb-6 shadow-sm"
              style={{ backgroundColor: `${color}15`, border: `1px solid ${color}25` }}
            >
              <Icon className="w-5 h-5" style={{ color }} />
              <span className="text-sm font-medium" style={{ color }}>{agentLabel}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              {study.company}
            </h1>
            <p className="text-xl text-gray-500">{study.industry}</p>
          </motion.header>

          {/* Key Metrics */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-3 gap-4 mb-12"
          >
            {study.metrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="p-6 rounded-2xl bg-white/80 border border-gray-100 text-center shadow-lg shadow-gray-200/30"
              >
                <div className="text-3xl md:text-4xl font-light mb-2" style={{ color }}>
                  {metric.value}
                </div>
                <div className="text-sm text-gray-500">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Content */}
          <motion.article
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="prose prose-lg max-w-none"
          >
            {/* Challenge Section */}
            <div className="p-8 rounded-2xl bg-white/80 border border-gray-100 mb-8 shadow-lg shadow-gray-200/30">
              <h2 className="text-2xl font-light text-gray-900 mb-4 flex items-center gap-3">
                <TrendingUp className="w-6 h-6" style={{ color }} />
                The Challenge
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {study.excerpt}
              </p>
            </div>

            {/* Solution Section */}
            <div className="p-8 rounded-2xl bg-white/80 border border-gray-100 mb-8 shadow-lg shadow-gray-200/30">
              <h2 className="text-2xl font-light text-gray-900 mb-4 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6" style={{ color }} />
                The Solution
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {study.company} deployed the {agentLabel} to address their operational challenges.
                The AI agent integrated seamlessly with their existing SAP infrastructure, providing
                real-time monitoring and automated decision-making capabilities.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${color}15` }}>
                    <span className="text-xs font-bold" style={{ color }}>1</span>
                  </div>
                  <p className="text-gray-600">Rapid deployment with minimal disruption to existing workflows</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${color}15` }}>
                    <span className="text-xs font-bold" style={{ color }}>2</span>
                  </div>
                  <p className="text-gray-600">Deep integration with SAP S/4HANA and related modules</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${color}15` }}>
                    <span className="text-xs font-bold" style={{ color }}>3</span>
                  </div>
                  <p className="text-gray-600">Continuous monitoring with human-in-the-loop oversight</p>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="p-8 rounded-2xl border-l-4 mb-8" style={{ borderColor: color, backgroundColor: `${color}08` }}>
              <Quote className="w-8 h-8 mb-4" style={{ color, opacity: 0.5 }} />
              <p className="text-xl text-gray-700 italic leading-relaxed">
                &ldquo;The deployment exceeded our expectations. We achieved measurable results within
                the first quarter and the ROI was clear from day one.&rdquo;
              </p>
              <p className="text-gray-500 mt-4">— {study.industry} Executive</p>
            </div>

            {/* Results Summary */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 shadow-lg shadow-gray-200/30">
              <h2 className="text-2xl font-light text-gray-900 mb-6">Results Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {study.metrics.map((metric) => (
                  <div key={metric.label} className="text-center">
                    <div className="text-3xl font-light mb-1" style={{ color }}>{metric.value}</div>
                    <div className="text-sm text-gray-500">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.article>

          {/* CTA */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 p-8 rounded-2xl bg-white/80 border border-gray-100 text-center shadow-xl shadow-gray-200/50"
          >
            <h3 className="text-2xl font-light text-gray-900 mb-4">
              Ready for Similar Results?
            </h3>
            <p className="text-gray-600 mb-6">
              See how {agentLabel} can transform your operations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/demo"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                style={{ backgroundColor: color, boxShadow: `0 8px 24px ${color}30` }}
              >
                Schedule Demo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href={`/products/${study.agent}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 border border-gray-200 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
              >
                Learn About {agentLabel}
              </Link>
            </div>
          </motion.div>

          {/* Related Case Studies */}
          {relatedStudies.length > 0 && (
            <motion.section
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-16"
            >
              <h3 className="text-xl font-light text-gray-900 mb-6">More {agentLabel} Deployments</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedStudies.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/learn/case-studies/${related.slug}`}
                    className="group p-5 rounded-xl bg-white/80 border border-gray-100 hover:bg-white hover:border-gray-200 hover:shadow-lg transition-all shadow-lg shadow-gray-200/30"
                  >
                    <h4 className="text-lg font-medium text-gray-900 group-hover:text-[#0066cc] transition-colors">
                      {related.company}
                    </h4>
                    <p className="text-sm text-gray-500 mb-3">{related.industry}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold" style={{ color }}>{related.metrics[0].value}</span>
                      <span className="text-xs text-gray-500">{related.metrics[0].label}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}

          {/* Back Link */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-12 text-center"
          >
            <Link
              href="/learn/case-studies"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Case Studies
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
