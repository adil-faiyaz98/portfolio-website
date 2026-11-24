/**
 * AI Agent Products Data
 * Comprehensive product catalog for SDA Intelligence AI Agent Suite
 */

export interface ProductFeature {
  title: string;
  description: string;
  icon: string;
}

export interface ProductStat {
  label: string;
  value: string;
  description?: string;
}

export interface ProductUseCase {
  title: string;
  description: string;
  industry?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  problemStatement: string;
  icon: string;
  gradient: string;
  bgGradient: string;
  accentColor: string;
  stats: ProductStat[];
  features: ProductFeature[];
  capabilities: string[];
  useCases: ProductUseCase[];
  integrations: string[];
  securityFeatures: string[];
  compliance: string[];
  targetRoles: string[];
  videoPlaceholder?: string;
  badge?: string;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: "supplier-risk",
    slug: "supplier-risk",
    name: "Supplier Risk Agent",
    tagline: "Supply Chain Risk Detection • Launching Q4 2026",
    shortDescription:
      "AI-powered supplier risk monitoring that detects ownership changes, financial distress, and delivery anomalies within 24 hours — before they become production disruptions.",
    fullDescription:
      "Supplier Risk Agent continuously monitors your tier-1 and tier-2 suppliers for ownership changes, financial instability, and delivery pattern anomalies. When VAERO's ownership changed to a Chinese consortium, Boeing lost ~$390M in production delays. Our agent detects these signals within 24 hours and calculates real-time financial exposure, enabling settlement-vs-fight scenario modeling before disruptions cascade through your supply chain.",
    problemStatement:
      "Manufacturing and aerospace companies discover supplier ownership changes, financial distress, and quality issues only after production is disrupted. The Boeing-VAERO case demonstrated how a single supplier ownership change can cascade into $390M+ in losses. Current monitoring relies on manual audits, news alerts, and reactive discovery — too slow for modern supply chain risk.",
    icon: "trending-up",
    gradient: "from-[#F59E0B] via-[#EF4444] to-[#DC2626]",
    bgGradient: "from-[#F59E0B]/20 to-[#EF4444]/10",
    accentColor: "#F59E0B",
    stats: [
      {
        label: "Detection Time",
        value: "<24h",
        description: "Ownership change detection",
      },
      {
        label: "Supplier Coverage",
        value: "Tier 1-3",
        description: "Deep supply chain visibility",
      },
      {
        label: "Exposure Calculation",
        value: "Real-time",
        description: "Financial impact modeling",
      },
      {
        label: "Risk Prevention",
        value: "$390M+",
        description: "Boeing case benchmark",
      },
    ],
    features: [
      {
        title: "Ownership Change Detection",
        description:
          "Monitors SEC filings, corporate registries, and M&A databases to detect supplier ownership changes within 24 hours of public disclosure.",
        icon: "search",
      },
      {
        title: "Financial Distress Signals",
        description:
          "Tracks credit ratings, payment patterns, litigation filings, and financial statement anomalies to predict supplier viability risks.",
        icon: "chart-axis",
      },
      {
        title: "Delivery Anomaly Detection",
        description:
          "Analyzes SAP MM/SD delivery patterns, quality notifications, and lead time drift to surface emerging supplier performance issues.",
        icon: "alert",
      },
      {
        title: "Real-Time Exposure Calculator",
        description:
          "Calculates open PO exposure, in-transit inventory value, and production-at-risk metrics across all affected BOMs.",
        icon: "money-bills",
      },
      {
        title: "Settlement vs Fight Modeling",
        description:
          "Scenario analysis comparing negotiated exit costs against litigation timelines, alternative sourcing costs, and production delay impacts.",
        icon: "decision",
      },
      {
        title: "Geopolitical Risk Scoring",
        description:
          "Flags ownership changes involving sanctioned entities, CFIUS-reviewable transactions, and export control implications.",
        icon: "world",
      },
    ],
    capabilities: [
      "24-hour ownership change alerts",
      "Multi-tier supplier mapping",
      "SAP MM/PP/QM integration",
      "Financial health scoring",
      "Alternative supplier identification",
      "BOM impact analysis",
      "Litigation scenario modeling",
      "CFIUS/ITAR flag detection",
    ],
    useCases: [
      {
        title: "Aerospace Supplier Monitoring",
        description:
          "Detect ownership changes in critical aerospace suppliers before they impact production schedules and military contracts.",
        industry: "Aerospace & Defense",
      },
      {
        title: "Automotive Tier-N Visibility",
        description:
          "Monitor deep supply chain tiers for semiconductor suppliers, battery manufacturers, and critical component vendors.",
        industry: "Automotive",
      },
      {
        title: "Manufacturing Risk Mitigation",
        description:
          "Calculate real-time financial exposure when supplier distress signals emerge, enabling proactive inventory buffering.",
        industry: "Manufacturing",
      },
    ],
    integrations: [
      "SAP S/4HANA MM",
      "SAP S/4HANA PP",
      "SAP S/4HANA QM",
      "SAP Ariba",
      "SAP IBP",
      "D&B Direct",
      "Bureau van Dijk Orbis",
    ],
    securityFeatures: [
      "Encrypted data pipelines",
      "Role-based alert routing",
      "Audit trail on all risk assessments",
      "Secure API integrations",
      "Data residency controls",
    ],
    compliance: [
      "CFIUS Guidelines",
      "ITAR",
      "EAR",
      "DFARS 252.225-7009",
      "SOX 404",
    ],
    targetRoles: [
      "Chief Procurement Officer",
      "Supply Chain Risk Manager",
      "Supplier Quality Engineer",
      "VP Manufacturing",
      "General Counsel",
    ],
    badge: "Launching Q4 2026",
    featured: true,
  },
  {
    id: "blockchain-platform-agent",
    slug: "blockchain-platform-agent",
    name: "Blockchain Platform Agent",
    tagline: "Immutable Financial Record Integrity",
    shortDescription:
      "Cryptographic anchoring of SAP financial records to blockchain with tamper-proof verification and natural-language compliance intelligence.",
    fullDescription:
      "The Blockchain Platform Agent provides cryptographic anchoring of SAP financial records to distributed ledger technology, ensuring tamper-proof verification and complete auditability. Built for regulated enterprises, it delivers real-time immutability proofs, compliance intelligence via natural language queries, and seamless integration with SAP S/4HANA financial modules.",
    problemStatement:
      "Enterprises in regulated industries face increasing scrutiny over financial record integrity. Traditional audit trails can be modified, timestamps can be falsified, and proving the immutability of historical records requires expensive forensic analysis. Regulatory requirements (SOX, GDPR, Basel III) demand provable data integrity that current SAP implementations cannot deliver natively.",
    icon: "chain-link",
    gradient: "from-[#8B5CF6] via-[#06B6D4] to-[#10B981]",
    bgGradient: "from-[#8B5CF6]/20 to-[#06B6D4]/10",
    accentColor: "#8B5CF6",
    stats: [
      {
        label: "Proof Generation",
        value: "<3s",
        description: "Real-time cryptographic proof",
      },
      {
        label: "Immutability",
        value: "100%",
        description: "Tamper-proof guarantee",
      },
      {
        label: "Audit Cost Reduction",
        value: "70%",
        description: "Automated compliance verification",
      },
      {
        label: "Query Response",
        value: "<2s",
        description: "Natural language compliance queries",
      },
    ],
    features: [
      {
        title: "Cryptographic Anchoring",
        description:
          "SHA-256 hash anchoring of SAP financial documents to multiple blockchain networks with Merkle tree proofs.",
        icon: "locked",
      },
      {
        title: "Natural Language Compliance",
        description:
          "Ask questions in plain English about record integrity, audit trails, and compliance status using AI-powered queries.",
        icon: "discussion",
      },
      {
        title: "Real-Time Verification",
        description:
          "Instant verification of any historical record against its blockchain anchor with full proof chain.",
        icon: "verified",
      },
      {
        title: "Multi-Chain Support",
        description:
          "Anchoring to Ethereum, Hyperledger Fabric, and private enterprise blockchain networks.",
        icon: "connected",
      },
      {
        title: "SAP Native Integration",
        description:
          "Deep integration with SAP S/4HANA FI/CO modules, Document Management, and Audit Management.",
        icon: "sap-logo-shape",
      },
      {
        title: "Regulatory Intelligence",
        description:
          "Pre-built compliance rule sets for SOX, GDPR, Basel III, and industry-specific regulations.",
        icon: "document",
      },
    ],
    capabilities: [
      "Automated hash generation for financial postings",
      "Merkle tree construction for batch anchoring",
      "Cross-chain verification protocols",
      "Tamper detection and alerting",
      "Compliance report generation",
      "Natural language audit queries",
      "Integration with SAP GRC",
      "Historical record reconstruction",
    ],
    useCases: [
      {
        title: "Financial Statement Integrity",
        description:
          "Prove the immutability of quarterly and annual financial statements for SEC filings and investor relations.",
        industry: "Financial Services",
      },
      {
        title: "Supply Chain Documentation",
        description:
          "Anchor purchase orders, goods receipts, and invoices for complete supply chain auditability.",
        industry: "Manufacturing",
      },
      {
        title: "Regulatory Examination Support",
        description:
          "Provide instant proof of record integrity during regulatory examinations without forensic analysis.",
        industry: "Banking & Insurance",
      },
    ],
    integrations: [
      "SAP S/4HANA",
      "SAP ECC",
      "SAP GRC",
      "SAP Document Management",
      "Ethereum",
      "Hyperledger Fabric",
    ],
    securityFeatures: [
      "HSM-based key management",
      "Zero-knowledge proof options",
      "End-to-end encryption",
      "Role-based access control",
      "Audit trail immutability",
    ],
    compliance: ["SOX 404", "GDPR", "Basel III", "IFRS", "SOC 2 Type II"],
    targetRoles: [
      "CFO",
      "Chief Compliance Officer",
      "Internal Audit Director",
      "IT Security Manager",
      "External Auditors",
    ],
    badge: "Enterprise Security",
    featured: true,
  },
  {
    id: "nfc-mobile-access",
    slug: "nfc-mobile-access",
    name: "NFC Mobile Access Agent",
    tagline: "SAP BTP Mobile Access Platform",
    shortDescription:
      "Unified multi-modal mobile credentials replacing physical access cards across the full SAP enterprise landscape.",
    fullDescription:
      "A unified SAP BTP-native platform replacing physical access cards with multi-modal mobile credentials. The platform comprises seven integrated AI agents handling credential lifecycle, visitor flows, security response, contractor access, amenity management, and compliance — all connected to your SAP HR, real estate, and procurement systems.",
    problemStatement:
      "Enterprises managing physical access across multi-site, multi-system SAP landscapes rely on plastic access cards — a slow, costly, and insecure model. Credential revocation takes hours or days via manual processes after employee termination. Lost cards, cloning vulnerabilities, and lack of real-time audit trails create compliance exposure under Bill C-26, PIPEDA, and ITAR.",
    icon: "iphone",
    gradient: "from-[#006ddd] via-[#00d4ff] to-[#7c3aed]",
    bgGradient: "from-[#006ddd]/20 to-[#00d4ff]/10",
    accentColor: "#00d4ff",
    stats: [
      {
        label: "Revocation Time",
        value: "<60s",
        description: "From termination to access disabled",
      },
      {
        label: "Provisioning",
        value: "<5min",
        description: "Day-zero credential for new hires",
      },
      {
        label: "Door Decision",
        value: "<100ms",
        description: "Edge-based tap-to-unlock",
      },
      {
        label: "Auth Modalities",
        value: "6",
        description: "NFC, biometric, facial, PIN, QR, BLE",
      },
    ],
    features: [
      {
        title: "Seven-Agent AI Suite",
        description:
          "Orchestrator, Credential, Visitor, Security, Contractor, Amenity, and Compliance agents working in concert.",
        icon: "customer",
      },
      {
        title: "Multi-Modal Authentication",
        description:
          "NFC tap, biometric fingerprint, facial recognition, PIN code, QR scan, and BLE proximity — all from one mobile app.",
        icon: "biometric",
      },
      {
        title: "Real-Time HR Integration",
        description:
          "Instant credential updates triggered by SuccessFactors events — hire, transfer, leave, termination.",
        icon: "employee",
      },
      {
        title: "RE-FX Lease Lifecycle",
        description:
          "Automatic tenant credential management tied to SAP RE-FX lease signing, amendment, and termination.",
        icon: "building",
      },
      {
        title: "Edge Broker Network",
        description:
          "Sub-10ms door decisions with 24-hour offline capability via SAP Advanced Event Mesh edge deployment.",
        icon: "it-host",
      },
      {
        title: "RBAC Policy Engine",
        description:
          "Full role-based access control with zone, floor, building, time window, and escort constraints.",
        icon: "role",
      },
    ],
    capabilities: [
      "Credential lifecycle automation",
      "Visitor pre-registration and approval",
      "Anomaly detection and lockout",
      "Contractor PO-linked access",
      "Amenity booking with access grants",
      "Real-time occupancy tracking",
      "Compliance audit generation",
      "Apple/Google Wallet integration",
    ],
    useCases: [
      {
        title: "Corporate Campus Security",
        description:
          "Replace badge systems with mobile credentials across multi-building campuses with instant HR-triggered updates.",
        industry: "Enterprise",
      },
      {
        title: "Commercial Real Estate",
        description:
          "Automate tenant access tied to lease lifecycle in SAP RE-FX with zone-specific permissions.",
        industry: "Real Estate",
      },
      {
        title: "Contractor Management",
        description:
          "Grant PO-linked temporary access that auto-expires when purchase orders close in SAP MM.",
        industry: "Construction & Facilities",
      },
    ],
    integrations: [
      "SAP SuccessFactors",
      "SAP S/4HANA",
      "SAP RE-FX",
      "SAP Ariba",
      "SAP Fieldglass",
      "HID Origo",
      "Apple Wallet",
      "Google Wallet",
    ],
    securityFeatures: [
      "HSM-bound credential keys",
      "Multi-factor authentication",
      "Real-time anomaly detection",
      "Encrypted edge caching",
      "Protocol abstraction (MQTT, OSDP, Wiegand)",
    ],
    compliance: ["PIPEDA", "Bill C-26", "ITAR", "SOC 2", "GDPR"],
    targetRoles: [
      "Facilities Manager",
      "Physical Security Manager",
      "HR Administrator",
      "Property Manager",
      "CISO",
    ],
    badge: "7 AI Agents",
    featured: true,
  },
  {
    id: "sap-guardian",
    slug: "sap-guardian",
    name: "SAP Guardian",
    tagline: "Aerospace & Defense Aftermarket Intelligence",
    shortDescription:
      "Autonomous AI agent for counterfeit detection, parts authentication, and warranty fraud prevention in A&D supply chains.",
    fullDescription:
      "SAP Guardian deploys an autonomous AI agent that integrates directly with SAP S/4HANA to authenticate parts at goods receipt, validate airworthiness documentation (8130-3, CoC), enforce PMA/OEM policies, score supplier risk using ERAI/GIDEP data, and detect warranty fraud in MRO operations — protecting safety, revenue, and regulatory compliance.",
    problemStatement:
      "Aerospace & Defense manufacturers and MRO operators face severe safety and financial risks from suspected unapproved parts (SUPs), counterfeit electronic components, fraudulent 8130-3 airworthiness certificates, and warranty fraud. Current detection methods achieve only 40-60% accuracy with response times measured in hours to days.",
    icon: "shield",
    gradient: "from-[#DC2626] via-[#F97316] to-[#FBBF24]",
    bgGradient: "from-[#DC2626]/20 to-[#F97316]/10",
    accentColor: "#DC2626",
    stats: [
      {
        label: "Detection Rate",
        value: ">95%",
        description: "True positive counterfeit identification",
      },
      {
        label: "Response Time",
        value: "<3s",
        description: "Real-time goods receipt verification",
      },
      {
        label: "False Positive",
        value: "<5%",
        description: "Confirmed by manual review",
      },
      {
        label: "Fraud Prevention",
        value: "$2M+",
        description: "Annual savings per customer",
      },
    ],
    features: [
      {
        title: "Multi-Factor Risk Scoring",
        description:
          "Evaluates price anomaly, supplier approval, documentation completeness, ERAI/GIDEP alerts, and date-code validity.",
        icon: "chart-axis",
      },
      {
        title: "8130-3 Document AI",
        description:
          "NLP/OCR validation of FAA airworthiness certificates, repair station certifications, and digital signatures.",
        icon: "pdf-attachment",
      },
      {
        title: "ERAI/GIDEP Integration",
        description:
          "Real-time queries to industry counterfeit databases for known fraudulent parts and suppliers.",
        icon: "database",
      },
      {
        title: "Autonomous Quarantine",
        description:
          "Automatically blocks goods receipt and quarantines inventory for high/critical risk scores.",
        icon: "alert",
      },
      {
        title: "Warranty Fraud Detection",
        description:
          "Pattern analysis against SAP warranty and sales data to identify fraudulent MRO claims.",
        icon: "money-bills",
      },
      {
        title: "Regulatory Reporting",
        description:
          "FAA SUP reports and DFARS compliance documentation with mandatory human approval gates.",
        icon: "document-text",
      },
    ],
    capabilities: [
      "Real-time parts authentication",
      "Supplier risk scoring",
      "PMA vs OEM policy enforcement",
      "Quality notification creation",
      "Evidence package generation",
      "Serial number validation",
      "Warranty claim analysis",
      "Regulatory submission support",
    ],
    useCases: [
      {
        title: "Goods Receipt Authentication",
        description:
          "Validate every part at receiving against ERAI database, price benchmarks, and documentation requirements.",
        industry: "Aerospace & Defense",
      },
      {
        title: "MRO Warranty Fraud",
        description:
          "Detect patterns of fraudulent warranty claims against original sale records and maintenance history.",
        industry: "Aviation MRO",
      },
      {
        title: "Supplier Pre-Qualification",
        description:
          "Risk-score suppliers using GIDEP data, quality history, and certification verification before PO release.",
        industry: "Defense Contractors",
      },
    ],
    integrations: [
      "SAP S/4HANA QM",
      "SAP S/4HANA MM",
      "SAP S/4HANA SD",
      "ERAI Data Connect",
      "GIDEP",
      "SAP AI Core",
    ],
    securityFeatures: [
      "Encrypted API communications",
      "Role-based evidence access",
      "Tamper-proof audit trails",
      "Secure document storage",
      "DoD-compliant architecture",
    ],
    compliance: [
      "FAA AC 21-29D",
      "DFARS 252.246-7007",
      "DFARS 252.246-7008",
      "FAR 52.246-26",
      "AS9100D",
    ],
    targetRoles: [
      "Quality Manager",
      "Airworthiness Engineer",
      "Procurement Analyst",
      "Warranty Claims Analyst",
      "Regulatory Affairs Manager",
    ],
    badge: "A&D Security",
    featured: true,
  },
  {
    id: "contractor-integrator-hub",
    slug: "contractor-integrator-hub",
    name: "Contractor Integrator Hub",
    tagline: "SAP ↔ Non-SAP AI Agent Bridge",
    shortDescription:
      "Intelligent integration layer bridging Quebec construction subcontractors' tools (Procore, Sage, Viewpoint) with enterprise SAP S/4HANA systems.",
    fullDescription:
      "A pro-code Python AI agent acting as the intelligent integration layer between Quebec construction subcontractors' non-SAP tools and enterprise clients' SAP S/4HANA systems. Features mixed autonomy: autonomous for low-risk data sync, human-in-loop for financial and compliance actions.",
    problemStatement:
      "Quebec construction subcontractors (running Procore, Sage 300 CRE, Viewpoint) cannot exchange data with enterprise clients' SAP S/4HANA systems. This forces daily manual data entry, causes invoice rejections and payment delays of 20+ days, creates change order bottlenecks, and leaves safety compliance data siloed.",
    icon: "combine",
    gradient: "from-[#059669] via-[#10B981] to-[#34D399]",
    bgGradient: "from-[#059669]/20 to-[#10B981]/10",
    accentColor: "#10B981",
    stats: [
      {
        label: "Reporting Time",
        value: "80%↓",
        description: "From 10hrs/week to 2hrs/week",
      },
      {
        label: "Invoice Approval",
        value: "95%",
        description: "First-pass approval rate",
      },
      {
        label: "Payment Cycle",
        value: "25 days",
        description: "Down from 45 days",
      },
      {
        label: "Connectors",
        value: "4",
        description: "Procore, Sage, Viewpoint, QuickBooks",
      },
    ],
    features: [
      {
        title: "Procore ↔ SAP Sync",
        description:
          "Real-time synchronization of daily logs, progress reports, and project status from Procore to SAP.",
        icon: "synchronize",
      },
      {
        title: "Invoice Workflow",
        description:
          "Automated invoice preparation with human-in-loop approval before SAP AP posting.",
        icon: "money-bills",
      },
      {
        title: "Change Order Routing",
        description:
          "Intelligent routing through approval chains with automatic SAP write-back for approved changes.",
        icon: "workflow-tasks",
      },
      {
        title: "CNESST Safety Integration",
        description:
          "Surface safety incidents and compliance data in SAP for regulatory reporting.",
        icon: "warning",
      },
      {
        title: "Quebec Localization",
        description:
          "QST/GST handling, CCQ labor classifications, CNESST fields, and bilingual FR/EN output.",
        icon: "world",
      },
      {
        title: "Mixed Autonomy Model",
        description:
          "Autonomous for low-risk sync, human approval for financial writes and compliance actions.",
        icon: "decision",
      },
    ],
    capabilities: [
      "Real-time progress sync",
      "Multi-connector architecture",
      "Intelligent invoice routing",
      "Change order impact analysis",
      "Safety incident flagging",
      "Bilingual documentation",
      "Quebec tax compliance",
      "A2A protocol ready",
    ],
    useCases: [
      {
        title: "Subcontractor Progress Reporting",
        description:
          "Sync daily logs from Procore to SAP project records without manual re-entry.",
        industry: "Quebec Construction",
      },
      {
        title: "Invoice Acceleration",
        description:
          "Reduce payment cycles by preparing compliant invoices with proper QST/GST and CCQ fields.",
        industry: "Construction Finance",
      },
      {
        title: "Safety Compliance",
        description:
          "Flag CNESST-relevant incidents in SAP for regulatory tracking and reporting.",
        industry: "Construction Safety",
      },
    ],
    integrations: [
      "SAP S/4HANA",
      "Procore",
      "Sage 300 CRE",
      "Viewpoint Vista",
      "QuickBooks",
      "SAP Enterprise AI Gateway",
    ],
    securityFeatures: [
      "OAuth 2.0 authentication",
      "Encrypted data transfer",
      "Human approval gates",
      "Audit trail logging",
      "Tenant isolation",
    ],
    compliance: [
      "Quebec QST/GST",
      "CCQ Regulations",
      "CNESST Safety",
      "Act R-20",
    ],
    targetRoles: [
      "Project Manager",
      "Finance Team",
      "Site Supervisor",
      "AP Team",
      "Project Controls",
    ],
    badge: "Quebec Construction",
  },
  {
    id: "policybridge-agent",
    slug: "policybridge-agent",
    name: "PolicyBridge Agent",
    tagline: "Finance Policy Digitization Accelerator",
    shortDescription:
      "AI-powered extraction, validation, and structuring of finance policies from unstructured documents for SAP Finance AI readiness.",
    fullDescription:
      "PolicyBridge automates the extraction of finance policy rules from scattered documents (PDF, DOCX, XLSX, email chains, meeting transcripts), validates and structures them, and delivers AI-ready policy packages that SAP Finance AI agents can consume — reducing a 4-8 week, $150-300K engagement to 3-5 days.",
    problemStatement:
      "Finance policy documentation is scattered across unstructured sources and is unavailable in machine-readable form. SAP's native Finance AI agents require structured, rule-based policy input to operate. The gap between raw documentation and AI-ready policy currently demands a 4-8 week, $150-300K manual consulting engagement per customer.",
    icon: "document-text",
    gradient: "from-[#7C3AED] via-[#A855F7] to-[#C084FC]",
    bgGradient: "from-[#7C3AED]/20 to-[#A855F7]/10",
    accentColor: "#A855F7",
    stats: [
      {
        label: "Time Reduction",
        value: "90%",
        description: "From 4-8 weeks to 3-5 days",
      },
      {
        label: "Cost Savings",
        value: "90%",
        description: "$150-300K to $15-30K",
      },
      {
        label: "Policy Coverage",
        value: "95%+",
        description: "Automated rule extraction",
      },
      {
        label: "Gap Detection",
        value: "85%+",
        description: "Pre-deployment discovery",
      },
    ],
    features: [
      {
        title: "Multi-Format Ingestion",
        description:
          "Process PDF, DOCX, XLSX, PPTX, TXT, MSG/EML, video transcripts, and contracts in EN/FR/DE/ES/AR.",
        icon: "attachment",
      },
      {
        title: "AI Rule Extraction",
        description:
          "Extract thresholds, GL mappings, calculation methods, approval matrices, and exceptions using SAP GenAI Hub.",
        icon: "intelligence",
      },
      {
        title: "Conflict Detection",
        description:
          "Identify conflicts between rules from different sources and flag ambiguities for resolution.",
        icon: "alert",
      },
      {
        title: "Evidence Chain",
        description:
          "Every extracted rule linked to source document, page, and location for 100% audit readiness.",
        icon: "link",
      },
      {
        title: "Multi-Level Approval",
        description:
          "Configurable approval workflow with SoD enforcement, delegation, escalation, and rejection handling.",
        icon: "approvals",
      },
      {
        title: "A2A Composability",
        description:
          "Expose tools for SAP Finance AI agents to query policies at runtime via A2A protocol.",
        icon: "connected",
      },
    ],
    capabilities: [
      "Document grounding and retrieval",
      "Confidence-scored rule inventory",
      "Policy gap analysis",
      "Regulatory change monitoring",
      "Multi-tenant SaaS delivery",
      "JSON/YAML export",
      "Queryable policy API",
      "Version control and history",
    ],
    useCases: [
      {
        title: "SAP Finance AI Enablement",
        description:
          "Prepare structured policies for Intelligent Accruals, Journal Entry, and Financial Close agents.",
        industry: "Finance Transformation",
      },
      {
        title: "Regulatory Change Management",
        description:
          "Monitor regulation changes and automatically flag affected policy rules for update.",
        industry: "Compliance",
      },
      {
        title: "Audit Preparation",
        description:
          "Deliver complete evidence chains linking rules to source documents for internal and external audit.",
        industry: "Internal Audit",
      },
    ],
    integrations: [
      "SAP S/4HANA",
      "SAP Document Grounding",
      "SAP GenAI Hub",
      "SAP Integration Suite",
      "SAP Event Mesh",
      "SharePoint",
    ],
    securityFeatures: [
      "Multi-tenant data isolation",
      "Encrypted document storage",
      "Named approver sign-off",
      "Audit trail immutability",
      "RBAC policy access",
    ],
    compliance: ["SOX 404", "GDPR", "DORA", "ASC 842", "IFRS 17", "Pillar Two"],
    targetRoles: [
      "SAP Implementation Consultant",
      "Accounting Policy Owner",
      "Finance Transformation Lead",
      "Internal Auditor",
    ],
    badge: "AI Accelerator",
  },
  {
    id: "chantier-ai",
    slug: "chantier-ai",
    name: "Chantier AI",
    tagline: "Maître d'Œuvre — Quebec Construction Platform",
    shortDescription:
      "Multi-agent orchestration platform for Quebec construction project delivery with CCQ compliance, bilingual AI, and deep SAP integration.",
    fullDescription:
      "A multi-agent orchestration platform purpose-built for Quebec's construction industry, addressing regulatory (CCQ, CNESST), linguistic (French-first), and operational complexities. Features six specialist agents for billing, change orders, compliance, subcontractors, documents, and workforce — all coordinated by a bilingual orchestrator on SAP BTP.",
    problemStatement:
      "Construction project delivery requires tight integration between financial systems (SAP), field operations (mobile), regulatory compliance (CCQ/CNESST), and document workflows. No single SAP module addresses this end-to-end for Quebec's unique regulatory environment. SAP ECC remains dominant (60%+ of SAP-using contractors) requiring landscape-agnostic architecture.",
    icon: "building",
    gradient: "from-[#0EA5E9] via-[#38BDF8] to-[#7DD3FC]",
    bgGradient: "from-[#0EA5E9]/20 to-[#38BDF8]/10",
    accentColor: "#0EA5E9",
    stats: [
      {
        label: "Billing Accuracy",
        value: "99%",
        description: "AIA G702/G703, CCDC 9A",
      },
      {
        label: "CCQ Compliance",
        value: "100%",
        description: "Automated card validation",
      },
      {
        label: "Languages",
        value: "FR/EN",
        description: "Bilingual orchestrator",
      },
      {
        label: "SAP Coverage",
        value: "100%",
        description: "ECC to S/4 Public Cloud",
      },
    ],
    features: [
      {
        title: "Bilingual Orchestrator",
        description:
          "Claude-powered orchestrator handling French-first intent classification with English support.",
        icon: "discussion",
      },
      {
        title: "Progress Billing Agent",
        description:
          "Generate AIA G702/G703 or CCDC 9A applications with Quebec 10% holdback calculations.",
        icon: "money-bills",
      },
      {
        title: "Change Order Agent",
        description:
          "OCR extraction, cost/schedule impact analysis, and approval routing for change orders.",
        icon: "workflow-tasks",
      },
      {
        title: "CCQ Compliance Agent",
        description:
          "Validate worker competency cards, training requirements, and union dues calculations.",
        icon: "employee-lookup",
      },
      {
        title: "Document Intelligence",
        description:
          "SAP Document AI Premium for contracts, COs, lien waivers, RFIs, and CCQ cards.",
        icon: "pdf-attachment",
      },
      {
        title: "Subcontractor Management",
        description:
          "Prequalification, performance tracking, payment applications, and lien waiver generation.",
        icon: "supplier",
      },
    ],
    capabilities: [
      "Multi-agent orchestration",
      "SAP ECC through S/4 support",
      "CCQ web services integration",
      "CNESST safety validation",
      "Bilingual document output",
      "Mobile field app",
      "Real-time project visibility",
      "A2A protocol compliant",
    ],
    useCases: [
      {
        title: "Progress Billing Automation",
        description:
          "Generate compliant billing applications with holdback calculations from SAP project data.",
        industry: "General Contractors",
      },
      {
        title: "CCQ Workforce Compliance",
        description:
          "Validate every worker on site against CCQ competency requirements before assignment.",
        industry: "Construction HR",
      },
      {
        title: "Change Order Management",
        description:
          "Extract changes from documents, analyze impact, and route through approval with SAP write-back.",
        industry: "Project Management",
      },
    ],
    integrations: [
      "SAP S/4HANA",
      "SAP ECC",
      "SAP SuccessFactors",
      "CCQ Web Services",
      "CNESST API",
      "SAP Document AI",
      "SAP Joule",
    ],
    securityFeatures: [
      "LangGraph state management",
      "Tenant isolation",
      "Encrypted API calls",
      "Role-based agent access",
      "Audit logging",
    ],
    compliance: [
      "CCQ Regulations",
      "CNESST Safety",
      "Quebec Civil Code",
      "Act R-20",
      "Quebec 10% Holdback",
    ],
    targetRoles: [
      "Project Manager",
      "Billing Coordinator",
      "Site Superintendent",
      "Compliance Manager",
      "Finance Controller",
    ],
    badge: "Quebec Certified",
    featured: true,
  },
];

// Helper function to get product by slug
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

// Helper function to get featured products
export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

// Helper function to get all product slugs for static generation
export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug);
}
