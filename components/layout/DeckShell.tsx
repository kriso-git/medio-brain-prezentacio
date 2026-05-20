import type { ReactNode } from "react";
import { SlideIndicator } from "./SlideIndicator";

export function DeckShell({ children }: { children: ReactNode }) {
  return (
    <main className="relative">
      <SlideIndicator />
      {children}
    </main>
  );
}
