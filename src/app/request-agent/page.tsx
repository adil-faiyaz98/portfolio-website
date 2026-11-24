"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Send,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Brain,
  Shield,
  Zap,
  Lock,
  Building2,
  FileCheck,
  TrendingUp,
} from "lucide-react";
import { FloatingElements, GradientOrb, AnimatedGrid } from "@/components/ui/FloatingElements";

const existingAgents = [
  {
    name: "Supplier Risk Agent",
    description: "Supply chain disruption prediction",
    href: "/products/supplier-risk",
    icon: TrendingUp,
    color: "#F59E0B",
    badge: "New",
  },
  {
    name: "Blockchain Platform Agent",
    description: "Financial record integrity and compliance",
    href: "/products/blockchain-platform-agent",
    icon: Lock,
    color: "#8B5CF6",
  },
  {
    name: "NFC Mobile Access",
    description: "Physical access control and HR integration",
    href: "/products/nfc-mobile-access",
    icon: Zap,
    color: "#00d4ff",
  },
  {
    name: "SAP Guardian",
    description: "Counterfeit detection for A&D",
    href: "/products/sap-guardian",
    icon: Shield,
    color: "#DC2626",
  },
  {
    name: "Contractor Integrator Hub",
    description: "Quebec construction ↔ SAP bridge",
    href: "/products/contractor-integrator-hub",
    icon: Building2,
    color: "#10B981",
  },
  {
    name: "PolicyBridge Agent",
    description: "Finance policy digitization",
    href: "/products/policybridge-agent",
    icon: FileCheck,
    color: "#A855F7",
  },
  {
    name: "Chantier AI",
    description: "Quebec construction multi-agent platform",
    href: "/products/chantier-ai",
    icon: Brain,
    color: "#0EA5E9",
  },
];

const useCaseCategories = [
  "SAP Financial Operations",
  "Supply Chain & Procurement",
  "Human Resources & Workforce",
  "Physical Security & Access",
  "Compliance & Audit",
  "Document Intelligence",
  "Industry-Specific (Aerospace, Construction, etc.)",
  "Other",
];

const sapLandscapeOptions = [
  { id: "s4hana-cloud", label: "S/4HANA Public Cloud" },
  { id: "s4hana-private", label: "S/4HANA Private Cloud" },
  { id: "s4hana-onprem", label: "S/4HANA On-Premise" },
  { id: "ecc", label: "ECC 6.0" },
  { id: "successfactors", label: "SuccessFactors" },
  { id: "ariba", label: "Ariba" },
  { id: "concur", label: "Concur" },
  { id: "btp", label: "SAP BTP" },
  { id: "other", label: "Other" },
];

interface FormData {
  name: string;
  email: string;
  company: string;
  role: string;
  category: string;
  sapLandscape: string[];
  sapLandscapeOther: string;
  problem: string;
  currentProcess: string;
  idealisticWins: string;
  timeline: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  category?: string;
  problem?: string;
  idealisticWins?: string;
}

export default function RequestAgentPage() {
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    role: "",
    category: "",
    sapLandscape: [],
    sapLandscapeOther: "",
    problem: "",
    currentProcess: "",
    idealisticWins: "",
    timeline: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [showLandscapeDropdown, setShowLandscapeDropdown] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company is required";
    }

    if (!formData.category) {
      newErrors.category = "Please select a use case category";
    }

    if (!formData.problem.trim()) {
      newErrors.problem = "Please describe the problem you're trying to solve";
    }

    if (!formData.idealisticWins.trim()) {
      newErrors.idealisticWins = "Please describe your idealistic wins (at least 5 points)";
    } else {
      const lines = formData.idealisticWins.split(/\n|[0-9]+\.|[-•]/).filter(line => line.trim().length > 0);
      if (lines.length < 5) {
        newErrors.idealisticWins = `Please mention at least 5 points (currently ${lines.length})`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleLandscapeToggle = (optionId: string) => {
    const currentSelections = formData.sapLandscape;
    const newSelections = currentSelections.includes(optionId)
      ? currentSelections.filter(id => id !== optionId)
      : [...currentSelections, optionId];
    handleInputChange("sapLandscape", newSelections);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionData = {
        ...formData,
        sapLandscape: formData.sapLandscape.map(id => {
          const option = sapLandscapeOptions.find(opt => opt.id === id);
          return option ? option.label : id;
        }).join(", "),
        sapLandscapeOther: formData.sapLandscape.includes("other") ? formData.sapLandscapeOther : "",
      };

      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log("Form submitted:", submissionData);
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedLandscapeLabels = formData.sapLandscape
    .map(id => sapLandscapeOptions.find(opt => opt.id === id)?.label)
    .filter(Boolean)
    .join(", ");

  const inputClasses = (hasError: boolean) =>
    `w-full px-4 py-3.5 rounded-xl bg-white border ${
      hasError ? "border-red-500/50" : "border-gray-200"
    } focus:border-[#0066cc] focus:ring-2 focus:ring-[#0066cc]/20 focus:outline-none text-gray-900 placeholder:text-gray-400 transition-all duration-300`;

  return (
    <main id="main-content" className="min-h-screen relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50">
      {/* Premium floating background elements */}
      <FloatingElements variant="hero" />

      {/* Gradient orbs */}
      <GradientOrb className="-top-[200px] -left-[200px]" />
      <GradientOrb className="-bottom-[300px] -right-[200px]" />

      {/* Animated grid pattern */}
      <AnimatedGrid />

      {/* Noise texture for premium feel */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <motion.section
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 border border-gray-200 backdrop-blur-sm mb-8 shadow-sm"
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-[#0066cc]" />
              <span className="text-sm font-medium text-gray-700">Custom Development</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-6 tracking-tight">
              Request a <span className="text-[#0066cc]">Custom Agent</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Don't see an agent that fits your exact use case? We build purpose-driven
              AI agents for enterprise SAP environments. Tell us what you need.
            </p>
          </motion.section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="p-8 md:p-10 rounded-3xl bg-white/80 border border-gray-100 backdrop-blur-xl shadow-xl shadow-gray-200/50">
                <h2 className="text-2xl font-light text-gray-900 mb-2">Describe Your Requirements</h2>
                <p className="text-gray-500 text-sm mb-8">We'll review and get back to you within 2 business days.</p>

                {submitStatus === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full border border-[#10B981]/30 flex items-center justify-center bg-[#10B981]/10">
                      <CheckCircle2 className="w-10 h-10 text-[#10B981]" />
                    </div>
                    <h3 className="text-2xl font-light text-gray-900 mb-3">Request Submitted!</h3>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                      Thank you for your interest. We'll review your request and get back to you within 2 business days.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitStatus("idle");
                        setFormData({
                          name: "",
                          email: "",
                          company: "",
                          role: "",
                          category: "",
                          sapLandscape: [],
                          sapLandscapeOther: "",
                          problem: "",
                          currentProcess: "",
                          idealisticWins: "",
                          timeline: "",
                        });
                      }}
                      className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0066cc] text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#0066cc]/30 hover:-translate-y-0.5"
                    >
                      Submit Another Request
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Name <span className="text-[#0066cc]">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className={inputClasses(!!errors.name)}
                          placeholder="Your name"
                        />
                        {errors.name && (
                          <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email <span className="text-[#0066cc]">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className={inputClasses(!!errors.email)}
                          placeholder="you@company.com"
                        />
                        {errors.email && (
                          <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                          Company <span className="text-[#0066cc]">*</span>
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          className={inputClasses(!!errors.company)}
                          placeholder="Your company"
                        />
                        {errors.company && (
                          <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.company}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                          Role
                        </label>
                        <input
                          type="text"
                          id="role"
                          name="role"
                          value={formData.role}
                          onChange={(e) => handleInputChange("role", e.target.value)}
                          className={inputClasses(false)}
                          placeholder="Your role"
                        />
                      </div>
                    </div>

                    {/* Use Case Category */}
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                        Use Case Category <span className="text-[#0066cc]">*</span>
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={(e) => handleInputChange("category", e.target.value)}
                        className={inputClasses(!!errors.category)}
                      >
                        <option value="">Select a category</option>
                        {useCaseCategories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      {errors.category && (
                        <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.category}
                        </p>
                      )}
                    </div>

                    {/* SAP Landscape */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SAP Landscape
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setShowLandscapeDropdown(!showLandscapeDropdown)}
                          className={`${inputClasses(false)} text-left flex items-center justify-between`}
                        >
                          <span className={selectedLandscapeLabels ? "text-gray-900" : "text-gray-400"}>
                            {selectedLandscapeLabels || "Select your SAP systems..."}
                          </span>
                          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showLandscapeDropdown ? "rotate-180" : ""}`} />
                        </button>

                        <AnimatePresence>
                          {showLandscapeDropdown && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute z-20 w-full mt-2 p-4 rounded-xl bg-white border border-gray-200 shadow-2xl"
                            >
                              <div className="grid grid-cols-2 gap-3">
                                {sapLandscapeOptions.map((option) => (
                                  <label
                                    key={option.id}
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={formData.sapLandscape.includes(option.id)}
                                      onChange={() => handleLandscapeToggle(option.id)}
                                      className="w-4 h-4 rounded border-gray-300 text-[#0066cc] bg-transparent focus:ring-[#0066cc]"
                                    />
                                    <span className="text-sm text-gray-700">{option.label}</span>
                                  </label>
                                ))}
                              </div>

                              {formData.sapLandscape.includes("other") && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                  <input
                                    type="text"
                                    placeholder="Please specify other SAP systems..."
                                    value={formData.sapLandscapeOther}
                                    onChange={(e) => handleInputChange("sapLandscapeOther", e.target.value)}
                                    className={inputClasses(false)}
                                  />
                                </div>
                              )}

                              <button
                                type="button"
                                onClick={() => setShowLandscapeDropdown(false)}
                                className="mt-4 w-full py-2 rounded-lg bg-[#0066cc]/10 text-[#0066cc] text-sm font-medium hover:bg-[#0066cc]/20 transition-colors"
                              >
                                Done
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">Select all that apply</p>
                    </div>

                    {/* Problem Description */}
                    <div>
                      <label htmlFor="problem" className="block text-sm font-medium text-gray-700 mb-2">
                        What Problem Are You Trying to Solve? <span className="text-[#0066cc]">*</span>
                      </label>
                      <textarea
                        id="problem"
                        name="problem"
                        value={formData.problem}
                        onChange={(e) => handleInputChange("problem", e.target.value)}
                        rows={4}
                        className={`${inputClasses(!!errors.problem)} resize-none`}
                        placeholder="Describe the business problem, pain points, and what an ideal solution would do..."
                      />
                      {errors.problem && (
                        <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.problem}
                        </p>
                      )}
                    </div>

                    {/* Current Process */}
                    <div>
                      <label htmlFor="current-process" className="block text-sm font-medium text-gray-700 mb-2">
                        How Do You Handle This Today?
                      </label>
                      <textarea
                        id="current-process"
                        name="current-process"
                        value={formData.currentProcess}
                        onChange={(e) => handleInputChange("currentProcess", e.target.value)}
                        rows={3}
                        className={`${inputClasses(false)} resize-none`}
                        placeholder="Manual process, existing tools, workarounds..."
                      />
                    </div>

                    {/* Idealistic Wins */}
                    <div>
                      <label htmlFor="idealistic-wins" className="block text-sm font-medium text-gray-700 mb-2">
                        What Would Be Your Most Idealistic Win to Achieve? <span className="text-[#0066cc]">*</span>
                      </label>
                      <p className="text-xs text-gray-500 mb-2">
                        Please mention at least 5 points - describe your dream outcome
                      </p>
                      <textarea
                        id="idealistic-wins"
                        name="idealistic-wins"
                        value={formData.idealisticWins}
                        onChange={(e) => handleInputChange("idealisticWins", e.target.value)}
                        rows={6}
                        className={`${inputClasses(!!errors.idealisticWins)} resize-none`}
                        placeholder={`1. Eliminate manual data entry between systems
2. Real-time visibility into all operations
3. Zero compliance violations
4. 80% reduction in processing time
5. Automatic exception handling
6. ...`}
                      />
                      {errors.idealisticWins && (
                        <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.idealisticWins}
                        </p>
                      )}
                    </div>

                    {/* Timeline */}
                    <div>
                      <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
                        Timeline / Urgency
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={(e) => handleInputChange("timeline", e.target.value)}
                        className={inputClasses(false)}
                      >
                        <option value="">Select timeline</option>
                        <option value="immediate">Immediate (within 1 month)</option>
                        <option value="quarter">This quarter</option>
                        <option value="6-months">Within 6 months</option>
                        <option value="exploring">Just exploring options</option>
                      </select>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full py-4 rounded-xl bg-[#0066cc] text-white font-medium text-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#0066cc]/30 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Submit Request
                        </>
                      )}
                    </button>

                    {submitStatus === "error" && (
                      <p className="text-sm text-red-500 text-center flex items-center justify-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        Something went wrong. Please try again.
                      </p>
                    )}
                  </form>
                )}
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              {/* Existing Agents */}
              <div className="p-6 rounded-2xl bg-white/80 border border-gray-100 shadow-lg shadow-gray-200/30">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Existing Agents
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Check if one of our existing agents already solves your problem:
                </p>
                <ul className="space-y-2">
                  {existingAgents.map((agent) => {
                    const Icon = agent.icon;
                    return (
                      <li key={agent.name}>
                        <Link
                          href={agent.href}
                          className="group flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:bg-white hover:border-gray-200 transition-all duration-300"
                        >
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${agent.color}15` }}
                          >
                            <Icon className="w-4 h-4" style={{ color: agent.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-900 group-hover:text-[#0066cc] transition-colors truncate">
                                {agent.name}
                              </span>
                              {agent.badge && (
                                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full">
                                  {agent.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 truncate">
                              {agent.description}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#0066cc] group-hover:translate-x-1 transition-all flex-shrink-0" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Why Custom */}
              <div className="p-6 rounded-2xl bg-white/80 border border-gray-100 shadow-lg shadow-gray-200/30">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Why Build a Custom Agent?
                </h3>
                <ul className="space-y-3">
                  {[
                    "Your use case has industry-specific requirements",
                    "You need deep integration with proprietary systems",
                    "Compliance requirements demand custom governance",
                    "Existing agents don't cover your SAP modules",
                    "You want a competitive advantage through AI",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
