"use client";

import { useState, useEffect } from "react";

export default function ProvenanceLanding() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      title: "Upload Your Data",
      description:
        "Export files from your existing systems — electricity bills, purchase records, fuel logs, sales data.",
      icon: "📤",
    },
    {
      title: "Automatic Conversion",
      description:
        "Our engine transforms raw data into regulator-ready compliance reports in minutes.",
      icon: "⚡",
    },
    {
      title: "Full Traceability",
      description:
        "Every number traces back to its source. Show auditors exactly where each figure came from.",
      icon: "🔍",
    },
  ];

  const metrics = [
    { value: "95%", label: "Time Saved", delay: 0 },
    { value: "100%", label: "Traceable", delay: 100 },
    { value: "<5min", label: "Report Generation", delay: 200 },
  ];

  const problems = [
    "Weeks spent wrestling with spreadsheets",
    "Large consultant fees for manual reporting",
    "Difficulty proving data provenance to auditors",
    "Inconsistent calculations across periods",
    "Risk of regulatory non-compliance",
  ];

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#1a1a1a] font-light antialiased">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@200;300;400;500;600&family=DM+Mono:wght@300;400;500&display=swap");

        :root {
          --primary: #0a4d3c;
          --primary-light: #0d6b50;
          --accent: #d4af37;
          --bg: #fafaf9;
          --text: #1a1a1a;
          --text-light: #666666;
          --border: #e5e5e0;
        }

        body {
          font-family: "Crimson Pro", serif;
        }

        .mono {
          font-family: "DM Mono", monospace;
        }

        .reveal {
          opacity: 0;
          transform: translateY(30px);
          animation: reveal 0.8s ease-out forwards;
        }

        @keyframes reveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .reveal-1 {
          animation-delay: 0.1s;
        }
        .reveal-2 {
          animation-delay: 0.2s;
        }
        .reveal-3 {
          animation-delay: 0.3s;
        }
        .reveal-4 {
          animation-delay: 0.4s;
        }
        .reveal-5 {
          animation-delay: 0.5s;
        }

        .grain {
          position: relative;
          overflow: hidden;
        }

        .grain::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.03;
          pointer-events: none;
        }

        .highlight-line {
          position: relative;
          display: inline-block;
        }

        .highlight-line::after {
          content: "";
          position: absolute;
          bottom: 8px;
          left: 0;
          width: 100%;
          height: 12px;
          background: var(--accent);
          opacity: 0.2;
          z-index: -1;
        }

        .card-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
        }

        .pulse-dot {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fafaf9]/80 backdrop-blur-md border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[var(--primary)] rounded-sm flex items-center justify-center">
              <span className="text-white font-medium text-lg">P</span>
            </div>
            <span className="text-2xl font-light tracking-tight">
              Provenance
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 mono text-sm">
            <a
              href="#features"
              className="hover:text-[var(--primary)] transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="hover:text-[var(--primary)] transition-colors"
            >
              How It Works
            </a>
            <a
              href="#contact"
              className="hover:text-[var(--primary)] transition-colors"
            >
              Contact
            </a>
          </div>
          <button className="px-6 py-2 bg-[var(--primary)] text-white rounded-sm hover:bg-[var(--primary-light)] transition-all duration-300 mono text-sm">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 grain overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[var(--primary)]/5 to-transparent opacity-50"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl">
            <div className="mono text-sm text-[var(--text-light)] mb-6 reveal reveal-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-[var(--accent)] rounded-full pulse-dot"></span>
              COMPLIANCE AUTOMATION FOR INDIAN ENTERPRISES
            </div>

            <h1 className="text-6xl lg:text-7xl xl:text-8xl font-light leading-[1.1] mb-8 reveal reveal-2">
              From <span className="highlight-line font-normal">raw data</span>
              <br />
              to regulator-ready
              <br />
              reports in <span className="italic font-light">minutes</span>
            </h1>

            <p className="text-xl lg:text-2xl text-[var(--text-light)] leading-relaxed mb-12 max-w-2xl reveal reveal-3">
              Provenance transforms your existing purchase records, bills, and
              logs into verified sustainability compliance reports — with full
              traceability and zero guesswork.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 reveal reveal-4">
              <button className="px-8 py-4 bg-[var(--primary)] text-white rounded-sm hover:bg-[var(--primary-light)] transition-all duration-300 mono text-sm font-medium shadow-lg hover:shadow-xl">
                Schedule a Demo
              </button>
              <button className="px-8 py-4 border-2 border-[var(--primary)] text-[var(--primary)] rounded-sm hover:bg-[var(--primary)] hover:text-white transition-all duration-300 mono text-sm font-medium">
                See How It Works
              </button>
            </div>
          </div>

          {/* Floating Metrics */}
          <div className="grid grid-cols-3 gap-6 mt-20 reveal reveal-5">
            {metrics.map((metric, i) => (
              <div
                key={i}
                className="bg-white border border-[var(--border)] p-6 rounded-sm shadow-sm"
                style={{ animationDelay: `${metric.delay}ms` }}
              >
                <div className="text-4xl font-light text-[var(--primary)] mb-2">
                  {metric.value}
                </div>
                <div className="mono text-xs text-[var(--text-light)] uppercase tracking-wider">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-white border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl lg:text-6xl font-light leading-tight mb-6">
                The compliance
                <br />
                <span className="italic">burden</span>
              </h2>
              <p className="text-xl text-[var(--text-light)] leading-relaxed">
                Large Indian companies face mandatory sustainability reporting.
                The data exists — but the manual process is slow, expensive, and
                error-prone.
              </p>
            </div>

            <div className="space-y-4">
              {problems.map((problem, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 bg-[#fafaf9] border border-[var(--border)] rounded-sm hover:border-[var(--primary)]/30 transition-all duration-300"
                >
                  <span className="text-[var(--accent)] text-xl mt-1">✕</span>
                  <span className="text-lg text-[var(--text)]">{problem}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 grain">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-light leading-tight mb-6">
              One platform.
              <br />
              Complete{" "}
              <span className="highlight-line font-normal">traceability</span>.
            </h2>
            <p className="text-xl text-[var(--text-light)] max-w-2xl mx-auto">
              Stop paying consultants for manual work. Generate auditor-approved
              reports automatically.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-white p-10 rounded-sm border border-[var(--border)] card-hover"
              >
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-normal mb-4">{feature.title}</h3>
                <p className="text-[var(--text-light)] text-lg leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="py-24 bg-[var(--primary)] text-white"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-5xl lg:text-6xl font-light leading-tight mb-16 text-center">
            From chaos to clarity
          </h2>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="mono text-sm text-[var(--accent)] font-medium mt-1">
                  01
                </div>
                <div>
                  <h3 className="text-2xl font-normal mb-3">
                    Upload Your Files
                  </h3>
                  <p className="text-white/80 text-lg leading-relaxed">
                    Use the data you already have. No new systems. No migration.
                    Just export from your existing tools.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="mono text-sm text-[var(--accent)] font-medium mt-1">
                  02
                </div>
                <div>
                  <h3 className="text-2xl font-normal mb-3">
                    Automatic Processing
                  </h3>
                  <p className="text-white/80 text-lg leading-relaxed">
                    Provenance maps your data to regulatory requirements.
                    Calculations are consistent, transparent, and verified.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="mono text-sm text-[var(--accent)] font-medium mt-1">
                  03
                </div>
                <div>
                  <h3 className="text-2xl font-normal mb-3">
                    Download Reports
                  </h3>
                  <p className="text-white/80 text-lg leading-relaxed">
                    Get regulator-ready reports with full audit trails. Every
                    number links back to its source document.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-10 rounded-sm">
              <div className="mono text-sm text-[var(--accent)] mb-4">
                TRACEABILITY EXAMPLE
              </div>
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded border border-white/10">
                  <div className="mono text-xs text-white/60 mb-1">
                    CARBON EMISSION (Scope 2)
                  </div>
                  <div className="text-2xl font-light">1,247.6 tCO₂e</div>
                </div>
                <div className="text-sm text-white/60 flex items-center gap-2">
                  <span>↓</span>
                  <span>Traces to</span>
                </div>
                <div className="space-y-2">
                  <div className="bg-white/5 p-3 rounded border border-white/10 text-sm">
                    <span className="mono text-xs text-[var(--accent)]">
                      electricity_bill_march_2024.pdf
                    </span>
                  </div>
                  <div className="bg-white/5 p-3 rounded border border-white/10 text-sm">
                    <span className="mono text-xs text-[var(--accent)]">
                      fuel_purchase_Q1_2024.xlsx
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-24 bg-white border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-light leading-tight">
              Built for <span className="italic">compliance</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🔒</span>
              </div>
              <h3 className="text-xl font-normal mb-3">Auditor-Ready</h3>
              <p className="text-[var(--text-light)]">
                Every calculation is transparent and verifiable. Built to pass
                regulatory scrutiny.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⚙️</span>
              </div>
              <h3 className="text-xl font-normal mb-3">Zero Guesswork</h3>
              <p className="text-[var(--text-light)]">
                No assumptions. No manual entry errors. Only your actual data,
                properly calculated.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-xl font-normal mb-3">Full Provenance</h3>
              <p className="text-[var(--text-light)]">
                Track every number back to its source. Show auditors exactly
                where data came from.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-32 grain bg-[#fafaf9]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-5xl lg:text-6xl font-light leading-tight mb-8">
            Stop losing weeks
            <br />
            to <span className="highlight-line font-normal">spreadsheets</span>
          </h2>
          <p className="text-xl text-[var(--text-light)] mb-12 max-w-2xl mx-auto">
            See how Provenance can transform your compliance reporting workflow.
            Schedule a personalized demo with our team.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="px-10 py-5 bg-[var(--primary)] text-white rounded-sm hover:bg-[var(--primary-light)] transition-all duration-300 mono text-sm font-medium shadow-lg hover:shadow-xl">
              Book Your Demo
            </button>
            <button className="px-10 py-5 border-2 border-[var(--text-light)] text-[var(--text)] rounded-sm hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all duration-300 mono text-sm font-medium">
              Request Info
            </button>
          </div>

          <div className="mono text-sm text-[var(--text-light)]">
            Join companies across India automating their compliance reporting
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--primary)] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white rounded-sm flex items-center justify-center">
                  <span className="text-[var(--primary)] font-medium text-lg">
                    P
                  </span>
                </div>
                <span className="text-2xl font-light">Provenance</span>
              </div>
              <p className="text-white/70 leading-relaxed max-w-sm">
                Transforming sustainability compliance reporting for Indian
                enterprises through automation and traceability.
              </p>
            </div>

            <div>
              <h4 className="font-normal text-lg mb-4">Product</h4>
              <ul className="space-y-2 mono text-sm text-white/70">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-normal text-lg mb-4">Company</h4>
              <ul className="space-y-2 mono text-sm text-white/70">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="mono text-sm text-white/60">
              © 2025 Provenance. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
