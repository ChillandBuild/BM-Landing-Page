import Link from "next/link";
import Reveal from "@/components/Reveal";
import AiraProductDemo from "@/components/AiraProductDemo";
import BrandHeadline from "@/components/brand/BrandHeadline";
import { AIRA, ASTROTAMIL } from "@/lib/content/products";

export default function FeaturedProducts() {
  return (
    <section className="bg-cream py-24 border-t border-ink/10">
      <div className="max-w-7xl mx-auto px-container-margin">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <Reveal>
            <p className="font-inter text-xs uppercase tracking-[0.14em] text-oxblood font-bold mb-3">
              Flagship Product
            </p>
            <BrandHeadline
              as="h2"
              segments={[{ text: AIRA.name }]}
              className="text-4xl md:text-5xl text-ink mb-4"
            />
            <p className="font-inter text-lg text-ink/65 mb-2">{AIRA.tagline}</p>
            <p className="font-inter text-ink/65 leading-relaxed mb-8">{AIRA.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={AIRA.href}
                className="bg-oxblood text-cream px-6 py-3 rounded-[2px] font-semibold text-center hover:opacity-90 transition-all"
              >
                Explore AIRA
              </Link>
              <Link
                href="/contact"
                className="border border-ink/15 text-ink px-6 py-3 rounded-[2px] font-semibold text-center hover:bg-ink/[0.04] transition-all"
              >
                Start a project
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <AiraProductDemo />
          </Reveal>
        </div>

        <Reveal>
          <div className="border border-ink/10 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="font-inter text-xs uppercase tracking-[0.14em] text-oxblood font-bold mb-2">
                Also Building
              </p>
              <BrandHeadline
                as="h3"
                segments={[{ text: ASTROTAMIL.name }]}
                className="text-2xl text-ink mb-1"
              />
              <p className="font-inter text-sm text-ink/65 max-w-xl">{ASTROTAMIL.description}</p>
            </div>
            <Link
              href="/products"
              className="font-inter font-semibold text-ink border-b-2 border-platinum pb-0.5 hover:border-oxblood transition-colors whitespace-nowrap"
            >
              View all products →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
