import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import FAQAccordion from "@/components/FAQAccordion";
import CTABand from "@/components/CTABand";
import BrandHeadline from "@/components/brand/BrandHeadline";
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

      <section className="bg-cream py-24">
        <div className="max-w-4xl mx-auto px-container-margin space-y-16">
          <Reveal>
            <p className="font-inter text-xs uppercase tracking-[0.14em] text-oxblood font-bold mb-3">
              Founding Philosophy
            </p>
            <BrandHeadline
              as="p"
              segments={[
                {
                  text: "Businesses often work with multiple vendors for software, AI, websites, mobile applications, analytics, automation, cloud infrastructure, and product development.",
                },
              ]}
              className="text-2xl md:text-3xl text-ink leading-snug mb-4"
            />
            <p className="font-inter text-ink/65 leading-relaxed max-w-2xl">
              Bloom Matrix removes this fragmentation by becoming a single long-term technology
              partner, capable of delivering complete digital solutions from idea to deployment
              and continuous evolution.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-10">
            <Reveal>
              <p className="font-inter text-xs uppercase tracking-[0.14em] text-oxblood font-bold mb-3">Vision</p>
              <p className="font-inter text-ink/65 leading-relaxed">
                To become a globally recognized technology company building intelligent products
                and digital ecosystems that redefine how businesses and communities interact with
                technology.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-inter text-xs uppercase tracking-[0.14em] text-oxblood font-bold mb-3">Mission</p>
              <p className="font-inter text-ink/65 leading-relaxed">
                To combine artificial intelligence, engineering excellence, and product innovation
                to create scalable digital ecosystems that deliver meaningful business impact.
              </p>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <p className="font-inter text-xs uppercase tracking-[0.14em] text-oxblood font-bold mb-6">
                Core Values
              </p>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-6">
              {CORE_VALUES.map((value, index) => (
                <Reveal key={value.title} delay={index * 0.08}>
                  <div className="bg-cream border border-ink/10 p-6 h-full">
                    <BrandHeadline
                      as="h3"
                      segments={[{ text: value.title }]}
                      className="text-xl text-ink mb-2"
                    />
                    <p className="font-inter text-sm text-ink/65 leading-relaxed">
                      {value.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal>
            <p className="font-inter text-xs uppercase tracking-[0.14em] text-oxblood font-bold mb-6">
              Every Solution Should Be
            </p>
            <div className="flex flex-wrap gap-3">
              {CORE_PHILOSOPHY.map((item) => (
                <span
                  key={item}
                  className="font-inter text-sm text-ink border border-ink/15 rounded-[2px] px-4 py-2"
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-24 border-t border-ink/10">
        <div className="max-w-3xl mx-auto px-container-margin">
          <Reveal className="mb-12 text-center">
            <p className="font-inter text-xs uppercase tracking-[0.14em] text-oxblood font-bold mb-3">FAQ</p>
            <BrandHeadline
              as="h2"
              segments={[{ text: "Questions about " }, { text: "who we are", emphasis: true }, { text: "." }]}
              className="text-4xl text-ink"
            />
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
