import type { Metadata } from "next";
import Link from "next/link";
import { DollarSign, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Finance Transformation Solutions | SDA Intelligence",
  description:
    "Policy digitization and AI-readiness for SAP Finance agents. Transform your finance operations with intelligent automation.",
};

export default function FinanceTransformationPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[#030710] py-20 px-6">
      <div className="max-w-[1280px] mx-auto">
        <section className="text-center mb-16 pt-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm text-[#7fc8ff] mb-6">
            <DollarSign size={16} className="text-[#7fc8ff]" />
            Finance Transformation
          </span>
          <h1 className="text-4xl md:text-5xl font-light text-[#cce9ff] mb-6">
            Finance <span className="bg-gradient-to-r from-[#8B5CF6] via-[#00d4ff] to-[#10B981] bg-clip-text text-transparent">AI-Ready</span>
          </h1>
          <p className="text-xl text-[#99d3ff]/80 max-w-3xl mx-auto leading-relaxed">
            Your finance policies are trapped in PDFs and Word documents. PolicyBridge transforms them
            into structured, machine-readable assets that enable true SAP Finance AI automation.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl glass text-center">
            <div className="text-4xl font-light text-[#8B5CF6] mb-2">2,500+</div>
            <p className="text-sm text-[#99d3ff]/70">Policies Digitized</p>
          </div>
          <div className="p-6 rounded-2xl glass text-center">
            <div className="text-4xl font-light text-[#8B5CF6] mb-2">70%</div>
            <p className="text-sm text-[#99d3ff]/70">Faster Processing</p>
          </div>
          <div className="p-6 rounded-2xl glass text-center">
            <div className="text-4xl font-light text-[#8B5CF6] mb-2">100%</div>
            <p className="text-sm text-[#99d3ff]/70">AI Readiness Score</p>
          </div>
        </div>

        <div className="p-8 rounded-2xl glass mb-16">
          <h2 className="text-2xl font-medium text-[#cce9ff] mb-4">PolicyBridge Agent</h2>
          <p className="text-[#99d3ff]/70 mb-6">
            SAP is investing heavily in Finance AI capabilities — but those AI agents can only be as smart
            as the policies they're trained on. PolicyBridge extracts your approval workflows, spending limits,
            compliance rules, and exception handling procedures from legacy documents and transforms them into
            structured data that SAP AI Core can actually use.
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3 text-[#99d3ff]/70">
              <Check size={18} className="text-[#10B981] mt-0.5 flex-shrink-0" />
              <span>Automated extraction of approval workflows and thresholds</span>
            </li>
            <li className="flex items-start gap-3 text-[#99d3ff]/70">
              <Check size={18} className="text-[#10B981] mt-0.5 flex-shrink-0" />
              <span>Policy conflict detection and resolution recommendations</span>
            </li>
            <li className="flex items-start gap-3 text-[#99d3ff]/70">
              <Check size={18} className="text-[#10B981] mt-0.5 flex-shrink-0" />
              <span>Native integration with SAP S/4HANA Finance modules</span>
            </li>
            <li className="flex items-start gap-3 text-[#99d3ff]/70">
              <Check size={18} className="text-[#10B981] mt-0.5 flex-shrink-0" />
              <span>Continuous policy drift monitoring and alerts</span>
            </li>
          </ul>
          <Link
            href="/products/policybridge-agent"
            className="inline-flex items-center gap-2 text-[#7fc8ff] hover:text-[#cce9ff] transition-colors"
          >
            Explore PolicyBridge →
          </Link>
        </div>

        <div className="text-center">
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-medium bg-gradient-to-r from-[#8B5CF6] to-[#00d4ff] text-white hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:scale-105 transition-all duration-300"
          >
            Schedule Finance Transformation Demo
          </Link>
        </div>
      </div>
    </main>
  );
}
