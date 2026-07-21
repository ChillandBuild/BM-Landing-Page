import Link from "next/link";
import LogoLockup from "@/components/brand/LogoLockup";

const NAV_LINKS = [
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-ink mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-start px-container-margin py-14 w-full max-w-7xl mx-auto gap-10">
        <div className="space-y-4 text-left max-w-sm">
          <LogoLockup tone="cream" markSize={30} />
          <p className="font-inter text-sm text-cream/70">
            Building intelligent digital ecosystems. AI-first product engineering for enterprises
            that refuse to stand still.
          </p>
          <div className="mt-4 space-y-2 font-inter text-xs text-cream/70">
            <div className="flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FF6B4A"
                strokeWidth="2"
                aria-hidden
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              <a
                href="mailto:bloommatrixtech@gmail.com"
                className="hover:text-cream transition-colors"
              >
                bloommatrixtech@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FF6B4A"
                strokeWidth="2"
                aria-hidden
              >
                <path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
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
                className="text-cream/70 font-inter text-xs uppercase tracking-wider hover:text-cream transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <span className="text-cream/70 font-inter text-xs uppercase tracking-wider">
              Privacy
            </span>
            <span className="text-cream/70 font-inter text-xs uppercase tracking-wider">Terms</span>
          </div>
          <span className="font-inter text-[11px] text-cream/50 tracking-wide">
            © 2026 Bloom Matrix. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
