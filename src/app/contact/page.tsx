import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a strategy call with Bloom Matrix, or reach us directly at bloommatrixtech@gmail.com — Coimbatore, Tamil Nadu, India.",
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        titleSegments={[
          { text: "Let's talk about " },
          { text: "what you're building", emphasis: true },
          { text: "." },
        ]}
        description="Tell us about your project and one of our engineering leads will follow up within 24 hours."
      />

      <section className="bg-cream py-24">
        <div className="max-w-5xl mx-auto px-container-margin grid lg:grid-cols-[1fr_1.4fr] gap-12">
          <Reveal className="space-y-8">
            <div>
              <p className="font-inter text-xs uppercase tracking-[0.14em] text-oxblood font-bold mb-3">
                Direct Contact
              </p>
              <div className="space-y-3 font-inter text-ink">
                <div className="flex items-center gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7A2331" strokeWidth="2" aria-hidden>
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                  <a href="mailto:bloommatrixtech@gmail.com" className="hover:underline">
                    bloommatrixtech@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7A2331" strokeWidth="2" aria-hidden>
                    <path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                  <span>Coimbatore, Tamil Nadu, India</span>
                </div>
              </div>
            </div>
            <p className="font-inter text-sm text-ink/65 leading-relaxed max-w-sm">
              Bloom Matrix operates as a globally-oriented AI-first technology company, working
              with startups, growing businesses, and enterprises undergoing digital
              transformation.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
