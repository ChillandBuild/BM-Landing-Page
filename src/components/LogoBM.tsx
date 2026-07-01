import React from "react";

export default function LogoBM({ className = "h-8" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* High-resolution Monogram Image with Transparent Background */}
      <img
        src="/images/logo.png"
        alt="Bloom Matrix Monogram Logo"
        className="h-full w-auto object-contain"
      />
      
      {/* Metallic-gradient text using capital Greek Lambda (Λ) to match Image 1 font */}
      <span className="font-hanken font-extrabold text-base md:text-lg tracking-[0.12em] text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-[#4edea3]">
        BLOOM M&Lambda;TRIX
      </span>
    </div>
  );
}
