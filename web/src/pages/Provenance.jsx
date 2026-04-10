/* eslint-disable react-hooks/refs */
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const MODULES = [
  {
    id: "MOD-01",
    label: "EPR Compliance",
    title: "Deterministic CPCB Filings.",
    body: "Transform raw SKUs and packaging data into standardized plastic EPR outputs. Provenance calculates quarterly targets and generates submission-ready draft CSVs. No heuristics, just traceable math.",
    pills: ["Plastic PWM", "E-Waste", "Battery", "Tyres"],
    preview: "epr",
  },
  {
    id: "MOD-02",
    label: "BRSR Reporting",
    title: "BRSR Core assurance requirements.",
    body: "Every environmental indicator, auto-filled from your operational data. We map utilities, fuel logs, and purchase registers directly to SEBI-aligned metrics. Fully reproducible.",
    pills: ["SEBI Aligned", "Principle 6", "Scope 1 & 2"],
    preview: "brsr",
  },
  {
    id: "MOD-03",
    label: "Carbon BOM",
    title: "Scope 3 Proxy Emissions.",
    body: "Generate a product-level Carbon Bill of Materials. Provenance maps purchased goods and explicit transport factors to give you a transparent emissions intensity metric without SaaS dependencies.",
    pills: ["Proxy Emissions", "Intensity Metrics", "Local-First"],
    preview: "analytics",
  },
  {
    id: "MOD-04",
    label: "Audit Provenance",
    title: "Defensible traceability.",
    body: "Every reported number traces back through: KPI → Input Row → Emission Factor → Formula Version. Structured provenance logs ensure you are always audit-defensible.",
    pills: ["KPI Trace", "Versioned Factors", "Immutable Logs"],
    preview: "audit",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Ingest Raw Records",
    body: "Import GST purchase registers, utility consumption, and production output. Provenance normalizes all quantities to base units (kWh, kg, L) automatically.",
  },
  {
    n: "02",
    title: "Apply Deterministic Logic",
    body: "The engine applies explicit, versioned emission factors to your data. No black boxes. Every calculation is transparent and stored in the KPI Trace table.",
  },
  {
    n: "03",
    title: "Generate Defensible Reports",
    body: "Export BRSR Core-aligned tables, Scope 1-3 reports, and CPCB schemas. Everything is backed by an audit-grade provenance log ready for inspection.",
  },
];

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
};

const styles = {
  contentWrapper: {
    maxWidth: 1280,
    margin: "0 auto",
    padding: "0 32px",
    width: "100%",
  },
  navLink: {
    fontSize: 15,
    fontWeight: 500,
    color: "var(--text-muted)",
    textDecoration: "none",
    transition: "color 0.2s",
  },
  btnDark: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--dark)",
    color: "#fff",
    fontSize: 13,
    fontWeight: 500,
    padding: "12px 24px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
    transition: "background 0.2s, transform 0.15s",
  },
  btnOutline: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "transparent",
    color: "var(--text-primary)",
    fontSize: 13,
    fontWeight: 500,
    padding: "12px 24px",
    borderRadius: 8,
    border: "1px solid var(--border)",
    cursor: "pointer",
    textDecoration: "none",
    transition: "border-color 0.2s, background 0.2s",
  },
  btnGreen: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--accent)",
    color: "#fff",
    fontSize: 13,
    fontWeight: 500,
    padding: "12px 24px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
    transition: "background 0.2s, transform 0.15s",
  },
  tag: {
    display: "inline-block",
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    padding: "4px 10px",
    borderRadius: 99,
    border: "1px solid var(--border)",
    color: "var(--text-muted)",
  },
  pill: {
    fontSize: 11,
    fontWeight: 500,
    padding: "6px 12px",
    borderRadius: 6,
    background: "var(--surface)",
    color: "var(--text-secondary)",
    border: "1px solid var(--border)",
  },
  progressBar: {
    height: 3,
    borderRadius: 99,
    background: "var(--border)",
    overflow: "hidden",
  },
  progressFill: (pct, ok = true) => ({
    height: "100%",
    borderRadius: 99,
    background: ok ? "var(--success)" : "var(--dark)",
    width: `${pct}%`,
  }),
};

export default function Landing() {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState(0);
  const [email, setEmail] = useState("");
  const [mounted, setMounted] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleModuleChange = (i) => {
    if (i === activeModule) return;
    setTransitioning(true);
    setTimeout(() => {
      setActiveModule(i);
      setTransitioning(false);
    }, 160);
  };

  const hero = useInView(0.1);
  const dash = useInView(0.1);
  const mods = useInView(0.1);
  const steps = useInView(0.1);
  const cta = useInView(0.1);

  const fadeUpClass = (inView, delay = "") =>
    `fade-up ${inView ? "visible" : ""} ${delay}`.trim();

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "#fff",
        color: "#0a0a0a",
        overflowX: "hidden",
        width: "100%",
      }}
    >
      <style>{`
        .fade-up { opacity: 0; transform: translateY(20px); transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1); }
        .fade-up.visible { opacity: 1; transform: none; }
        .fade-up.d1 { transition-delay: 0.05s; }
        .fade-up.d2 { transition-delay: 0.12s; }
        .fade-up.d3 { transition-delay: 0.19s; }
        .fade-up.d4 { transition-delay: 0.26s; }
        .hero-enter { opacity: 0; transform: translateY(28px); transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1); }
        .hero-enter.mounted { opacity: 1; transform: none; }
        .hero-enter.d1 { transition-delay: 0.1s; }
        .hero-enter.d2 { transition-delay: 0.2s; }
        .hero-enter.d3 { transition-delay: 0.3s; }
        .hero-enter.d4 { transition-delay: 0.45s; }
        .module-preview { opacity: 1; transform: none; transition: opacity 0.16s ease, transform 0.16s ease; }
        .module-preview.out { opacity: 0; transform: translateY(6px); }
        .mod-tab { padding: 10px 20px; border-radius: 8px; font-size: 13px; font-weight: 500; border: 1px solid var(--border); background: #fff; color: var(--text-muted); cursor: pointer; transition: all 0.18s ease; }
        .mod-tab:hover { color: var(--text-primary); border-color: var(--border-hover); }
        .mod-tab.active { background: var(--dark); color: #fff; border-color: var(--dark); }
        .stat-card { padding: 20px 24px; border: 1px solid var(--border); border-radius: 10px; background: #fafafa; }
        .sidebar-item { padding: 10px 14px; border-radius: 8px; font-size: 13px; font-weight: 500; color: var(--text-muted); cursor: pointer; transition: all 0.15s; border: 1px solid transparent; }
        .sidebar-item:hover { color: var(--text-primary); background: #f5f5f5; }
        .sidebar-item.active { background: #fff; border-color: var(--border); color: var(--text-primary); box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
        .step-card { padding: 32px; border-radius: 14px; border: 1px solid #262626; background: #111; transition: background 0.2s; }
        .step-card:hover { background: #161616; }
        .deadline-row { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; border: 1px solid var(--border); border-radius: 10px; cursor: pointer; transition: border-color 0.15s; }
        .deadline-row:hover { border-color: var(--border-hover); }
        .nav-link:hover { color: var(--text-primary) !important; }
        .btn-dark:hover { background: #1a1a1a !important; }
        .btn-outline:hover { border-color: var(--dark) !important; background: #fafafa !important; }
        .btn-green:hover { background: var(--accent-hover) !important; }
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .dash-layout { flex-direction: column !important; }
          .mods-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .footer-grid { flex-direction: column !important; }
        }
      `}</style>

      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        <div
          style={{
            ...styles.contentWrapper,
            height: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img
              src="/provenance.png"
              alt="Provenance"
              style={{ height: 28 }}
            />
            <span
              style={{
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              Provenance
            </span>
          </div>
          <nav style={{ display: "flex", gap: 32 }}>
            {["Platform", "Solutions", "Architecture"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} style={styles.navLink}>
                {l}
              </a>
            ))}
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <a href="/auth?mode=login" style={styles.navLink}>
              Sign in
            </a>
            <a href="/auth?mode=signup" style={styles.btnDark}>
              Get Access
            </a>
          </div>
        </div>
      </header>

      <section style={{ width: "100%", padding: "160px 0 80px" }}>
        <div
          ref={hero.ref}
          style={{
            ...styles.contentWrapper,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "center",
          }}
          className="hero-grid"
        >
          <div>
            <div className={`hero-enter ${mounted ? "mounted" : ""}`}>
              <span style={styles.tag}>Deterministic Compliance Engine</span>
            </div>
            <h1
              className={`hero-enter ${mounted ? "mounted" : ""} d1`}
              style={{
                fontSize: 56,
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                margin: "24px 0",
              }}
            >
              Correctness over
              <br />
              <span style={{ color: "var(--accent)" }}>convenience.</span>
            </h1>
            <p
              className={`hero-enter ${mounted ? "mounted" : ""} d2`}
              style={{
                fontSize: 17,
                color: "var(--text-secondary)",
                lineHeight: 1.6,
                maxWidth: 480,
                marginBottom: 40,
              }}
            >
              Convert operational and finance data into regulator-ready reports
              with full traceability, reproducible calculations, and audit-grade
              provenance. No black boxes.
            </p>
            <div
              className={`hero-enter ${mounted ? "mounted" : ""} d3`}
              style={{ display: "flex", gap: 12 }}
            >
              <a href="/auth?mode=signup" style={styles.btnDark}>
                Deploy System
              </a>
              <a href="#architecture" style={styles.btnOutline}>
                Read the Docs
              </a>
            </div>
          </div>
          <div
            className={`hero-enter ${mounted ? "mounted" : ""} d4`}
            style={{ position: "relative" }}
          >
            <div
              style={{
                position: "absolute",
                top: 12,
                left: -12,
                right: -12,
                bottom: -12,
                background: "#f5f5f5",
                borderRadius: 16,
                border: "1px solid var(--border)",
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: "relative",
                zIndex: 1,
                background: "#fff",
                borderRadius: 16,
                border: "1px solid var(--border)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
                padding: 32,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: 20,
                  borderBottom: "1px solid var(--border-light)",
                  marginBottom: 24,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "var(--accent)",
                    }}
                  />
                  <span
                    className="mono"
                    style={{
                      fontSize: 11,
                      fontWeight: 500,
                      color: "var(--text-muted)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Live Posture
                  </span>
                </div>
                <span
                  className="mono"
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    background: "#f5f5f5",
                    borderRadius: 4,
                    padding: "4px 10px",
                    color: "var(--text-primary)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  SYS_OK
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 28,
                  paddingBottom: 24,
                  borderBottom: "1px solid var(--border-light)",
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: 88,
                    height: 88,
                    flexShrink: 0,
                  }}
                >
                  <svg
                    viewBox="0 0 80 80"
                    style={{
                      width: "100%",
                      height: "100%",
                      transform: "rotate(-90deg)",
                    }}
                  >
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
                      stroke="var(--accent)"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={`${0.8 * 201} 201`}
                    />
                  </svg>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ fontSize: 24, fontWeight: 600 }}>80</span>
                  </div>
                </div>
                <div>
                  <p
                    className="mono"
                    style={{
                      fontSize: 11,
                      color: "var(--text-muted)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    Global ESG Index
                  </p>
                  <p
                    style={{ fontSize: 16, fontWeight: 500, marginBottom: 12 }}
                  >
                    Top Quartile Performance
                  </p>
                  <span
                    className="mono"
                    style={{
                      fontSize: 11,
                      fontWeight: 500,
                      background: "var(--success-bg)",
                      color: "var(--success)",
                      borderRadius: 4,
                      padding: "4px 10px",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    +12 pts YTD
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                {[
                  { label: "Plastic PWM", pct: 87, ok: true },
                  { label: "E-Waste", pct: 100, ok: true },
                  { label: "Battery", pct: 42, ok: false },
                  { label: "Tyres", pct: 95, ok: true },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      border: "1px solid var(--border-light)",
                      borderRadius: 10,
                      padding: 16,
                      background: "#fafafa",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 12,
                      }}
                    >
                      <span
                        className="mono"
                        style={{
                          fontSize: 10,
                          fontWeight: 500,
                          color: "var(--text-muted)",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {item.label}
                      </span>
                      <span
                        className="mono"
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: item.ok
                            ? "var(--success)"
                            : "var(--text-primary)",
                        }}
                      >
                        {item.pct}%
                      </span>
                    </div>
                    <div style={styles.progressBar}>
                      <div style={styles.progressFill(item.pct, item.ok)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="platform" style={{ width: "100%", padding: "40px 0 100px" }}>
        <div style={styles.contentWrapper} ref={dash.ref}>
          <div
            className={fadeUpClass(dash.inView)}
            style={{ marginBottom: 48 }}
          >
            <p
              className="mono"
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "var(--accent)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              System Interface
            </p>
            <h2
              style={{
                fontSize: 44,
                fontWeight: 600,
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
                maxWidth: 640,
              }}
            >
              Your entire compliance posture in one deterministic view.
            </h2>
          </div>
          <div
            className={fadeUpClass(dash.inView, "d1")}
            style={{
              border: "1px solid var(--border)",
              borderRadius: 14,
              overflow: "hidden",
              boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                borderBottom: "1px solid var(--border)",
                padding: "14px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "#fafafa",
              }}
            >
              <div style={{ display: "flex", gap: 8 }}>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: "var(--border)",
                    }}
                  />
                ))}
              </div>
              <span
                className="mono"
                style={{
                  fontSize: 11,
                  color: "var(--text-light)",
                  letterSpacing: "0.06em",
                  background: "#fff",
                  border: "1px solid var(--border)",
                  borderRadius: 6,
                  padding: "4px 12px",
                }}
              >
                app.provenance.in / dashboard
              </span>
              <div style={{ width: 48 }} />
            </div>
            <div
              className="dash-layout"
              style={{ display: "flex", minHeight: 520 }}
            >
              <div
                style={{
                  width: 220,
                  flexShrink: 0,
                  borderRight: "1px solid var(--border-light)",
                  padding: "20px 16px",
                  background: "#fafafa",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                {[
                  "Overview",
                  "KPI Trace",
                  "BRSR Matrix",
                  "Factor Library",
                  "Audit Logs",
                  "Configuration",
                ].map((item, i) => (
                  <div
                    key={item}
                    className={`sidebar-item ${i === 0 ? "active" : ""}`}
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div
                style={{ flex: 1, padding: "32px 40px", background: "#fff" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    marginBottom: 32,
                  }}
                >
                  <div>
                    <h2 style={{ fontSize: 18, fontWeight: 600 }}>
                      FY 2024–25 Telemetry
                    </h2>
                    <p
                      className="mono"
                      style={{
                        fontSize: 11,
                        color: "var(--text-light)",
                        marginTop: 8,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      Last sync: 12.04.2025 · 14:32 IST
                    </p>
                  </div>
                  <button style={styles.btnDark}>Generate Filing</button>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 16,
                    marginBottom: 32,
                  }}
                >
                  {[
                    {
                      label: "Total Liability",
                      value: "142.6 MT",
                      sub: "Plastics + E-Waste",
                    },
                    {
                      label: "Procured Certs",
                      value: "124.0 MT",
                      sub: "87% Coverage",
                    },
                    {
                      label: "Risk Exposure",
                      value: "₹0",
                      sub: "Within thresholds",
                    },
                  ].map((c) => (
                    <div key={c.label} className="stat-card">
                      <p
                        className="mono"
                        style={{
                          fontSize: 11,
                          fontWeight: 500,
                          color: "var(--text-muted)",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          marginBottom: 12,
                        }}
                      >
                        {c.label}
                      </p>
                      <p
                        style={{
                          fontSize: 26,
                          fontWeight: 600,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {c.value}
                      </p>
                      <p
                        className="mono"
                        style={{
                          fontSize: 11,
                          color: "var(--success)",
                          marginTop: 8,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                        }}
                      >
                        {c.sub}
                      </p>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 24,
                  }}
                >
                  <div>
                    <p
                      className="mono"
                      style={{
                        fontSize: 11,
                        fontWeight: 500,
                        color: "var(--text-primary)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        paddingBottom: 12,
                        borderBottom: "1px solid var(--border-light)",
                        marginBottom: 16,
                      }}
                    >
                      Upcoming Deadlines
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                      }}
                    >
                      {[
                        {
                          name: "Plastic EPR Annual",
                          date: "Jun 30, 2025",
                          status: "Pending",
                        },
                        {
                          name: "E-Waste Q1 Cert",
                          date: "Apr 15, 2025",
                          status: "Action Req",
                        },
                      ].map((d) => (
                        <div key={d.name} className="deadline-row">
                          <div>
                            <p style={{ fontSize: 14, fontWeight: 500 }}>
                              {d.name}
                            </p>
                            <p
                              className="mono"
                              style={{
                                fontSize: 11,
                                color: "var(--text-muted)",
                                marginTop: 4,
                                letterSpacing: "0.04em",
                              }}
                            >
                              {d.date}
                            </p>
                          </div>
                          <span
                            className="mono"
                            style={{
                              fontSize: 10,
                              fontWeight: 600,
                              padding: "4px 8px",
                              borderRadius: 4,
                              textTransform: "uppercase",
                              letterSpacing: "0.06em",
                              background:
                                d.status === "Action Req"
                                  ? "var(--dark)"
                                  : "#f5f5f5",
                              color:
                                d.status === "Action Req"
                                  ? "#fff"
                                  : "var(--text-muted)",
                            }}
                          >
                            {d.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p
                      className="mono"
                      style={{
                        fontSize: 11,
                        fontWeight: 500,
                        color: "var(--text-primary)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        paddingBottom: 12,
                        borderBottom: "1px solid var(--border-light)",
                        marginBottom: 16,
                      }}
                    >
                      Target Acquisition
                    </p>
                    <div
                      style={{
                        border: "1px solid var(--border)",
                        borderRadius: 10,
                        padding: 24,
                        background: "#fff",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: 10,
                        }}
                      >
                        <span
                          className="mono"
                          style={{
                            fontSize: 11,
                            fontWeight: 500,
                            color: "var(--text-muted)",
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                          }}
                        >
                          Q1 Plastic PWM
                        </span>
                        <span
                          className="mono"
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            color: "var(--success)",
                          }}
                        >
                          87%
                        </span>
                      </div>
                      <div style={{ ...styles.progressBar, marginBottom: 20 }}>
                        <div style={styles.progressFill(87)} />
                      </div>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(4, 1fr)",
                          gap: 8,
                          textAlign: "center",
                        }}
                      >
                        {["Q1", "Q2", "Q3", "Q4"].map((q, i) => (
                          <div
                            key={q}
                            style={{
                              background: "#fafafa",
                              borderRadius: 8,
                              padding: "10px 4px",
                            }}
                          >
                            <div
                              className="mono"
                              style={{
                                fontSize: 11,
                                fontWeight: 600,
                                marginBottom: 4,
                                color:
                                  i < 3
                                    ? "var(--success)"
                                    : "var(--text-light)",
                              }}
                            >
                              {i < 2 ? "100%" : i === 2 ? "94%" : "0%"}
                            </div>
                            <div
                              className="mono"
                              style={{
                                fontSize: 10,
                                color: "var(--text-light)",
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                              }}
                            >
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
        </div>
      </section>

      <section
        id="solutions"
        style={{
          background: "#fafafa",
          borderTop: "1px solid var(--border)",
          width: "100%",
          padding: "100px 0",
        }}
      >
        <div style={styles.contentWrapper} ref={mods.ref}>
          <div
            className={fadeUpClass(mods.inView)}
            style={{ marginBottom: 40 }}
          >
            <p
              className="mono"
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "var(--accent)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Core Architecture
            </p>
            <h2
              style={{
                fontSize: 44,
                fontWeight: 600,
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
              }}
            >
              Everything required.
              <br />
              Nothing extraneous.
            </h2>
          </div>
          <div
            className={fadeUpClass(mods.inView, "d1")}
            style={{
              display: "flex",
              gap: 12,
              marginBottom: 48,
              flexWrap: "wrap",
            }}
          >
            {MODULES.map((mod, i) => (
              <button
                key={i}
                onClick={() => handleModuleChange(i)}
                className={`mod-tab ${activeModule === i ? "active" : ""}`}
              >
                {mod.label}
              </button>
            ))}
          </div>
          <div
            className={`${fadeUpClass(mods.inView, "d2")} mods-grid`}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "start",
            }}
          >
            <div className={`module-preview ${transitioning ? "out" : ""}`}>
              <span
                className="mono"
                style={{
                  display: "inline-block",
                  fontSize: 11,
                  fontWeight: 500,
                  color: "var(--text-muted)",
                  background: "#fff",
                  border: "1px solid var(--border)",
                  borderRadius: 4,
                  padding: "4px 12px",
                  marginBottom: 24,
                  letterSpacing: "0.08em",
                }}
              >
                {MODULES[activeModule].id}
              </span>
              <h3
                style={{
                  fontSize: 30,
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                  marginBottom: 20,
                }}
              >
                {MODULES[activeModule].title}
              </h3>
              <p
                style={{
                  fontSize: 16,
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                  marginBottom: 32,
                }}
              >
                {MODULES[activeModule].body}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {MODULES[activeModule].pills.map((p) => (
                  <span key={p} style={styles.pill}>
                    {p}
                  </span>
                ))}
              </div>
            </div>
            <div
              className={`module-preview ${transitioning ? "out" : ""}`}
              style={{
                background: "#fff",
                borderRadius: 14,
                border: "1px solid var(--border)",
                padding: 32,
                boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
              }}
            >
              {activeModule === 0 && (
                <div>
                  <p
                    className="mono"
                    style={{
                      fontSize: 10,
                      fontWeight: 500,
                      color: "var(--text-light)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      paddingBottom: 16,
                      borderBottom: "1px solid var(--border-light)",
                      marginBottom: 24,
                    }}
                  >
                    Data Preview // CPCB Format
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 20,
                    }}
                  >
                    {[
                      { name: "Plastic PWM", pct: 87, ok: true },
                      { name: "E-Waste", pct: 100, ok: true },
                      { name: "Battery", pct: 42, ok: false },
                    ].map((item) => (
                      <div key={item.name}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: 10,
                          }}
                        >
                          <span style={{ fontSize: 14, fontWeight: 500 }}>
                            {item.name}
                          </span>
                          <span
                            className="mono"
                            style={{
                              fontSize: 13,
                              fontWeight: 600,
                              color: item.ok
                                ? "var(--success)"
                                : "var(--text-primary)",
                            }}
                          >
                            {item.pct}%
                          </span>
                        </div>
                        <div style={styles.progressBar}>
                          <div style={styles.progressFill(item.pct, item.ok)} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => navigate("/auth?mode=signup")}
                    style={{ ...styles.btnGreen, width: "100%", marginTop: 32 }}
                  >
                    Initiate CPCB Transfer
                  </button>
                </div>
              )}
              {activeModule === 1 && (
                <div>
                  <p
                    className="mono"
                    style={{
                      fontSize: 10,
                      fontWeight: 500,
                      color: "var(--text-light)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      paddingBottom: 16,
                      borderBottom: "1px solid var(--border-light)",
                      marginBottom: 8,
                    }}
                  >
                    BRSR Output // Section B
                  </p>
                  {[
                    "Energy consumed (GJ)",
                    "Water withdrawal (KL)",
                    "Waste generated (MT)",
                    "Scope 1 GHG (tCO₂e)",
                  ].map((row) => (
                    <div
                      key={row}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "16px 0",
                        borderBottom: "1px solid var(--border-light)",
                      }}
                    >
                      <span
                        style={{ fontSize: 14, color: "var(--text-secondary)" }}
                      >
                        {row}
                      </span>
                      <span
                        className="mono"
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          color: "var(--text-primary)",
                          background: "#f5f5f5",
                          borderRadius: 4,
                          padding: "4px 10px",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      >
                        Mapped
                      </span>
                    </div>
                  ))}
                </div>
              )}
              {(activeModule === 2 || activeModule === 3) && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 240,
                    border: "1px dashed var(--border)",
                    borderRadius: 10,
                    background: "#fafafa",
                  }}
                >
                  <span
                    className="mono"
                    style={{
                      fontSize: 11,
                      color: "var(--text-light)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Console data available upon integration
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section
        id="architecture"
        style={{ background: "var(--dark)", width: "100%", padding: "100px 0" }}
      >
        <div style={styles.contentWrapper} ref={steps.ref}>
          <div
            className={fadeUpClass(steps.inView)}
            style={{ marginBottom: 64 }}
          >
            <p
              className="mono"
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "var(--accent)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Implementation
            </p>
            <h2
              style={{
                fontSize: 44,
                fontWeight: 600,
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
                color: "#fff",
                maxWidth: 600,
              }}
            >
              Operational before your next filing deadline.
            </h2>
          </div>
          <div
            className={`steps-grid ${steps.inView ? "visible" : ""}`}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
            }}
          >
            {STEPS.map((step, i) => (
              <div
                key={step.n}
                className={`step-card ${fadeUpClass(steps.inView, `d${i + 1}`)}`}
              >
                <span
                  className="mono"
                  style={{
                    fontSize: 12,
                    color: "var(--accent)",
                    fontWeight: 500,
                    display: "block",
                    marginBottom: 28,
                    paddingBottom: 20,
                    borderBottom: "1px solid #1f1f1f",
                    letterSpacing: "0.06em",
                  }}
                >
                  STEP_{step.n}
                </span>
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: "#fff",
                    marginBottom: 16,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: 15,
                    color: "var(--text-light)",
                    lineHeight: 1.7,
                  }}
                >
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          borderTop: "1px solid var(--border)",
          background: "#fff",
          width: "100%",
          padding: "100px 0",
        }}
      >
        <div style={styles.contentWrapper} ref={cta.ref}>
          <div className={fadeUpClass(cta.inView)} style={{ maxWidth: 600 }}>
            <h2
              style={{
                fontSize: 44,
                fontWeight: 600,
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
                marginBottom: 20,
              }}
            >
              Establish control.
              <br />
              Connect your data today.
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                marginBottom: 40,
              }}
            >
              Deploy Provenance in your environment. Secure, verifiable
              compliance.
            </p>
            <div
              className={fadeUpClass(cta.inView, "d1")}
              style={{ display: "flex", gap: 12, maxWidth: 480 }}
            >
              <input
                type="email"
                placeholder="user@enterprise.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
              />
              <button
                onClick={() => navigate("/auth?mode=signup")}
                style={{ ...styles.btnDark, flexShrink: 0 }}
              >
                Initialize
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer
        style={{
          borderTop: "1px solid var(--border)",
          background: "#fafafa",
          width: "100%",
          padding: "80px 0 40px",
        }}
      >
        <div style={styles.contentWrapper}>
          <div
            className="footer-grid"
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 64,
              marginBottom: 64,
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                <img
                  src="/provenance.png"
                  alt="Provenance"
                  style={{ height: 24 }}
                />
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Provenance
                </span>
              </div>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--text-muted)",
                  maxWidth: 260,
                  lineHeight: 1.6,
                }}
              >
                Enterprise-grade EPR & ESG infrastructure. Deterministic
                compliance without the chaos.
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 64,
              }}
            >
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
                  links: ["Privacy", "Terms of Service", "DPDPA"],
                },
              ].map((col) => (
                <div key={col.heading}>
                  <p
                    className="mono"
                    style={{
                      fontSize: 11,
                      fontWeight: 500,
                      color: "var(--text-primary)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: 20,
                      paddingBottom: 12,
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    {col.heading}
                  </p>
                  <ul
                    style={{
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                    }}
                  >
                    {col.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#platform"
                          style={{
                            fontSize: 14,
                            color: "var(--text-muted)",
                            textDecoration: "none",
                          }}
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
          <div
            style={{
              paddingTop: 24,
              borderTop: "1px solid var(--border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p
              className="mono"
              style={{
                fontSize: 11,
                color: "var(--text-light)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              © 2026 Provenance Tech // India
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
