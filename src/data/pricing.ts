/**
 * Pricing data for the Pricing page.
 * Defines pricing tiers for SDA Intelligence AI Agent products.
 */

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  ctaLabel: string;
  ctaHref: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ProductPricing {
  id: string;
  name: string;
  description: string;
  icon: string;
  tiers: PricingTier[];
  faqs: FAQ[];
}

// SAP Guardian - Aerospace & Defense Counterfeit Detection
export const sapGuardianTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    price: "$4,500",
    period: "per month",
    description:
      "For smaller MRO operations with up to 5,000 parts receipts per month.",
    features: [
      "Up to 5,000 parts verifications/month",
      "ERAI database integration",
      "Basic 8130-3 validation",
      "Email alerts on high-risk parts",
      "Standard support",
      "Monthly compliance reports",
    ],
    highlighted: false,
    ctaLabel: "Get Started",
    ctaHref: "/demo",
  },
  {
    id: "professional",
    name: "Professional",
    price: "$12,000",
    period: "per month",
    description:
      "For mid-size A&D suppliers with complex supply chains and warranty operations.",
    features: [
      "Up to 25,000 parts verifications/month",
      "ERAI + GIDEP integration",
      "Advanced 8130-3 AI validation",
      "Warranty fraud detection",
      "Supplier risk scoring",
      "Priority support",
      "Real-time dashboards",
      "SAP S/4HANA integration",
    ],
    highlighted: true,
    ctaLabel: "Book a Demo",
    ctaHref: "/demo",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "per engagement",
    description:
      "For large defense contractors with global supply chains and regulatory requirements.",
    features: [
      "Unlimited parts verifications",
      "Full regulatory database access",
      "Custom AI model training",
      "Dedicated solution architect",
      "24/7 priority support",
      "On-premise deployment option",
      "DFARS compliance package",
      "SLA-backed guarantees",
    ],
    highlighted: false,
    ctaLabel: "Contact Sales",
    ctaHref: "/company/contact",
  },
];

// NFC Mobile Access Platform
export const nfcAccessTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    price: "$2,500",
    period: "per month",
    description:
      "For single-building deployments with up to 500 active credentials.",
    features: [
      "Up to 500 active credentials",
      "NFC + PIN authentication",
      "Basic visitor management",
      "SuccessFactors integration",
      "Email support",
      "Standard reports",
    ],
    highlighted: false,
    ctaLabel: "Get Started",
    ctaHref: "/demo",
  },
  {
    id: "professional",
    name: "Professional",
    price: "$7,500",
    period: "per month",
    description:
      "For multi-building campuses with advanced security requirements.",
    features: [
      "Up to 5,000 active credentials",
      "6-modal authentication",
      "Full visitor + contractor management",
      "SAP RE-FX integration",
      "Apple/Google Wallet support",
      "Priority support",
      "Real-time occupancy tracking",
      "Custom policy engine",
    ],
    highlighted: true,
    ctaLabel: "Book a Demo",
    ctaHref: "/demo",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "per engagement",
    description: "For large real estate portfolios and enterprise campuses.",
    features: [
      "Unlimited credentials",
      "All 7 AI agents included",
      "Multi-site deployment",
      "Dedicated success manager",
      "24/7 priority support",
      "Custom integrations",
      "SLA-backed uptime",
      "ITAR compliance option",
    ],
    highlighted: false,
    ctaLabel: "Contact Sales",
    ctaHref: "/company/contact",
  },
];

// Chantier AI - Quebec Construction Platform
export const chantierAITiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    price: "$1,500",
    period: "per month",
    description: "For small contractors with up to 5 active projects.",
    features: [
      "Up to 5 active projects",
      "Progress billing (AIA G702/G703)",
      "Basic CCQ validation",
      "Bilingual output (FR/EN)",
      "Email support",
      "Standard reports",
    ],
    highlighted: false,
    ctaLabel: "Get Started",
    ctaHref: "/demo",
  },
  {
    id: "professional",
    name: "Professional",
    price: "$4,500",
    period: "per month",
    description:
      "For mid-size general contractors with complex project portfolios.",
    features: [
      "Up to 25 active projects",
      "All billing formats (AIA, CCDC)",
      "Full CCQ compliance automation",
      "Change order management",
      "Subcontractor portal",
      "Priority support",
      "SAP integration",
      "Mobile field app",
    ],
    highlighted: true,
    ctaLabel: "Book a Demo",
    ctaHref: "/demo",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "per engagement",
    description: "For large construction firms and infrastructure developers.",
    features: [
      "Unlimited projects",
      "All 6 specialist agents",
      "CNESST safety integration",
      "Custom workflow automation",
      "Dedicated success manager",
      "24/7 priority support",
      "On-premise option",
      "Multi-company support",
    ],
    highlighted: false,
    ctaLabel: "Contact Sales",
    ctaHref: "/company/contact",
  },
];

// Supplier Risk Agent - Supply Chain Risk Detection
export const supplierRiskTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    price: "$5,000",
    period: "per month",
    description:
      "For companies monitoring up to 100 tier-1 suppliers with basic risk alerts.",
    features: [
      "Up to 100 tier-1 suppliers",
      "Ownership change detection",
      "Basic financial health scoring",
      "Email risk alerts",
      "Monthly exposure reports",
      "Standard support",
    ],
    highlighted: false,
    ctaLabel: "Get Started",
    ctaHref: "/demo",
  },
  {
    id: "professional",
    name: "Professional",
    price: "$15,000",
    period: "per month",
    description:
      "For manufacturing companies with multi-tier supply chains and SAP integration.",
    features: [
      "Up to 500 tier-1/2 suppliers",
      "24-hour ownership change alerts",
      "Financial distress signals",
      "Delivery anomaly detection",
      "Real-time exposure calculator",
      "SAP MM/PP integration",
      "Priority support",
      "Settlement vs fight modeling",
    ],
    highlighted: true,
    ctaLabel: "Book a Demo",
    ctaHref: "/demo",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "per engagement",
    description:
      "For aerospace & defense manufacturers with complex global supply chains.",
    features: [
      "Unlimited suppliers (tier 1-3)",
      "CFIUS/ITAR flag detection",
      "Geopolitical risk scoring",
      "Alternative supplier identification",
      "D&B/Orbis integration",
      "Dedicated risk analyst",
      "24/7 priority support",
      "Custom API access",
    ],
    highlighted: false,
    ctaLabel: "Contact Sales",
    ctaHref: "/company/contact",
  },
];

// Supplier Risk FAQs
export const supplierRiskFAQs: FAQ[] = [
  {
    question: "How quickly does Supplier Risk detect ownership changes?",
    answer:
      "We monitor SEC filings, corporate registries, M&A databases, and news sources continuously. Ownership changes are typically detected within 24 hours of public disclosure, compared to weeks or months with manual monitoring.",
  },
  {
    question: "What financial signals does the agent track?",
    answer:
      "We monitor credit rating changes, payment pattern anomalies, litigation filings, bond yield spreads, layoff announcements, and financial statement red flags. Our AI correlates these signals to predict supplier viability risks before they impact production.",
  },
  {
    question: "How does the settlement vs fight modeling work?",
    answer:
      "When a supplier risk event occurs, the agent calculates your open PO exposure, in-transit inventory value, and production-at-risk. It then models scenarios comparing negotiated exit costs against litigation timelines, alternative sourcing costs, and production delay impacts to support strategic decisions.",
  },
];

export const policyBridgeTiers: PricingTier[] = [
  {
    id: "project",
    name: "Project",
    price: "$15,000",
    period: "one-time",
    description:
      "Single policy extraction project with up to 50 source documents.",
    features: [
      "Up to 50 source documents",
      "EN/FR language support",
      "Rule extraction + validation",
      "Evidence chain documentation",
      "JSON/YAML export",
      "Email support",
      "30-day delivery",
    ],
    highlighted: false,
    ctaLabel: "Get Started",
    ctaHref: "/demo",
  },
  {
    id: "subscription",
    name: "Subscription",
    price: "$5,000",
    period: "per month",
    description:
      "Ongoing policy management with continuous updates and monitoring.",
    features: [
      "Unlimited documents",
      "All language support",
      "Conflict detection",
      "Regulatory change monitoring",
      "A2A policy API",
      "Priority support",
      "SAP integration",
      "Version control",
    ],
    highlighted: true,
    ctaLabel: "Book a Demo",
    ctaHref: "/demo",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "per engagement",
    description: "For large enterprises with complex global policy landscapes.",
    features: [
      "Multi-tenant deployment",
      "Custom AI model training",
      "Global language support",
      "Dedicated policy analyst",
      "24/7 priority support",
      "Custom integrations",
      "Audit defense support",
      "SLA guarantees",
    ],
    highlighted: false,
    ctaLabel: "Contact Sales",
    ctaHref: "/company/contact",
  },
];

// FAQs for each product
export const sapGuardianFAQs: FAQ[] = [
  {
    question: "How does SAP Guardian detect counterfeit parts?",
    answer:
      "SAP Guardian uses a multi-factor risk scoring algorithm that evaluates price anomalies, supplier approval status, documentation completeness, ERAI/GIDEP alerts, and date-code validity. The AI model is trained on verified counterfeit cases and achieves >95% detection accuracy.",
  },
  {
    question: "What databases does SAP Guardian integrate with?",
    answer:
      "We integrate with ERAI (Electronic Resellers Association International), GIDEP (Government-Industry Data Exchange Program), and FAA airworthiness databases. Enterprise customers can also integrate proprietary databases.",
  },
  {
    question: "Is SAP Guardian compliant with FAA and DFARS requirements?",
    answer:
      "Yes. SAP Guardian is designed for FAA AC 21-29D compliance and includes features for DFARS 252.246-7007 and 252.246-7008 counterfeit part detection requirements.",
  },
];

export const nfcAccessFAQs: FAQ[] = [
  {
    question: "How fast is credential provisioning for new hires?",
    answer:
      "When integrated with SAP SuccessFactors, new hire credentials are provisioned within 5 minutes of HR system entry. Day-zero access is available before the employee's first day.",
  },
  {
    question: "What happens if the network goes down?",
    answer:
      "Our edge broker network maintains 24-hour offline capability. Door decisions happen in under 10ms at the edge, with synchronization when connectivity is restored.",
  },
  {
    question: "Which mobile wallets are supported?",
    answer:
      "We support Apple Wallet, Google Wallet, and Samsung Wallet. Credentials can also be used via our native app with NFC, BLE proximity, QR codes, or PIN fallback.",
  },
];

export const chantierAIFAQs: FAQ[] = [
  {
    question: "Does Chantier AI support both SAP ECC and S/4HANA?",
    answer:
      "Yes. Chantier AI is landscape-agnostic and supports SAP ECC 6.0 through S/4HANA Public Cloud. This is critical since 60%+ of Quebec SAP-using contractors still run ECC.",
  },
  {
    question: "How does CCQ compliance automation work?",
    answer:
      "Chantier AI integrates with CCQ web services to validate worker competency cards in real-time. Before any worker is assigned to a task, their certifications, training requirements, and union dues status are verified.",
  },
  {
    question: "Is Chantier AI bilingual?",
    answer:
      "Yes. The orchestrator is French-first with full English support. All generated documents (billing applications, change orders, reports) can be output in either language.",
  },
];

export const policyBridgeFAQs: FAQ[] = [
  {
    question: "What document formats does PolicyBridge support?",
    answer:
      "We process PDF, DOCX, XLSX, PPTX, TXT, MSG/EML, video transcripts, and scanned contracts. Multi-language support includes EN, FR, DE, ES, and AR.",
  },
  {
    question: "How does PolicyBridge ensure extracted rules are accurate?",
    answer:
      "Every extracted rule includes a confidence score and is linked to its source document, page, and exact location. A multi-level approval workflow with named approvers ensures human validation before rules are finalized.",
  },
  {
    question: "Can PolicyBridge integrate with SAP Finance AI agents?",
    answer:
      "Yes. PolicyBridge delivers AI-ready policy packages in JSON/YAML format and exposes an A2A protocol API that SAP Finance AI agents (Intelligent Accruals, Journal Entry, Financial Close) can query at runtime.",
  },
];

// Combined products for dropdown selector
export const productPricing: ProductPricing[] = [
  {
    id: "supplier-risk",
    name: "Supplier Risk Agent",
    description: "Supply Chain Risk Detection • Launching Q4 2026",
    icon: "trending-up",
    tiers: supplierRiskTiers,
    faqs: supplierRiskFAQs,
  },
  {
    id: "sap-guardian",
    name: "SAP Guardian",
    description: "A&D counterfeit detection & parts authentication",
    icon: "shield",
    tiers: sapGuardianTiers,
    faqs: sapGuardianFAQs,
  },
  {
    id: "nfc-access",
    name: "NFC Mobile Access",
    description: "SAP-integrated mobile access control platform",
    icon: "smartphone",
    tiers: nfcAccessTiers,
    faqs: nfcAccessFAQs,
  },
  {
    id: "chantier-ai",
    name: "Chantier AI",
    description: "Quebec construction project delivery platform",
    icon: "building",
    tiers: chantierAITiers,
    faqs: chantierAIFAQs,
  },
  {
    id: "policybridge",
    name: "PolicyBridge Agent",
    description: "Finance policy digitization accelerator",
    icon: "file-text",
    tiers: policyBridgeTiers,
    faqs: policyBridgeFAQs,
  },
];

// Legacy export for backward compatibility
export const pricingTiers = sapGuardianTiers;
export const pricingFAQs = sapGuardianFAQs;
