/**
 * Blog posts data for SDA Intelligence AI Agent Suite.
 * Covers AI agents, SAP integration, industry solutions, and enterprise automation.
 */

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured?: boolean;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  // Construction & Quebec
  {
    slug: "quebec-construction-ai-revolution",
    title: "How AI Agents Are Transforming Quebec Construction Compliance",
    excerpt:
      "CCQ regulations, CNESST safety requirements, and bilingual documentation make Quebec construction uniquely complex. Here's how Chantier AI addresses these challenges with purpose-built AI agents.",
    category: "Construction",
    author: "SDA Team",
    date: "2026-08-15",
    readTime: "8 min read",
    featured: true,
    tags: ["Construction", "CCQ", "Quebec", "AI Agents", "Compliance"],
  },
  {
    slug: "subcontractor-sap-integration-challenges",
    title: "Bridging the Gap: Connecting Subcontractor Tools to Enterprise SAP",
    excerpt:
      "Most Quebec subcontractors run Procore, Sage, or Viewpoint — not SAP. The Contractor Integrator Hub solves the data sync problem with intelligent, mixed-autonomy AI agents.",
    category: "Construction",
    author: "SDA Team",
    date: "2026-08-10",
    readTime: "6 min read",
    tags: ["Construction", "SAP Integration", "Procore", "Subcontractors"],
  },
  {
    slug: "progress-billing-automation-quebec",
    title: "Automating AIA G702/G703 Billing with Quebec Holdback Rules",
    excerpt:
      "Quebec's 10% holdback requirements add complexity to progress billing. Learn how Chantier AI automates CCDC 9A and AIA formats while ensuring compliance.",
    category: "Construction",
    author: "SDA Team",
    date: "2026-07-28",
    readTime: "5 min read",
    tags: ["Construction", "Billing", "Quebec", "Automation"],
  },

  // Aerospace & Defense / Aftermarket
  {
    slug: "counterfeit-parts-detection-aerospace",
    title: "Stopping Counterfeit Parts at the Dock: AI-Powered Authentication",
    excerpt:
      "SAP Guardian uses multi-factor risk scoring, ERAI/GIDEP integration, and document AI to detect suspected unapproved parts before they enter inventory.",
    category: "Aerospace & Defense",
    author: "SDA Team",
    date: "2026-08-12",
    readTime: "7 min read",
    featured: true,
    tags: [
      "Aerospace",
      "Counterfeit Detection",
      "Supply Chain",
      "SAP Guardian",
    ],
  },
  {
    slug: "warranty-fraud-mro-operations",
    title:
      "Detecting Warranty Fraud in MRO Operations with AI Pattern Analysis",
    excerpt:
      "Aviation MRO warranty fraud costs the industry billions annually. SAP Guardian's pattern analysis against SAP SD sales history identifies fraudulent claims in real-time.",
    category: "Aerospace & Defense",
    author: "SDA Team",
    date: "2026-08-05",
    readTime: "6 min read",
    tags: ["MRO", "Warranty Fraud", "Aviation", "AI Detection"],
  },
  {
    slug: "8130-3-document-validation",
    title: "AI Validation of FAA 8130-3 Airworthiness Certificates",
    excerpt:
      "Fraudulent 8130-3 certificates are a growing threat in aftermarket parts. Learn how Document AI validates signatures, repair stations, and certification chains.",
    category: "Aerospace & Defense",
    author: "SDA Team",
    date: "2026-07-22",
    readTime: "5 min read",
    tags: ["FAA", "8130-3", "Document AI", "Aerospace"],
  },

  // PolicyBridge & Finance
  {
    slug: "finance-policy-digitization-challenge",
    title: "The $300K Problem: Why Finance Policy Digitization Takes So Long",
    excerpt:
      "SAP Finance AI agents need structured policy input. Traditional consulting engagements take 4-8 weeks and cost $150-300K. PolicyBridge cuts this to 3-5 days.",
    category: "Finance Transformation",
    author: "SDA Team",
    date: "2026-08-08",
    readTime: "6 min read",
    featured: true,
    tags: ["Finance", "Policy Digitization", "AI", "SAP"],
  },
  {
    slug: "sap-finance-ai-readiness",
    title: "Preparing Your Organization for SAP Finance AI Agents",
    excerpt:
      "Intelligent Accruals, Journal Entry, and Financial Close agents require structured policies. Here's how to assess your readiness and accelerate deployment.",
    category: "Finance Transformation",
    author: "SDA Team",
    date: "2026-07-30",
    readTime: "7 min read",
    tags: ["SAP Finance AI", "Readiness", "Enterprise AI"],
  },

  // Small ERP Integration
  {
    slug: "small-erp-sap-integration-patterns",
    title: "Integration Patterns for Small ERPs Connecting to Enterprise SAP",
    excerpt:
      "QuickBooks, Sage, and Viewpoint users need to exchange data with SAP clients. Explore the architectural patterns that make this possible without middleware.",
    category: "Integration",
    author: "SDA Team",
    date: "2026-08-01",
    readTime: "8 min read",
    tags: ["Integration", "Small ERP", "SAP", "QuickBooks", "Sage"],
  },

  // Blockchain
  {
    slug: "blockchain-financial-record-integrity",
    title: "Why Blockchain for Financial Record Integrity — And Why Now",
    excerpt:
      "SOX, GDPR, and Basel III demand provable data integrity. Blockchain Platform Agent provides cryptographic proof that traditional audit trails cannot deliver.",
    category: "Enterprise Security",
    author: "SDA Team",
    date: "2026-08-03",
    readTime: "7 min read",
    featured: true,
    tags: ["Blockchain", "Compliance", "SOX", "Financial Records"],
  },
  {
    slug: "natural-language-compliance-queries",
    title: "Ask Your Audit Trail: Natural Language Compliance Intelligence",
    excerpt:
      "Instead of running reports, ask questions in plain English. Blockchain Platform Agent's compliance intelligence layer makes audit preparation conversational.",
    category: "Enterprise Security",
    author: "SDA Team",
    date: "2026-07-25",
    readTime: "5 min read",
    tags: ["Blockchain", "NLP", "Compliance", "Audit"],
  },

  // NFC / Access Control
  {
    slug: "mobile-credentials-replace-badges",
    title: "The End of Plastic Badges: Enterprise Mobile Access Control",
    excerpt:
      "NFC Mobile Access replaces physical badge systems with multi-modal mobile credentials that sync in real-time with SAP HR, RE-FX, and procurement.",
    category: "Physical Security",
    author: "SDA Team",
    date: "2026-07-18",
    readTime: "6 min read",
    tags: ["Access Control", "NFC", "Mobile", "HR Integration"],
  },
  {
    slug: "instant-credential-revocation",
    title: "From Termination to Access Disabled in 60 Seconds",
    excerpt:
      "Traditional badge revocation takes hours or days. NFC Mobile Access achieves sub-60-second credential revocation through SAP SuccessFactors event triggers.",
    category: "Physical Security",
    author: "SDA Team",
    date: "2026-07-12",
    readTime: "5 min read",
    tags: ["Access Control", "HR", "Security", "SuccessFactors"],
  },

  // General AI Agents
  {
    slug: "human-in-loop-enterprise-ai",
    title: "Human-in-the-Loop: Where AI Agents Need Human Oversight",
    excerpt:
      "Not all decisions should be autonomous. Learn how SDA agents implement mixed autonomy — autonomous for low-risk, human approval for financial and compliance actions.",
    category: "AI Strategy",
    author: "SDA Team",
    date: "2026-07-08",
    readTime: "6 min read",
    tags: ["AI Agents", "Human-in-Loop", "Governance", "Enterprise AI"],
  },
  {
    slug: "boutique-vs-big4-ai-implementation",
    title: "10x Faster: Why Boutique Firms Outpace Big4 on AI Delivery",
    excerpt:
      "Big4 consultancies take 500 meetings and 12+ months. Boutique specialists ship in weeks with fixed pricing. Here's why the model difference matters.",
    category: "Industry Insights",
    author: "SDA Team",
    date: "2026-07-01",
    readTime: "5 min read",
    tags: ["Consulting", "Big4", "Boutique", "AI Implementation"],
  },
];

// Helper functions
export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((post) => post.category === category);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllCategories(): string[] {
  return Array.from(new Set(blogPosts.map((post) => post.category)));
}
