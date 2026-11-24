import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Aerospace & Defense Solutions | SDA Intelligence",
  description:
    "Counterfeit detection, parts authentication, and compliance automation for A&D aftermarket operations.",
};

export default function AerospaceDefensePage() {
  return (
    <main id="main-content" className="min-h-screen bg-[#030710] py-20 px-6">
      <div className="max-w-[1280px] mx-auto">
        <section className="text-center mb-16 pt-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm text-[#7fc8ff] mb-6">
            <Shield size={16} className="text-[#7fc8ff]" />
            Aerospace & Defense
          </span>
          <h1 className="text-4xl md:text-5xl font-light text-[#cce9ff] mb-6">
            Aftermarket <span className="bg-gradient-to-r from-[#8B5CF6] via-[#00d4ff] to-[#10B981] bg-clip-text text-transparent">Intelligence</span>
          </h1>
          <p className="text-xl text-[#99d3ff]/80 max-w-3xl mx-auto leading-relaxed">
            Protect your supply chain with AI-powered counterfeit detection. SAP Guardian verifies part
            authenticity, tracks provenance, and ensures compliance with aerospace regulations.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl glass text-center">
            <div className="text-4xl font-light text-[#8B5CF6] mb-2">97%</div>
            <p className="text-sm text-[#99d3ff]/70">Counterfeit Detection Rate</p>
          </div>
          <div className="p-6 rounded-2xl glass text-center">
            <div className="text-4xl font-light text-[#8B5CF6] mb-2">$2.4M</div>
            <p className="text-sm text-[#99d3ff]/70">Average Annual Savings</p>
          </div>
          <div className="p-6 rounded-2xl glass text-center">
            <div className="text-4xl font-light text-[#8B5CF6] mb-2">100%</div>
            <p className="text-sm text-[#99d3ff]/70">Regulatory Compliance</p>
          </div>
        </div>

        <div className="p-8 rounded-2xl glass mb-16">
          <h2 className="text-2xl font-medium text-[#cce9ff] mb-4">SAP Guardian for A&D</h2>
          <p className="text-[#99d3ff]/70 mb-6">
            Purpose-built for aerospace and defense aftermarket operations. SAP Guardian integrates with
            your SAP MM and PM modules to verify every part that enters your supply chain. Machine learning
            models trained on known counterfeit patterns flag suspicious parts before they reach production.
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3 text-[#99d3ff]/70">
              <Check size={18} className="text-[#10B981] mt-0.5 flex-shrink-0" />
              <span>Real-time part authentication against OEM databases</span>
            </li>
            <li className="flex items-start gap-3 text-[#99d3ff]/70">
              <Check size={18} className="text-[#10B981] mt-0.5 flex-shrink-0" />
              <span>Automated DFARS, ITAR, and EAR compliance verification</span>
            </li>
            <li className="flex items-start gap-3 text-[#99d3ff]/70">
              <Check size={18} className="text-[#10B981] mt-0.5 flex-shrink-0" />
              <span>Full provenance tracking from manufacturer to installation</span>
            </li>
          </ul>
          <Link
            href="/products/sap-guardian"
            className="inline-flex items-center gap-2 text-[#7fc8ff] hover:text-[#cce9ff] transition-colors"
          >
            Explore SAP Guardian →
          </Link>
        </div>

        <div className="text-center">
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-medium bg-gradient-to-r from-[#8B5CF6] to-[#00d4ff] text-white hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:scale-105 transition-all duration-300"
          >
            Schedule A&D Demo
          </Link>
        </div>
      </div>
    </main>
  );
}
