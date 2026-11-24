/**
 * Case studies data for the Learn / Case Studies page.
 * Each entry represents an AI agent deployment success story.
 */

export interface CaseStudy {
  slug: string;
  company: string;
  industry: string;
  agent:
    | "blockchain-platform-agent"
    | "nfc-mobile-access"
    | "sap-guardian"
    | "contractor-integrator-hub"
    | "policybridge-agent"
    | "chantier-ai";
  metrics: { label: string; value: string }[];
  excerpt: string;
  logoSrc?: string;
  featured?: boolean;
}

export const caseStudies: CaseStudy[] = [
  // Blockchain Platform Agent
  {
    slug: "finserv-blockchain-audit",
    company: "Atlantic Capital Partners",
    industry: "Financial Services",
    agent: "blockchain-platform-agent",
    metrics: [
      { label: "Audit Cost Reduction", value: "70%" },
      { label: "Proof Generation", value: "<3s" },
      { label: "Compliance Coverage", value: "100%" },
    ],
    excerpt:
      "Atlantic Capital Partners deployed Blockchain Platform Agent to anchor all SAP financial records to Hyperledger Fabric, reducing external audit costs by 70% and achieving instant proof generation for regulatory examinations.",
    logoSrc: "/logos/generic.svg",
    featured: true,
  },
  {
    slug: "insurance-blockchain-compliance",
    company: "Northern Shield Insurance",
    industry: "Insurance",
    agent: "blockchain-platform-agent",
    metrics: [
      { label: "SOX Compliance", value: "100%" },
      { label: "Record Immutability", value: "100%" },
      { label: "Query Response", value: "<2s" },
    ],
    excerpt:
      "Northern Shield Insurance achieved full SOX 404 compliance with cryptographic proof of financial record integrity, enabling natural language compliance queries that reduced audit preparation time by 85%.",
    logoSrc: "/logos/generic.svg",
  },
  {
    slug: "manufacturing-blockchain-supply",
    company: "Precision Manufacturing Co",
    industry: "Manufacturing",
    agent: "blockchain-platform-agent",
    metrics: [
      { label: "Supply Chain Visibility", value: "100%" },
      { label: "Dispute Resolution", value: "90%↓" },
      { label: "Verification Time", value: "<5s" },
    ],
    excerpt:
      "Precision Manufacturing anchored purchase orders, goods receipts, and invoices to blockchain, eliminating supply chain disputes and providing instant verification for supplier audits.",
    logoSrc: "/logos/generic.svg",
  },

  // NFC Mobile Access
  {
    slug: "corporate-campus-mobile-access",
    company: "Québec Tech Campus",
    industry: "Commercial Real Estate",
    agent: "nfc-mobile-access",
    metrics: [
      { label: "Badge Replacement", value: "100%" },
      { label: "Revocation Time", value: "<60s" },
      { label: "HR Sync", value: "Real-time" },
    ],
    excerpt:
      "Québec Tech Campus replaced 5,000+ plastic badges with NFC mobile credentials, achieving instant credential revocation on employee termination through real-time SAP SuccessFactors integration.",
    logoSrc: "/logos/generic.svg",
    featured: true,
  },
  {
    slug: "refx-tenant-access",
    company: "Montréal Commercial Properties",
    industry: "Real Estate",
    agent: "nfc-mobile-access",
    metrics: [
      { label: "Tenant Onboarding", value: "<5min" },
      { label: "Lease-Linked Access", value: "100%" },
      { label: "Zone Control", value: "Automated" },
    ],
    excerpt:
      "Montréal Commercial Properties automated tenant access management through SAP RE-FX lease integration, granting zone-specific mobile credentials automatically upon lease signing.",
    logoSrc: "/logos/generic.svg",
  },
  {
    slug: "contractor-po-access",
    company: "Industrial Services Group",
    industry: "Facilities Management",
    agent: "nfc-mobile-access",
    metrics: [
      { label: "PO-Linked Access", value: "100%" },
      { label: "Auto-Expiration", value: "Real-time" },
      { label: "Security Incidents", value: "85%↓" },
    ],
    excerpt:
      "Industrial Services Group tied contractor access to SAP MM purchase orders, automatically expiring credentials when POs close and reducing unauthorized access incidents by 85%.",
    logoSrc: "/logos/generic.svg",
  },

  // SAP Guardian
  {
    slug: "aerospace-counterfeit-detection",
    company: "Precision Aero Components",
    industry: "Aerospace & Defense",
    agent: "sap-guardian",
    metrics: [
      { label: "Detection Rate", value: ">95%" },
      { label: "False Positive", value: "<5%" },
      { label: "Annual Savings", value: "$2.1M" },
    ],
    excerpt:
      "Precision Aero Components deployed SAP Guardian to authenticate parts at goods receipt, detecting 47 counterfeit components in the first quarter and preventing $2.1M in potential safety and warranty costs.",
    logoSrc: "/logos/generic.svg",
    featured: true,
  },
  {
    slug: "mro-warranty-fraud",
    company: "Atlantic Aviation MRO",
    industry: "Aviation MRO",
    agent: "sap-guardian",
    metrics: [
      { label: "Fraud Prevention", value: "$1.8M" },
      { label: "Claim Analysis", value: "<3s" },
      { label: "False Claims", value: "12 detected" },
    ],
    excerpt:
      "Atlantic Aviation MRO identified 12 fraudulent warranty claims totaling $1.8M using SAP Guardian's pattern analysis against SAP SD sales history and maintenance records.",
    logoSrc: "/logos/generic.svg",
  },
  {
    slug: "defense-supplier-qualification",
    company: "Northern Defense Systems",
    industry: "Defense Contractors",
    agent: "sap-guardian",
    metrics: [
      { label: "DFARS Compliance", value: "100%" },
      { label: "Supplier Risk Score", value: "Real-time" },
      { label: "ERAI Alerts", value: "Instant" },
    ],
    excerpt:
      "Northern Defense Systems uses SAP Guardian to risk-score suppliers against GIDEP and ERAI databases before PO release, achieving full DFARS 252.246-7007 compliance.",
    logoSrc: "/logos/generic.svg",
  },

  // Contractor Integrator Hub
  {
    slug: "quebec-subcontractor-integration",
    company: "Bâtiment Québec Inc",
    industry: "Quebec Construction",
    agent: "contractor-integrator-hub",
    metrics: [
      { label: "Reporting Time", value: "80%↓" },
      { label: "Invoice Approval", value: "95%" },
      { label: "Payment Cycle", value: "25 days" },
    ],
    excerpt:
      "Bâtiment Québec reduced weekly reporting from 10 hours to 2 hours by syncing Procore daily logs directly to enterprise client SAP systems, achieving 95% first-pass invoice approval.",
    logoSrc: "/logos/generic.svg",
    featured: true,
  },
  {
    slug: "sage-sap-invoice-bridge",
    company: "Construction Montérégie",
    industry: "Construction Finance",
    agent: "contractor-integrator-hub",
    metrics: [
      { label: "Manual Entry", value: "90%↓" },
      { label: "QST/GST Accuracy", value: "100%" },
      { label: "CCQ Compliance", value: "100%" },
    ],
    excerpt:
      "Construction Montérégie eliminated 90% of manual data entry by bridging Sage 300 CRE with client SAP S/4HANA, ensuring proper QST/GST handling and CCQ labor classifications.",
    logoSrc: "/logos/generic.svg",
  },
  {
    slug: "cnesst-safety-integration",
    company: "Sécurité Chantier Plus",
    industry: "Construction Safety",
    agent: "contractor-integrator-hub",
    metrics: [
      { label: "Incident Reporting", value: "Real-time" },
      { label: "CNESST Compliance", value: "100%" },
      { label: "Safety Response", value: "3x faster" },
    ],
    excerpt:
      "Sécurité Chantier Plus surfaces CNESST safety incidents directly in client SAP systems, enabling real-time regulatory tracking and 3x faster safety response coordination.",
    logoSrc: "/logos/generic.svg",
  },

  // PolicyBridge Agent
  {
    slug: "finance-policy-digitization",
    company: "Global Manufacturing Corp",
    industry: "Finance Transformation",
    agent: "policybridge-agent",
    metrics: [
      { label: "Time Reduction", value: "90%" },
      { label: "Cost Savings", value: "$250K" },
      { label: "Policy Coverage", value: "95%+" },
    ],
    excerpt:
      "Global Manufacturing Corp reduced policy digitization from 6 weeks to 4 days using PolicyBridge, saving $250K in consulting fees while achieving 95%+ automated rule extraction.",
    logoSrc: "/logos/generic.svg",
    featured: true,
  },
  {
    slug: "accruals-agent-enablement",
    company: "Financial Services Group",
    industry: "Financial Services",
    agent: "policybridge-agent",
    metrics: [
      { label: "Accrual Policies", value: "340 extracted" },
      { label: "Conflicts Found", value: "23" },
      { label: "AI Ready", value: "100%" },
    ],
    excerpt:
      "Financial Services Group extracted 340 accrual policies from scattered documents, identified 23 conflicts between sources, and delivered AI-ready packages for SAP Intelligent Accruals Agent.",
    logoSrc: "/logos/generic.svg",
  },
  {
    slug: "regulatory-change-monitoring",
    company: "Insurance Holdings Ltd",
    industry: "Insurance",
    agent: "policybridge-agent",
    metrics: [
      { label: "Regulation Changes", value: "Auto-tracked" },
      { label: "Impact Analysis", value: "<24hrs" },
      { label: "Compliance Risk", value: "Zero gaps" },
    ],
    excerpt:
      "Insurance Holdings Ltd uses PolicyBridge to monitor IFRS 17 and DORA regulation changes, automatically flagging affected policy rules and delivering impact analysis within 24 hours.",
    logoSrc: "/logos/generic.svg",
  },

  // Chantier AI
  {
    slug: "quebec-gc-billing-automation",
    company: "Construction Major Québec",
    industry: "General Contractors",
    agent: "chantier-ai",
    metrics: [
      { label: "Billing Accuracy", value: "99%" },
      { label: "Processing Time", value: "75%↓" },
      { label: "Holdback Calc", value: "Automated" },
    ],
    excerpt:
      "Construction Major Québec automated AIA G702/G703 progress billing with Quebec 10% holdback calculations, achieving 99% accuracy and reducing billing cycle time by 75%.",
    logoSrc: "/logos/generic.svg",
    featured: true,
  },
  {
    slug: "ccq-workforce-compliance",
    company: "Équipe Construction Inc",
    industry: "Construction HR",
    agent: "chantier-ai",
    metrics: [
      { label: "CCQ Validation", value: "100%" },
      { label: "Compliance Issues", value: "Zero" },
      { label: "Card Verification", value: "Real-time" },
    ],
    excerpt:
      "Équipe Construction validates every worker against CCQ competency card requirements before site assignment, eliminating compliance violations and union dues calculation errors.",
    logoSrc: "/logos/generic.svg",
  },
  {
    slug: "change-order-automation",
    company: "Projets Infrastructure Qc",
    industry: "Project Management",
    agent: "chantier-ai",
    metrics: [
      { label: "CO Processing", value: "80%↓" },
      { label: "Impact Analysis", value: "Automated" },
      { label: "SAP Write-back", value: "Real-time" },
    ],
    excerpt:
      "Projets Infrastructure Qc uses Chantier AI to OCR-extract change orders, analyze cost and schedule impact, and route through approval with automatic SAP project record updates.",
    logoSrc: "/logos/generic.svg",
  },
];
