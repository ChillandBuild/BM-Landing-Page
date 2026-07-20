import Reveal from "@/components/Reveal";

export default function PositioningStrip() {
  return (
    <section className="bg-navy border-t border-border-dark py-16">
      <div className="max-w-4xl mx-auto px-container-margin text-center">
        <Reveal>
          <p className="font-display text-2xl md:text-3xl text-ink leading-snug">
            Not an IT service provider. Not a website agency.{" "}
            <span className="text-ink-muted">
              A single long-term technology partner — from idea to deployment, and every
              evolution after.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
