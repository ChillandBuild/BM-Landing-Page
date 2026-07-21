import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CTABand from "@/components/CTABand";
import BrandHeadline from "@/components/brand/BrandHeadline";
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

      <section className="bg-cream py-24">
        <div className="max-w-5xl mx-auto px-container-margin grid md:grid-cols-2 gap-px bg-ink/10">
          {PRODUCTS.map((product, index) => (
            <Reveal key={product.slug} delay={index * 0.1} className="h-full">
              <div className="bg-cream p-8 flex flex-col h-full">
                <p className="font-inter text-xs uppercase tracking-[0.14em] text-blue font-bold mb-3">
                  {product.tagline}
                </p>
                <BrandHeadline
                  as="h2"
                  segments={[{ text: product.name }]}
                  className="text-3xl text-ink mb-4"
                />
                <p className="font-inter text-ink/65 leading-relaxed mb-6 flex-1">
                  {product.description}
                </p>
                <ul className="flex flex-wrap gap-2 mb-6">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className="font-inter text-xs text-ink/70 border border-ink/15 rounded-[2px] px-3 py-1.5"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={product.href}
                  className="font-inter font-semibold text-ink border-b-2 border-blue pb-0.5 hover:border-coral transition-colors self-start"
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
