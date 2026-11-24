"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  MapPin,
  Mail,
  Briefcase,
  User,
  Building2,
  MessageSquare,
  Send,
  Loader2,
  CheckCircle2,
  ArrowRight,
  Phone,
  Clock,
  X,
} from "lucide-react";
import Link from "next/link";

// Contact info data
const contactInfo = [
  {
    icon: MapPin,
    title: "Office Location",
    content: ["SDA", "Montreal, Quebec", "Canada"],
    color: "purple",
  },
  {
    icon: Mail,
    title: "Support Email",
    content: ["support@sda.com"],
    link: "mailto:support@sda.com",
    subtitle: "We respond within 24 hours",
    color: "cyan",
  },
  {
    icon: Briefcase,
    title: "Sales Inquiries",
    content: ["sales@sda.com"],
    link: "mailto:sales@sda.com",
    subtitle: "Discuss enterprise plans and custom solutions",
    color: "pink",
  },
];

// Team phone numbers
const teamContacts = [
  { name: "Adil Faiyaz", phone: "514-443-7486", role: "Lead Architect" },
  { name: "Ayman Kabalan", phone: "514-329-8152", role: "Solutions Expert" },
  { name: "Sai Lebaka", phone: "514-672-3941", role: "Technical Lead" },
];

export default function ContactPage() {
  const prefersReducedMotion = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.company.trim()) newErrors.company = "Company is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", company: "", message: "" });
    setSubmitted(false);
    setErrors({});
  };

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={prefersReducedMotion ? {} : {
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" as const }}
          className="absolute top-20 -left-40 w-[500px] h-[500px] rounded-full bg-accent-primary/10 blur-[120px]"
        />
        <motion.div
          animate={prefersReducedMotion ? {} : {
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" as const, delay: 2 }}
          className="absolute bottom-20 -right-40 w-[600px] h-[600px] rounded-full bg-accent-primary/10 blur-[120px]"
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 lg:py-32">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-primary/10 border border-accent-primary/25 mb-6"
          >
            <Mail className="w-4 h-4 text-accent-primary" />
            <span className="text-sm font-medium text-accent-primary">Get In Touch</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-4">
            Contact{" "}
            <span className="text-accent-primary">
              Us
            </span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Have a question about SDA? Get in touch with our team and we&apos;ll get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-1 rounded-3xl blur-xl opacity-50 bg-surface-elevated" />

              <div className="relative p-8 md:p-10 rounded-3xl bg-surface/80 backdrop-blur-xl border border-border">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    /* Success State */
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-center py-8"
                    >
                      {/* Confetti particles */}
                      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                        {[...Array(15)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{
                              y: -20,
                              x: Math.random() * 100 + "%",
                              opacity: 1,
                              scale: Math.random() * 0.5 + 0.5
                            }}
                            animate={{
                              y: "100%",
                              opacity: 0,
                              rotate: Math.random() * 360
                            }}
                            transition={{
                              duration: Math.random() * 2 + 2,
                              delay: Math.random() * 0.5,
                              ease: "easeOut" as const
                            }}
                            className={`absolute w-2 h-2 rounded-full ${
                              ['bg-accent-primary', 'bg-accent-primary/60', 'bg-text-secondary', 'bg-surface-elevated'][i % 4]
                            }`}
                          />
                        ))}
                      </div>

                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                        className="w-20 h-20 mx-auto mb-6 rounded-full border border-accent-primary/25 flex items-center justify-center bg-surface-elevated"
                      >
                        <CheckCircle2 className="w-10 h-10 text-accent-primary" />
                      </motion.div>

                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-2xl font-bold text-text-primary mb-3"
                      >
                        Message Sent!
                      </motion.h2>

                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-text-secondary mb-8"
                      >
                        Thank you, <span className="text-accent-primary font-semibold">{formData.name.split(' ')[0]}</span>!
                        Our team will respond to{" "}
                        <span className="text-accent-primary font-semibold">{formData.email}</span> within 24 hours.
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                      >
                        <Link
                          href="/"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold hover:shadow-lift transition-all duration-300 hover:scale-105 bg-accent-primary"
                        >
                          Back to Home
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={resetForm}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-text-primary font-semibold hover:bg-surface-elevated transition-all duration-300"
                        >
                          Send Another Message
                        </button>
                      </motion.div>
                    </motion.div>
                  ) : (
                    /* Form State */
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                    >
                      <h2 className="text-2xl font-bold text-text-primary mb-2">Send us a message</h2>
                      <p className="text-text-muted text-sm mb-8">Fill in your details and we&apos;ll get back to you soon.</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Name Field */}
                        <div>
                          <label htmlFor="contact-name" className="block text-sm font-medium text-text-secondary mb-2">
                            Full Name <span className="text-accent-primary">*</span>
                          </label>
                          <div className="relative">
                            <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === 'name' ? 'text-accent-primary' : 'text-text-muted'}`}>
                              <User className="w-5 h-5" />
                            </div>
                            <input
                              type="text"
                              id="contact-name"
                              value={formData.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              onFocus={() => setFocusedField('name')}
                              onBlur={() => setFocusedField(null)}
                              placeholder="John Doe"
                              disabled={isSubmitting}
                              className={`w-full pl-12 pr-4 py-3.5 rounded-xl bg-surface border text-text-primary placeholder:text-text-muted/50 transition-all duration-300 focus:outline-none focus:bg-surface ${
                                errors.name
                                  ? 'border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                                  : 'border-border focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20'
                              }`}
                            />
                          </div>
                          <AnimatePresence>
                            {errors.name && (
                              <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-red-700 text-xs mt-2 flex items-center gap-1"
                              >
                                <X className="w-3 h-3" /> {errors.name}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Email Field */}
                        <div>
                          <label htmlFor="contact-email" className="block text-sm font-medium text-text-secondary mb-2">
                            Email Address <span className="text-accent-primary">*</span>
                          </label>
                          <div className="relative">
                            <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === 'email' ? 'text-accent-primary' : 'text-text-muted'}`}>
                              <Mail className="w-5 h-5" />
                            </div>
                            <input
                              type="email"
                              id="contact-email"
                              value={formData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              onFocus={() => setFocusedField('email')}
                              onBlur={() => setFocusedField(null)}
                              placeholder="john@company.com"
                              disabled={isSubmitting}
                              className={`w-full pl-12 pr-4 py-3.5 rounded-xl bg-surface border text-text-primary placeholder:text-text-muted/50 transition-all duration-300 focus:outline-none focus:bg-surface ${
                                errors.email
                                  ? 'border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                                  : 'border-border focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20'
                              }`}
                            />
                          </div>
                          <AnimatePresence>
                            {errors.email && (
                              <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-red-700 text-xs mt-2 flex items-center gap-1"
                              >
                                <X className="w-3 h-3" /> {errors.email}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Company Field */}
                      <div className="mb-6">
                        <label htmlFor="contact-company" className="block text-sm font-medium text-text-secondary mb-2">
                          Company <span className="text-accent-primary">*</span>
                        </label>
                        <div className="relative">
                          <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === 'company' ? 'text-accent-primary' : 'text-text-muted'}`}>
                            <Building2 className="w-5 h-5" />
                          </div>
                          <input
                            type="text"
                            id="contact-company"
                            value={formData.company}
                            onChange={(e) => handleInputChange('company', e.target.value)}
                            onFocus={() => setFocusedField('company')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="Acme Inc."
                            disabled={isSubmitting}
                            className={`w-full pl-12 pr-4 py-3.5 rounded-xl bg-surface border text-text-primary placeholder:text-text-muted/50 transition-all duration-300 focus:outline-none focus:bg-surface ${
                              errors.company
                                ? 'border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                                : 'border-border focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20'
                            }`}
                          />
                        </div>
                        <AnimatePresence>
                          {errors.company && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-red-700 text-xs mt-2 flex items-center gap-1"
                            >
                              <X className="w-3 h-3" /> {errors.company}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Message Field */}
                      <div className="mb-8">
                        <label htmlFor="contact-message" className="block text-sm font-medium text-text-secondary mb-2">
                          Message <span className="text-accent-primary">*</span>
                        </label>
                        <div className="relative">
                          <div className={`absolute left-4 top-4 transition-colors ${focusedField === 'message' ? 'text-accent-primary' : 'text-text-muted'}`}>
                            <MessageSquare className="w-5 h-5" />
                          </div>
                          <textarea
                            id="contact-message"
                            rows={5}
                            value={formData.message}
                            onChange={(e) => handleInputChange('message', e.target.value)}
                            onFocus={() => setFocusedField('message')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="Tell us about your integration needs..."
                            disabled={isSubmitting}
                            className={`w-full pl-12 pr-4 py-3.5 rounded-xl bg-surface border text-text-primary placeholder:text-text-muted/50 transition-all duration-300 focus:outline-none focus:bg-surface resize-none ${
                              errors.message
                                ? 'border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                                : 'border-border focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20'
                            }`}
                          />
                        </div>
                        <AnimatePresence>
                          {errors.message && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-red-700 text-xs mt-2 flex items-center gap-1"
                            >
                              <X className="w-3 h-3" /> {errors.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-white font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-lift hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 bg-accent-primary"
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                        <AnimatePresence mode="wait">
                          {isSubmitting ? (
                            <motion.span
                              key="loading"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center gap-3"
                            >
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Sending...
                            </motion.span>
                          ) : (
                            <motion.span
                              key="submit"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center gap-3"
                            >
                              <Send className="w-5 h-5" />
                              <span className="relative">Send Message</span>
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Contact Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Contact Info Cards */}
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="group relative p-6 rounded-2xl bg-surface border border-border hover:border-accent-primary/40 transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-2xl to-transparent opacity-0 group-hover:opacity-100 transition-opacity bg-surface-elevated" />
                <div className="relative flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    info.color === 'purple' ? 'bg-accent-primary/10' :
                    info.color === 'cyan' ? 'bg-accent-primary/10' : 'bg-accent-primary/10'
                  }`}>
                    <info.icon className={`w-6 h-6 ${
                      info.color === 'purple' ? 'text-accent-primary' :
                      info.color === 'cyan' ? 'text-accent-primary' : 'text-accent-primary'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-1">{info.title}</h3>
                    {info.content.map((line, i) => (
                      info.link && i === 0 ? (
                        <a
                          key={i}
                          href={info.link}
                          className="block text-sm text-accent-primary hover:text-accent-primary-hover transition-colors"
                        >
                          {line}
                        </a>
                      ) : (
                        <p key={i} className="text-sm text-text-secondary">{line}</p>
                      )
                    ))}
                    {info.subtitle && (
                      <p className="text-xs text-text-muted mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {info.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Team Direct Contacts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="p-6 rounded-2xl border border-accent-primary/25 bg-surface-elevated"
            >
              <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5 text-accent-primary" />
                Direct Team Contacts
              </h3>
              <div className="space-y-3">
                {teamContacts.map((contact, index) => (
                  <motion.div
                    key={contact.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-xl bg-surface border border-border"
                  >
                    <div>
                      <p className="text-sm font-medium text-text-primary">{contact.name}</p>
                      <p className="text-xs text-text-muted">{contact.role}</p>
                    </div>
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-sm text-accent-primary hover:text-accent-primary-hover transition-colors font-medium"
                    >
                      {contact.phone}
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
