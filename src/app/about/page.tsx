import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import FAQAccordion from "@/components/FAQAccordion";
import CTABand from "@/components/CTABand";
import { ABOUT_FAQS } from "@/lib/content/faqs";

export const metadata: Metadata = {
  title: "About",
  description:
    "Bloom Matrix's founding philosophy, vision, mission, and core values — an AI-first product engineering company built to be a long-term technology partner.",
};

const CORE_VALUES = [
  {
    title: "Customer First",
    body: "Customer success drives every technical and business decision.",
  },
  {
    title: "Reliability",
    body: "Dependable technology, built for long-term trust.",
  },
  {
    title: "Long-Term Partnerships",
    body: "Bloom Matrix aims to be a customer's long-term technology partner, not a completer of isolated projects.",
  },
];

const CORE_PHILOSOPHY = [
  "Scalable",
  "Maintainable",
  "Intelligent",
  "User-centric",
  "Secure",
  "Continuously evolving",
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About Bloom Matrix"
        titleSegments={[
          { text: "Technology should create " },
          { text: "new possibilities", emphasis: true },
          { text: ", not just digitize old ones." },
        ]}
        description="Bloom Matrix is an AI-first product engineering and technology company — designing, engineering, deploying, and continuously evolving software that creates long-term business value."
      />

      <section className="bg-paper py-24">
        <div className="max-w-4xl mx-auto px-container-margin space-y-16">
          <Reveal>
            <p className="font-inter text-xs uppercase tracking-[0.2em] text-accent mb-3">
              Founding Philosophy
            </p>
            <p className="font-display text-2xl md:text-3xl text-ink-dark leading-snug mb-4">
              Businesses often work with multiple vendors for software, AI, websites, mobile
              applications, analytics, automation, cloud infrastructure, and product development.
            </p>
            <p className="font-inter text-ink-dark-muted leading-relaxed max-w-2xl">
              Bloom Matrix removes this fragmentation by becoming a single long-term technology
              partner, capable of delivering complete digital solutions from idea to deployment
              and continuous evolution.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-10">
            <Reveal>
              <p className="font-inter text-xs uppercase tracking-[0.2em] text-accent mb-3">Vision</p>
              <p className="font-inter text-ink-dark-muted leading-relaxed">
                To become a globally recognized technology company building intelligent products
                and digital ecosystems that redefine how businesses and communities interact with
                technology.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-inter text-xs uppercase tracking-[0.2em] text-accent mb-3">Mission</p>
              <p className="font-inter text-ink-dark-muted leading-relaxed">
                To combine artificial intelligence, engineering excellence, and product innovation
                to create scalable digital ecosystems that deliver meaningful business impact.
              </p>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <p className="font-inter text-xs uppercase tracking-[0.2em] text-accent mb-6">
                Core Values
              </p>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-6">
              {CORE_VALUES.map((value, index) => (
                <Reveal key={value.title} delay={index * 0.08}>
                  <div className="bg-white border border-border-light rounded-2xl p-6 h-full">
                    <h3 className="font-display text-xl text-ink-dark mb-2">{value.title}</h3>
                    <p className="font-inter text-sm text-ink-dark-muted leading-relaxed">
                      {value.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal>
            <p className="font-inter text-xs uppercase tracking-[0.2em] text-accent mb-6">
              Every Solution Should Be
            </p>
            <div className="flex flex-wrap gap-3">
              {CORE_PHILOSOPHY.map((item) => (
                <span
                  key={item}
                  className="font-inter text-sm text-ink-dark bg-white border border-border-light rounded-full px-4 py-2"
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-24 border-t border-border-light">
        <div className="max-w-3xl mx-auto px-container-margin">
          <Reveal className="mb-12 text-center">
            <p className="font-inter text-xs uppercase tracking-[0.2em] text-accent mb-3">FAQ</p>
            <h2 className="font-display text-4xl text-ink-dark">Questions about who we are.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <FAQAccordion items={ABOUT_FAQS} />
          </Reveal>
        </div>
      </section>

      <CTABand />
    </main>
  );
}
