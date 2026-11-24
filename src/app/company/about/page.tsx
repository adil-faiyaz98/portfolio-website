"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Users, Shield, Building2, Clock, Target, Rocket, Award, Heart } from "lucide-react";
import { FloatingElements, GradientOrb, AnimatedGrid } from "@/components/ui/FloatingElements";

const stats = [
  { label: "AI Agents Ready", value: "7", icon: Sparkles, color: "#0066cc" },
  { label: "Years SAP Experience", value: "30+", icon: Clock, color: "#A855F7" },
  { label: "Industries Served", value: "5", icon: Building2, color: "#10B981" },
  { label: "Faster Than Big4", value: "10x", icon: Zap, color: "#F59E0B" },
];

const timeline = [
  {
    year: "2026",
    title: "Founded",
    description:
      "SDA Intelligence was founded with a vision — build purpose-driven AI agents that solve real enterprise problems, not generic chatbots.",
    color: "#0066cc",
  },
  {
    year: "Q3 2026",
    title: "Initial Agent Suite",
    description:
      "Launched our first six agents: SAP Guardian, NFC Mobile Access, Chantier AI, Contractor Integrator Hub, PolicyBridge Agent, and Blockchain Platform Agent.",
    color: "#A855F7",
  },
  {
    year: "Q4 2026",
    title: "Supplier Risk Agent",
    description:
      "Launching our newest agent for AI-powered supply chain disruption prediction and multi-tier supplier visibility.",
    color: "#F59E0B",
  },
];

const team = [
  {
    name: "Adil Faiyaz",
    role: "CEO & Co-Founder",
    bio: "10+ years in backend development and SAP integration. Former enterprise architect building mission-critical systems. Obsessed with automation that actually works.",
    color: "#0066cc",
  },
  {
    name: "Ayman Kabalan",
    role: "CTO & Co-Founder",
    bio: "20+ years deep in SAP ecosystems — from R/3 to S/4HANA. The kind of SAP expert who's forgotten more about ABAP than most people learn.",
    color: "#A855F7",
  },
  {
    name: "Dattu Pariti",
    role: "COO & Co-Founder",
    bio: "So SAP that even SAP themselves might not know things he knows. Former SAP practice lead who's seen every implementation pattern and failure mode.",
    color: "#10B981",
  },
];

const coreValues = [
  {
    title: "Ship Fast, Ship Right",
    description:
      "Big4 consultancies take 500 meetings and 12 months. We ship in weeks with fixed pricing. Speed without compromise.",
    icon: Rocket,
    color: "#0066cc",
  },
  {
    title: "Human-in-the-Loop",
    description:
      "Not all decisions should be autonomous. Our agents know when to act and when to ask — mixed autonomy by design.",
    icon: Users,
    color: "#A855F7",
  },
  {
    title: "SAP-Native",
    description:
      "Built by SAP veterans who understand the ecosystem. Deep integration, not shallow wrappers.",
    icon: Target,
    color: "#10B981",
  },
  {
    title: "Regulated-Industry Ready",
    description:
      "Security, compliance, and governance at the core. Built for enterprises where getting it wrong isn't an option.",
    icon: Shield,
    color: "#F59E0B",
  },
];

const agentUseCases = [
  {
    agent: "Blockchain Platform Agent",
    industries: ["Financial Services", "Insurance", "Manufacturing"],
    useCases: ["SOX compliance automation", "Tamper-proof audit trails", "Supply chain verification"],
    color: "#8B5CF6",
  },
  {
    agent: "NFC Mobile Access",
    industries: ["Commercial Real Estate", "Enterprise Campuses", "Facilities"],
    useCases: ["Badge replacement", "HR-triggered credentials", "Contractor PO-linked access"],
    color: "#00d4ff",
  },
  {
    agent: "SAP Guardian",
    industries: ["Aerospace & Defense", "Aviation MRO", "Defense Contractors"],
    useCases: ["Counterfeit detection", "8130-3 validation", "Warranty fraud prevention"],
    color: "#DC2626",
  },
  {
    agent: "Contractor Integrator Hub",
    industries: ["Quebec Construction", "General Contractors", "Subcontractors"],
    useCases: ["Procore↔SAP sync", "Invoice acceleration", "CNESST safety integration"],
    color: "#10B981",
  },
  {
    agent: "PolicyBridge Agent",
    industries: ["Finance Transformation", "Internal Audit", "Compliance"],
    useCases: ["Policy digitization", "SAP Finance AI enablement", "Regulatory monitoring"],
    color: "#A855F7",
  },
  {
    agent: "Chantier AI",
    industries: ["Quebec Construction", "General Contractors", "Project Management"],
    useCases: ["Progress billing", "CCQ compliance", "Change order automation"],
    color: "#0EA5E9",
  },
];

export default function AboutPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main id="main-content" className="min-h-screen relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50">
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

      <div className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header & Mission */}
          <motion.section
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-24"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 border border-gray-200 backdrop-blur-sm mb-8 shadow-sm"
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Heart className="w-4 h-4 text-[#0066cc]" />
              <span className="text-sm font-medium text-gray-700">Our Story</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-6 tracking-tight">
              About <span className="text-[#0066cc]">SDA Intelligence</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
              We build enterprise AI agents that integrate with SAP to automate critical operations,
              enforce policies, detect threats, and drive intelligent decisions — with security
              guardrails and human oversight where it matters.
            </p>
            <p className="text-lg text-[#a78bfa] max-w-2xl mx-auto font-medium">
              A boutique firm that delivers 10x faster than Big4 consultancies — at fixed pricing.
            </p>
          </motion.section>

          {/* Stats Section */}
          <motion.section
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-32"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative p-6 rounded-2xl bg-white/80 border border-gray-100 text-center transition-all duration-300 hover:bg-white hover:border-gray-200 hover:-translate-y-1 shadow-lg shadow-gray-200/30 hover:shadow-xl"
                  >
                    <div
                      className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
                      style={{ backgroundColor: `${stat.color}15` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: stat.color }} />
                    </div>
                    <div
                      className="text-4xl md:text-5xl font-light mb-2"
                      style={{ color: stat.color }}
                    >
                      {stat.value}
                    </div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* Agent Use Cases by Industry */}
          <section className="mb-32">
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-gray-200 mb-6 shadow-sm">
                <Sparkles className="w-4 h-4 text-[#0066cc]" />
                <span className="text-sm font-medium text-gray-700">Solutions</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                AI Agents by <span className="text-[#0066cc]">Industry</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Purpose-built agents for regulated industries where getting it wrong isn't an option.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agentUseCases.map((item, index) => (
                <motion.div
                  key={item.agent}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative p-6 rounded-2xl bg-white/80 border border-gray-100 transition-all duration-300 hover:bg-white hover:border-gray-200 hover:-translate-y-1 shadow-lg shadow-gray-200/30 hover:shadow-xl"
                >
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                    style={{ boxShadow: `0 0 60px ${item.color}15` }}
                  />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {item.agent}
                  </h3>
                  <p className="text-xs mb-4 font-medium" style={{ color: item.color }}>
                    {item.industries.join(" • ")}
                  </p>
                  <ul className="space-y-2">
                    {item.useCases.map((useCase) => (
                      <li key={useCase} className="text-sm text-gray-600 flex items-center gap-2">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        {useCase}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>

          {/* History Timeline */}
          <section className="mb-32">
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-gray-200 mb-6 shadow-sm">
                <Clock className="w-4 h-4 text-[#a78bfa]" />
                <span className="text-sm font-medium text-gray-700">Timeline</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900">
                Our <span className="text-[#a78bfa]">Journey</span>
              </h2>
            </motion.div>

            <div className="relative max-w-3xl mx-auto">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gray-200" />

              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={prefersReducedMotion ? {} : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className={`relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Timeline dot */}
                    <div
                      className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-white z-10"
                      style={{ backgroundColor: item.color }}
                    />

                    {/* Content card */}
                    <div
                      className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${
                        index % 2 === 0 ? "md:text-right md:pr-8" : "md:pl-8"
                      }`}
                    >
                      <div className="p-6 rounded-2xl bg-white/80 border border-gray-100 shadow-lg shadow-gray-200/30">
                        <span
                          className="text-sm font-medium"
                          style={{ color: item.color }}
                        >
                          {item.year}
                        </span>
                        <h3 className="text-lg font-medium text-gray-900 mt-1 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Spacer for the other side */}
                    <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Core Values */}
          <section className="mb-32">
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-gray-200 mb-6 shadow-sm">
                <Award className="w-4 h-4 text-[#10B981]" />
                <span className="text-sm font-medium text-gray-700">Values</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900">
                How We <span className="text-[#10B981]">Work</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coreValues.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative p-8 rounded-2xl bg-white/80 border border-gray-100 transition-all duration-300 hover:bg-white hover:border-gray-200 hover:-translate-y-1 shadow-lg shadow-gray-200/30 hover:shadow-xl"
                  >
                    <div
                      className="w-14 h-14 rounded-xl mb-4 flex items-center justify-center"
                      style={{ backgroundColor: `${value.color}15` }}
                    >
                      <Icon className="w-7 h-7" style={{ color: value.color }} />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Team Section */}
          <section className="mb-24">
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-gray-200 mb-6 shadow-sm">
                <Users className="w-4 h-4 text-[#F59E0B]" />
                <span className="text-sm font-medium text-gray-700">Leadership</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                Leadership <span className="text-[#F59E0B]">Team</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                SAP veterans with 30+ years of combined experience building enterprise systems.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative p-6 rounded-2xl bg-white/80 border border-gray-100 text-center transition-all duration-300 hover:bg-white hover:border-gray-200 hover:-translate-y-1 shadow-lg shadow-gray-200/30 hover:shadow-xl"
                >
                  {/* Avatar */}
                  <div
                    className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: `${member.color}15` }}
                  >
                    <span
                      className="text-2xl font-bold"
                      style={{ color: member.color }}
                    >
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p
                    className="text-sm mb-3 font-medium"
                    style={{ color: member.color }}
                  >
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-600">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <motion.section
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative p-12 rounded-3xl bg-white/80 border border-gray-100 backdrop-blur-sm text-center overflow-hidden shadow-xl shadow-gray-200/50">
              {/* Background glow */}
              <div
                className="absolute inset-0 opacity-30"
                style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(0, 102, 204, 0.15) 0%, transparent 70%)" }}
              />

              <div className="relative z-10">
                <h3 className="text-3xl font-light text-gray-900 mb-4">
                  Ready to <span className="text-[#0066cc]">Get Started?</span>
                </h3>
                <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                  Schedule a demo to see how SDA Intelligence AI agents can transform your enterprise operations.
                </p>
                <Link
                  href="/demo"
                  className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#0066cc] text-white font-medium overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#0066cc]/30 hover:-translate-y-0.5"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Schedule a Demo</span>
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
