/**
 * Navigation data for the main site navigation bar.
 * Defines top-level menu items and their dropdown sub-items.
 */

export interface DropdownItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavItem {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

export const navigationItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Products",
    dropdown: [
      {
        label: "Blockchain Platform Agent",
        href: "/products/blockchain-platform-agent",
        description:
          "Cryptographic anchoring of SAP financial records to blockchain with tamper-proof verification.",
      },
      {
        label: "NFC Mobile Access",
        href: "/products/nfc-mobile-access",
        description:
          "Unified multi-modal mobile credentials replacing physical access cards across SAP landscapes.",
      },
      {
        label: "SAP Guardian",
        href: "/products/sap-guardian",
        description:
          "Counterfeit detection and parts authentication for Aerospace & Defense supply chains.",
      },
      {
        label: "Contractor Integrator Hub",
        href: "/products/contractor-integrator-hub",
        description:
          "AI bridge connecting Quebec construction tools (Procore, Sage) with SAP S/4HANA.",
      },
      {
        label: "PolicyBridge Agent",
        href: "/products/policybridge-agent",
        description:
          "AI-powered extraction and structuring of finance policies for SAP Finance AI readiness.",
      },
      {
        label: "Chantier AI",
        href: "/products/chantier-ai",
        description:
          "Multi-agent platform for Quebec construction with CCQ compliance and bilingual AI.",
      },
    ],
  },
  {
    label: "Solutions",
    dropdown: [
      {
        label: "Enterprise Security",
        href: "/solutions/enterprise-security",
        description:
          "Blockchain-backed audit trails and tamper-proof financial records.",
      },
      {
        label: "Aerospace & Defense",
        href: "/solutions/aerospace-defense",
        description:
          "Counterfeit detection, parts authentication, and warranty fraud prevention.",
      },
      {
        label: "Construction",
        href: "/solutions/construction",
        description:
          "Quebec construction compliance, CCQ integration, and subcontractor management.",
      },
      {
        label: "Finance Transformation",
        href: "/solutions/finance-transformation",
        description: "Policy digitization and SAP Finance AI enablement.",
      },
    ],
  },
  {
    label: "Learn",
    dropdown: [
      {
        label: "Blog",
        href: "/learn/blog",
        description:
          "Insights on AI agents, SAP integration, and enterprise automation.",
      },
      {
        label: "Case Studies",
        href: "/learn/case-studies",
        description: "Real-world AI agent deployments and business outcomes.",
      },
    ],
  },
  {
    label: "Company",
    dropdown: [
      {
        label: "About Us",
        href: "/company/about",
        description: "Our mission, team, and approach to enterprise AI agents.",
      },
      {
        label: "Careers",
        href: "/company/careers",
        description: "Join our team building the future of SAP AI automation.",
      },
      {
        label: "Contact",
        href: "/company/contact",
        description: "Get in touch with our sales and support teams.",
      },
      {
        label: "Partners",
        href: "/company/partners",
        description: "Our SAP and technology partner ecosystem.",
      },
    ],
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
  {
    label: "Request an Agent",
    href: "/request-agent",
  },
];
