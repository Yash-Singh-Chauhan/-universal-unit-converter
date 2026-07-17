import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function DesktopLayout() {
  return (
    <div className="flex min-h-dvh flex-col bg-[var(--color-background)]">
      <Header />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-5xl px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
