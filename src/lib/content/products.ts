export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  href: string;
};

export const AIRA: Product = {
  slug: "aira",
  name: "AIRA",
  tagline: "AI-Powered Revenue Acceleration Platform",
  description:
    "AIRA is Bloom Matrix's flagship product — a multi-tenant SaaS platform that turns inbound enquiries into qualified, routed, and logged revenue activity. It combines intelligent customer engagement, omnichannel communication, CRM capabilities, lead management, AI assistants, AI telecalling, and workflow automation in one system, with each customer managing their own communication channels and business data.",
  features: [
    "Intelligent Customer Engagement",
    "Omnichannel Communication",
    "CRM & Lead Management",
    "AI Assistants & AI Telecalling",
    "Manual Telecalling Tools",
    "Analytics & Workflow Automation",
    "Third-Party Integrations",
  ],
  href: "/products/aira",
};

export const ASTROTAMIL: Product = {
  slug: "astrotamil",
  name: "AstroTamil",
  tagline: "Consumer Technology Platform",
  description:
    "AstroTamil is a consumer technology platform delivering spirituality, lifestyle, and personalized digital experiences — built as part of Bloom Matrix's broader consumer technology and digital ecosystem work.",
  features: ["Personalized Digital Experiences", "Lifestyle & Spirituality Content", "Consumer-First Design"],
  href: "/products",
};

export const PRODUCTS: Product[] = [AIRA, ASTROTAMIL];
