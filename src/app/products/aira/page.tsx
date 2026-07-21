import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import AiraLiveSimulation from "@/components/AiraLiveSimulation";
import FAQAccordion from "@/components/FAQAccordion";
import CTABand from "@/components/CTABand";
import BrandHeadline from "@/components/brand/BrandHeadline";
import { AIRA } from "@/lib/content/products";
import { AIRA_FAQS } from "@/lib/content/faqs";

export const metadata: Metadata = {
  title: "AIRA — AI Revenue Acceleration Platform",
  description:
    "AIRA is Bloom Matrix's AI-powered revenue acceleration platform — conversational AI, AI telecalling, CRM, lead management, and workflow automation in one multi-tenant SaaS system.",
};

export default function AiraPage() {
  return (
    <main>
      <PageHero
        eyebrow="Flagship Product"
        titleSegments={[{ text: AIRA.name }]}
        description={AIRA.tagline}
      />

      <section className="bg-cream py-24">
        <div className="max-w-5xl mx-auto px-container-margin grid lg:grid-cols-2 gap-12 items-start">
          <Reveal>
            <BrandHeadline
              as="h2"
              segments={[
                { text: "Turn every enquiry into " },
                { text: "revenue activity", emphasis: true },
                { text: "." },
              ]}
              className="text-3xl text-ink mb-4"
            />
            <p className="font-inter text-ink/65 leading-relaxed mb-8">{AIRA.description}</p>
            <ul className="space-y-3">
              {AIRA.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-coral shrink-0" aria-hidden />
                  <span className="font-inter text-ink">{feature}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15}>
            <AiraLiveSimulation />
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-24 border-t border-ink/10">
        <div className="max-w-3xl mx-auto px-container-margin">
          <Reveal className="mb-12 text-center">
            <p className="font-inter text-xs uppercase tracking-[0.14em] text-blue font-bold mb-3">
              FAQ
            </p>
            <BrandHeadline
              as="h2"
              segments={[{ text: "Questions about " }, { text: "AIRA", emphasis: true }, { text: "." }]}
              className="text-4xl text-ink"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <FAQAccordion items={AIRA_FAQS} />
          </Reveal>
        </div>
      </section>

      <CTABand
        titleSegments={[
          { text: "See " },
          { text: "AIRA", emphasis: true },
          { text: " in action." },
        ]}
        description="Book a strategy call and we'll walk through how AIRA fits into your existing lead and revenue workflows."
      />
    </main>
  );
}
