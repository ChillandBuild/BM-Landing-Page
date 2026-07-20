import React from "react";
import Link from "next/link";
import LogoBM from "@/components/LogoBM";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-navy border-t border-border-dark mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-start px-container-margin py-12 w-full max-w-7xl mx-auto gap-10">
        <div className="space-y-4 text-left max-w-sm">
          <LogoBM className="h-6" variant="dark" />
          <p className="font-inter text-sm text-ink-muted">
            Building intelligent digital ecosystems. AI-first product engineering for enterprises that refuse to stand still.
          </p>
          <div className="mt-4 space-y-2 font-inter text-xs text-ink-muted">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-accent-light">mail</span>
              <a href="mailto:bloommatrixtech@gmail.com" className="hover:text-ink transition-colors">
                bloommatrixtech@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-accent-light">location_on</span>
              <span>Coimbatore, Tamil Nadu, India</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end gap-6 self-stretch md:self-auto justify-between">
          <div className="flex flex-wrap gap-6 md:gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-ink-muted font-inter text-xs uppercase tracking-wider hover:text-ink transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a href="#" className="text-ink-muted font-inter text-xs uppercase tracking-wider hover:text-ink transition-colors">
              Privacy
            </a>
            <a href="#" className="text-ink-muted font-inter text-xs uppercase tracking-wider hover:text-ink transition-colors">
              Terms
            </a>
          </div>
          <span className="font-inter text-[11px] text-ink-muted/70 tracking-wide">
            © 2026 Bloom Matrix. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
