"use client";

import { PrinterProvider } from "@/context";

export function Providers({ children }: { children: React.ReactNode }) {
  return <PrinterProvider>{children}</PrinterProvider>;
}
