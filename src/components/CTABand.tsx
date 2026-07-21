import Link from "next/link";
import Reveal from "@/components/Reveal";
import BrandHeadline, { type HeadlineSegment } from "@/components/brand/BrandHeadline";

type CTABandProps = {
  titleSegments?: HeadlineSegment[];
  description?: string;
};

const DEFAULT_TITLE: HeadlineSegment[] = [
  { text: "Let's build something that " },
  { text: "compounds", emphasis: true },
  { text: "." },
];

export default function CTABand({
  titleSegments = DEFAULT_TITLE,
  description = "Book a strategy call and talk through what you're building — no sales script, just an engineering-led conversation.",
}: CTABandProps) {
  return (
    <section className="bg-ink py-24">
      <div className="max-w-3xl mx-auto px-container-margin text-center">
        <Reveal>
          <BrandHeadline
            as="h2"
            segments={titleSegments}
            className="text-4xl md:text-5xl text-cream mb-6"
          />
          <p className="font-inter text-cream/70 mb-10 max-w-xl mx-auto">{description}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="bg-coral text-ink px-8 py-4 rounded-[2px] font-semibold text-center hover:opacity-90 transition-all"
            >
              Start a project
            </Link>
            <Link
              href="/products/aira"
              className="border border-cream/25 text-cream px-8 py-4 rounded-[2px] font-semibold text-center hover:bg-cream/5 transition-all"
            >
              Explore AIRA
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
