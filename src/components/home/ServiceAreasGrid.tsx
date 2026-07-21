import Link from "next/link";
import Reveal from "@/components/Reveal";
import BrandHeadline from "@/components/brand/BrandHeadline";
import { SERVICES } from "@/lib/content/services";

export default function ServiceAreasGrid() {
  return (
    <section className="bg-cream py-24">
      <div className="max-w-7xl mx-auto px-container-margin">
        <Reveal className="max-w-2xl mb-14">
          <p className="font-inter text-xs uppercase tracking-[0.14em] text-blue font-bold mb-3">
            What We Build
          </p>
          <BrandHeadline
            as="h2"
            segments={[
              { text: "Six disciplines, " },
              { text: "one integrated practice", emphasis: true },
              { text: "." },
            ]}
            className="text-4xl md:text-5xl text-ink mb-4"
          />
          <p className="font-inter text-ink/65 leading-relaxed">
            Bloom Matrix is an AI-first product engineering company that designs, builds, and
            evolves AI systems, enterprise software, SaaS platforms, business automation,
            analytics, and consumer technology — one integrated practice, not a patchwork of
            vendors.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10">
          {SERVICES.map((service, index) => (
            <Reveal key={service.slug} delay={Math.min(index * 0.08, 0.32)} className="h-full">
              <div className="bg-cream p-8 hover:bg-blue transition-colors duration-300 h-full group">
                <span className="font-inter text-xs font-bold tracking-[0.14em] text-coral mb-5 block">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <BrandHeadline
                  as="h3"
                  segments={[{ text: service.title }]}
                  className="text-xl text-ink mb-2 group-hover:text-cream transition-colors duration-300"
                />
                <p className="font-inter text-sm text-ink/65 leading-relaxed group-hover:text-cream/80 transition-colors duration-300">
                  {service.shortDescription}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <Link
            href="/services"
            className="font-inter font-semibold text-ink border-b-2 border-blue pb-0.5 hover:border-coral transition-colors"
          >
            See the full services breakdown →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
