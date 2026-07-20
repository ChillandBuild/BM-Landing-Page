import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import AiraLiveSimulation from "@/components/AiraLiveSimulation";
import FAQAccordion from "@/components/FAQAccordion";
import CTABand from "@/components/CTABand";
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
      <PageHero eyebrow="Flagship Product" title={AIRA.name} description={AIRA.tagline} />

      <section className="bg-paper py-24">
        <div className="max-w-5xl mx-auto px-container-margin grid lg:grid-cols-2 gap-12 items-start">
          <Reveal>
            <h2 className="font-display text-3xl text-ink-dark mb-4">
              Turn every enquiry into revenue activity.
            </h2>
            <p className="font-inter text-ink-dark-muted leading-relaxed mb-8">{AIRA.description}</p>
            <ul className="space-y-3">
              {AIRA.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-accent text-[20px]">
                    check_circle
                  </span>
                  <span className="font-inter text-ink-dark">{feature}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15}>
            <AiraLiveSimulation />
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-24 border-t border-border-light">
        <div className="max-w-3xl mx-auto px-container-margin">
          <Reveal className="mb-12 text-center">
            <p className="font-inter text-xs uppercase tracking-[0.2em] text-accent mb-3">FAQ</p>
            <h2 className="font-display text-4xl text-ink-dark">Questions about AIRA.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <FAQAccordion items={AIRA_FAQS} />
          </Reveal>
        </div>
      </section>

      <CTABand
        title={
          <>
            See <span className="text-gradient-indigo">AIRA</span> in action.
          </>
        }
        description="Book a strategy call and we'll walk through how AIRA fits into your existing lead and revenue workflows."
      />
    </main>
  );
}
