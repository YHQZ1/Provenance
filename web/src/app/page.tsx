"use client";

import { useState } from "react";
import Link from "next/link";

const MODULES = [
  {
    id: "MOD-01",
    label: "EPR Compliance",
    title: "Stop guessing your recycling obligations.",
    body: "Feed us your sales data — we handle the rest. Provenance maps every SKU to the right EPR category, calculates your quarterly targets, and generates submission-ready filings for CPCB. What used to take weeks now takes minutes.",
    pills: ["Plastic PWM", "E-Waste", "Battery", "Tyres"],
    preview: "epr",
  },
  {
    id: "MOD-02",
    label: "BRSR Reporting",
    title: "Your BRSR report, written by your data.",
    body: "Every environmental indicator, auto-filled from your operational data. No manual entry, no inconsistencies. Just a clean, SEBI-aligned BRSR disclosure your investors and supply chain partners will trust.",
    pills: ["SEBI Aligned", "Principle 6", "Export Ready"],
    preview: "brsr",
  },
  {
    id: "MOD-03",
    label: "ESG Analytics",
    title: "Know where you stand, and what to fix.",
    body: "See your ESG score against sector benchmarks. Provenance's AI surfaces the highest-leverage improvements — the ones that move your score and unlock better financing terms.",
    pills: ["Peer Benchmarks", "ML Insights", "Green Finance"],
    preview: "analytics",
  },
  {
    id: "MOD-04",
    label: "Audit Defense",
    title: "Every action, timestamped and tamper-proof.",
    body: "When an inspector calls, you're ready. Immutable audit trails, auto-packaged evidence bundles, and full regulatory correspondence history. No scrambling, no gaps.",
    pills: ["Immutable Logs", "Evidence Packs", "Inspection Ready"],
    preview: "audit",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Connect in minutes",
    body: "Sync your ERP, upload a CSV, or use our API. Provenance reads your sales data and gets to work immediately — no complex onboarding, no consultant required.",
  },
  {
    n: "02",
    title: "Obligations calculated",
    body: "AI maps products to EPR categories, calculates recycling targets per regulation, and surfaces gaps before they become penalties. Live. Always up to date.",
  },
  {
    n: "03",
    title: "File once, report always",
    body: "Generate CPCB-ready filings, BRSR disclosures, and investor ESG reports from the same source of truth. No duplication, no errors, no panic.",
  },
];

export default function Landing() {
  const [activeModule, setActiveModule] = useState(0);
  const [email, setEmail] = useState("");

  return (
    <div
      className="bg-white text-neutral-900 antialiased overflow-x-hidden selection:bg-emerald-600 selection:text-white"
      style={{ fontFamily: "'Geist', sans-serif" }}
    >
      {/* ─── NAV ─── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="w-full max-w-screen-2xl mx-auto px-6 md:px-12 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-3 group">
            <div className="w-6 h-6 rounded-md bg-neutral-950 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-sm bg-white" />
            </div>
            <span className="text-[15px] font-semibold tracking-wide uppercase">
              Provenance
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {["Platform", "Solutions", "Customers", "Documentation"].map(
              (l) => (
                <a
                  key={l}
                  href="#"
                  className="text-[13px] font-medium text-neutral-500 hover:text-neutral-950 transition-colors uppercase tracking-widest cursor-pointer"
                >
                  {l}
                </a>
              ),
            )}
          </nav>
          <div className="flex items-center gap-5">
            <Link
              href="/auth"
              className="text-[13px] font-medium text-neutral-500 hover:text-neutral-950 transition-colors hidden sm:block uppercase tracking-widest"
            >
              Sign in
            </Link>
            <Link
              href="/auth"
              className="text-[13px] font-medium bg-neutral-950 text-white rounded-md shadow-sm px-5 py-2.5 hover:bg-neutral-800 transition-colors uppercase tracking-widest"
            >
              Get Access
            </Link>
          </div>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="w-full max-w-screen-2xl mx-auto px-6 md:px-12 pt-40 pb-24">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-3 border border-neutral-200 rounded-full px-4 py-2 mb-8 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span
                className="text-[11px] font-semibold text-neutral-950 uppercase tracking-widest"
                style={{ fontFamily: "'Geist Mono', monospace" }}
              >
                India's standard for EPR & ESG
              </span>
            </div>
            <h1 className="text-[56px] md:text-[72px] font-semibold tracking-tighter leading-[1.05] text-neutral-950 mb-8">
              Compliance. <br />
              <span className="text-emerald-600">Without the chaos.</span>
            </h1>
            <p className="text-[18px] text-neutral-500 leading-relaxed max-w-xl mb-10 font-light">
              Indian SMEs lose crores annually to EPR non-compliance. Not out of
              negligence, but due to systemic complexity. Provenance acts as
              your immutable system of record.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/auth"
                className="bg-neutral-950 text-white rounded-md shadow-sm text-[13px] font-semibold px-8 py-4 hover:bg-neutral-800 transition-colors uppercase tracking-widest inline-block text-center"
              >
                Start Trial
              </Link>
              <button className="border border-neutral-200 rounded-md shadow-sm text-neutral-950 text-[13px] font-semibold px-8 py-4 hover:bg-neutral-50 transition-colors uppercase tracking-widest cursor-pointer">
                View Architecture
              </button>
            </div>
          </div>

          {/* Render-Inspired Soft Hero Widget */}
          <div className="hidden lg:block relative">
            <div className="absolute top-4 -left-4 w-full h-full bg-neutral-100/80 rounded-2xl z-0 border border-neutral-200" />
            <div className="relative z-10 bg-white rounded-2xl border border-neutral-200 shadow-sm p-8 flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span
                    className="text-[11px] font-semibold text-neutral-500 uppercase tracking-widest"
                    style={{ fontFamily: "'Geist Mono', monospace" }}
                  >
                    Live Posture
                  </span>
                </div>
                <span
                  className="text-[11px] font-semibold bg-neutral-100 rounded-md px-2 py-1 text-neutral-950 uppercase tracking-widest"
                  style={{ fontFamily: "'Geist Mono', monospace" }}
                >
                  SYS_OK
                </span>
              </div>

              <div className="flex items-center gap-8 py-2 border-b border-neutral-100 pb-8">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      fill="none"
                      stroke="#f5f5f5"
                      strokeWidth="6"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      fill="none"
                      stroke="#059669"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={`${0.8 * 201} 201`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-neutral-950">
                      80
                    </span>
                  </div>
                </div>
                <div>
                  <p
                    className="text-[11px] text-neutral-500 uppercase tracking-widest mb-2"
                    style={{ fontFamily: "'Geist Mono', monospace" }}
                  >
                    Global ESG Index
                  </p>
                  <p className="text-[15px] font-medium text-neutral-950 mb-3">
                    Top Quartile Performance
                  </p>
                  <div className="flex gap-2">
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 rounded-md px-2 py-1 uppercase tracking-widest font-bold">
                      +12 PTS (YTD)
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "PLASTIC PWM", pct: 87, ok: true },
                  { label: "E-WASTE", pct: 100, ok: true },
                  { label: "BATTERY", pct: 42, ok: false },
                  { label: "TYRES", pct: 95, ok: true },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="border border-neutral-100 rounded-lg bg-neutral-50/50 p-4"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span
                        className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest"
                        style={{ fontFamily: "'Geist Mono', monospace" }}
                      >
                        {item.label}
                      </span>
                      <span
                        className={`text-[10px] font-bold ${item.ok ? "text-emerald-600" : "text-neutral-950"}`}
                        style={{ fontFamily: "'Geist Mono', monospace" }}
                      >
                        {item.pct}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-neutral-200 w-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.ok ? "bg-emerald-600" : "bg-neutral-950"}`}
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-screen-2xl mx-auto px-6 md:px-12 py-12">
        <div className="max-w-3xl mb-16">
          <p className="text-[11px] font-semibold text-emerald-600 uppercase tracking-widest mb-4">
            System Interface
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-neutral-950 leading-[1.1]">
            Your entire compliance posture, materialized in one view.
          </h2>
        </div>

        <div className="border border-neutral-200 rounded-xl bg-white shadow-sm overflow-hidden cursor-default">
          <div className="border-b border-neutral-200 px-6 py-4 flex items-center justify-between bg-neutral-50/80">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-neutral-300" />
              <div className="w-3 h-3 rounded-full bg-neutral-300" />
            </div>
            <div
              className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest bg-white border border-neutral-200 rounded-md px-3 py-1 shadow-sm"
              style={{ fontFamily: "'Geist Mono', monospace" }}
            >
              app.provenance.in / dashboard
            </div>
            <div className="w-6" /> {/* Spacer */}
          </div>

          <div className="flex flex-col md:flex-row min-h-[500px]">
            {/* Sidebar */}
            <div className="w-full md:w-56 border-b md:border-b-0 md:border-r border-neutral-200 py-6 flex flex-col gap-1 bg-neutral-50/50">
              {[
                { label: "Overview", active: true },
                { label: "EPR Obligations", active: false },
                { label: "BRSR Matrix", active: false },
                { label: "Data Pipeline", active: false },
                { label: "Audit Trail", active: false },
                { label: "Configuration", active: false },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`mx-3 px-4 py-2.5 rounded-md text-[12px] font-medium tracking-wide cursor-pointer transition-colors ${
                    item.active
                      ? "bg-white border border-neutral-200 shadow-sm text-neutral-950"
                      : "border border-transparent text-neutral-500 hover:text-neutral-950 hover:bg-neutral-100"
                  }`}
                >
                  {item.label}
                </div>
              ))}
            </div>

            {/* Main Area */}
            <div className="flex-1 p-8 bg-white">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-neutral-950 tracking-tight">
                    FY 2024–25 Telemetry
                  </h2>
                  <p
                    className="text-[11px] text-neutral-500 mt-2 uppercase tracking-widest"
                    style={{ fontFamily: "'Geist Mono', monospace" }}
                  >
                    Last sync: 12.04.2025 · 14:32 IST
                  </p>
                </div>
                <button className="bg-neutral-950 text-white rounded-md shadow-sm text-[11px] font-semibold px-5 py-2.5 hover:bg-neutral-800 transition-colors uppercase tracking-widest cursor-pointer">
                  Generate Filing
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {[
                  {
                    label: "Total Liability",
                    value: "142.6 MT",
                    delta: "Plastics + E-Waste",
                  },
                  {
                    label: "Procured Certs",
                    value: "124.0 MT",
                    delta: "87% Coverage",
                  },
                  {
                    label: "Risk Exposure",
                    value: "₹0",
                    delta: "Within thresholds",
                  },
                ].map((c) => (
                  <div
                    key={c.label}
                    className="p-6 border border-neutral-200 rounded-lg shadow-sm bg-neutral-50/30"
                  >
                    <p
                      className="text-[11px] font-semibold text-neutral-500 uppercase tracking-widest mb-3"
                      style={{ fontFamily: "'Geist Mono', monospace" }}
                    >
                      {c.label}
                    </p>
                    <p className="text-2xl font-semibold tracking-tighter text-neutral-950">
                      {c.value}
                    </p>
                    <p className="text-[11px] font-medium text-emerald-600 mt-2 uppercase tracking-widest">
                      {c.delta}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-[11px] font-semibold text-neutral-950 uppercase tracking-widest mb-4 border-b border-neutral-100 pb-2">
                    Upcoming Deadlines
                  </p>
                  <div className="space-y-3">
                    {[
                      {
                        name: "Plastic EPR Annual",
                        date: "Jun 30, 2025",
                        status: "PENDING",
                      },
                      {
                        name: "E-Waste Q1 Cert",
                        date: "Apr 15, 2025",
                        status: "ACTION REQ",
                      },
                    ].map((d) => (
                      <div
                        key={d.name}
                        className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg shadow-sm bg-white cursor-pointer hover:border-neutral-300 transition-colors"
                      >
                        <div>
                          <p className="text-[13px] font-medium text-neutral-950">
                            {d.name}
                          </p>
                          <p
                            className="text-[11px] text-neutral-500 mt-1"
                            style={{ fontFamily: "'Geist Mono', monospace" }}
                          >
                            {d.date}
                          </p>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-widest ${d.status === "ACTION REQ" ? "bg-neutral-950 text-white" : "bg-neutral-100 text-neutral-600"}`}
                        >
                          {d.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-neutral-950 uppercase tracking-widest mb-4 border-b border-neutral-100 pb-2">
                    Target Acquisition
                  </p>
                  <div className="border border-neutral-200 rounded-lg shadow-sm bg-white p-6">
                    <div className="flex justify-between mb-3">
                      <span
                        className="text-[11px] font-semibold text-neutral-500 uppercase tracking-widest"
                        style={{ fontFamily: "'Geist Mono', monospace" }}
                      >
                        Q1 Plastic PWM
                      </span>
                      <span
                        className="text-[11px] font-bold text-emerald-600"
                        style={{ fontFamily: "'Geist Mono', monospace" }}
                      >
                        87%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-neutral-100 w-full mb-6 overflow-hidden">
                      <div className="h-full w-[87%] rounded-full bg-emerald-600" />
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-center">
                      {["Q1", "Q2", "Q3", "Q4"].map((q, i) => (
                        <div key={q} className="bg-neutral-50 rounded-md py-2">
                          <div
                            className={`text-[10px] font-bold mb-1 ${i < 3 ? "text-emerald-600" : "text-neutral-400"}`}
                          >
                            {i < 2 ? "100%" : i === 2 ? "94%" : "0%"}
                          </div>
                          <div className="text-[10px] text-neutral-500 uppercase tracking-widest">
                            {q}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MODULES ─── */}
      <section className="border-t border-neutral-200 bg-neutral-50 w-full max-w-screen-2xl mx-auto px-6 md:px-12 py-32">
        <div className="max-w-3xl mb-12">
          <p className="text-[11px] font-semibold text-emerald-600 uppercase tracking-widest mb-4">
            Core Architecture
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-neutral-950 leading-[1.1]">
            Everything required. <br /> Nothing extraneous.
          </h2>
        </div>

        <div className="flex gap-3 mb-12 flex-wrap pb-4">
          {MODULES.map((mod, i) => (
            <button
              key={i}
              onClick={() => setActiveModule(i)}
              className={`px-5 py-2.5 rounded-md text-[12px] font-bold uppercase tracking-widest transition-colors shadow-sm cursor-pointer ${
                activeModule === i
                  ? "bg-neutral-950 text-white border border-neutral-950"
                  : "bg-white border border-neutral-200 text-neutral-500 hover:text-neutral-950 hover:bg-neutral-50"
              }`}
            >
              {mod.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p
              className="inline-block px-3 py-1 bg-white border border-neutral-200 rounded-md shadow-sm text-[11px] font-bold text-neutral-500 mb-6 uppercase tracking-widest"
              style={{ fontFamily: "'Geist Mono', monospace" }}
            >
              {MODULES[activeModule].id}
            </p>
            <h3 className="text-3xl font-semibold tracking-tight text-neutral-950 mb-6 leading-tight">
              {MODULES[activeModule].title}
            </h3>
            <p className="text-[16px] text-neutral-500 leading-relaxed font-light mb-8">
              {MODULES[activeModule].body}
            </p>
            <div className="flex flex-wrap gap-3">
              {MODULES[activeModule].pills.map((p) => (
                <span
                  key={p}
                  className="text-[11px] font-semibold text-neutral-600 bg-neutral-100 rounded-md px-3 py-1.5 uppercase tracking-widest cursor-default"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-8">
            {activeModule === 0 && (
              <div className="space-y-6">
                <p
                  className="text-[10px] font-bold text-neutral-400 border-b border-neutral-100 pb-3"
                  style={{ fontFamily: "'Geist Mono', monospace" }}
                >
                  DATA_PREVIEW // CPCB_FORMAT
                </p>
                {[
                  ["Plastic PWM", "87%", true],
                  ["E-Waste", "100%", true],
                  ["Battery", "42%", false],
                ].map(([name, pct, ok]) => (
                  <div key={String(name)}>
                    <div className="flex justify-between mb-2">
                      <span className="text-[12px] font-medium text-neutral-950">
                        {String(name)}
                      </span>
                      <span
                        className={`text-[12px] font-bold ${ok ? "text-emerald-600" : "text-neutral-950"}`}
                        style={{ fontFamily: "'Geist Mono', monospace" }}
                      >
                        {String(pct)}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-neutral-100 w-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${ok ? "bg-emerald-600" : "bg-neutral-950"}`}
                        style={{ width: String(pct) }}
                      />
                    </div>
                  </div>
                ))}
                <Link
                  href="/auth"
                  className="w-full mt-4 rounded-md bg-emerald-600 text-white text-[11px] font-bold py-3 uppercase tracking-widest text-center block"
                >
                  Initiate CPCB Transfer
                </Link>
              </div>
            )}
            {activeModule === 1 && (
              <div className="space-y-4">
                <p
                  className="text-[10px] font-bold text-neutral-400 border-b border-neutral-100 pb-3 mb-4"
                  style={{ fontFamily: "'Geist Mono', monospace" }}
                >
                  BRSR_OUTPUT // SEC_B
                </p>
                {[
                  "Energy consumed (GJ)",
                  "Water withdrawal (KL)",
                  "Waste generated (MT)",
                  "Scope 1 GHG (tCO₂e)",
                ].map((row) => (
                  <div
                    key={row}
                    className="flex justify-between items-center py-2.5 border-b border-neutral-100 last:border-0"
                  >
                    <span className="text-[13px] text-neutral-600">{row}</span>
                    <span className="text-[10px] font-bold text-neutral-950 bg-neutral-100 rounded-md px-2 py-1 uppercase tracking-widest">
                      MAPPED
                    </span>
                  </div>
                ))}
              </div>
            )}
            {(activeModule === 2 || activeModule === 3) && (
              <div
                className="flex items-center justify-center h-48 border border-dashed border-neutral-200 rounded-lg bg-neutral-50 text-[11px] text-neutral-400 uppercase tracking-widest"
                style={{ fontFamily: "'Geist Mono', monospace" }}
              >
                Console data available upon integration
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS (STARK BLACK) ─── */}
      <section className="bg-neutral-950 text-white">
        <div className="w-full max-w-screen-2xl mx-auto px-6 md:px-12 py-32">
          <div className="max-w-3xl mb-16">
            <p className="text-[11px] font-semibold text-emerald-500 uppercase tracking-widest mb-4">
              Implementation
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter leading-[1.1]">
              Operational before your next filing deadline.
            </h2>
          </div>

          {/* Switched to Render-style separated cards instead of connected grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map((step) => (
              <div
                key={step.n}
                className="p-10 rounded-xl border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-900 transition-colors shadow-sm cursor-default"
              >
                <span
                  className="text-[12px] text-emerald-500 font-bold block mb-8 border-b border-neutral-800 pb-4"
                  style={{ fontFamily: "'Geist Mono', monospace" }}
                >
                  STEP_{step.n}
                </span>
                <h3 className="text-xl font-semibold text-white mb-4 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-[15px] text-neutral-400 leading-relaxed font-light">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="border-t border-neutral-200 bg-white">
        <div className="w-full max-w-screen-2xl mx-auto px-6 md:px-12 py-32">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-neutral-950 leading-[1.1] mb-6">
              Establish control. <br /> Connect your data today.
            </h2>
            <p className="text-[16px] text-neutral-500 font-light leading-relaxed mb-10">
              Deploy Provenance in your environment. No credit card required for
              initial mapping and index generation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="email"
                placeholder="USER@ENTERPRISE.COM"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 text-[13px] rounded-md px-4 py-4 outline-none border border-neutral-200 focus:border-emerald-600 bg-neutral-50 focus:bg-white text-neutral-950 placeholder-neutral-400 uppercase tracking-widest font-medium transition-colors shadow-sm"
              />
              <Link
                href="/auth"
                className="bg-neutral-950 text-white rounded-md shadow-sm text-[12px] font-bold px-8 py-4 hover:bg-neutral-800 transition-colors uppercase tracking-widest text-center"
              >
                Initialize
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-neutral-200 bg-neutral-50">
        <div className="w-full max-w-screen-2xl mx-auto px-6 md:px-12 py-16">
          <div className="flex flex-col md:flex-row justify-between gap-12">
            <div>
              <div className="flex items-center gap-3 mb-4 cursor-pointer">
                <div className="w-4 h-4 rounded-sm bg-neutral-950" />
                <span className="text-[13px] font-bold uppercase tracking-widest">
                  Provenance
                </span>
              </div>
              <p className="text-[13px] text-neutral-500 max-w-xs leading-relaxed font-light">
                Enterprise-grade EPR & ESG infrastructure.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
              {[
                {
                  heading: "Architecture",
                  links: [
                    "EPR Engine",
                    "BRSR Automator",
                    "Risk Telemetry",
                    "Security",
                  ],
                },
                {
                  heading: "Entity",
                  links: ["About", "Careers", "Documentation", "Contact"],
                },
                {
                  heading: "Legal",
                  links: ["Privacy", "Terms of Service", "DPDPA", "Status"],
                },
              ].map((col) => (
                <div key={col.heading}>
                  <p className="text-[11px] font-bold text-neutral-950 mb-6 uppercase tracking-widest border-b border-neutral-200 pb-2">
                    {col.heading}
                  </p>
                  <ul className="space-y-3">
                    {col.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-[13px] text-neutral-500 hover:text-neutral-950 transition-colors cursor-pointer"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p
              className="text-[11px] text-neutral-400 uppercase tracking-widest"
              style={{ fontFamily: "'Geist Mono', monospace" }}
            >
              © 2026 Provenance Tech // India
            </p>
            <p
              className="text-[11px] text-emerald-600 font-bold uppercase tracking-widest cursor-pointer hover:text-emerald-700 transition-colors"
              style={{ fontFamily: "'Geist Mono', monospace" }}
            >
              SYS_STATUS: ONLINE
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
