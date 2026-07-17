import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun, Ruler, Menu } from "lucide-react";
import { useTheme } from "@/hooks";
import { ROUTES, APP_NAME } from "@/constants";
import { MobileDrawer } from "@/components/mobile";

export function MobileHeader() {
  const { theme, setMode } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = useCallback(() => setDrawerOpen((prev) => !prev), []);

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--color-background)]/80 backdrop-blur-xl supports-backdrop-blur:bg-[var(--color-background)]/80 safe-area-padding border-b border-[var(--color-border)]">
      <div className="flex h-12 items-center justify-between px-3">
        {/* Left: Menu button + Logo */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleDrawer}
            className="rounded-full p-2 min-h-[48px] min-w-[48px] flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] transition-colors active:scale-[0.95]"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <Link
            to={ROUTES.HOME}
            className="flex items-center gap-2 text-[var(--color-text)]"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-secondary-500)] text-white">
              <Ruler size={14} />
            </div>
            <span className="text-sm font-bold tracking-tight">{APP_NAME}</span>
          </Link>
        </div>

        {/* Right: Theme toggle only */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => setMode(theme.mode === "dark" ? "light" : "dark")}
            className="rounded-full p-2 min-h-[48px] min-w-[48px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)] transition-colors active:scale-[0.95]"
            aria-label={`Switch to ${theme.mode === "dark" ? "light" : "dark"} mode`}
          >
            {theme.mode === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}
