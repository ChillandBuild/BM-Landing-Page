import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CTABand from "@/components/CTABand";
import { PRODUCTS } from "@/lib/content/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Bloom Matrix's proprietary products: AIRA, the AI-powered revenue acceleration platform, and AstroTamil, a consumer technology platform.",
};

export default function ProductsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Products"
        titleSegments={[
          { text: "Bloom Matrix builds " },
          { text: "its own products", emphasis: true },
          { text: ", too." },
        ]}
        description="Alongside custom engineering for customers, Bloom Matrix designs, owns, and continuously evolves its own proprietary SaaS and consumer technology products."
      />

      <section className="bg-paper py-24">
        <div className="max-w-5xl mx-auto px-container-margin grid md:grid-cols-2 gap-8">
          {PRODUCTS.map((product, index) => (
            <Reveal key={product.slug} delay={index * 0.1}>
              <div className="bg-white border border-border-light rounded-2xl p-8 flex flex-col h-full">
                <p className="font-inter text-xs uppercase tracking-[0.2em] text-accent mb-3">
                  {product.tagline}
                </p>
                <h2 className="font-display text-3xl text-ink-dark mb-4">{product.name}</h2>
                <p className="font-inter text-ink-dark-muted leading-relaxed mb-6 flex-1">
                  {product.description}
                </p>
                <ul className="flex flex-wrap gap-2 mb-6">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className="font-inter text-xs text-ink-dark-muted bg-paper border border-border-light rounded-full px-3 py-1.5"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={product.href}
                  className="font-inter font-semibold text-accent hover:underline"
                >
                  {product.slug === "aira" ? "Explore AIRA →" : "Learn more →"}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABand />
    </main>
  );
}
