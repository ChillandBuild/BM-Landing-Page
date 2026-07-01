"use client";

import React, { useState } from "react";
import LogoBM from "@/components/LogoBM";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-surface/10 backdrop-blur-md border-b border-white/10 shadow-xl z-50">
      <nav className="flex justify-between items-center px-container-margin py-4 w-full max-w-7xl mx-auto">
        {/* Logo */}
        <LogoBM className="h-7 md:h-8" />

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <a
            className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300"
            href="#solutions"
          >
            Solutions
          </a>
          <a
            className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300"
            href="#products"
          >
            Products
          </a>
          <a
            className="text-primary font-bold hover:text-primary transition-colors duration-300"
            href="#contact"
          >
            Contact
          </a>
          <button className="bg-primary-container text-on-primary-container px-6 py-2 rounded-xl font-bold emerald-bloom active:scale-95 transition-all cursor-pointer">
            Launch Console
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-primary p-2 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="material-symbols-outlined text-[28px]">
            {isMobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-surface/95 backdrop-blur-lg border-b border-white/10 flex flex-col items-center py-6 gap-6 shadow-2xl z-45 animate-fade-in">
          <a
            className="text-on-surface-variant font-medium text-lg hover:text-primary transition-colors duration-300"
            href="#solutions"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Solutions
          </a>
          <a
            className="text-on-surface-variant font-medium text-lg hover:text-primary transition-colors duration-300"
            href="#products"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Products
          </a>
          <a
            className="text-primary font-bold text-lg hover:text-primary transition-colors duration-300"
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </a>
          <button
            className="bg-primary-container text-on-primary-container px-8 py-3 rounded-xl font-bold emerald-bloom active:scale-95 transition-all w-11/12 max-w-xs cursor-pointer"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Launch Console
          </button>
        </div>
      )}
    </header>
  );
}
