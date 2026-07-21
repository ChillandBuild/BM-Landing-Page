import Reveal from "@/components/Reveal";
import FAQAccordion from "@/components/FAQAccordion";
import BrandHeadline from "@/components/brand/BrandHeadline";
import { HOME_FAQS } from "@/lib/content/faqs";

export default function FAQSection() {
  return (
    <section className="bg-cream py-24 border-t border-ink/10">
      <div className="max-w-3xl mx-auto px-container-margin">
        <Reveal className="mb-12 text-center">
          <p className="font-inter text-xs uppercase tracking-[0.14em] text-blue font-bold mb-3">
            FAQ
          </p>
          <BrandHeadline
            as="h2"
            segments={[
              { text: "Common questions about " },
              { text: "Bloom Matrix", emphasis: true },
              { text: "." },
            ]}
            className="text-4xl text-ink"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <FAQAccordion items={HOME_FAQS} />
        </Reveal>
      </div>
    </section>
  );
}
