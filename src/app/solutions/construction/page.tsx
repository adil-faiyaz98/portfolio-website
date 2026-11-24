import type { Metadata } from "next";
import Link from "next/link";
import { Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Construction Solutions | SDA Intelligence",
  description:
    "Quebec-focused construction project delivery and subcontractor integration with CCQ compliance automation.",
};

export default function ConstructionPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[#030710] py-20 px-6">
      <div className="max-w-[1280px] mx-auto">
        <section className="text-center mb-16 pt-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm text-[#7fc8ff] mb-6">
            <Building2 size={16} className="text-[#7fc8ff]" />
            Construction
          </span>
          <h1 className="text-4xl md:text-5xl font-light text-[#cce9ff] mb-6">
            Build <span className="bg-gradient-to-r from-[#8B5CF6] via-[#00d4ff] to-[#10B981] bg-clip-text text-transparent">Smarter</span>
          </h1>
          <p className="text-xl text-[#99d3ff]/80 max-w-3xl mx-auto leading-relaxed">
            Quebec construction solutions with native CCQ compliance. From subcontractor integration
            to project delivery AI, we automate the complexity so you can focus on building.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-2xl glass">
            <h2 className="text-2xl font-medium text-[#cce9ff] mb-4">Contractor Integrator Hub</h2>
            <p className="text-[#99d3ff]/70 mb-6">
              Bridge the gap between SAP and non-SAP subcontractors. Automatic data transformation,
              invoice reconciliation, and CCQ labor compliance — without forcing your subs onto a new platform.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-white/5 text-center">
                <div className="text-2xl font-light text-[#8B5CF6]">120+</div>
                <p className="text-xs text-[#99d3ff]/50">Subcontractors Connected</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 text-center">
                <div className="text-2xl font-light text-[#8B5CF6]">5x</div>
                <p className="text-xs text-[#99d3ff]/50">Faster Invoice Processing</p>
              </div>
            </div>
            <Link
              href="/products/contractor-integrator-hub"
              className="inline-flex items-center gap-2 text-[#7fc8ff] hover:text-[#cce9ff] transition-colors"
            >
              Learn more →
            </Link>
          </div>
          <div className="p-8 rounded-2xl glass">
            <h2 className="text-2xl font-medium text-[#cce9ff] mb-4">Chantier AI</h2>
            <p className="text-[#99d3ff]/70 mb-6">
              AI-powered project delivery platform built for Quebec construction. Resource optimization,
              schedule management, and CCQ compliance automation in one intelligent system.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-white/5 text-center">
                <div className="text-2xl font-light text-[#10B981]">94%</div>
                <p className="text-xs text-[#99d3ff]/50">Schedule Adherence</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 text-center">
                <div className="text-2xl font-light text-[#10B981]">-62%</div>
                <p className="text-xs text-[#99d3ff]/50">Cost Overruns</p>
              </div>
            </div>
            <Link
              href="/products/chantier-ai"
              className="inline-flex items-center gap-2 text-[#7fc8ff] hover:text-[#cce9ff] transition-colors"
            >
              Learn more →
            </Link>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-medium bg-gradient-to-r from-[#8B5CF6] to-[#00d4ff] text-white hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:scale-105 transition-all duration-300"
          >
            Book a Construction Demo
          </Link>
        </div>
      </div>
    </main>
  );
}
