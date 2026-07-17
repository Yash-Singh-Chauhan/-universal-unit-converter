import { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, LayoutGrid, Star, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/utils";
import { ROUTES } from "@/constants";

const tabs = [
  { id: "home", label: "Home", icon: Home, path: ROUTES.HOME },
  { id: "converters", label: "Converters", icon: LayoutGrid, path: ROUTES.HOME },
  { id: "favorites", label: "Favorites", icon: Star, path: ROUTES.HOME },
  { id: "settings", label: "Settings", icon: Settings, path: ROUTES.HOME },
];

export function MobileBottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const activeTab = useMemo(() => {
    if (location.pathname === ROUTES.HOME) return "home";
    if (location.pathname.startsWith("/height")) return "converters";
    if (location.pathname.startsWith("/weight")) return "converters";
    if (location.pathname.startsWith("/volume")) return "converters";
    if (location.pathname.startsWith("/currency")) return "converters";
    if (location.pathname.startsWith("/planet")) return "converters";
    return "home";
  }, [location.pathname]);

  const handleTabPress = useCallback(
    (tab: (typeof tabs)[0]) => {
      if (tab.id === "home") {
        navigate(tab.path);
      } else if (tab.id === "converters") {
        navigate(ROUTES.HOME);
      } else {
        navigate(tab.path);
      }
    },
    [navigate]
  );

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden safe-area-padding">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-[var(--color-background)]/95 to-transparent" />

      {/* Glass container */}
      <div className="relative mx-3 mb-3 rounded-2xl bg-[var(--color-surface)]/80 backdrop-blur-2xl border border-[var(--color-border)] shadow-xl shadow-black/5">
        <div className="flex items-center justify-around px-1 py-1.5">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabPress(tab)}
                className={cn(
                  "relative flex flex-col items-center justify-center gap-0.5 py-2 px-4 rounded-xl transition-all duration-200 min-h-[44px] min-w-[52px]",
                  isActive
                    ? "text-[var(--color-primary-500)]"
                    : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-indicator"
                    className="absolute inset-0 rounded-xl bg-[var(--color-primary-500)]/10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <div className="relative z-10 flex flex-col items-center gap-0.5">
                  <Icon size={20} />
                  <span className="text-[9px] font-semibold leading-none tracking-wide">
                    {tab.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
