import Reveal from "@/components/Reveal";
import FAQAccordion from "@/components/FAQAccordion";
import { HOME_FAQS } from "@/lib/content/faqs";

export default function FAQSection() {
  return (
    <section className="bg-paper py-24 border-t border-border-light">
      <div className="max-w-3xl mx-auto px-container-margin">
        <Reveal className="mb-12 text-center">
          <p className="font-inter text-xs uppercase tracking-[0.2em] text-accent mb-3">FAQ</p>
          <h2 className="font-display text-4xl text-ink-dark">Common questions about Bloom Matrix.</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <FAQAccordion items={HOME_FAQS} />
        </Reveal>
      </div>
    </section>
  );
}
