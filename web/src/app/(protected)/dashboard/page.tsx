"use client";
import { SidebarToggle } from "@/app/components/Sidebar";

// ─── Data ─────────────────────────────────────────────────────────────────────

const EPR_ROWS = [
  { name: "Plastic PWM", pct: 87, variant: "ok" as const },
  { name: "E-Waste", pct: 100, variant: "full" as const },
  { name: "Battery", pct: 42, variant: "gap" as const },
  { name: "Tyres", pct: 95, variant: "ok" as const },
];

const DEADLINES = [
  {
    name: "Plastic EPR annual filing",
    date: "Jun 30, 2025",
    status: "PENDING" as const,
  },
  {
    name: "E-Waste Q1 certificate",
    date: "Apr 15, 2025",
    status: "ACTION_REQ" as const,
  },
  {
    name: "BRSR FY24 disclosure",
    date: "Sep 30, 2025",
    status: "PENDING" as const,
  },
  { name: "Battery Q4 return", date: "Jan 31, 2025", status: "FILED" as const },
];

const SCOPE_ROWS = [
  { label: "Scope 1", sub: "Fuel combustion", value: "38.4", pct: 11 },
  { label: "Scope 2", sub: "Grid electricity", value: "91.2", pct: 26 },
  { label: "Scope 3", sub: "Purchased goods proxy", value: "214.7", pct: 63 },
];

const BRSR_ROWS = [
  { label: "Energy consumed", value: "1,842", unit: "GJ" },
  { label: "Water withdrawal", value: "3,210", unit: "KL" },
  { label: "Waste generated", value: "58.6", unit: "MT" },
  { label: "Renewable share", value: "34", unit: "%" },
];

const ACTIVITY = [
  {
    id: "ACT-0041",
    text: "Plastic EPR Q3 certificate uploaded and verified",
    time: "Today · 09:12 IST",
    variant: "ok" as const,
  },
  {
    id: "ACT-0040",
    text: "Battery obligation gap detected — 58% short of target",
    time: "Yesterday · 16:44 IST",
    variant: "warn" as const,
  },
  {
    id: "ACT-0039",
    text: "BRSR Scope 2 emission factor updated to BEE v2.4",
    time: "Mar 14 · 11:05 IST",
    variant: "info" as const,
  },
  {
    id: "ACT-0038",
    text: "GST purchase register parsed — 2,841 line items",
    time: "Mar 12 · 08:30 IST",
    variant: "ok" as const,
  },
  {
    id: "ACT-0037",
    text: "E-Waste target reached — 100% coverage confirmed",
    time: "Mar 10 · 14:22 IST",
    variant: "ok" as const,
  },
  {
    id: "ACT-0036",
    text: "Tyre EPR Q2 reconciliation complete",
    time: "Mar 08 · 10:15 IST",
    variant: "info" as const,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusPill({
  status,
}: {
  status: "PENDING" | "ACTION_REQ" | "FILED";
}) {
  const base =
    "text-[10px] font-bold rounded-md px-2 py-1 uppercase tracking-widest flex-shrink-0";
  if (status === "ACTION_REQ")
    return (
      <span className={`${base} bg-neutral-950 text-white`}>Action req</span>
    );
  if (status === "FILED")
    return (
      <span
        className={`${base} text-emerald-700 border border-emerald-200 bg-emerald-50`}
      >
        Filed
      </span>
    );
  return (
    <span
      className={`${base} text-neutral-400 border border-neutral-200 bg-neutral-50`}
    >
      Pending
    </span>
  );
}

function ActivityDot({ variant }: { variant: "ok" | "warn" | "info" }) {
  const base = "w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[5px]";
  if (variant === "ok") return <span className={`${base} bg-emerald-500`} />;
  if (variant === "warn") return <span className={`${base} bg-neutral-950`} />;
  return <span className={`${base} bg-neutral-300`} />;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  return (
    // Geist is loaded globally via next/font — no inline fontFamily needed
    <div className="flex flex-col h-screen overflow-hidden bg-[#f7f7f6] antialiased selection:bg-emerald-600 selection:text-white">
      {/* ════ Topbar ════ */}
      <div className="flex-shrink-0 h-[56px] border-b border-neutral-200 bg-white flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <SidebarToggle />
          <div className="w-px h-4 bg-neutral-200" />
          <span
            className="text-[11px] font-bold text-neutral-400 uppercase tracking-[0.16em]"
            style={{
              fontFamily: "var(--font-geist-mono, 'Geist Mono', monospace)",
            }}
          >
            Overview
          </span>
          <span className="text-neutral-300 text-xs">·</span>
          <span
            className="text-[10px] text-neutral-400 uppercase tracking-widest"
            style={{
              fontFamily: "var(--font-geist-mono, 'Geist Mono', monospace)",
            }}
          >
            FY 2024–25
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span
            className="text-[10px] text-neutral-400 uppercase tracking-widest hidden md:block"
            style={{
              fontFamily: "var(--font-geist-mono, 'Geist Mono', monospace)",
            }}
          >
            16.03.2026 · 09:41 IST
          </span>
          <div className="w-px h-4 bg-neutral-200" />
          <span
            className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 uppercase tracking-widest"
            style={{
              fontFamily: "var(--font-geist-mono, 'Geist Mono', monospace)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            SYS_ONLINE
          </span>
          <div className="w-px h-4 bg-neutral-200" />
          <button
            className="text-[13px] font-bold text-neutral-400 hover:text-neutral-700 uppercase tracking-widest transition-colors cursor-pointer"
            style={{
              fontFamily: "var(--font-geist-mono, 'Geist Mono', monospace)",
            }}
          >
            Export →
          </button>
          <button className="bg-neutral-950 hover:bg-neutral-800 text-white rounded-lg shadow-sm px-4 py-2 text-[13px] font-bold uppercase tracking-widest transition-colors cursor-pointer">
            Generate filing
          </button>
        </div>
      </div>

      {/* ════ Stat bar ════ */}
      <div className="flex-shrink-0 border-b border-neutral-200 bg-white grid grid-cols-4 divide-x divide-neutral-100">
        {[
          {
            n: "01",
            label: "EPR liability",
            value: "142.6 MT",
            sub: "Plastics · E-Waste · Battery",
            accent: false,
          },
          {
            n: "02",
            label: "Certs procured",
            value: "124.0 MT",
            sub: "87% coverage",
            accent: true,
          },
          {
            n: "03",
            label: "Risk exposure",
            value: "₹0",
            sub: "Within thresholds",
            accent: true,
          },
          {
            n: "04",
            label: "ESG index",
            value: "80 / 100",
            sub: "+12 pts YTD",
            accent: true,
          },
        ].map((s) => (
          <div key={s.n} className="px-6 py-4 flex items-center gap-4">
            <span
              className="text-[10px] font-bold text-neutral-100 select-none flex-shrink-0"
              style={{
                fontFamily: "var(--font-geist-mono, 'Geist Mono', monospace)",
              }}
            >
              {s.n}
            </span>
            <div className="min-w-0">
              <p
                className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-1 truncate"
                style={{
                  fontFamily: "var(--font-geist-mono, 'Geist Mono', monospace)",
                }}
              >
                {s.label}
              </p>
              <p className="text-[22px] font-semibold text-neutral-950 tracking-tight leading-none mb-1">
                {s.value}
              </p>
              <p
                className={`text-[11px] font-bold uppercase tracking-widest truncate ${s.accent ? "text-emerald-600" : "text-neutral-400"}`}
                style={{
                  fontFamily: "var(--font-geist-mono, 'Geist Mono', monospace)",
                }}
              >
                {s.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ════ Body ════ */}
      <div className="flex-1 overflow-hidden grid grid-cols-[1fr_360px] divide-x divide-neutral-200">
        {/* ── Left ── */}
        <div className="overflow-y-auto divide-y divide-neutral-100">
          {/* EPR */}
          <section className="p-6 bg-white">
            <div className="flex items-baseline justify-between mb-5">
              <p
                className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest"
                style={{
                  fontFamily: "var(--font-geist-mono, 'Geist Mono', monospace)",
                }}
              >
                EPR target acquisition
              </p>
              <button
                className="text-[11px] font-bold text-neutral-400 hover:text-emerald-600 uppercase tracking-widest transition-colors cursor-pointer"
                style={{
                  fontFamily: "var(--font-geist-mono, 'Geist Mono', monospace)",
                }}
              >
                View all →
              </button>
            </div>

            <div className="flex flex-col">
              {EPR_ROWS.map((row) => (
                <div
                  key={row.name}
                  className="grid items-center gap-4 py-4 border-b border-neutral-100 last:border-0"
                  style={{ gridTemplateColumns: "120px 1fr 52px 52px" }}
                >
                  <span className="text-[14px] font-medium text-neutral-700">
                    {row.name}
                  </span>
                  <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${row.variant === "gap" ? "bg-neutral-950" : "bg-emerald-500"}`}
                      style={{ width: `${row.pct}%` }}
                    />
                  </div>
                  <span
                    className={`text-[13px] font-bold tabular-nums text-right ${row.variant === "gap" ? "text-neutral-950" : "text-emerald-600"}`}
                    style={{
                      fontFamily:
                        "var(--font-geist-mono, 'Geist Mono', monospace)",
                    }}
                  >
                    {row.pct}%
                  </span>
                  <div className="flex justify-end">
                    {row.variant === "gap" && (
                      <span
                        className="text-[10px] font-bold bg-neutral-950 text-white rounded-md px-1.5 py-0.5 uppercase tracking-widest"
                        style={{
                          fontFamily:
                            "var(--font-geist-mono, 'Geist Mono', monospace)",
                        }}
                      >
                        GAP
                      </span>
                    )}
                    {row.variant === "full" && (
                      <span
                        className="text-[10px] font-bold border border-emerald-200 text-emerald-700 bg-emerald-50 rounded-md px-1.5 py-0.5 uppercase tracking-widest"
                        style={{
                          fontFamily:
                            "var(--font-geist-mono, 'Geist Mono', monospace)",
                        }}
                      >
                        FULL
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* GHG + BRSR */}
          <section className="grid grid-cols-2 divide-x divide-neutral-100">
            <div className="p-6 bg-white">
              <div className="flex items-baseline justify-between mb-5">
                <p
                  className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest"
                  style={{
                    fontFamily:
                      "var(--font-geist-mono, 'Geist Mono', monospace)",
                  }}
                >
                  GHG emissions
                </p>
                <button
                  className="text-[11px] font-bold text-neutral-400 hover:text-emerald-600 uppercase tracking-widest transition-colors cursor-pointer"
                  style={{
                    fontFamily:
                      "var(--font-geist-mono, 'Geist Mono', monospace)",
                  }}
                >
                  Detail →
                </button>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-[38px] font-bold text-neutral-950 tracking-tighter leading-none">
                    344.3
                  </span>
                  <span className="text-[14px] text-neutral-400 font-medium">
                    tCO₂e
                  </span>
                </div>
                <p
                  className="text-[11px] text-neutral-400 uppercase tracking-widest font-medium"
                  style={{
                    fontFamily:
                      "var(--font-geist-mono, 'Geist Mono', monospace)",
                  }}
                >
                  2.41 tCO₂e / MT intensity
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {SCOPE_ROWS.map((row, i) => (
                  <div key={row.label}>
                    <div className="flex items-baseline justify-between mb-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-[13px] font-medium text-neutral-600">
                          {row.label}
                        </span>
                        <span className="text-[11px] text-neutral-400">
                          {row.sub}
                        </span>
                      </div>
                      <span
                        className="text-[12px] font-semibold text-neutral-600 tabular-nums"
                        style={{
                          fontFamily:
                            "var(--font-geist-mono, 'Geist Mono', monospace)",
                        }}
                      >
                        {row.value}
                      </span>
                    </div>
                    <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${row.pct}%`,
                          background:
                            i === 0
                              ? "#d4d4d4"
                              : i === 1
                                ? "#a3a3a3"
                                : "#525252",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-white">
              <div className="flex items-baseline justify-between mb-5">
                <p
                  className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest"
                  style={{
                    fontFamily:
                      "var(--font-geist-mono, 'Geist Mono', monospace)",
                  }}
                >
                  BRSR indicators
                </p>
                <button
                  className="text-[11px] font-bold text-neutral-400 hover:text-emerald-600 uppercase tracking-widest transition-colors cursor-pointer"
                  style={{
                    fontFamily:
                      "var(--font-geist-mono, 'Geist Mono', monospace)",
                  }}
                >
                  Matrix →
                </button>
              </div>

              <div className="flex flex-col">
                {BRSR_ROWS.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between py-3.5 border-b border-neutral-100 last:border-0"
                  >
                    <span className="text-[14px] text-neutral-500">
                      {row.label}
                    </span>
                    <span
                      className="text-[14px] font-semibold text-neutral-950 tabular-nums"
                      style={{
                        fontFamily:
                          "var(--font-geist-mono, 'Geist Mono', monospace)",
                      }}
                    >
                      {row.value}
                      <span className="text-[11px] font-normal text-neutral-400 ml-1">
                        {row.unit}
                      </span>
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between px-3 py-2.5 rounded-lg border border-neutral-100 bg-neutral-50">
                <span
                  className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest"
                  style={{
                    fontFamily:
                      "var(--font-geist-mono, 'Geist Mono', monospace)",
                  }}
                >
                  Principle 6
                </span>
                <span
                  className="text-[10px] font-bold text-emerald-700 border border-emerald-200 bg-emerald-50 rounded-md px-2 py-0.5 uppercase tracking-widest"
                  style={{
                    fontFamily:
                      "var(--font-geist-mono, 'Geist Mono', monospace)",
                  }}
                >
                  MAPPED
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* ── Right ── */}
        <div className="overflow-y-auto bg-white divide-y divide-neutral-100">
          <section className="p-6">
            <div className="flex items-baseline justify-between mb-5">
              <p
                className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest"
                style={{
                  fontFamily: "var(--font-geist-mono, 'Geist Mono', monospace)",
                }}
              >
                Deadlines
              </p>
              <button
                className="text-[11px] font-bold text-neutral-400 hover:text-emerald-600 uppercase tracking-widest transition-colors cursor-pointer"
                style={{
                  fontFamily: "var(--font-geist-mono, 'Geist Mono', monospace)",
                }}
              >
                View all →
              </button>
            </div>

            <div className="flex flex-col">
              {DEADLINES.map((d) => (
                <div
                  key={d.name}
                  className="flex items-center justify-between py-3.5 border-b border-neutral-100 last:border-0 group cursor-pointer"
                >
                  <div className="min-w-0 mr-3">
                    <p className="text-[14px] font-medium text-neutral-700 group-hover:text-neutral-950 transition-colors truncate">
                      {d.name}
                    </p>
                    <p
                      className="text-[11px] text-neutral-400 mt-0.5"
                      style={{
                        fontFamily:
                          "var(--font-geist-mono, 'Geist Mono', monospace)",
                      }}
                    >
                      {d.date}
                    </p>
                  </div>
                  <StatusPill status={d.status} />
                </div>
              ))}
            </div>
          </section>

          <section className="p-6">
            <p
              className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-5"
              style={{
                fontFamily: "var(--font-geist-mono, 'Geist Mono', monospace)",
              }}
            >
              Activity log
            </p>

            <div className="flex flex-col">
              {ACTIVITY.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 py-3.5 border-b border-neutral-100 last:border-0"
                >
                  <ActivityDot variant={item.variant} />
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] text-neutral-500 leading-snug">
                      {item.text}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className="text-[10px] text-neutral-300 uppercase tracking-widest"
                        style={{
                          fontFamily:
                            "var(--font-geist-mono, 'Geist Mono', monospace)",
                        }}
                      >
                        {item.id}
                      </span>
                      <span className="text-neutral-200 text-[8px]">·</span>
                      <span
                        className="text-[10px] text-neutral-400 uppercase tracking-widest"
                        style={{
                          fontFamily:
                            "var(--font-geist-mono, 'Geist Mono', monospace)",
                        }}
                      >
                        {item.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
