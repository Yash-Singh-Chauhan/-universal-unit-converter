import { Outlet } from "react-router-dom";
import { MobileHeader } from "./MobileHeader";
import { MobileBottomNav } from "@/components/mobile";

export function MobileLayout() {
  return (
    <div className="flex min-h-dvh flex-col bg-[var(--color-background)]">
      <MobileHeader />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-5xl px-3 py-4 pb-24">
          <Outlet />
        </div>
      </main>
      <MobileBottomNav />
    </div>
  );
}
