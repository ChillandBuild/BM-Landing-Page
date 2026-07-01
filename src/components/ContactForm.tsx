"use client";

import React, { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    projectType: "",
    description: "",
  });
  const [budget, setBudget] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBudgetChange = (val: string) => {
    setBudget(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) {
      alert("Please fill in your Full Name and Email Address.");
      return;
    }
    setIsSubmitting(true);
    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="liquid-glass-strong p-8 rounded-[40px] border border-white/20 flex flex-col items-center justify-center text-center min-h-[400px] gap-6 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shadow-[0_0_15px_#10b981]">
          <span className="material-symbols-outlined text-primary text-[36px]">done</span>
        </div>
        <h2 className="font-headline-lg text-headline-lg text-white">Inquiry Received</h2>
        <p className="font-body-md text-white/70 max-w-sm">
          Thank you, <span className="text-primary font-bold">{formData.fullName}</span>. One of our engineering leads will reach out to you within the next 24 hours.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              fullName: "",
              company: "",
              email: "",
              phone: "",
              projectType: "",
              description: "",
            });
            setBudget("");
          }}
          className="text-primary font-semibold hover:underline mt-4 cursor-pointer"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <div id="contact" className="liquid-glass-strong p-8 rounded-[40px] sticky top-28 border border-white/20">
      <h2 className="font-headline-lg text-headline-lg text-white mb-2">Get in Touch</h2>
      <p className="font-body-md text-body-md text-white/60 mb-8">
        Tell us about your project requirements.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-label-sm font-label-sm text-white/80 ml-1">Full Name</label>
            <input
              required
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:bg-white/10 transition-all focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="John Doe"
              type="text"
            />
          </div>
          <div className="space-y-2">
            <label className="text-label-sm font-label-sm text-white/80 ml-1">Company</label>
            <input
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:bg-white/10 transition-all focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="TechCorp"
              type="text"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-label-sm font-label-sm text-white/80 ml-1">Email Address</label>
            <input
              required
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:bg-white/10 transition-all focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="john@example.com"
              type="email"
            />
          </div>
          <div className="space-y-2">
            <label className="text-label-sm font-label-sm text-white/80 ml-1">Phone Number</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:bg-white/10 transition-all focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="+1 (555) 000-0000"
              type="tel"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-label-sm font-label-sm text-white/80 ml-1">Project Type</label>
          <select
            name="projectType"
            value={formData.projectType}
            onChange={handleInputChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:bg-white/10 transition-all appearance-none cursor-pointer focus:border-primary focus:ring-1 focus:ring-primary"
          >
            <option value="" className="bg-surface text-white/50">Select an option</option>
            <option value="custom-software" className="bg-surface text-white">Custom Software Development</option>
            <option value="ai-ml" className="bg-surface text-white">AI & Machine Learning Integration</option>
            <option value="white-label" className="bg-surface text-white">White Label Platform</option>
            <option value="cloud-infra" className="bg-surface text-white">Cloud Infrastructure</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label className="text-label-sm font-label-sm text-white/80 ml-1">Budget Range</label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleBudgetChange("$10k-$50k")}
              className={`py-2 rounded-lg text-label-sm border transition-all cursor-pointer ${
                budget === "$10k-$50k"
                  ? "border-primary bg-primary/20 text-primary font-bold shadow-[0_0_10px_rgba(78,222,163,0.3)]"
                  : "liquid-glass border-white/10 hover:border-primary/50 text-white"
              }`}
            >
              $10k-$50k
            </button>
            <button
              type="button"
              onClick={() => handleBudgetChange("$50k-$200k")}
              className={`py-2 rounded-lg text-label-sm border transition-all cursor-pointer ${
                budget === "$50k-$200k"
                  ? "border-primary bg-primary/20 text-primary font-bold shadow-[0_0_10px_rgba(78,222,163,0.3)]"
                  : "liquid-glass border-white/10 hover:border-primary/50 text-white"
              }`}
            >
              $50k-$200k
            </button>
            <button
              type="button"
              onClick={() => handleBudgetChange("$200k+")}
              className={`py-2 rounded-lg text-label-sm border transition-all cursor-pointer ${
                budget === "$200k+"
                  ? "border-primary bg-primary/20 text-primary font-bold shadow-[0_0_10px_rgba(78,222,163,0.3)]"
                  : "liquid-glass border-white/10 hover:border-primary/50 text-white"
              }`}
            >
              $200k+
            </button>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-label-sm font-label-sm text-white/80 ml-1">Project Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:bg-white/10 transition-all resize-none focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="Briefly describe your vision..."
            rows={4}
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary-container text-on-primary-container py-4 rounded-2xl font-bold text-headline-lg-mobile emerald-bloom hover:scale-[1.02] active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              Connecting...
              <div className="w-5 h-5 border-2 border-on-primary-container border-t-transparent rounded-full animate-spin" />
            </>
          ) : (
            <>
              Schedule Consultation
              <span className="material-symbols-outlined">rocket_launch</span>
            </>
          )}
        </button>
        
        <p className="text-center text-label-sm text-white/40 px-4">
          By submitting, you agree to our privacy policy and consent to technical analysis of your inquiry.
        </p>
      </form>
    </div>
  );
}
