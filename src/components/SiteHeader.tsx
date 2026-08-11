"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LogoLockup from "@/components/brand/LogoLockup";

const NAV_LINKS = [
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
];

export default function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        isScrolled ? "bg-cream/95 backdrop-blur-md border-b border-ink/10" : "bg-transparent"
      }`}
    >
      {/*
        Padding matches the hero's content column (ml-[8%] + container-margin)
        rather than centring inside max-w-7xl, so the wordmark's left edge lines
        up with the headline below it. A fixed nudge cannot do this: the two
        bases diverge as the window resizes and cross over around 1920px.
      */}
      <nav className="flex justify-between items-center py-4 w-full px-container-margin md:px-[calc(8%+1.5rem)]">
        <Link
          href="/"
          aria-label="Bloom Matrix home"
          className="hover:opacity-70 transition-opacity"
        >
          {/* Left flag of the hero's cream column, so it always sits on the
              light ground — same ink-tiled silver mark as the footer lockup,
              just on Ink instead of Ink-on-Ink. */}
          <LogoLockup tone="ink" markSize={26} />
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              /* The desktop nav always sits over the hero's dark block — Ink on
                 home, Matrix Blue elsewhere — so it needs light text while the
                 header is transparent. Once scrolling swaps in the cream bar it
                 has to flip back to Ink, or it disappears into it. */
              className={`font-inter font-medium transition-colors ${
                isScrolled ? "text-ink/70 hover:text-ink" : "text-cream/80 hover:text-cream"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            /* The button carries its own ground, so it only needs a border once
               it is Ink-on-Ink against the block. */
            className={`bg-ink text-cream font-inter font-semibold px-5 py-2.5 rounded-[2px] hover:opacity-90 active:scale-95 transition-all ${
              isScrolled ? "" : "ring-1 ring-cream/25"
            }`}
          >
            Contact
          </Link>
        </div>

        <button
          className="md:hidden text-ink p-2"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            aria-hidden
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {isMobileMenuOpen ? (
              <path d="M6 6 L20 20 M20 6 L6 20" />
            ) : (
              <path d="M4 8 H22 M4 13 H22 M4 18 H22" />
            )}
          </svg>
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-cream border-b border-ink/10 flex flex-col items-center py-6 gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-ink/70 font-inter font-medium text-lg hover:text-ink transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="bg-ink text-cream font-inter font-semibold px-8 py-3 rounded-[2px] w-11/12 max-w-xs text-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
