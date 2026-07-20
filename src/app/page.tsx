import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import PositioningStrip from "@/components/home/PositioningStrip";
import ValuePropsSticky from "@/components/home/ValuePropsSticky";
import ServiceAreasGrid from "@/components/home/ServiceAreasGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import HowWeWork from "@/components/home/HowWeWork";
import FAQSection from "@/components/home/FAQSection";
import CTABand from "@/components/CTABand";

export const metadata: Metadata = {
  title: "Bloom Matrix | AI-First Product Engineering Company",
  description:
    "Bloom Matrix designs, engineers, and continuously evolves intelligent digital products, enterprise software, and AI-powered platforms — including AIRA, our AI revenue acceleration platform.",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <PositioningStrip />
      <ValuePropsSticky />
      <ServiceAreasGrid />
      <FeaturedProducts />
      <HowWeWork />
      <FAQSection />
      <CTABand />
    </main>
  );
}
