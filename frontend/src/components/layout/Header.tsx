import { useState, useCallback } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Moon, Sun, Menu, X, Ruler, Search,
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const { converters } = useApp();

  const closeMobile = useCallback(() => setMobileOpen(false), []);

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
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[var(--color-background)]/80 backdrop-blur-xl supports-backdrop-blur:bg-[var(--color-background)]/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to={ROUTES.HOME}
          className="flex items-center gap-2.5 text-[var(--color-text)] hover:text-[var(--color-primary-500)] transition-colors flex-shrink-0"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-secondary-500)] text-white">
            <Ruler size={16} />
          </div>
          <span className="text-lg font-bold tracking-tight hidden sm:inline">{APP_NAME}</span>
          <span className="text-lg font-bold tracking-tight sm:hidden">UC</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === ROUTES.HOME}
              className={({ isActive }) =>
                cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150",
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
          {/* Search */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchOpen(!searchOpen)}
            icon={<Search size={16} />}
            aria-label="Search converters"
            className="hidden sm:inline-flex"
          />

          {/* GitHub icon */}
          <a
            href="https://github.com/Yash-Singh-Chauhan/-universal-unit-converter"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)] transition-colors"
            aria-label="GitHub repository"
          >
            <Github size={18} />
          </a>

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMode(theme.mode === "dark" ? "light" : "dark")}
            aria-label={`Switch to ${theme.mode === "dark" ? "light" : "dark"} mode`}
            icon={theme.mode === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          />

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)] transition-colors lg:hidden"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
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
            className="border-t border-[var(--color-border)] px-4 py-3"
          >
            <form onSubmit={handleSearch} className="mx-auto max-w-md">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" />
                <input
                  name="search"
                  type="text"
                  placeholder="Search converters (e.g., height, weight)..."
                  className="w-full pl-9 pr-4 py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:border-[var(--color-primary-500)] focus:ring-1 focus:ring-[var(--color-primary-500)]/20 transition-all"
                  autoFocus
                />
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={closeMobile}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-50 w-72 bg-[var(--color-surface)] border-l border-[var(--color-border)] shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between px-4 py-4 border-b border-[var(--color-border)]">
                <span className="text-sm font-semibold text-[var(--color-text)]">Navigation</span>
                <button
                  onClick={closeMobile}
                  className="rounded-lg p-1.5 text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="px-3 py-4 space-y-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === ROUTES.HOME}
                    onClick={closeMobile}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                        isActive
                          ? "bg-[var(--color-primary-500)]/10 text-[var(--color-primary-500)]"
                          : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
                      )
                    }
                  >
                    <link.icon size={18} />
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
