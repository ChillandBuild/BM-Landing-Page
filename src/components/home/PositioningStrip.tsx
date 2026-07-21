import Reveal from "@/components/Reveal";
import BrandHeadline from "@/components/brand/BrandHeadline";

export default function PositioningStrip() {
  return (
    <section className="bg-ink py-16">
      <div className="max-w-4xl mx-auto px-container-margin text-center">
        <Reveal>
          <BrandHeadline
            as="p"
            segments={[
              { text: "Not an IT service provider. Not a website agency. " },
              { text: "A single long-term technology partner", emphasis: true },
              { text: " — from idea to deployment, and every evolution after." },
            ]}
            className="text-2xl md:text-3xl text-cream leading-snug"
          />
        </Reveal>
      </div>
    </section>
  );
}
