import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import FAQAccordion from "@/components/FAQAccordion";
import CTABand from "@/components/CTABand";
import { SERVICES } from "@/lib/content/services";
import { SERVICES_FAQS } from "@/lib/content/faqs";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Bloom Matrix's core service areas: AI agent development, product engineering, SaaS platform engineering, business automation, data & analytics, and consumer technology.",
};

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Services"
        titleSegments={[
          { text: "Six disciplines, " },
          { text: "one integrated engineering practice", emphasis: true },
          { text: "." },
        ]}
        description="Bloom Matrix combines AI, product engineering, SaaS architecture, automation, and data intelligence into a single long-term partnership — not a patchwork of vendors."
      />

      <section className="bg-paper py-24">
        <div className="max-w-5xl mx-auto px-container-margin space-y-20">
          {SERVICES.map((service, index) => (
            <Reveal key={service.slug} delay={Math.min(index * 0.06, 0.24)}>
              <div id={service.slug} className="grid md:grid-cols-[auto_1fr] gap-8 items-start">
                <span className="font-display text-3xl text-accent/50">{`0${index + 1}`}</span>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="material-symbols-outlined text-accent text-[26px]">
                      {service.icon}
                    </span>
                    <h2 className="font-display text-3xl text-ink-dark">{service.title}</h2>
                  </div>
                  <p className="font-inter text-ink-dark-muted leading-relaxed mb-5 max-w-2xl">
                    {service.longDescription}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {service.capabilities.map((capability) => (
                      <li
                        key={capability}
                        className="font-inter text-xs text-ink-dark-muted bg-white border border-border-light rounded-full px-3 py-1.5"
                      >
                        {capability}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-paper py-24 border-t border-border-light">
        <div className="max-w-3xl mx-auto px-container-margin">
          <Reveal className="mb-12 text-center">
            <p className="font-inter text-xs uppercase tracking-[0.2em] text-accent mb-3">FAQ</p>
            <h2 className="font-display text-4xl text-ink-dark">Questions about our services.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <FAQAccordion items={SERVICES_FAQS} />
          </Reveal>
        </div>
      </section>

      <CTABand />
    </main>
  );
}
