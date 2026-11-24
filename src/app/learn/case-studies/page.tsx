import type { Metadata } from "next";
import Link from "next/link";
import { GlassCard } from "@/components/ui";
import { caseStudies } from "@/data/case-studies";
import { ArrowRight, TrendingUp, Shield, Zap, Building2, FileText, Brain, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Case Studies | SDA Intelligence",
  description:
    "Real-world AI agent deployments across enterprise SAP environments. See how our agents deliver measurable business outcomes.",
  openGraph: {
    title: "Case Studies | SDA Intelligence",
    description:
      "Real-world AI agent deployments and business outcomes.",
    type: "website",
    siteName: "SDA Intelligence",
  },
};

const agentIcons: Record<string, React.ElementType> = {
  "blockchain-platform-agent": Lock,
  "nfc-mobile-access": Zap,
  "sap-guardian": Shield,
  "contractor-integrator-hub": Building2,
  "policybridge-agent": FileText,
  "chantier-ai": Brain,
};

const agentColors: Record<string, string> = {
  "blockchain-platform-agent": "bg-purple-500/10 text-purple-500",
  "nfc-mobile-access": "bg-cyan-500/10 text-cyan-500",
  "sap-guardian": "bg-red-500/10 text-red-500",
  "contractor-integrator-hub": "bg-emerald-500/10 text-emerald-500",
  "policybridge-agent": "bg-violet-500/10 text-violet-500",
  "chantier-ai": "bg-sky-500/10 text-sky-500",
};

const agentLabels: Record<string, string> = {
  "blockchain-platform-agent": "Blockchain Platform Agent",
  "nfc-mobile-access": "NFC Mobile Access",
  "sap-guardian": "SAP Guardian",
  "contractor-integrator-hub": "Contractor Integrator Hub",
  "policybridge-agent": "PolicyBridge Agent",
  "chantier-ai": "Chantier AI",
};

export default function CaseStudiesPage() {
  const featuredStudies = caseStudies.filter((cs) => cs.featured);
  const otherStudies = caseStudies.filter((cs) => !cs.featured);

  return (
    <main id="main-content" className="min-h-screen bg-background py-20 px-6">
      <div className="max-w-[1280px] mx-auto">
        {/* Page Header */}
        <section className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-primary/10 text-accent-primary text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4" />
            Customer Success
          </div>
          <h1 className="text-h1 text-text-primary mb-6">Case Studies</h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Real-world AI agent deployments delivering measurable business outcomes
            across enterprise SAP environments.
          </p>
        </section>

        {/* Featured Case Studies */}
        {featuredStudies.length > 0 && (
          <section className="mb-16">
            <h2 className="text-h3 text-text-primary mb-8">Featured Deployments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredStudies.map((study) => {
                const Icon = agentIcons[study.agent] || Shield;
                const colorClass = agentColors[study.agent] || "bg-accent-primary/10 text-accent-primary";
                const agentLabel = agentLabels[study.agent] || study.agent;

                return (
                  <GlassCard
                    key={study.slug}
                    interactive={true}
                    className="p-6 group"
                  >
                    {/* Agent Badge */}
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${colorClass} mb-4`}>
                      <Icon className="w-4 h-4" />
                      <span className="text-xs font-medium">{agentLabel}</span>
                    </div>

                    {/* Company & Industry */}
                    <h3 className="text-lg font-semibold text-text-primary mb-1 group-hover:text-accent-primary transition-colors">
                      {study.company}
                    </h3>
                    <p className="text-sm text-text-muted mb-4">{study.industry}</p>

                    {/* Excerpt */}
                    <p className="text-sm text-text-secondary mb-6 line-clamp-3">
                      {study.excerpt}
                    </p>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {study.metrics.map((metric) => (
                        <div key={metric.label} className="text-center p-2 rounded-lg bg-surface-elevated">
                          <div className="text-sm font-bold text-accent-primary">
                            {metric.value}
                          </div>
                          <div className="text-[10px] text-text-muted mt-0.5 line-clamp-1">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-end">
                      <span className="inline-flex items-center gap-1 text-sm text-accent-primary">
                        Read case study
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </section>
        )}

        {/* All Case Studies by Agent */}
        <section>
          <h2 className="text-h3 text-text-primary mb-8">All Case Studies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherStudies.map((study) => {
              const Icon = agentIcons[study.agent] || Shield;
              const colorClass = agentColors[study.agent] || "bg-accent-primary/10 text-accent-primary";
              const agentLabel = agentLabels[study.agent] || study.agent;

              return (
                <GlassCard
                  key={study.slug}
                  interactive={true}
                  className="p-6 group"
                >
                  {/* Agent Badge */}
                  <div className={`inline-flex items-center gap-2 px-2 py-1 rounded-md ${colorClass} mb-3`}>
                    <Icon className="w-3 h-3" />
                    <span className="text-[10px] font-medium">{agentLabel}</span>
                  </div>

                  {/* Company & Industry */}
                  <h3 className="text-base font-semibold text-text-primary mb-1 group-hover:text-accent-primary transition-colors">
                    {study.company}
                  </h3>
                  <p className="text-xs text-text-muted mb-3">{study.industry}</p>

                  {/* Excerpt */}
                  <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                    {study.excerpt}
                  </p>

                  {/* Key Metric */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-accent-primary">
                        {study.metrics[0].value}
                      </span>
                      <span className="text-xs text-text-muted">
                        {study.metrics[0].label}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-accent-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20">
          <GlassCard className="p-8 md:p-12 text-center">
            <h3 className="text-2xl font-semibold text-text-primary mb-4">
              Ready to See Similar Results?
            </h3>
            <p className="text-text-secondary mb-6 max-w-xl mx-auto">
              Our team will help you identify the right AI agents for your enterprise
              and build a deployment roadmap.
            </p>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent-primary text-white font-medium hover:bg-accent-primary-hover transition-colors"
            >
              Schedule Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </GlassCard>
        </section>
      </div>
    </main>
  );
}
