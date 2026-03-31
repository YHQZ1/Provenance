"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSidebar } from "./sidebar-context";
import { supabase } from "@/lib/supabase";

const OPEN_W = 252;
const CLOSED_W = 60;
const T = "280ms cubic-bezier(0.4, 0, 0.2, 1)";
const T_FAST = "180ms cubic-bezier(0.4, 0, 0.2, 1)";
const BG = "#1c1c1c";
const BORDER = "rgba(255,255,255,0.07)";
const MONO = "var(--font-geist-mono, 'Geist Mono', monospace)";
const SANS = "var(--font-geist-sans, 'Geist', sans-serif)";

const Icon = ({ children }: { children: React.ReactNode }) => (
  <svg
    width={16}
    height={16}
    fill="none"
    viewBox="0 0 16 16"
    strokeWidth="1.35"
    stroke="currentColor"
  >
    {children}
  </svg>
);

const Icons = {
  Overview: () => (
    <Icon>
      <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1.2" />
      <rect x="9" y="1.5" width="5.5" height="5.5" rx="1.2" />
      <rect x="1.5" y="9" width="5.5" height="5.5" rx="1.2" />
      <rect x="9" y="9" width="5.5" height="5.5" rx="1.2" />
    </Icon>
  ),
  Pipeline: () => (
    <Icon>
      <rect x="1" y="4" width="3.5" height="8" rx="1" />
      <path d="M4.5 8h4M11.5 8H15" strokeLinecap="round" />
      <rect x="8" y="4" width="3.5" height="8" rx="1" />
    </Icon>
  ),
  EPR: () => (
    <Icon>
      <path
        d="M8 1L14 3.8v3.8c0 3.2-2.4 5.2-6 6.4C2.4 12.8 2 10.4 2 7.6V3.8L8 1z"
        strokeLinejoin="round"
      />
      <path d="M5.5 8l2 2 3-3" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  ),
  BRSR: () => (
    <Icon>
      <rect x="2.5" y="1" width="11" height="14" rx="1.5" />
      <path d="M5 5.5h6M5 8h6M5 10.5h3.5" strokeLinecap="round" />
    </Icon>
  ),
  ESG: () => (
    <Icon>
      <circle cx="8" cy="8" r="5.5" />
      <path
        d="M5.5 9.5c.5-2 1.5-3 2.5-3s1.5.8 1.5 1.5c0 1-1 1.5-1 1.5s1.5-3.5 2.5-4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  ),
  Audit: () => (
    <Icon>
      <rect x="2" y="2" width="12" height="12" rx="1.5" />
      <path
        d="M5 5.5h1M5 8h1M5 10.5h1M8 5.5h3M8 8h3M8 10.5h2"
        strokeLinecap="round"
      />
    </Icon>
  ),
  Reports: () => (
    <Icon>
      <rect x="2.5" y="1.5" width="11" height="13" rx="1.5" />
      <path d="M5 5.5h6M5 8h4" strokeLinecap="round" />
      <path
        d="M9 11l1.5 1.5L13 10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  ),
  Settings: () => (
    <svg
      width={16}
      height={16}
      fill="none"
      viewBox="0 0 16 16"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
    >
      <circle cx="8" cy="8" r="2" />
      <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06" />
    </svg>
  ),
  Logout: () => (
    <svg
      width={16}
      height={16}
      fill="none"
      viewBox="0 0 16 16"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 3H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h3" />
      <path d="M10.5 11l3.5-3-3.5-3M14 8H6" />
    </svg>
  ),
  Toggle: () => (
    <svg
      width={16}
      height={16}
      fill="none"
      viewBox="0 0 16 16"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
    >
      <rect x="1.5" y="1.5" width="13" height="13" rx="2" />
      <path d="M5.5 1.5v13" />
    </svg>
  ),
};

const NAV = [
  {
    section: "Platform",
    items: [
      { label: "Overview", href: "/dashboard", icon: <Icons.Overview /> },
      {
        label: "Data pipeline",
        href: "/dashboard/pipeline",
        icon: <Icons.Pipeline />,
      },
    ],
  },
  {
    section: "Compliance",
    items: [
      { label: "EPR obligations", href: "/dashboard/epr", icon: <Icons.EPR /> },
      { label: "BRSR matrix", href: "/dashboard/brsr", icon: <Icons.BRSR /> },
      {
        label: "ESG analytics",
        href: "/dashboard/analytics",
        icon: <Icons.ESG />,
      },
    ],
  },
  {
    section: "Records",
    items: [
      { label: "Audit trail", href: "/dashboard/audit", icon: <Icons.Audit /> },
      { label: "Reports", href: "/dashboard/reports", icon: <Icons.Reports /> },
    ],
  },
  {
    section: "Workspace",
    items: [
      {
        label: "Settings",
        href: "/dashboard/settings",
        icon: <Icons.Settings />,
      },
    ],
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function LogoutModal({
  onConfirm,
  onCancel,
  loading,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onCancel]);

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center animate-in fade-in duration-150"
      style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(2px)" }}
    >
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xl w-full max-w-sm mx-4 p-7 animate-in zoom-in-95 fade-in duration-150">
        <h2
          className="text-[17px] font-semibold text-neutral-950 tracking-tight mb-1.5"
          style={{ fontFamily: SANS }}
        >
          Sign out of Provenance?
        </h2>
        <p
          className="text-[14px] text-neutral-500 leading-relaxed mb-6"
          style={{ fontFamily: SANS }}
        >
          You'll need to sign back in to access your compliance dashboard and
          filings.
        </p>
        <div className="flex gap-2.5">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-lg border border-neutral-200 bg-white text-neutral-600 text-[13px] font-semibold hover:bg-neutral-50 hover:border-neutral-300 transition-colors cursor-pointer"
            style={{ fontFamily: SANS }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 rounded-lg bg-neutral-950 text-white text-[13px] font-semibold hover:bg-neutral-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer"
            style={{ fontFamily: SANS }}
          >
            {loading ? "Signing out…" : "Sign out"}
          </button>
        </div>
      </div>
    </div>
  );
}

function UserFooter({ open }: { open: boolean }) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [company, setCompany] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.access_token) {
          router.replace("/auth");
          setLoading(false);
          return;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${session.access_token}`,
            },
          },
        );

        if (!res.ok) {
          router.replace("/auth");
          setLoading(false);
          return;
        }

        const data = await res.json();

        setUser(data.data.user);
        setCompany(data.data.company);
        setLoading(false);
      } catch (error) {
        router.replace("/auth");
      }
    };

    fetchUser();
  }, [router]);

  const handleLogoutConfirm = async () => {
    setLoggingOut(true);
    await supabase.auth.signOut();
    router.replace("/auth");
  };

  const displayName =
    user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
  const email = user?.email || "";
  const companyName = company?.company_name || "";
  const avatarUrl = null;

  if (loading) {
    return (
      <div
        className="flex-shrink-0 flex flex-col"
        style={{ borderTop: `1px solid ${BORDER}`, padding: "12px 10px 16px" }}
      >
        <div className="flex items-center h-10 overflow-hidden">
          <div
            className="relative flex-shrink-0"
            style={{ width: 36, display: "flex", justifyContent: "center" }}
          >
            <div className="w-7 h-7 rounded-md bg-white/[0.07] animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {showModal && (
        <LogoutModal
          onConfirm={handleLogoutConfirm}
          onCancel={() => setShowModal(false)}
          loading={loggingOut}
        />
      )}

      <div
        className="flex-shrink-0 flex flex-col"
        style={{ borderTop: `1px solid ${BORDER}`, padding: "12px 10px 16px" }}
      >
        {/* Avatar row */}
        <div className="flex items-center h-10 overflow-hidden">
          <div
            className="relative flex-shrink-0"
            style={{ width: 36, display: "flex", justifyContent: "center" }}
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded-md object-cover outline outline-1 outline-white/[0.08]"
              />
            ) : (
              <div className="w-7 h-7 rounded-md flex items-center justify-center bg-white/[0.07] outline outline-1 outline-white/[0.08]">
                <span
                  className="text-neutral-300 text-[10px] font-semibold"
                  style={{ fontFamily: MONO }}
                >
                  {getInitials(displayName)}
                </span>
              </div>
            )}
            <span
              className="absolute -bottom-0.5 right-[2px] w-2 h-2 rounded-full bg-emerald-500"
              style={{ outline: `2px solid ${BG}` }}
            />
          </div>

          <div
            className="min-w-0 flex-1 pl-2.5 overflow-hidden"
            style={{ opacity: open ? 1 : 0, transition: `opacity ${T_FAST}` }}
          >
            <p
              className="text-neutral-100 text-[13px] font-medium truncate whitespace-nowrap leading-tight"
              style={{ fontFamily: SANS }}
            >
              {displayName}
            </p>
            {companyName && (
              <p
                className="text-neutral-400 text-[10px] truncate whitespace-nowrap"
                style={{ fontFamily: MONO }}
              >
                {companyName}
              </p>
            )}
            <p
              className="text-neutral-500 text-[10px] truncate whitespace-nowrap mt-0.5"
              style={{ fontFamily: MONO }}
            >
              {email}
            </p>
          </div>
        </div>

        {/* Logout button */}
        <button
          onClick={() => setShowModal(true)}
          title={!open ? "Log out" : undefined}
          className="flex items-center mt-2 h-9 w-full text-neutral-500 hover:text-red-400 hover:bg-red-500/5 transition-colors cursor-pointer rounded-lg overflow-hidden"
        >
          <span
            className="flex-shrink-0 leading-none"
            style={{ width: 36, display: "flex", justifyContent: "center" }}
          >
            <Icons.Logout />
          </span>
          <span
            className="whitespace-nowrap text-[13px] font-medium"
            style={{
              opacity: open ? 1 : 0,
              transition: `opacity ${T_FAST}`,
              fontFamily: SANS,
            }}
          >
            Log out
          </span>
        </button>
      </div>
    </>
  );
}

export default function Sidebar() {
  const { open } = useSidebar();
  const pathname = usePathname();

  return (
    <>
      <style>{`
        .nav-active::before {
          content: '';
          position: absolute;
          left: 0; top: 50%;
          transform: translateY(-50%);
          width: 2px; height: 60%;
          border-radius: 0 2px 2px 0;
          background: #e8e8e8;
        }
        .sidebar-scroll::-webkit-scrollbar { width: 0; }
      `}</style>

      <aside
        className="sidebar-scroll flex flex-col h-screen sticky top-0 overflow-hidden flex-shrink-0"
        style={{
          width: open ? OPEN_W : CLOSED_W,
          minWidth: open ? OPEN_W : CLOSED_W,
          background: BG,
          borderRight: `1px solid ${BORDER}`,
          transition: `width ${T}, min-width ${T}`,
        }}
      >
        {/* Wordmark */}
        <div
          className="flex items-center flex-shrink-0 overflow-hidden"
          style={{ height: 56, borderBottom: `1px solid ${BORDER}` }}
        >
          <div
            className="flex-shrink-0 flex items-center justify-center"
            style={{ width: CLOSED_W }}
          >
            <div className="w-6 h-6 rounded-md bg-neutral-100 flex items-center justify-center">
              <div
                className="w-[7px] h-[7px] rounded-sm"
                style={{ background: BG }}
              />
            </div>
          </div>
          <span
            className="text-neutral-300 text-[11px] font-medium uppercase whitespace-nowrap pointer-events-none"
            style={{
              letterSpacing: "0.18em",
              fontFamily: MONO,
              opacity: open ? 1 : 0,
              transition: `opacity ${T_FAST}`,
            }}
          >
            Provenance
          </span>
        </div>

        {/* Nav */}
        <nav className="sidebar-scroll flex-1 overflow-y-auto overflow-x-hidden flex flex-col gap-2 py-5">
          {NAV.map((group) => (
            <div key={group.section} className="flex flex-col gap-0.5">
              <div
                className="relative flex items-center mb-1"
                style={{ height: 20 }}
              >
                <span
                  className="absolute text-[9.5px] font-medium uppercase whitespace-nowrap text-white/20"
                  style={{
                    left: CLOSED_W,
                    letterSpacing: "0.14em",
                    fontFamily: MONO,
                    opacity: open ? 1 : 0,
                    transition: `opacity ${T_FAST}`,
                  }}
                >
                  {group.section}
                </span>
                <div
                  className="absolute h-px bg-white/20"
                  style={{
                    left: 14,
                    right: 14,
                    opacity: open ? 0 : 1,
                    transition: `opacity ${T_FAST}`,
                  }}
                />
              </div>

              {group.items.map((item) => {
                const isActive =
                  item.href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={!open ? item.label : undefined}
                    className={`relative flex items-center h-9 rounded-lg transition-colors overflow-hidden ${
                      isActive
                        ? "nav-active bg-white/[0.08] text-neutral-100"
                        : "text-white/[0.38] hover:bg-white/[0.05] hover:text-white/70"
                    }`}
                    style={{ margin: "0 8px" }}
                  >
                    <span
                      className="flex-shrink-0 leading-none flex items-center justify-center"
                      style={{
                        width: CLOSED_W - 16,
                        opacity: isActive ? 1 : 0.65,
                      }}
                    >
                      {item.icon}
                    </span>
                    <span
                      className="whitespace-nowrap text-[13px] overflow-hidden"
                      style={{
                        fontWeight: isActive ? 500 : 400,
                        fontFamily: SANS,
                        opacity: open ? 1 : 0,
                        transition: `opacity ${T_FAST}`,
                      }}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <UserFooter open={open} />
      </aside>
    </>
  );
}

export function SidebarToggle() {
  const { toggle } = useSidebar();
  return (
    <button
      onClick={toggle}
      title="Toggle sidebar"
      className="flex items-center justify-center w-8 h-8 rounded-lg border-none bg-transparent cursor-pointer text-neutral-950 hover:text-neutral-500 transition-colors flex-shrink-0"
    >
      <Icons.Toggle />
    </button>
  );
}
