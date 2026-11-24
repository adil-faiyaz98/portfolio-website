"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

function LinkedInIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TwitterIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkGroup({ title, links }: Readonly<{ title: string; links: FooterLink[] }>) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-5">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:rounded-sm"
            >
              <span className="underline-animated">{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: "Products",
    links: [
      { label: "Blockchain Platform Agent", href: "/products/blockchain-platform-agent" },
      { label: "NFC Mobile Access", href: "/products/nfc-mobile-access" },
      { label: "SAP Guardian", href: "/products/sap-guardian" },
      { label: "Contractor Integrator Hub", href: "/products/contractor-integrator-hub" },
      { label: "PolicyBridge Agent", href: "/products/policybridge-agent" },
      { label: "Chantier AI", href: "/products/chantier-ai" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Blog", href: "/learn/blog" },
      { label: "Case Studies", href: "/learn/case-studies" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/company/about" },
      { label: "Careers", href: "/company/careers" },
      { label: "Contact", href: "/company/contact" },
      { label: "Partners", href: "/company/partners" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
      { label: "Cookies", href: "/legal/cookies" },
    ],
  },
];

export function Footer() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <footer className="relative bg-surface-elevated border-t border-border">
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-20">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand area */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 mb-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:rounded-sm"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent-primary">
                <Sparkles className="w-5 h-5 text-surface" />
              </div>
              <span className="font-serif text-xl text-text-primary">
                SDA
              </span>
            </Link>
            <p className="text-sm text-text-secondary mb-6 max-w-xs leading-relaxed">
              Enterprise AI agents that integrate with SAP to automate, protect,
              and accelerate your operations.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-surface border border-border text-text-secondary hover:text-accent-primary hover:border-accent-primary/40 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
                whileHover={prefersReducedMotion ? {} : { y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <LinkedInIcon className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-surface border border-border text-text-secondary hover:text-accent-primary hover:border-accent-primary/40 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
                whileHover={prefersReducedMotion ? {} : { y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <TwitterIcon className="h-4 w-4" />
              </motion.a>
            </div>
          </div>

          {/* Link groups */}
          {footerLinkGroups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <LinkGroup title={group.title} links={group.links} />
            </motion.div>
          ))}
        </div>

        {/* Divider and copyright */}
        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} SDA Intelligence. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
