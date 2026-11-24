/**
 * AI Solutions data for the Solutions Section.
 * Defines the seven AI agent products offered by SDA Intelligence.
 */

export interface Solution {
  id: string;
  name: string;
  tagline: string;
  description: string;
  href: string;
  icon: string;
  industry: string;
}

export const solutions: Solution[] = [
  {
    id: "supplier-risk",
    name: "Supplier Risk Agent",
    tagline: "Supply Chain Risk Intelligence • Launching Q4 2026",
    description:
      "Detect supplier risks before they become production disruptions. Monitors ownership changes, financial distress, and delivery anomalies with real-time exposure calculations.",
    href: "/products/supplier-risk",
    icon: "TrendingUp",
    industry: "Manufacturing & Aerospace",
  },
  {
    id: "sap-guardian",
    name: "SAP Guardian",
    tagline: "Counterfeit Parts Detection",
    description:
      "AI-powered counterfeit detection for aerospace & defense supply chains. Real-time verification against SAP data to protect mission-critical operations.",
    href: "/products/sap-guardian",
    icon: "Shield",
    industry: "Aerospace & Defense",
  },
  {
    id: "nfc-mobile-access",
    name: "NFC Mobile Access",
    tagline: "Secure Facility Access",
    description:
      "Transform smartphones into secure SAP-integrated access credentials. NFC-based authentication with real-time authorization and complete audit trails.",
    href: "/products/nfc-mobile-access",
    icon: "Smartphone",
    industry: "Enterprise Security",
  },
  {
    id: "contractor-hub",
    name: "Contractor Integration Hub",
    tagline: "Workforce Automation",
    description:
      "Autonomous agent for contractor lifecycle management. Automates onboarding, compliance, and timesheet processing with SAP S/4HANA integration.",
    href: "/products/contractor-hub",
    icon: "Users",
    industry: "Professional Services",
  },
  {
    id: "policybridge",
    name: "PolicyBridge Agent",
    tagline: "Finance Policy Digitization",
    description:
      "AI-powered extraction and structuring of finance policies from unstructured documents. Delivers AI-ready policy packages for SAP Finance agents.",
    href: "/products/policybridge",
    icon: "FileText",
    industry: "Finance Transformation",
  },
  {
    id: "chantier-ai",
    name: "Chantier AI",
    tagline: "Construction Intelligence",
    description:
      "AI-powered construction site management for Quebec contractors. Automates compliance, progress tracking, and CCQ reporting requirements.",
    href: "/products/chantier-ai",
    icon: "HardHat",
    industry: "Construction",
  },
  {
    id: "immutability-layer",
    name: "SAP Immutability Layer",
    tagline: "Blockchain Verification",
    description:
      "Blockchain-based audit trail for SAP transactions. Provides cryptographic proof of data integrity for regulatory compliance.",
    href: "/products/immutability-layer",
    icon: "Link",
    industry: "Enterprise Compliance",
  },
];

// Legacy export for backwards compatibility
export interface Platform {
  id: string;
  name: string;
  logo: string;
  description: string;
  href: string;
}

export const platforms: Platform[] = solutions.map((s) => ({
  id: s.id,
  name: s.name,
  logo: "/logos/generic.svg",
  description: s.description,
  href: s.href,
}));
