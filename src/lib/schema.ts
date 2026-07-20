const SITE_URL = "https://www.bloommatrix.in";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Bloom Matrix",
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo-bm.svg`,
    email: "bloommatrixtech@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Coimbatore",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    description:
      "Bloom Matrix is an AI-first product engineering and technology company building intelligent digital products, enterprise software, SaaS platforms, and AI-powered business solutions.",
  };
}

export type FAQItem = { question: string; answer: string };

export function faqPageSchema(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export { SITE_URL };
