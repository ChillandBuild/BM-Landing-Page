import Link from "next/link";
import Reveal from "@/components/Reveal";

type CTABandProps = {
  title?: React.ReactNode;
  description?: string;
};

export default function CTABand({
  title = (
    <>
      Let&apos;s build something that <span className="text-gradient-indigo">compounds</span>.
    </>
  ),
  description = "Book a strategy call and talk through what you're building — no sales script, just an engineering-led conversation.",
}: CTABandProps) {
  return (
    <section className="bg-navy border-t border-border-dark py-24">
      <div className="max-w-3xl mx-auto px-container-margin text-center">
        <Reveal>
          <h2 className="font-display text-4xl md:text-5xl text-ink mb-6">{title}</h2>
          <p className="font-inter text-ink-muted mb-10 max-w-xl mx-auto">{description}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="bg-gradient-indigo text-white px-8 py-4 rounded-xl font-bold text-center hover:opacity-90 transition-all"
            >
              Book a Strategy Call
            </Link>
            <Link
              href="/products/aira"
              className="border border-border-dark text-ink px-8 py-4 rounded-xl font-bold text-center hover:bg-white/5 transition-all"
            >
              Explore AIRA
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
