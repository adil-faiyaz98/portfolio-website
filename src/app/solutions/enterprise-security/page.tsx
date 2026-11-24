import type { Metadata } from "next";
import Link from "next/link";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Enterprise Security Solutions | SDA Intelligence",
  description:
    "Blockchain immutability and physical access control for regulated industries. Protect your enterprise with AI-powered security agents.",
};

export default function EnterpriseSecurityPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[#030710] py-20 px-6">
      <div className="max-w-[1280px] mx-auto">
        <section className="text-center mb-16 pt-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm text-[#7fc8ff] mb-6">
            <Shield size={16} className="text-[#7fc8ff]" />
            Enterprise Security
          </span>
          <h1 className="text-4xl md:text-5xl font-light text-[#cce9ff] mb-6">
            Security That <span className="bg-gradient-to-r from-[#8B5CF6] via-[#00d4ff] to-[#10B981] bg-clip-text text-transparent">Acts</span>
          </h1>
          <p className="text-xl text-[#99d3ff]/80 max-w-3xl mx-auto leading-relaxed">
            Blockchain-backed audit trails, tamper-proof financial records, and intelligent physical access control.
            Our AI agents don't just monitor — they protect.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-2xl glass">
            <h2 className="text-2xl font-medium text-[#cce9ff] mb-4">Blockchain Platform Agent</h2>
            <p className="text-[#99d3ff]/70 mb-6">
              Cryptographic anchoring of SAP financial records with tamper-proof blockchain verification.
              Every transaction is immutably recorded, providing irrefutable audit evidence.
            </p>
            <Link
              href="/products/blockchain-platform-agent"
              className="inline-flex items-center gap-2 text-[#7fc8ff] hover:text-[#cce9ff] transition-colors"
            >
              Learn more →
            </Link>
          </div>
          <div className="p-8 rounded-2xl glass">
            <h2 className="text-2xl font-medium text-[#cce9ff] mb-4">NFC Mobile Access Agent</h2>
            <p className="text-[#99d3ff]/70 mb-6">
              Replace physical access cards with secure mobile credentials. Integrated with SAP SuccessFactors
              for automatic provisioning and revocation based on employment status.
            </p>
            <Link
              href="/products/nfc-mobile-access"
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
            Book a Security Assessment
          </Link>
        </div>
      </div>
    </main>
  );
}
