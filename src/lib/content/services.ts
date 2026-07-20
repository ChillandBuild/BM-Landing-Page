export type Service = {
  slug: string;
  title: string;
  icon: string;
  shortDescription: string;
  longDescription: string;
  capabilities: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "artificial-intelligence",
    title: "Artificial Intelligence",
    icon: "neurology",
    shortDescription:
      "AI assistants, conversational AI, and AI agents built to solve real business problems, not chase hype.",
    longDescription:
      "Bloom Matrix designs and engineers AI systems that plug directly into how a business already operates — from conversational AI and voice AI to knowledge systems built on retrieval-augmented generation. Every AI engagement is scoped around measurable business outcomes: faster response times, higher conversion, lower operating cost.",
    capabilities: [
      "AI Assistants & Conversational AI",
      "AI Agents & Automation",
      "Voice AI",
      "Knowledge Systems & LLM Integration",
      "AI Revenue Acceleration",
    ],
  },
  {
    slug: "product-engineering",
    title: "Product Engineering",
    icon: "engineering",
    shortDescription:
      "Enterprise applications, customer platforms, and APIs engineered as long-term products, not one-off projects.",
    longDescription:
      "Software should be treated as a product, not merely a project. Bloom Matrix's product engineering practice covers enterprise applications, customer-facing platforms, business portals, and the API layer that connects them — architected from day one to be scalable, maintainable, and continuously evolving.",
    capabilities: [
      "Enterprise Applications",
      "Customer & Business Platforms",
      "API Design & Architecture",
      "Internal Systems",
      "Platform Engineering",
    ],
  },
  {
    slug: "saas-platforms",
    title: "SaaS Platforms",
    icon: "cloud",
    shortDescription:
      "Scalable, multi-tenant cloud software — CRM, lead management, and revenue platforms built to serve many customers at once.",
    longDescription:
      "Bloom Matrix builds proprietary SaaS architectures designed for multi-tenancy from the ground up — CRM, lead management, customer engagement, and workflow platforms that scale from a handful of customers to an enterprise install base without a rewrite.",
    capabilities: [
      "Multi-Tenant SaaS Architecture",
      "CRM & Lead Management",
      "Customer Engagement Platforms",
      "Revenue & Workflow Platforms",
      "Operational Platforms",
    ],
  },
  {
    slug: "business-automation",
    title: "Business Automation",
    icon: "bolt",
    shortDescription:
      "Automating the workflows that quietly eat the most hours — via AI, APIs, messaging platforms, and CRM automation.",
    longDescription:
      "Most organizations lose time to manual, repetitive internal processes. Bloom Matrix automates those workflows using AI, API integrations, messaging platforms, and CRM automation — so teams spend their time on judgment calls, not data entry.",
    capabilities: [
      "AI-Driven Workflow Automation",
      "API & Messaging Platform Integration",
      "CRM Automation",
      "Internal Business Process Automation",
    ],
  },
  {
    slug: "data-analytics",
    title: "Data & Analytics",
    icon: "monitoring",
    shortDescription:
      "Executive dashboards and decision intelligence that turn operational data into decisions, not just reports.",
    longDescription:
      "Bloom Matrix builds business intelligence and analytics systems that go beyond static reporting — executive dashboards and decision-intelligence tooling designed to surface what a business needs to act on, when it needs to act on it.",
    capabilities: [
      "Business Intelligence",
      "Executive Dashboards",
      "Decision Intelligence",
      "Performance Analytics & Reporting",
    ],
  },
  {
    slug: "consumer-technology",
    title: "Consumer Technology",
    icon: "devices",
    shortDescription:
      "Marketplace platforms and digital ecosystems built directly for consumers, including vernacular applications.",
    longDescription:
      "Beyond enterprise software, Bloom Matrix builds consumer-facing digital ecosystems — marketplace platforms and vernacular applications designed for how consumers actually discover and use technology, exemplified by products like AstroTamil.",
    capabilities: [
      "Marketplace Platforms",
      "Consumer Digital Ecosystems",
      "Vernacular Applications",
      "Personalized Digital Experiences",
    ],
  },
];
