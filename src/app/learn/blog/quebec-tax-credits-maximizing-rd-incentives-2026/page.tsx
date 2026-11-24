"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Icon } from "@/components";
import { COLORS } from "@/lib/constants";

/* ═══════════════════════════════════════════════════════════════════════════
   CHART DATA
   ═══════════════════════════════════════════════════════════════════════════ */

const taxCreditComparison = [
  { program: "CRIC 30% (First $1M)", rate: 30, maxCredit: 300000, color: COLORS.accentPrimary },
  { program: "CRIC 20% (Over $1M)", rate: 20, maxCredit: 500000, color: COLORS.textMuted },
  { program: "SR&ED (Federal)", rate: 35, maxCredit: 1575000, color: COLORS.textSecondary },
  { program: "Combined Max", rate: 50, maxCredit: 2375000, color: COLORS.textPrimary },
];

const timelineData = [
  { phase: "Manual Process", weeks: 14, color: "#b91c1c" },
  { phase: "With CRIC Automation", weeks: 2, color: COLORS.accentPrimary },
];

const roiByCompanySize = [
  { size: "Small (<$500K R&D)", manual: 15000, automated: 85000, savings: 70000 },
  { size: "Medium ($500K-$2M)", manual: 50000, automated: 200000, savings: 150000 },
  { size: "Large ($2M-$5M)", manual: 130000, automated: 450000, savings: 320000 },
  { size: "Enterprise (>$5M)", manual: 280000, automated: 850000, savings: 570000 },
];

const eligibilityBreakdown = [
  { category: "Salaries & Wages", percentage: 55, amount: 550000 },
  { category: "Equipment Costs", percentage: 20, amount: 200000 },
  { category: "Subcontractors (50%)", percentage: 15, amount: 150000 },
  { category: "Pre-commercialization", percentage: 10, amount: 100000 },
];


/* ═══════════════════════════════════════════════════════════════════════════
   REUSABLE CHART COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */

function BarChart({ data, title, subtitle }: { 
  data: { label: string; value: number; maxValue: number; color: string; suffix?: string }[];
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="p-6 rounded-2xl bg-surface border border-border">
      <h4 className="text-lg font-medium text-text-primary mb-2">{title}</h4>
      {subtitle && <p className="text-sm text-text-muted mb-6">{subtitle}</p>}
      <div className="space-y-4">
        {data.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex justify-between text-sm mb-1">
              <span className="text-text-secondary">{item.label}</span>
              <span className="text-text-primary font-medium">
                {item.value.toLocaleString()}{item.suffix || ""}
              </span>
            </div>
            <div className="h-3 bg-surface-elevated rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: item.color }}
                initial={{ width: 0 }}
                whileInView={{ width: `${(item.value / item.maxValue) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.1 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


function DonutChart({ data, title, centerLabel }: {
  data: { label: string; value: number; color: string }[];
  title: string;
  centerLabel?: string;
}) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativePercent = 0;

  return (
    <div className="p-6 rounded-2xl bg-surface border border-border">
      <h4 className="text-lg font-medium text-text-primary mb-6">{title}</h4>
      <div className="flex items-center gap-8">
        <div className="relative w-40 h-40">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            {data.map((item, index) => {
              const percent = (item.value / total) * 100;
              const strokeDasharray = `${percent} ${100 - percent}`;
              const strokeDashoffset = -cumulativePercent;
              cumulativePercent += percent;
              return (
                <motion.circle
                  key={item.label}
                  cx="50" cy="50" r="40"
                  fill="none"
                  stroke={item.color}
                  strokeWidth="12"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  pathLength="100"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 100 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              );
            })}
          </svg>
          {centerLabel && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-light text-text-primary">{centerLabel}</span>
            </div>
          )}
        </div>
        <div className="flex-1 space-y-2">
          {data.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm text-text-secondary">{item.label}</span>
              <span className="text-sm text-text-muted ml-auto">
                {((item.value / total) * 100).toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


function ComparisonTable({ data, title }: {
  data: { label: string; before: number; after: number; savings: number }[];
  title: string;
}) {
  return (
    <div className="p-6 rounded-2xl bg-surface border border-border overflow-x-auto">
      <h4 className="text-lg font-medium text-text-primary mb-6">{title}</h4>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 text-text-muted font-medium">Company Size</th>
            <th className="text-right py-3 text-red-700 font-medium">Manual</th>
            <th className="text-right py-3 text-accent-primary font-medium">Automated</th>
            <th className="text-right py-3 text-accent-primary font-medium">Additional Credits</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <motion.tr
              key={row.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border-b border-border"
            >
              <td className="py-4 text-text-primary">{row.label}</td>
              <td className="py-4 text-right text-red-700">${row.before.toLocaleString()}</td>
              <td className="py-4 text-right text-accent-primary">${row.after.toLocaleString()}</td>
              <td className="py-4 text-right">
                <span className="px-3 py-1 rounded-full bg-accent-primary/10 text-accent-primary font-medium">
                  +${row.savings.toLocaleString()}
                </span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


function StatCard({ value, label, icon, color }: {
  value: string;
  label: string;
  icon: string;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6 rounded-2xl bg-surface border border-border text-center"
    >
      <div 
        className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon name={icon} size={24} style={{ color }} />
      </div>
      <div className="text-3xl font-light mb-1" style={{ color }}>{value}</div>
      <div className="text-sm text-text-muted">{label}</div>
    </motion.div>
  );
}

function TimelineComparison() {
  return (
    <div className="p-6 rounded-2xl bg-surface border border-border">
      <h4 className="text-lg font-medium text-text-primary mb-6">Processing Time Comparison</h4>
      <div className="space-y-6">
        {timelineData.map((item, index) => (
          <motion.div
            key={item.phase}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="flex justify-between mb-2">
              <span className="text-text-secondary">{item.phase}</span>
              <span className="font-medium" style={{ color: item.color }}>{item.weeks} weeks</span>
            </div>
            <div className="h-8 bg-surface-elevated rounded-lg overflow-hidden relative">
              <motion.div
                className="h-full rounded-lg flex items-center justify-end pr-3"
                style={{ backgroundColor: item.color }}
                initial={{ width: 0 }}
                whileInView={{ width: `${(item.weeks / 14) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.2 }}
              >
                <span className="text-white text-xs font-medium">{item.weeks}w</span>
              </motion.div>
            </div>
          </motion.div>
        ))}
        <div className="pt-4 border-t border-border text-center">
          <span className="text-2xl font-light text-accent-primary">85% faster</span>
          <p className="text-sm text-text-muted mt-1">with automated tax calculation</p>
        </div>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════════════════
   MAIN BLOG POST COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

export default function QuebecTaxCreditsBlogPost() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-surface-elevated/40" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-text-muted mb-8">
            <Link href="/" className="hover:text-accent-primary transition-colors">Home</Link>
            <Icon name="navigation-right-arrow" size={12} />
            <Link href="/learn/blog" className="hover:text-accent-primary transition-colors">Blog</Link>
            <Icon name="navigation-right-arrow" size={12} />
            <span className="text-text-primary">Quebec CRIC Tax Credits 2026</span>
          </nav>

          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border mb-6"
          >
            <Icon name="money-bills" size={16} className="text-accent-primary" />
            <span className="text-sm font-medium text-accent-primary">Tax Strategy</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-light text-text-primary mb-6 leading-tight"
          >
            Quebec Tax Credits: Maximizing R&D Incentives with the New CRIC in 2026
          </motion.h1>

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-6 text-sm text-text-muted"
          >
            <span className="flex items-center gap-2">
              <Icon name="calendar" size={16} />
              August 15, 2026
            </span>
            <span className="flex items-center gap-2">
              <Icon name="history" size={16} />
              15 min read
            </span>
            <span className="flex items-center gap-2">
              <Icon name="employee" size={16} />
              Adil Faiyaz
            </span>
          </motion.div>
        </div>
      </section>


      {/* Key Stats */}
      <section className="py-12 border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard value="$2.4M" label="Max Combined Credits" icon="money-bills" color={COLORS.accentPrimary} />
            <StatCard value="30%" label="CRIC Rate (First $1M)" icon="trend-up" color={COLORS.accentPrimary} />
            <StatCard value="85%" label="Time Savings" icon="history" color={COLORS.accentPrimary} />
            <StatCard value="New" label="Pre-commercialization" icon="lightbulb" color={COLORS.accentPrimary} />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose max-w-none mb-12"
          >
            <p className="text-xl text-text-secondary leading-relaxed mb-6">
              Quebec&apos;s tax landscape for R&D underwent a major transformation in March 2025 with the introduction 
              of the <strong className="text-accent-primary">CRIC (Tax Credit for Research, Innovation and Commercialization)</strong>. 
              This new unified credit replaces four previous tax credits and introduces exciting new eligibility 
              for pre-commercialization activities and equipment costs. Here&apos;s everything you need to know 
              to maximize your benefits in 2026.
            </p>
            
            <div className="p-6 rounded-2xl bg-surface border border-accent-primary/20 mb-8">
              <h3 className="text-lg font-medium text-accent-primary mb-3 flex items-center gap-2">
                <Icon name="accept" size={20} />
                What Changed in 2025
              </h3>
              <ul className="text-text-secondary space-y-2 m-0 list-none p-0">
                <li className="flex items-start gap-2">
                  <Icon name="navigation-right-arrow" size={14} className="mt-1.5 text-accent-primary" />
                  <span>New CRIC replaces 4 previous R&D tax credits (effective March 26, 2025)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="navigation-right-arrow" size={14} className="mt-1.5 text-accent-primary" />
                  <span>Pre-commercialization activities now eligible (tests, certifications, product design)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="navigation-right-arrow" size={14} className="mt-1.5 text-accent-primary" />
                  <span>Equipment acquisition costs now included as eligible expenditures</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="navigation-right-arrow" size={14} className="mt-1.5 text-accent-primary" />
                  <span>Simplified rate structure: 30% on first $1M, 20% above (regardless of company size)</span>
                </li>
              </ul>
            </div>
          </motion.div>


          {/* Section 1: Understanding Quebec Tax Credits */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-2xl font-light text-text-primary mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center text-sm text-accent-primary">1</span>
              Understanding the New CRIC (2025 Reform)
            </h2>
            
            <p className="text-text-secondary mb-8 leading-relaxed">
              The CRIC (Crédit d&apos;impôt pour la recherche, l&apos;innovation et la commercialisation) is Quebec&apos;s 
              modernized R&D tax credit system that took effect for taxation years beginning after March 25, 2025. 
              Combined with federal SR&ED credits, businesses can achieve effective benefit rates of 40-50% 
              on qualifying expenditures.
            </p>

            {/* Tax Credit Comparison Chart */}
            <div className="mb-8">
              <BarChart
                title="2026 Tax Credit Programs Comparison"
                subtitle="CRIC rates apply regardless of company size (major improvement from previous system)"
                data={taxCreditComparison.map(item => ({
                  label: item.program,
                  value: item.rate,
                  maxValue: 55,
                  color: item.color,
                  suffix: "%"
                }))}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="p-5 rounded-xl bg-surface border border-border">
                <h4 className="text-accent-primary font-medium mb-2">CRIC (Quebec)</h4>
                <p className="text-sm text-text-secondary">30% on first $1M, 20% above (refundable)</p>
                <p className="text-lg text-text-primary mt-2">Up to $300K+ annually</p>
              </div>
              <div className="p-5 rounded-xl bg-surface border border-border">
                <h4 className="text-accent-primary font-medium mb-2">SR&ED (Federal)</h4>
                <p className="text-sm text-text-secondary">35% for CCPCs on first $4.5M (2024 enhancement)</p>
                <p className="text-lg text-text-primary mt-2">Up to $1.575M</p>
              </div>
              <div className="p-5 rounded-xl bg-surface border border-border">
                <h4 className="text-accent-primary font-medium mb-2">IDCI (Quebec)</h4>
                <p className="text-sm text-text-secondary">Reduces tax on IP income from 11.5% to 2%</p>
                <p className="text-lg text-text-primary mt-2">Variable benefit</p>
              </div>
            </div>
          </motion.section>


          {/* Section 2: Eligible Expenditures */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-2xl font-light text-text-primary mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center text-sm text-accent-primary">2</span>
              What&apos;s NEW: Eligible Expenditures Under CRIC
            </h2>

            <p className="text-text-secondary mb-8 leading-relaxed">
              The CRIC significantly expands what qualifies as eligible expenditure compared to the old system. 
              The breakdown below shows typical expenditure categories for a company with $1M in qualifying spend, 
              now including <strong className="text-accent-primary">equipment costs</strong> and <strong className="text-accent-primary">pre-commercialization activities</strong>.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <DonutChart
                title="CRIC Eligible Expenditure Breakdown (2026)"
                centerLabel="$1M"
                data={eligibilityBreakdown.map(item => ({
                  label: item.category,
                  value: item.percentage,
                  color: item.category === "Salaries & Wages" ? COLORS.accentPrimary :
                         item.category === "Equipment Costs" ? COLORS.textMuted :
                         item.category === "Subcontractors (50%)" ? COLORS.border : COLORS.textPrimary
                }))}
              />
              
              <div className="p-6 rounded-2xl bg-surface border border-border">
                <h4 className="text-lg font-medium text-text-primary mb-4">New Pre-commercialization Activities</h4>
                <ul className="space-y-3">
                  {[
                    "Tests & technological validations for certifications",
                    "Studies for regulatory approval",
                    "Product design (form, aesthetics, functionality)",
                    "Quality control systems for initial certification",
                    "Must be continuation of Quebec R&D activities"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-text-secondary">
                      <Icon name="accept" size={16} className="text-accent-primary mt-1 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>


          {/* Section 3: The Problem with Manual Processing */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-2xl font-light text-text-primary mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center text-sm text-accent-primary">3</span>
              The Hidden Cost of Manual CRIC Processing
            </h2>

            <p className="text-text-secondary mb-8 leading-relaxed">
              With the expanded eligibility under CRIC (now including pre-commercialization and equipment costs), 
              manual tracking has become even more complex. Traditional approaches are time-consuming, error-prone, 
              and often miss the new categories of eligible expenditures. The comparison below illustrates the 
              dramatic difference in processing time.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <TimelineComparison />
              
              <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
                <h4 className="text-lg font-medium text-red-700 mb-4 flex items-center gap-2">
                  <Icon name="warning" size={20} />
                  Common CRIC Processing Pitfalls
                </h4>
                <ul className="space-y-3">
                  {[
                    "Inconsistent project documentation",
                    "Missed pre-commercialization expenses (new in CRIC)",
                    "Equipment costs not properly categorized",
                    "Incomplete audit trails for new eligibility criteria",
                    "Late submissions and penalties",
                    "Siloed departmental data across R&D phases"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-text-secondary">
                      <Icon name="decline" size={16} className="text-red-700 mt-1 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>


          {/* Section 4: ROI Analysis */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-2xl font-light text-text-primary mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center text-sm text-accent-primary">4</span>
              ROI Analysis: Manual vs. Automated Tax Credit Processing
            </h2>

            <p className="text-text-secondary mb-8 leading-relaxed">
              The table below shows the real-world impact of automated tax credit processing across 
              different company sizes. Automated systems consistently identify 3-4x more eligible 
              credits compared to manual methods.
            </p>

            <ComparisonTable
              title="Annual Tax Credits Claimed: Manual vs. Automated"
              data={roiByCompanySize.map(item => ({
                label: item.size,
                before: item.manual,
                after: item.automated,
                savings: item.savings
              }))}
            />

            <div className="mt-8 p-6 rounded-2xl bg-surface border border-accent-primary/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="trend-up" size={24} className="text-accent-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-accent-primary mb-2">Bottom Line Impact</h4>
                  <p className="text-text-secondary">
                    For an enterprise with $5M+ in R&D spend, automated tax credit processing can unlock 
                    an additional <span className="text-accent-primary font-medium">$500,000+</span> in annual 
                    tax credits while reducing administrative overhead by 80%.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>


          {/* Section 5: Best Practices */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-2xl font-light text-text-primary mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center text-sm text-accent-primary">5</span>
              Best Practices for Maximizing Your CRIC Credits (2026)
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: "document",
                  title: "Document Everything (Including Pre-commercialization)",
                  description: "Track all phases from R&D through pre-commercialization including tests, certifications, and product design activities now eligible under CRIC."
                },
                {
                  icon: "calendar",
                  title: "Track Equipment Costs Separately",
                  description: "CRIC now allows equipment acquisition costs. Maintain clear records of R&D-related equipment purchases with supporting documentation."
                },
                {
                  icon: "workflow-tasks",
                  title: "Map the R&D-to-Commercialization Pipeline",
                  description: "Create clear workflows that connect R&D activities to pre-commercialization phases to maximize the expanded CRIC eligibility."
                },
                {
                  icon: "group",
                  title: "Cross-Department Collaboration",
                  description: "Involve finance, engineering, QA, and regulatory teams to capture all qualifying activities across the expanded scope."
                },
                {
                  icon: "shield",
                  title: "Prepare for CRIC-Specific Audits",
                  description: "The new credit structure will face scrutiny. Maintain complete audit trails especially for new eligibility categories."
                },
                {
                  icon: "accelerated",
                  title: "Automate for the New Rate Structure",
                  description: "Use software that understands the 30%/20% tiered rates and can optimize claims across the $1M threshold automatically."
                }
              ].map((practice, index) => (
                <motion.div
                  key={practice.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-5 rounded-xl bg-surface border border-border hover:border-accent-primary/30 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name={practice.icon} size={20} className="text-accent-primary" />
                    </div>
                    <div>
                      <h4 className="text-text-primary font-medium mb-1">{practice.title}</h4>
                      <p className="text-sm text-text-secondary">{practice.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>


          {/* Conclusion */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-2xl font-light text-text-primary mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center">
                <Icon name="accept" size={16} className="text-accent-primary" />
              </span>
              Conclusion
            </h2>

            <div className="prose max-w-none">
              <p className="text-text-secondary leading-relaxed mb-6">
                The introduction of CRIC in March 2025 represents a major opportunity for businesses 
                in Quebec. The simplified rate structure (30% on first $1M, 20% above) combined with 
                expanded eligibility for pre-commercialization activities and equipment costs means 
                more businesses can now access significant R&D tax benefits.
              </p>
              
              <p className="text-text-secondary leading-relaxed mb-6">
                Combined with federal SR&ED credits, Quebec businesses can achieve effective benefit 
                rates of 40-50% on qualifying expenditures in 2026. However, realizing these benefits 
                requires understanding the new CRIC rules, proper documentation across all eligible 
                categories, and ideally, automated systems to ensure accuracy.
              </p>

              <p className="text-text-secondary leading-relaxed">
                For companies seeking to optimize their CRIC strategy, the Quebec Tax Calculator 
                provides an enterprise-grade solution, offering automated
                eligibility assessment for both traditional R&D and new pre-commercialization activities, 
                real-time calculations across the tiered rate structure, and comprehensive compliance documentation.
              </p>
            </div>
          </motion.section>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-surface-elevated border border-border text-center"
          >
            <h3 className="text-2xl font-light text-text-primary mb-4">
              Ready to Maximize Your CRIC Tax Credits in 2026?
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Discover how Quebec Tax Calculator can help your business navigate the new CRIC rules 
              and claim every credit you&apos;re entitled to—including pre-commercialization and equipment costs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/products/quebec-tax-calculator"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-primary hover:bg-accent-primary-hover text-white font-medium shadow-sm transition-all"
              >
                <Icon name="calculator" size={20} />
                Explore Quebec Tax Calculator
              </Link>
              <Link
                href="/products/quebec-tax-calculator#contact-adil"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-surface text-accent-primary hover:bg-background transition-all"
              >
                <Icon name="employee" size={20} />
                Contact Adil Faiyaz
              </Link>
            </div>
          </motion.div>
        </div>
      </article>

      {/* Author Section */}
      <section className="py-16 border-t border-border">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-start gap-6 p-6 rounded-2xl bg-surface border border-border">
            <div className="w-16 h-16 rounded-xl bg-accent-primary flex items-center justify-center text-white text-xl font-light flex-shrink-0">
              AF
            </div>
            <div>
              <h4 className="text-lg font-medium text-text-primary mb-1">Adil Faiyaz</h4>
              <p className="text-sm text-accent-primary mb-3">Solutions Architect at SDA</p>
              <p className="text-text-secondary text-sm">
                Adil specializes in enterprise tax solutions and software development. With extensive
                experience in Quebec tax regulations, he helps businesses optimize their R&D tax credit 
                strategies through automation.
              </p>
              <a 
                href="mailto:adil.faiyaz@consultsda.com" 
                className="inline-flex items-center gap-2 text-sm text-accent-primary hover:underline mt-3 transition-colors"
              >
                <Icon name="email" size={16} />
                adil.faiyaz@consultsda.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
