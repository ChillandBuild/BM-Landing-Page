"use client";

import React, { useState } from "react";

const initialFormData = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  projectType: "",
  description: "",
};

export default function ContactForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [budget, setBudget] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — real users never fill this
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) {
      setError("Please fill in your Full Name and Email Address.");
      return;
    }
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, budget, website }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }
      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white border border-border-light rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[400px] gap-6">
        <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
          <span className="material-symbols-outlined text-accent text-[36px]">done</span>
        </div>
        <h2 className="font-display text-2xl text-ink-dark">Inquiry Received</h2>
        <p className="font-inter text-ink-dark-muted max-w-sm">
          Thank you, <span className="text-accent font-semibold">{formData.fullName}</span>. One
          of our engineering leads will reach out to you within the next 24 hours.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setFormData(initialFormData);
            setBudget("");
          }}
          className="text-accent font-semibold hover:underline mt-4 cursor-pointer"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <div id="contact-form" className="bg-white border border-border-light rounded-2xl p-8">
      <h2 className="font-display text-2xl text-ink-dark mb-2">Get in Touch</h2>
      <p className="font-inter text-sm text-ink-dark-muted mb-8">
        Tell us about your project requirements.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Honeypot field — hidden from real users, catches basic bots */}
        <input
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-ink-dark-muted ml-1">Full Name</label>
            <input
              required
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full bg-paper border border-border-light rounded-xl px-4 py-3 text-ink-dark transition-all"
              placeholder="John Doe"
              type="text"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-ink-dark-muted ml-1">Company</label>
            <input
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className="w-full bg-paper border border-border-light rounded-xl px-4 py-3 text-ink-dark transition-all"
              placeholder="TechCorp"
              type="text"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-ink-dark-muted ml-1">Email Address</label>
            <input
              required
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-paper border border-border-light rounded-xl px-4 py-3 text-ink-dark transition-all"
              placeholder="john@example.com"
              type="email"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-ink-dark-muted ml-1">Phone Number</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full bg-paper border border-border-light rounded-xl px-4 py-3 text-ink-dark transition-all"
              placeholder="+1 (555) 000-0000"
              type="tel"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-ink-dark-muted ml-1">Project Type</label>
          <select
            name="projectType"
            value={formData.projectType}
            onChange={handleInputChange}
            className="w-full bg-paper border border-border-light rounded-xl px-4 py-3 text-ink-dark transition-all appearance-none cursor-pointer"
          >
            <option value="">Select an option</option>
            <option value="ai-agents">AI Agents & Automation</option>
            <option value="product-engineering">Product Engineering</option>
            <option value="saas-platform">SaaS Platform</option>
            <option value="data-analytics">Data & Analytics</option>
            <option value="other">Something Else</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-ink-dark-muted ml-1">Budget Range</label>
          <div className="grid grid-cols-3 gap-2">
            {["$10k-$50k", "$50k-$200k", "$200k+"].map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setBudget(range)}
                className={`py-2 rounded-lg text-xs border transition-all cursor-pointer ${
                  budget === range
                    ? "border-accent bg-accent/10 text-accent font-bold"
                    : "border-border-light text-ink-dark-muted hover:border-accent/50"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-ink-dark-muted ml-1">Project Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full bg-paper border border-border-light rounded-xl px-4 py-3 text-ink-dark transition-all resize-none"
            placeholder="Briefly describe your vision..."
            rows={4}
          />
        </div>

        {error && <p className="text-sm text-error font-inter">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-indigo text-ink py-4 rounded-2xl font-bold hover:opacity-90 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              Sending…
              <div className="w-5 h-5 border-2 border-ink border-t-transparent rounded-full animate-spin" />
            </>
          ) : (
            <>
              Schedule Consultation
              <span className="material-symbols-outlined">rocket_launch</span>
            </>
          )}
        </button>

        <p className="text-center text-xs text-ink-dark-muted/70 px-4">
          By submitting, you agree to our privacy policy and consent to technical analysis of your
          inquiry.
        </p>
      </form>
    </div>
  );
}
