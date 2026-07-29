"use client";

import { useState } from "react";
import { faqPageSchema, type FAQItem } from "@/lib/schema";

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="border-t border-ink/10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(items)) }}
      />
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question} className="border-b border-ink/10">
            <button
              type="button"
              className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer group"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span className="font-inter font-semibold text-ink group-hover:text-oxblood transition-colors">
                {item.question}
              </span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden
                className="shrink-0 text-oxblood transition-transform duration-300"
                style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
              >
                <path d="M9 3 V15 M3 9 H15" />
              </svg>
            </button>
            {isOpen && (
              <div className="pb-5 pr-8">
                <p className="font-inter text-sm text-ink/65 leading-relaxed">{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
