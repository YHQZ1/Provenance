"use client";

import { createContext, useContext, useEffect, useState } from "react";

const KEY = "provenance_sidebar_open";

type SidebarCtx = { open: boolean; toggle: () => void };

const SidebarContext = createContext<SidebarCtx>({
  open: true,
  toggle: () => {},
});

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved !== null) setOpen(saved === "true");
  }, []);

  const toggle = () =>
    setOpen((prev) => {
      const next = !prev;
      localStorage.setItem(KEY, String(next));
      return next;
    });

  return (
    <SidebarContext.Provider value={{ open, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => useContext(SidebarContext);
