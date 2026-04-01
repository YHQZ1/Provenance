import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const styles = `
  @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
  @keyframes spin { to { transform: rotate(360deg) } }
  @keyframes pulse { 0%, 100% { opacity: 0.35 } 50% { opacity: 1 } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: translateY(0) } }
`;

function FullscreenLoader({ message }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        animation: "fadeIn 0.25s ease",
      }}
    >
      <div style={{ position: "relative", marginBottom: "28px" }}>
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            border: "1.5px solid #1f1f1f",
            borderTop: "1.5px solid #059669",
            animation: "spin 0.75s linear infinite",
          }}
        />
      </div>
      <p
        style={{
          fontFamily: "'Geist Mono', 'Courier New', monospace",
          fontSize: "10px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#059669",
          animation: "pulse 1.6s ease-in-out infinite",
        }}
      >
        {message}
      </p>
    </div>
  );
}

export default function Home() {
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_URL}/api/auth/me`, {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Not authenticated");
        const data = await response.json();
        setUser(data.user);
        setCompany(data.company);
      } catch {
        window.location.href = "/auth";
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    await new Promise((r) => setTimeout(r, 200));
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      await supabase.auth.signOut();
      await new Promise((r) => setTimeout(r, 700));
      window.location.href = "/auth";
    } catch {
      setLoggingOut(false);
    }
  };

  if (loading || loggingOut) {
    return (
      <>
        <style>{styles}</style>
        <FullscreenLoader
          message={loggingOut ? "Signing out..." : "Loading..."}
        />
      </>
    );
  }

  return (
    <div
      className="min-h-screen bg-neutral-50 antialiased"
      style={{ animation: "slideUp 0.3s ease both" }}
    >
      <style>{styles}</style>

      <nav className="bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src="/provenance.png"
              alt="Provenance"
              className="h-6 filter invert"
            />
            <span className="text-[13px] font-bold tracking-widest uppercase text-neutral-950">
              Provenance
            </span>
          </div>

          <div className="flex items-center gap-5">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[12px] font-bold text-neutral-950 leading-tight">
                {company?.company_name || user?.email?.split("@")[0]}
              </span>
              <span
                className="text-[10px] text-neutral-400 uppercase tracking-widest"
                style={{ fontFamily: "'Geist Mono', monospace" }}
              >
                {user?.email}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-200 text-[12px] font-bold uppercase tracking-widest text-neutral-600 hover:text-neutral-950 hover:border-neutral-400 hover:bg-neutral-50 transition-all cursor-pointer"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Sign out
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-10">
          <p
            className="text-[11px] text-emerald-600 uppercase tracking-widest font-bold mb-3"
            style={{ fontFamily: "'Geist Mono', monospace" }}
          >
            DASHBOARD
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-950 mb-2">
            Welcome back
            {company?.company_name ? `, ${company.company_name}` : ""}.
          </h1>
          <p className="text-[15px] text-neutral-500 font-light">
            Your compliance telemetry is active and syncing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { label: "Pipelines Active", value: "—", status: "live" },
            { label: "Audit Events", value: "—", status: "idle" },
            { label: "Compliance Score", value: "—", status: "idle" },
          ].map((card) => (
            <div
              key={card.label}
              className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-[10px] font-bold uppercase tracking-widest text-neutral-400"
                  style={{ fontFamily: "'Geist Mono', monospace" }}
                >
                  {card.label}
                </span>
                {card.status === "live" && (
                  <span className="flex items-center gap-1.5">
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#059669",
                        display: "inline-block",
                        boxShadow: "0 0 0 2px #d1fae5",
                      }}
                    />
                    <span
                      className="text-[9px] font-bold uppercase tracking-widest text-emerald-600"
                      style={{ fontFamily: "'Geist Mono', monospace" }}
                    >
                      Live
                    </span>
                  </span>
                )}
              </div>
              <p className="text-3xl font-bold text-neutral-950 tracking-tight">
                {card.value}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-8 flex flex-col items-center justify-center text-center min-h-[240px]">
          <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center mb-4">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#a3a3a3"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <p
            className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-2"
            style={{ fontFamily: "'Geist Mono', monospace" }}
          >
            No data yet
          </p>
          <p className="text-[14px] text-neutral-400 font-light max-w-xs">
            Your telemetry streams will appear here once your integrations are
            configured.
          </p>
        </div>
      </div>
    </div>
  );
}
