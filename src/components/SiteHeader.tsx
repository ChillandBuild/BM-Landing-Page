"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import LogoBM from "@/components/LogoBM";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        isScrolled
          ? "bg-paper/95 backdrop-blur-md border-b border-border-light shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="flex justify-between items-center px-container-margin py-4 w-full max-w-7xl mx-auto">
        <Link href="/" aria-label="Bloom Matrix home">
          <LogoBM className="h-7 md:h-8" variant="light" />
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-ink-dark-muted font-medium hover:text-ink-dark transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="bg-gradient-indigo text-white px-6 py-2.5 rounded-xl font-bold hover:opacity-90 active:scale-95 transition-all"
          >
            Book a Strategy Call
          </Link>
        </div>

        <button
          className="md:hidden text-ink-dark p-2 focus:outline-none"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <span className="material-symbols-outlined text-[28px]">
            {isMobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-paper/98 backdrop-blur-lg border-b border-border-light flex flex-col items-center py-6 gap-6 shadow-2xl">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-ink-dark-muted font-medium text-lg hover:text-ink-dark transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="bg-gradient-indigo text-white px-8 py-3 rounded-xl font-bold w-11/12 max-w-xs text-center active:scale-95 transition-all"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Book a Strategy Call
          </Link>
        </div>
      )}
    </header>
  );
}
