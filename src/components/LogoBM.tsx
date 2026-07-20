import React from "react";

type LogoBMProps = {
  className?: string;
  variant?: "dark" | "light";
};

export default function LogoBM({ className = "h-8", variant = "dark" }: LogoBMProps) {
  // "dark" = sits on a dark surface → brighter gradient ramp for contrast
  const gradient = variant === "dark" ? "text-gradient-indigo-bright" : "text-gradient-indigo";

  return (
    <div className={`flex items-center ${className}`}>
      <span className={`font-inter font-bold text-base md:text-lg tracking-[0.12em] ${gradient}`}>
        BLOOM MATRIX
      </span>
    </div>
  );
}
