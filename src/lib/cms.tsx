import { createContext, useContext, type ReactNode } from "react";
import type { CmsContent } from "./cms-types";

const CmsContext = createContext<CmsContent | null>(null);

export function CmsProvider({ value, children }: { value: CmsContent; children: ReactNode }) {
  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}

export function useCms(): CmsContent {
  const ctx = useContext(CmsContext);
  if (!ctx) throw new Error("useCms must be used inside CmsProvider");
  return ctx;
}

export function useSite() {
  return useCms().site;
}

export function useSocialLinks() {
  return useCms().socialLinks;
}

export function useWhatsAppNumbers() {
  return useCms().whatsappNumbers;
}
