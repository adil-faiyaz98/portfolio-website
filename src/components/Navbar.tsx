"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { navigationItems } from "@/data/navigation";
import { MobileMenu } from "@/components/ui";
import { useScrollPosition } from "@/hooks";
import { LAYOUT } from "@/lib/constants";
import {
  Sparkles,
  ChevronDown,
  ArrowRight,
  Zap,
  Shield,
  Calculator,
  FileCode,
  Users,
  BookOpen,
  Mail,
  Building2,
  Briefcase,
  FileText,
} from "lucide-react";

// Icon mapping for menu items
const iconMap: Record<string, React.ElementType> = {
  "Blockchain Platform Agent": Shield,
  "NFC Mobile Access": Zap,
  "SAP Guardian": Shield,
  "Contractor Integrator Hub": Building2,
  "PolicyBridge Agent": FileText,
  "Chantier AI": Building2,
  "Enterprise Security": Shield,
  "Aerospace & Defense": Shield,
  "Construction": Building2,
  "Finance Transformation": Calculator,
  "About Us": Building2,
  "Careers": Briefcase,
  "Partners": Users,
  "Contact": Mail,
  "Blog": BookOpen,
  "Case Studies": FileText,
};

export function Navbar() {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollY = useScrollPosition();
  const isScrolled = scrollY >= LAYOUT.navbarScrollThreshold;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null);
    if (activeDropdown) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [activeDropdown]);

  // Check if a path is active
  const isActivePath = useCallback((href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }, [pathname]);

  // Check if any dropdown item is active
  const isDropdownActive = useCallback((items: { href: string }[]) => {
    return items.some(item => isActivePath(item.href));
  }, [isActivePath]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? "py-2" : "py-4"
        }`}
      >
        {/* Ivory bar that gains a hairline border once the page scrolls */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            isScrolled
              ? "bg-background/90 backdrop-blur-md border-b border-border shadow-soft"
              : "bg-transparent border-b border-transparent"
          }`}
        />

        <nav aria-label="Main navigation" className="relative h-full">
          <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="group relative flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-accent-primary transition-colors duration-300 group-hover:bg-accent-primary-hover">
                <Sparkles className="w-5 h-5 text-surface" />
              </div>

              <div className="hidden sm:flex flex-col leading-tight">
                <span className="font-serif text-xl text-text-primary tracking-tight">
                  SDA
                </span>
                <span className="text-[10px] text-text-muted uppercase tracking-[0.18em] font-medium">
                  Intelligence
                </span>
              </div>
            </Link>

            {/* Desktop Menu - LangChain style */}
            <ul className="hidden lg:flex items-center gap-1" role="menubar">
              {navigationItems.map((item, index) => (
                <motion.li
                  key={item.label}
                  className="relative"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={`relative px-4 py-2.5 text-sm font-medium tracking-wide transition-colors duration-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary ${
                        isActivePath(item.href)
                          ? "text-accent-primary"
                          : "text-text-secondary hover:text-text-primary hover:bg-surface-elevated"
                      }`}
                    >
                      {item.label}
                      {/* Active indicator */}
                      {isActivePath(item.href) && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute bottom-0 left-4 right-4 h-px bg-accent-primary"
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </Link>
                  ) : item.dropdown ? (
                    <MegaDropdown
                      label={item.label}
                      items={item.dropdown}
                      isOpen={activeDropdown === item.label}
                      isActive={isDropdownActive(item.dropdown)}
                      onToggle={(e) => {
                        e.stopPropagation();
                        setActiveDropdown(activeDropdown === item.label ? null : item.label);
                      }}
                      onClose={() => setActiveDropdown(null)}
                    />
                  ) : null}
                </motion.li>
              ))}
            </ul>

            {/* Right side: Language toggle + CTA + Mobile toggle */}
            <div className="flex items-center gap-4">
              {/* Language Toggle */}
              <div className="hidden lg:flex items-center gap-1 text-sm">
                <span className="text-text-primary font-medium">EN</span>
                <span className="text-text-muted">/</span>
                <span
                  className="text-text-muted cursor-not-allowed relative group"
                  title="Coming Soon"
                >
                  FR
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-surface-elevated border border-border rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Coming Soon
                  </span>
                </span>
              </div>

              {/* Book a Demo CTA */}
              <motion.div
                className="hidden lg:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  href="/demo"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-accent-primary text-surface text-sm font-medium transition-colors duration-200 hover:bg-accent-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Book a Demo
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>

              {/* Mobile hamburger toggle */}
              <motion.button
                type="button"
                className="lg:hidden relative inline-flex items-center justify-center w-10 h-10 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary transition-colors"
                aria-label="Open menu"
                aria-expanded={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(true)}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}

// Mega Dropdown Component - AWS/LangChain inspired
interface MegaDropdownProps {
  label: string;
  items: { label: string; href: string; description?: string }[];
  isOpen: boolean;
  isActive: boolean;
  onToggle: (e: React.MouseEvent) => void;
  onClose: () => void;
}

function MegaDropdown({ label, items, isOpen, isActive, onToggle, onClose }: MegaDropdownProps) {
  return (
    <div className="relative">
      {/* Trigger button */}
      <button
        type="button"
        onClick={onToggle}
        className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium tracking-wide transition-colors duration-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary ${
          isOpen || isActive
            ? "text-accent-primary"
            : "text-text-secondary hover:text-text-primary hover:bg-surface-elevated"
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Mega dropdown panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-16 bg-text-primary/10 z-40"
              onClick={onClose}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[400px] z-50"
            >
              <div className="relative rounded-xl border border-border bg-surface shadow-lift overflow-hidden">
                {/* Header */}
                <div className="px-5 py-3 border-b border-border bg-surface-elevated/60">
                  <h3 className="text-xs font-medium text-text-muted uppercase tracking-[0.14em]">
                    {label}
                  </h3>
                </div>

                {/* Items */}
                <div className="p-2">
                  {items.map((item, index) => {
                    const Icon = iconMap[item.label] || FileText;
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="group flex items-start gap-3 p-3 rounded-lg transition-colors duration-200 hover:bg-surface-elevated"
                        >
                          <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-surface-elevated flex items-center justify-center group-hover:bg-surface transition-colors">
                            <Icon className="w-4 h-4 text-accent-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="block text-sm font-medium text-text-primary">
                              {item.label}
                            </span>
                            {item.description && (
                              <span className="block mt-0.5 text-xs text-text-muted leading-relaxed line-clamp-2">
                                {item.description}
                              </span>
                            )}
                          </div>
                          <ArrowRight className="w-4 h-4 text-transparent group-hover:text-accent-primary transition-all duration-200 group-hover:translate-x-1 mt-1" />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
