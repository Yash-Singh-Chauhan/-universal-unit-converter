import { useState, useCallback } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Moon, Sun, Ruler, Search,
  Github, Home,
  Weight, FlaskConical, Coins, Globe,
} from "lucide-react";
import { useTheme, useApp } from "@/hooks";
import { cn } from "@/utils";
import { ROUTES, APP_NAME } from "@/constants";
import { Button } from "@/components/ui";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { path: ROUTES.HOME, label: "Home", icon: Home },
  { path: ROUTES.HEIGHT, label: "Height", icon: Ruler },
  { path: ROUTES.WEIGHT, label: "Weight", icon: Weight },
  { path: ROUTES.VOLUME, label: "Volume", icon: FlaskConical },
  { path: ROUTES.CURRENCY, label: "Currency", icon: Coins },
  { path: ROUTES.PLANET_GRAVITY, label: "Planet", icon: Globe },
];

export function Header() {
  const { theme, setMode } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const { converters } = useApp();

  const handleSearch = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem("search") as HTMLInputElement;
    const query = input.value.trim().toLowerCase();
    if (!query) return;
    const found = converters.find((c) =>
      c.title.toLowerCase().includes(query)
    );
    if (found) {
      navigate(found.route);
      setSearchOpen(false);
      input.value = "";
    }
  }, [converters, navigate]);

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--color-background)]/80 backdrop-blur-xl supports-backdrop-blur:bg-[var(--color-background)]/80 safe-area-padding border-b border-[var(--color-border)]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link
          to={ROUTES.HOME}
          className="flex items-center gap-2.5 text-[var(--color-text)] hover:text-[var(--color-primary-500)] transition-colors flex-shrink-0"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-secondary-500)] text-white">
            <Ruler size={16} />
          </div>
          <span className="text-lg font-bold tracking-tight">{APP_NAME}</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="flex items-center gap-0.5 xl:gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === ROUTES.HOME}
              className={({ isActive }) =>
                cn(
                  "px-2.5 xl:px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150",
                  isActive
                    ? "bg-[var(--color-primary-500)]/10 text-[var(--color-primary-500)]"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchOpen(!searchOpen)}
            icon={<Search size={16} />}
            aria-label="Search converters"
            className="touch-target"
          />

          <a
            href="https://github.com/Yash-Singh-Chauhan/-universal-unit-converter"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg p-2 min-h-[44px] min-w-[44px] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)] transition-colors"
            aria-label="GitHub repository"
          >
            <Github size={18} />
          </a>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMode(theme.mode === "dark" ? "light" : "dark")}
            aria-label={`Switch to ${theme.mode === "dark" ? "light" : "dark"} mode`}
            icon={theme.mode === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            className="touch-target"
          />
        </div>
      </div>

      {/* Search Bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="border-t border-[var(--color-border)] px-3 sm:px-4 py-3"
          >
            <form onSubmit={handleSearch} className="mx-auto w-full max-w-md">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" />
                <input
                  name="search"
                  type="text"
                  placeholder="Search converters..."
                  className="w-full pl-9 pr-4 py-2.5 sm:py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:border-[var(--color-primary-500)] focus:ring-1 focus:ring-[var(--color-primary-500)]/20 transition-all"
                  autoFocus
                />
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
