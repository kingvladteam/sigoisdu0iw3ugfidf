import type { ReactNode } from "react";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-accent">
      <span className="h-px w-10 bg-accent" />
      {children}
    </p>
  );
}
