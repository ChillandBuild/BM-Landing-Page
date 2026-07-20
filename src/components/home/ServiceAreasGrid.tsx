import Link from "next/link";
import Reveal from "@/components/Reveal";
import { SERVICES } from "@/lib/content/services";

export default function ServiceAreasGrid() {
  return (
    <section className="bg-paper py-24">
      <div className="max-w-7xl mx-auto px-container-margin">
        <Reveal className="max-w-2xl mb-14">
          <p className="font-inter text-xs uppercase tracking-[0.2em] text-accent mb-3">
            What We Build
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-ink-dark mb-4">
            Six disciplines, one integrated practice.
          </h2>
          <p className="font-inter text-ink-dark-muted leading-relaxed">
            Bloom Matrix is an AI-first product engineering company that designs, builds, and
            evolves AI systems, enterprise software, SaaS platforms, business automation,
            analytics, and consumer technology — one integrated practice, not a patchwork of
            vendors.
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <Reveal key={service.slug} delay={Math.min(index * 0.08, 0.32)}>
              <div className="bg-white border border-border-light rounded-2xl p-6 hover:border-accent/40 transition-colors h-full">
                <span className="material-symbols-outlined text-accent text-[28px] mb-4 block">
                  {service.icon}
                </span>
                <h3 className="font-display text-xl text-ink-dark mb-2">{service.title}</h3>
                <p className="font-inter text-sm text-ink-dark-muted leading-relaxed">
                  {service.shortDescription}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <Link href="/services" className="font-inter font-semibold text-accent hover:underline">
            See the full services breakdown →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
