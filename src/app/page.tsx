import dynamic from "next/dynamic";
import { HeroSection, ScrollReveal } from "@/components";

// Dynamic imports for below-fold sections (code splitting)
const ProductShowcase = dynamic(
  () =>
    import("@/components/ProductShowcase").then(
      (mod) => mod.ProductShowcase
    ),
  { loading: () => null }
);

const CapabilitiesSection = dynamic(
  () =>
    import("@/components/CapabilitiesSection").then(
      (mod) => mod.CapabilitiesSection
    ),
  { loading: () => null }
);

const StatsSection = dynamic(
  () =>
    import("@/components/StatsSection").then((mod) => mod.StatsSection),
  { ssr: false, loading: () => null }
);

const CTABanner = dynamic(
  () => import("@/components/CTABanner").then((mod) => mod.CTABanner),
  { loading: () => null }
);

export default function Home() {
  return (
    <main id="main-content" className="relative">
      <HeroSection />

      <ScrollReveal>
        <ProductShowcase />
      </ScrollReveal>

      <ScrollReveal>
        <CapabilitiesSection />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <StatsSection />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <CTABanner />
      </ScrollReveal>
    </main>
  );
}
