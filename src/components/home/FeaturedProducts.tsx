import Link from "next/link";
import Reveal from "@/components/Reveal";
import AiraLiveSimulation from "@/components/AiraLiveSimulation";
import { AIRA, ASTROTAMIL } from "@/lib/content/products";

export default function FeaturedProducts() {
  return (
    <section className="bg-paper py-24 border-t border-border-light">
      <div className="max-w-7xl mx-auto px-container-margin">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <Reveal>
            <p className="font-inter text-xs uppercase tracking-[0.2em] text-accent mb-3">
              Flagship Product
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-ink-dark mb-4">{AIRA.name}</h2>
            <p className="font-inter text-lg text-ink-dark-muted mb-2">{AIRA.tagline}</p>
            <p className="font-inter text-ink-dark-muted leading-relaxed mb-8">
              {AIRA.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={AIRA.href}
                className="bg-gradient-indigo text-white px-6 py-3 rounded-xl font-bold text-center hover:opacity-90 transition-all"
              >
                Explore AIRA
              </Link>
              <Link
                href="/contact"
                className="border border-ink-dark/15 text-ink-dark px-6 py-3 rounded-xl font-bold text-center hover:bg-navy/[0.04] transition-all"
              >
                Book a Strategy Call
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <AiraLiveSimulation />
          </Reveal>
        </div>

        <Reveal>
          <div className="bg-white border border-border-light rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="font-inter text-xs uppercase tracking-[0.2em] text-accent mb-2">
                Also Building
              </p>
              <h3 className="font-display text-2xl text-ink-dark mb-1">{ASTROTAMIL.name}</h3>
              <p className="font-inter text-sm text-ink-dark-muted max-w-xl">
                {ASTROTAMIL.description}
              </p>
            </div>
            <Link
              href="/products"
              className="font-inter font-semibold text-accent hover:underline whitespace-nowrap"
            >
              View all products →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
