/**
 * Legal content data for Privacy Policy, Terms of Service, and Cookie Policy pages.
 * Each legal page contains structured sections with headings and content.
 * Updated for Quebec Law 25 compliance and AI agent platform context.
 */

export interface LegalSection {
  heading: string;
  content: string;
}

export interface LegalPage {
  slug: "privacy" | "terms" | "cookies";
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export const privacyPolicy: LegalPage = {
  slug: "privacy",
  title: "Privacy Policy",
  lastUpdated: "2026-01-15",
  sections: [
    {
      heading: "Introduction",
      content:
        "SDA Intelligence Inc. is committed to protecting your privacy and complying with applicable privacy legislation, including Quebec's Act respecting the protection of personal information in the private sector (Law 25), the Personal Information Protection and Electronic Documents Act (PIPEDA), and the General Data Protection Regulation (GDPR) where applicable. This Privacy Policy explains how we collect, use, store, and share your personal information when you use our AI agent platform and services.",
    },
    {
      heading: "Quebec Law 25 Compliance",
      content:
        "As a Quebec-based company, we are fully committed to compliance with Law 25 (Bill 64). We have designated a Privacy Officer responsible for personal information protection. You have the right to access, rectify, and delete your personal information. You may also request information about how your data is used and withdraw consent at any time. We conduct privacy impact assessments for new technologies and maintain a data inventory. To exercise your rights under Law 25, contact our Privacy Officer at privacy@sda-intelligence.com. We will respond within 30 days as required by law.",
    },
    {
      heading: "Data Collection",
      content:
        "We collect information you provide directly, such as your name, email address, company name, job title, and phone number when you request a demo, fill out a contact form, subscribe to our newsletter, or engage with our AI agent platform. We also automatically collect technical data including IP address, browser type, device information, and usage analytics through cookies and similar technologies. For our AI agent services, we may process business data you provide for integration with SAP systems, subject to separate data processing agreements.",
    },
    {
      heading: "Data Usage",
      content:
        "We use your personal information to: provide and improve our AI agent platform and services; communicate with you about your account, demos, or inquiries; send relevant product updates and marketing communications (with your explicit consent); analyze usage patterns to enhance user experience; fulfill contractual obligations; and comply with legal requirements. We do not use your personal information for automated decision-making that produces legal effects without human oversight.",
    },
    {
      heading: "Data Storage and Security",
      content:
        "Your data is stored on secure servers located in Canada and the European Economic Area (EEA). We implement industry-standard security measures including encryption in transit (TLS 1.3) and at rest (AES-256), role-based access controls, multi-factor authentication, and regular security audits. We maintain SOC 2 Type II compliance for our infrastructure. We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy or as required by law. Upon request, we will securely delete your personal information within 30 days.",
    },
    {
      heading: "Data Sharing and Transfer",
      content:
        "We do not sell your personal information. We may share data with trusted service providers who assist in delivering our services (such as cloud hosting on AWS/Azure, analytics, and email delivery), subject to strict data processing agreements that ensure equivalent privacy protections. We may also disclose information when required by law, court order, or to protect our legal rights. For international transfers outside Canada/Quebec, we ensure adequate protection through standard contractual clauses or equivalent mechanisms approved under Law 25 and PIPEDA.",
    },
    {
      heading: "PIPEDA Compliance",
      content:
        "Under PIPEDA, you have the right to access your personal information held by us, challenge its accuracy, and withdraw consent for its use (subject to legal or contractual restrictions). We obtain meaningful consent before collecting, using, or disclosing personal information. We only collect information necessary for identified purposes and protect it with appropriate safeguards. To make a PIPEDA-related request, contact privacy@sda-intelligence.com.",
    },
    {
      heading: "Your Rights",
      content:
        "You have the right to: access your personal data and obtain a copy; correct inaccurate or incomplete data; delete your personal data (right to erasure); restrict or object to certain processing; receive your data in a portable format; withdraw consent at any time; and lodge a complaint with the Commission d'accès à l'information du Québec or the Office of the Privacy Commissioner of Canada. To exercise any of these rights, please contact our Privacy Officer at privacy@sda-intelligence.com. We will respond within 30 days.",
    },
    {
      heading: "Contact Information",
      content:
        "Privacy Officer: SDA Intelligence Inc., Montreal, Quebec, Canada. Email: privacy@sda-intelligence.com. For Quebec residents, you may also contact the Commission d'accès à l'information du Québec at www.cai.gouv.qc.ca. For other Canadian residents, contact the Office of the Privacy Commissioner of Canada at www.priv.gc.ca.",
    },
    {
      heading: "Changes to This Policy",
      content:
        "We may update this Privacy Policy to reflect changes in our practices, legal requirements, or our services. We will notify you of significant changes by posting a notice on our website and, where required by law, by email. The 'Last Updated' date at the top of this policy indicates when it was last revised. Your continued use of our services after changes take effect constitutes acceptance of the updated policy.",
    },
  ],
};

export const termsOfService: LegalPage = {
  slug: "terms",
  title: "Terms of Service",
  lastUpdated: "2026-01-15",
  sections: [
    {
      heading: "Service Description",
      content:
        "SDA Intelligence Inc. provides enterprise AI agents that integrate with SAP systems to automate business processes, enhance security, and improve operational efficiency. Our AI agent suite includes: Blockchain Platform Agent for financial record integrity, NFC Mobile Access Agent for physical access control, SAP Guardian for aerospace counterfeit detection, Contractor Integrator Hub for construction SAP integration, PolicyBridge Agent for finance policy digitization, and Chantier AI for Quebec construction project management. Each agent operates with appropriate human oversight and governance controls.",
    },
    {
      heading: "Account and Access",
      content:
        "To access our AI agent platform, you must create an account and execute a service agreement. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You must provide accurate and complete information during registration, keep your account information current, and notify us immediately of any unauthorized use. Enterprise accounts may designate administrators who manage user access according to your organization's policies.",
    },
    {
      heading: "User Responsibilities",
      content:
        "You agree to use our services only for lawful purposes and in accordance with these Terms. You shall not: use the services to process data you are not authorized to process; attempt to gain unauthorized access to our systems or other users' accounts; interfere with the proper functioning of the services; reverse engineer, decompile, or attempt to extract source code; use the services to develop competing products; or misrepresent your identity or authorization. You are responsible for ensuring you have the necessary rights and authorizations for any data you process through our platform.",
    },
    {
      heading: "AI Agent Governance",
      content:
        "Our AI agents operate with mixed autonomy: autonomous for low-risk operations, human-in-the-loop for financial decisions and compliance actions. You acknowledge that AI agents may make errors and should be used with appropriate oversight. You retain responsibility for reviewing and approving agent recommendations before execution where human approval is required. We provide audit trails and logging for all agent actions. You agree to implement appropriate internal controls when deploying our AI agents.",
    },
    {
      heading: "Intellectual Property",
      content:
        "All content, software, algorithms, and materials provided through SDA Intelligence are protected by intellectual property laws and remain our property or that of our licensors. You retain ownership of your data and any outputs generated specifically from your data. You are granted a limited, non-exclusive, non-transferable license to use our services for the duration of your subscription. You may not sublicense, transfer, or make our services available to third parties except as expressly permitted.",
    },
    {
      heading: "Data Processing",
      content:
        "Our processing of your data is governed by a separate Data Processing Agreement (DPA) that forms part of your service agreement. The DPA addresses data security, confidentiality, subprocessors, international transfers, and breach notification. For AI agents processing SAP data, we act as a data processor under your instructions. We do not use your business data to train AI models without explicit written consent.",
    },
    {
      heading: "Service Levels and Support",
      content:
        "Service level commitments, including uptime guarantees, support response times, and maintenance windows, are specified in your service agreement. We provide 24/7 monitoring for critical systems. Scheduled maintenance is communicated at least 48 hours in advance. We maintain business continuity and disaster recovery capabilities to protect service availability.",
    },
    {
      heading: "Limitations of Liability",
      content:
        "To the maximum extent permitted by law, SDA Intelligence shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including lost profits, data loss, or business interruption, arising from your use of the services. Our total liability shall not exceed the fees paid by you in the twelve months preceding the claim. These limitations do not apply to liability arising from gross negligence, willful misconduct, or breaches of confidentiality obligations.",
    },
    {
      heading: "Indemnification",
      content:
        "You agree to indemnify and hold harmless SDA Intelligence, its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including reasonable legal fees) arising from: your use of the services; your violation of these Terms; your violation of any third-party rights; or any data you process through our platform.",
    },
    {
      heading: "Termination",
      content:
        "Either party may terminate this agreement with 30 days written notice. We may suspend or terminate your access immediately if you materially breach these Terms, fail to pay fees when due, or engage in activity that threatens the security or integrity of our services. Upon termination, your right to use the services ceases. We will provide a reasonable period (minimum 30 days) to export your data before deletion.",
    },
    {
      heading: "Governing Law and Dispute Resolution",
      content:
        "These Terms shall be governed by and construed in accordance with the laws of the Province of Quebec and the federal laws of Canada applicable therein. Any disputes arising under these Terms shall first be subject to good-faith negotiation, then mediation, and if unresolved, to the exclusive jurisdiction of the courts of Montreal, Quebec. Nothing in this section prevents either party from seeking injunctive relief for intellectual property violations or confidentiality breaches.",
    },
    {
      heading: "Changes to Terms",
      content:
        "We reserve the right to modify these Terms at any time. Material changes will be communicated at least 30 days in advance via email and prominent notice on our website. Continued use of the services after the effective date constitutes acceptance of the modified Terms. If you do not agree to the changes, you may terminate your subscription before the changes take effect.",
    },
  ],
};

export const cookiePolicy: LegalPage = {
  slug: "cookies",
  title: "Cookie Policy",
  lastUpdated: "2026-01-15",
  sections: [
    {
      heading: "What Are Cookies",
      content:
        "Cookies are small text files stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences, understanding how you use our site, and enabling certain features to function properly. Some cookies are essential for the website to function, while others help us improve your experience or deliver relevant content.",
    },
    {
      heading: "Cookie Types We Use",
      content:
        "We use the following categories of cookies: Essential Cookies — required for the website to function properly (session management, security tokens, load balancing, authentication state). These cannot be disabled. Functional Cookies — remember your preferences such as language selection (EN/FR), display settings, and form data. Performance/Analytics Cookies — help us understand how visitors interact with our website by collecting anonymous usage data. These require your consent. Marketing Cookies — used to deliver relevant content and track engagement. These require your explicit consent and are not used by default.",
    },
    {
      heading: "Cookie Purposes",
      content:
        "Our cookies serve several purposes: ensuring website security and preventing fraud; maintaining your session state as you navigate between pages; remembering your language preference (English or French) and accessibility settings; measuring website traffic and user behavior patterns to improve our services; personalizing content based on your interactions. We do not use cookies for profiling or automated decision-making.",
    },
    {
      heading: "Quebec Law 25 and Consent",
      content:
        "In accordance with Quebec Law 25 and best practices, we obtain your explicit consent before setting non-essential cookies. When you first visit our website, you will see a cookie consent banner allowing you to accept all cookies, accept only essential cookies, or customize your preferences. You can change your cookie preferences at any time through our Cookie Settings panel accessible from the footer. Essential cookies do not require consent as they are necessary for the website to function.",
    },
    {
      heading: "Third-Party Cookies",
      content:
        "Some cookies on our site may be placed by third-party services we use. These may include: Analytics services for website usage analysis (with anonymized data); Video hosting services if you view embedded content; Social media widgets if you interact with sharing features. These third parties have their own privacy policies governing how they use collected data. We only enable third-party cookies with your explicit consent.",
    },
    {
      heading: "Cookie Duration",
      content:
        "Session cookies are temporary and are deleted when you close your browser. Persistent cookies remain on your device for a set period or until you delete them. Our cookie durations: Essential cookies — session-based or up to 24 hours; Functional cookies (language preference) — 12 months; Analytics cookies — 12 months; Marketing cookies — 6 months. You can view and manage cookie expiration through your browser settings.",
    },
    {
      heading: "Managing and Opting Out",
      content:
        "You have full control over cookies on our website. Options include: Using our Cookie Settings panel (accessible from the footer) to enable or disable non-essential cookie categories; Configuring your browser to block or delete cookies (note: blocking essential cookies may affect website functionality); Using browser privacy modes (incognito/private browsing); Installing browser extensions that block tracking cookies. For analytics opt-out, you can use browser-based opt-out tools provided by analytics services.",
    },
    {
      heading: "Do Not Track",
      content:
        "We respect 'Do Not Track' (DNT) browser signals. When we detect a DNT signal, we disable non-essential cookies and do not load third-party tracking scripts. However, essential cookies required for website functionality will still be set.",
    },
    {
      heading: "Contact and Questions",
      content:
        "If you have questions about our use of cookies or wish to exercise your privacy rights, please contact our Privacy Officer at privacy@sda-intelligence.com. For more information about cookies and how to manage them, visit www.allaboutcookies.org.",
    },
    {
      heading: "Changes to This Policy",
      content:
        "We may update this Cookie Policy to reflect changes in our practices, technology, or legal requirements. We will notify you of material changes by updating the 'Last Updated' date and, where significant, by displaying a notice on our website. We encourage you to review this page periodically for the latest information on our cookie practices.",
    },
  ],
};

export const legalPages: LegalPage[] = [
  privacyPolicy,
  termsOfService,
  cookiePolicy,
];
