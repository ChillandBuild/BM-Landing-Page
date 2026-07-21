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
      <nav className="flex justify-between items-center px-container-margin py-4 w-full max-w-7xl mx-auto">
        <Link href="/" aria-label="Bloom Matrix home">
          <LogoLockup tone="ink" markSize={30} />
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-ink/70 font-inter font-medium hover:text-ink transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="bg-ink text-cream font-inter font-semibold px-5 py-2.5 rounded-[2px] hover:opacity-90 active:scale-95 transition-all"
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
