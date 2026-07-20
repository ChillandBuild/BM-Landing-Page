"use client";

import React, { useState } from "react";
import { faqPageSchema, type FAQItem } from "@/lib/schema";

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(items)) }}
      />
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.question}
            className="border border-border-light rounded-xl overflow-hidden bg-white"
          >
            <button
              type="button"
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span className="font-inter font-semibold text-ink-dark">{item.question}</span>
              <span
                className="material-symbols-outlined text-ink-dark-muted transition-transform"
                style={{ transform: isOpen ? "rotate(180deg)" : "none" }}
              >
                expand_more
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-4">
                <p className="font-inter text-sm text-ink-dark-muted leading-relaxed">{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
