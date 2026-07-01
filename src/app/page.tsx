import React from "react";
import Header from "@/components/Header";
import AmbientBackground from "@/components/AmbientBackground";
import ContactForm from "@/components/ContactForm";
import LogoBM from "@/components/LogoBM";

export default function Home() {
  return (
    <>
      {/* Premium Cinematic Ambient Background */}
      <AmbientBackground />

      {/* Global Responsive Navigation Header */}
      <Header />

      {/* Main Landing content */}
      <main className="pt-28 pb-20 px-container-margin max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* Left Panel: Hero and Services Bento & Metrics (Col-span 7) */}
        <div className="lg:col-span-7 flex flex-col gap-12 py-4">
          
          {/* Hero Section */}
          <section id="solutions" className="space-y-6">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-mono text-xs tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-primary mr-2 shadow-[0_0_8px_#10b981] animate-pulse"></span>
              Operational Worldwide
            </span>
            <h1 className="font-hanken text-5xl md:text-6xl lg:text-7xl leading-none text-white font-extrabold tracking-tight">
              Building the Future of <span className="text-gradient">Intelligent Software</span>
            </h1>
            <p className="font-inter text-base md:text-lg text-white/60 max-w-xl leading-relaxed">
              Bloom Matrix builds AI-powered SaaS products and intelligent digital platforms that help businesses automate operations, scale with confidence, and unlock new opportunities through cutting-edge technology.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#contact"
                className="liquid-glass border-primary/30 text-primary px-8 py-3.5 rounded-xl font-bold hover:bg-primary/10 transition-all flex items-center gap-2 cursor-pointer"
              >
                Book a Strategy Call
                <span className="material-symbols-outlined text-[18px]">calendar_today</span>
              </a>
              <a
                href="#products"
                className="text-white/80 hover:text-white px-6 py-3.5 rounded-xl font-medium flex items-center gap-2 group transition-all"
              >
                Explore Our Products
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </a>
            </div>
          </section>

          {/* Services Bento Grid */}
          <section className="space-y-4">
            <h3 className="text-white/80 font-hanken text-lg font-semibold tracking-wider uppercase">Services</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="liquid-glass p-6 rounded-2xl hover:scale-[1.03] hover:border-primary/50 transition-all duration-300 cursor-default group">
                <span className="material-symbols-outlined text-primary mb-4 text-[32px] block group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>
                  developer_mode
                </span>
                <h3 className="font-hanken text-xl text-white font-bold mb-2">Product Development</h3>
                <p className="font-inter text-sm text-white/55 leading-relaxed">
                  Full-cycle agile engineering from MVP to global scale SaaS and enterprise solutions.
                </p>
              </div>

              <div className="liquid-glass p-6 rounded-2xl hover:scale-[1.03] hover:border-primary/50 transition-all duration-300 cursor-default group">
                <span className="material-symbols-outlined text-primary mb-4 text-[32px] block group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>
                  branding_watermark
                </span>
                <h3 className="font-hanken text-xl text-white font-bold mb-2">White Label Solutions</h3>
                <p className="font-inter text-sm text-white/55 leading-relaxed">
                  Enterprise-grade platform architectures designed to be rebranded for your own ecosystem.
                </p>
              </div>

              <div className="liquid-glass p-6 rounded-2xl hover:scale-[1.03] hover:border-primary/50 transition-all duration-300 cursor-default group">
                <span className="material-symbols-outlined text-primary mb-4 text-[32px] block group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>
                  hub
                </span>
                <h3 className="font-hanken text-xl text-white font-bold mb-2">Enterprise Partnerships</h3>
                <p className="font-inter text-sm text-white/55 leading-relaxed">
                  Dedicated engineering squads seamlessly integrated with your team for digital transformation.
                </p>
              </div>

              <div className="liquid-glass p-6 rounded-2xl hover:scale-[1.03] hover:border-primary/50 transition-all duration-300 cursor-default group">
                <span className="material-symbols-outlined text-primary mb-4 text-[32px] block group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>
                  support_agent
                </span>
                <h3 className="font-hanken text-xl text-white font-bold mb-2">Product Support</h3>
                <p className="font-inter text-sm text-white/55 leading-relaxed">
                  Continuous 24/7 technical oversight, maintenance, and ongoing optimizations.
                </p>
              </div>
            </div>
          </section>

          {/* Featured Product: Aira Intelligence */}
          <section id="products" className="liquid-glass-strong p-6 rounded-3xl relative overflow-hidden group border border-white/5">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="flex flex-col md:flex-row gap-6 relative z-10">
              <div className="w-full md:w-2/5 aspect-video bg-surface-container rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
                <img
                  alt="Aira Intelligence"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTh0gfSomIAnuBXbvrJp545kiYU4D_XF2EpV31cLPhKFeBPeFqfDYtdl9XgYnhLkP4VT7KGWpQcnql8bsmS9CgGC1PE6yMB2F58xBwIT1m3sEZ1Z56KIjh_YJA8YFQj-UAhjH8j9Yo6bd6vAX4TOvij-itr-fwmeGlkWzqSdBUb00V353ZTSUP25lQJDHzLFTaULadXp220i9JVCUfMubbezi3iaiJ2zwIR6EQidj0c30_uguHRHJmQKIpG2X7StD6c3_DElVNCmS1"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between gap-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-primary font-mono text-[10px] tracking-widest uppercase">FLAGSHIP PRODUCT OF BLOOM MATRIX</span>
                  </div>
                  <h4 className="font-hanken text-2xl text-white font-bold">AIRA</h4>
                  <div className="font-hanken text-sm text-primary font-semibold mt-1">Turn Every Enquiry Into Revenue</div>
                  <p className="font-inter text-sm text-white/60 leading-relaxed mt-1">
                    AIRA helps businesses automate conversations, qualify leads, evaluate telecallers and convert more customers.
                  </p>
                </div>
                <a
                  href="https://aira-ai-mvp.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary font-bold hover:underline gap-1 text-sm group/link mt-2"
                >
                  View AIRA
                  <span className="material-symbols-outlined text-[16px] group-hover/link:translate-x-1 transition-transform">
                    open_in_new
                  </span>
                </a>
              </div>
            </div>
          </section>

        </div>

        {/* Right Panel: Sticky Contact Form (Col-span 5) */}
        <div className="lg:col-span-5">
          <ContactForm />
        </div>

      </main>

      {/* Why Bloom Matrix Section */}
      <section className="max-w-7xl mx-auto px-container-margin py-12 relative z-10">
        <div className="liquid-glass p-8 md:p-12 rounded-[40px] border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -mr-32 -mt-32 pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Highlights List (Col-span 5) */}
            <div className="lg:col-span-5 space-y-8">
              <h2 className="font-hanken text-4xl text-white font-extrabold">Why Bloom Matrix?</h2>
              
              <ul className="space-y-6">
                <li className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mt-1">
                    <span className="material-symbols-outlined text-primary text-[14px]">check</span>
                  </span>
                  <div>
                    <h4 className="font-hanken font-bold text-white/90 text-lg">Deterministic Engineering</h4>
                    <p className="text-white/60 font-inter text-sm leading-relaxed mt-1">
                      Our proprietary framework guarantees performance benchmarks and bulletproof security protocols.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mt-1">
                    <span className="material-symbols-outlined text-primary text-[14px]">check</span>
                  </span>
                  <div>
                    <h4 className="font-hanken font-bold text-white/90 text-lg">Rapid Deployment Cycles</h4>
                    <p className="text-white/60 font-inter text-sm leading-relaxed mt-1">
                      Reduce time-to-market by 40% with our pre-built core architecture modules.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mt-1">
                    <span className="material-symbols-outlined text-primary text-[14px]">check</span>
                  </span>
                  <div>
                    <h4 className="font-hanken font-bold text-white/90 text-lg">Deep Tech Stack</h4>
                    <p className="text-white/60 font-inter text-sm leading-relaxed mt-1">
                      Expertise spanning specialized WebGL, low-latency node networks, and advanced LLM orchestrations.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Right Column: Node Network Infographic (Col-span 7) */}
            <div className="lg:col-span-7 relative h-[520px] w-full hidden lg:block select-none">
              {/* Background Connective SVG Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#4edea3" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                <line x1="310" y1="260" x2="110" y2="76" stroke="url(#line-grad)" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="310" y1="260" x2="510" y2="76" stroke="url(#line-grad)" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="310" y1="260" x2="-26" y2="250" stroke="url(#line-grad)" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="310" y1="260" x2="646" y2="250" stroke="url(#line-grad)" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="310" y1="260" x2="110" y2="428" stroke="url(#line-grad)" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="310" y1="260" x2="510" y2="428" stroke="url(#line-grad)" strokeWidth="2" strokeDasharray="4 4" />
              </svg>

              {/* Center Hub with logo.png */}
              <div className="absolute left-[246px] top-[196px] w-[128px] h-[128px] rounded-full bg-surface border-2 border-primary/40 flex flex-col items-center justify-center z-10 shadow-[0_0_30px_rgba(87,163,173,0.35)] p-4">
                <img src="/images/logo.png" alt="Center Hub Logo" className="h-10 w-auto object-contain" />
                <span className="font-mono text-[8px] font-bold text-primary tracking-widest mt-1 text-center">BLOOM MATRIX</span>
              </div>

              {/* Nodes */}
              {/* 1. SaaS Platforms (Top Left) */}
              <div className="absolute left-0 top-0 w-[220px] h-[76px] liquid-glass p-3 rounded-2xl flex items-start gap-2.5 transition-all hover:scale-[1.03] hover:border-primary/50 cursor-default">
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 text-primary">
                  <span className="material-symbols-outlined text-[18px]">developer_mode</span>
                </div>
                <div>
                  <h4 className="font-hanken font-bold text-xs text-white">SaaS Platforms</h4>
                  <p className="text-white/50 font-inter text-[9px] leading-relaxed mt-0.5">Scalable, secure and high performance business products.</p>
                </div>
                {/* Border Green Dot */}
                <div className="absolute w-3 h-3 rounded-full bg-[#4edea3] border-2 border-[#0c1324] shadow-[0_0_8px_#4edea3] z-20 bottom-[-6px] left-[calc(50%-6px)]" />
              </div>

              {/* 2. White Label Solutions (Top Right) */}
              <div className="absolute right-0 top-0 w-[220px] h-[76px] liquid-glass p-3 rounded-2xl flex items-start gap-2.5 transition-all hover:scale-[1.03] hover:border-primary/50 cursor-default">
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 text-primary">
                  <span className="material-symbols-outlined text-[18px]">sell</span>
                </div>
                <div>
                  <h4 className="font-hanken font-bold text-xs text-white">White Label Solutions</h4>
                  <p className="text-white/50 font-inter text-[9px] leading-relaxed mt-0.5">Fully customizable platforms launched under your brand.</p>
                </div>
                {/* Border Green Dot */}
                <div className="absolute w-3 h-3 rounded-full bg-[#4edea3] border-2 border-[#0c1324] shadow-[0_0_8px_#4edea3] z-20 bottom-[-6px] left-[calc(50%-6px)]" />
              </div>

              {/* 3. Enterprise Grade (Middle Left) */}
              <div className="absolute left-[-20px] top-[212px] w-[220px] h-[76px] liquid-glass p-3 rounded-2xl flex items-start gap-2.5 transition-all hover:scale-[1.03] hover:border-primary/50 cursor-default">
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 text-primary">
                  <span className="material-symbols-outlined text-[18px]">shield</span>
                </div>
                <div>
                  <h4 className="font-hanken font-bold text-xs text-white">Enterprise Grade</h4>
                  <p className="text-white/50 font-inter text-[9px] leading-relaxed mt-0.5">Built for security, compliance and enterprise scale.</p>
                </div>
                {/* Border Green Dot */}
                <div className="absolute w-3 h-3 rounded-full bg-[#4edea3] border-2 border-[#0c1324] shadow-[0_0_8px_#4edea3] z-20 left-[-6px] top-[calc(50%-6px)]" />
              </div>

              {/* 4. Global Infrastructure (Middle Right) */}
              <div className="absolute right-[-20px] top-[212px] w-[220px] h-[76px] liquid-glass p-3 rounded-2xl flex items-start gap-2.5 transition-all hover:scale-[1.03] hover:border-primary/50 cursor-default">
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 text-primary">
                  <span className="material-symbols-outlined text-[18px]">language</span>
                </div>
                <div>
                  <h4 className="font-hanken font-bold text-xs text-white">Global Infrastructure</h4>
                  <p className="text-white/50 font-inter text-[9px] leading-relaxed mt-0.5">High availability across multiple regions with low latency.</p>
                </div>
                {/* Border Green Dot */}
                <div className="absolute w-3 h-3 rounded-full bg-[#4edea3] border-2 border-[#0c1324] shadow-[0_0_8px_#4edea3] z-20 right-[-6px] top-[calc(50%-6px)]" />
              </div>

              {/* 5. Modern Architecture (Bottom Left) */}
              <div className="absolute left-0 bottom-0 w-[220px] h-[92px] liquid-glass p-3 rounded-2xl flex items-start gap-2.5 transition-all hover:scale-[1.03] hover:border-primary/50 cursor-default">
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 text-primary">
                  <span className="material-symbols-outlined text-[18px]">layers</span>
                </div>
                <div>
                  <h4 className="font-hanken font-bold text-xs text-white">Modern Architecture</h4>
                  <p className="text-white/50 font-inter text-[9px] leading-relaxed mt-0.5">Microservices based architecture for maximum flexibility and reliability.</p>
                </div>
                {/* Border Green Dot */}
                <div className="absolute w-3 h-3 rounded-full bg-[#4edea3] border-2 border-[#0c1324] shadow-[0_0_8px_#4edea3] z-20 top-[-6px] left-[calc(50%-6px)]" />
              </div>

              {/* 6. Reliable Support (Bottom Right) */}
              <div className="absolute right-0 bottom-0 w-[220px] h-[92px] liquid-glass p-3 rounded-2xl flex items-start gap-2.5 transition-all hover:scale-[1.03] hover:border-primary/50 cursor-default">
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 text-primary">
                  <span className="material-symbols-outlined text-[18px]">support_agent</span>
                </div>
                <div>
                  <h4 className="font-hanken font-bold text-xs text-white">Reliable Support</h4>
                  <p className="text-white/50 font-inter text-[9px] leading-relaxed mt-0.5">Dedicated support and proactive monitoring 24/7.</p>
                </div>
                {/* Border Green Dot */}
                <div className="absolute w-3 h-3 rounded-full bg-[#4edea3] border-2 border-[#0c1324] shadow-[0_0_8px_#4edea3] z-20 top-[-6px] left-[calc(50%-6px)]" />
              </div>
            </div>

            {/* Mobile Fallback: Grid layout instead of absolute nodes */}
            <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {/* SaaS Platforms */}
              <div className="liquid-glass p-4 rounded-2xl flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 text-primary">
                  <span className="material-symbols-outlined text-[20px]">developer_mode</span>
                </div>
                <div>
                  <h4 className="font-hanken font-bold text-sm text-white">SaaS Platforms</h4>
                  <p className="text-white/50 font-inter text-xs leading-relaxed mt-1">Scalable, secure and high performance business products.</p>
                </div>
              </div>
              
              {/* White Label Solutions */}
              <div className="liquid-glass p-4 rounded-2xl flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 text-primary">
                  <span className="material-symbols-outlined text-[20px]">sell</span>
                </div>
                <div>
                  <h4 className="font-hanken font-bold text-sm text-white">White Label Solutions</h4>
                  <p className="text-white/50 font-inter text-xs leading-relaxed mt-1">Fully customizable platforms launched under your brand.</p>
                </div>
              </div>

              {/* Enterprise Grade */}
              <div className="liquid-glass p-4 rounded-2xl flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 text-primary">
                  <span className="material-symbols-outlined text-[20px]">shield</span>
                </div>
                <div>
                  <h4 className="font-hanken font-bold text-sm text-white">Enterprise Grade</h4>
                  <p className="text-white/50 font-inter text-xs leading-relaxed mt-1">Built for security, compliance and enterprise scale.</p>
                </div>
              </div>

              {/* Global Infrastructure */}
              <div className="liquid-glass p-4 rounded-2xl flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 text-primary">
                  <span className="material-symbols-outlined text-[20px]">language</span>
                </div>
                <div>
                  <h4 className="font-hanken font-bold text-sm text-white">Global Infrastructure</h4>
                  <p className="text-white/50 font-inter text-xs leading-relaxed mt-1">High availability across multiple regions with low latency.</p>
                </div>
              </div>

              {/* Modern Architecture */}
              <div className="liquid-glass p-4 rounded-2xl flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 text-primary">
                  <span className="material-symbols-outlined text-[20px]">layers</span>
                </div>
                <div>
                  <h4 className="font-hanken font-bold text-sm text-white">Modern Architecture</h4>
                  <p className="text-white/50 font-inter text-xs leading-relaxed mt-1">Microservices based architecture for maximum flexibility and reliability.</p>
                </div>
              </div>

              {/* Reliable Support */}
              <div className="liquid-glass p-4 rounded-2xl flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 text-primary">
                  <span className="material-symbols-outlined text-[20px]">support_agent</span>
                </div>
                <div>
                  <h4 className="font-hanken font-bold text-sm text-white">Reliable Support</h4>
                  <p className="text-white/50 font-inter text-xs leading-relaxed mt-1">Dedicated support and proactive monitoring 24/7.</p>
                </div>
              </div>
            </div>

          </div>


        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background/80 backdrop-blur-xl border-t border-white/5 relative z-10 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-start px-container-margin py-12 w-full max-w-7xl mx-auto gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 text-left">
            <LogoBM className="h-6" />
            <p className="font-inter text-sm text-white/40 max-w-sm">
              Building Products. Empowering Businesses. Creating The Future.
            </p>
            <div className="mt-4 space-y-2 font-mono text-xs text-white/50">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary">mail</span>
                <span>info@bloommatrix.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary">support_agent</span>
                <span>support@bloommatrix.com</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
                <span>Coimbatore, Tamil Nadu, India</span>
              </div>
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex flex-col items-start md:items-end gap-6 self-stretch md:self-auto justify-between h-full md:mt-2">
            <div className="flex gap-8">
              <a className="text-on-surface-variant font-mono text-xs hover:text-secondary transition-colors" href="#">
                PRIVACY
              </a>
              <a className="text-on-surface-variant font-mono text-xs hover:text-secondary transition-colors" href="#">
                TERMS
              </a>
              <a className="text-on-surface-variant font-mono text-xs hover:text-secondary transition-colors" href="#">
                SECURITY
              </a>
            </div>
            <span className="font-mono text-[10px] text-white/30 tracking-wider">
              © 2024 BLOOM MATRIX. ALL RIGHTS RESERVED.
            </span>
          </div>

        </div>
      </footer>
    </>
  );
}
