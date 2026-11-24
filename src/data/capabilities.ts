/**
 * Capabilities data for the Capabilities Section.
 * Defines the four core AI agent capabilities with features.
 */

export interface Capability {
  id: string;
  title: string;
  description: string;
  features: string[];
}

export const capabilities: Capability[] = [
  {
    id: "intelligence",
    title: "AI-Powered Intelligence",
    description:
      "Our agents leverage advanced machine learning and SAP domain expertise to automate complex business processes, detect anomalies, and provide actionable insights in real-time.",
    features: [
      "Natural language processing",
      "Predictive analytics",
      "Real-time decision making",
      "Continuous learning",
    ],
  },
  {
    id: "integration",
    title: "Seamless SAP Integration",
    description:
      "Deep native integration with SAP S/4HANA, ECC, and BTP ensures our AI agents work within your existing enterprise landscape without disruption.",
    features: [
      "Native SAP connectivity",
      "Real-time data sync",
      "BTP integration",
      "Legacy system support",
    ],
  },
  {
    id: "security",
    title: "Enterprise Security",
    description:
      "Built with enterprise-grade security, our agents ensure data protection, audit trails, and compliance with industry standards including Quebec Law 25 privacy requirements.",
    features: [
      "End-to-end encryption",
      "Role-based access control",
      "Complete audit trails",
      "Privacy compliance",
    ],
  },
  {
    id: "automation",
    title: "Autonomous Operations",
    description:
      "Our agents operate autonomously 24/7, handling routine tasks, escalating exceptions, and continuously optimizing processes without human intervention.",
    features: [
      "24/7 autonomous operation",
      "Smart exception handling",
      "Self-optimization",
      "Proactive alerting",
    ],
  },
];
