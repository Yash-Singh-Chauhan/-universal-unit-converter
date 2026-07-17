import { type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home, LayoutGrid, Star, Clock, Settings, Info, Sun, Moon, MessageSquare, X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ROUTES, APP_NAME } from "@/constants";
import { useTheme } from "@/hooks";

interface MenuItem {
  id: string;
  label: string;
  icon: ReactNode;
  action: () => void;
  divider?: boolean;
}

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const navigate = useNavigate();
  const { theme, setMode } = useTheme();

  const menuItems: MenuItem[] = [
    {
      id: "home",
      label: "Home",
      icon: <Home size={20} />,
      action: () => { navigate(ROUTES.HOME); onClose(); },
    },
    {
      id: "converters",
      label: "All Converters",
      icon: <LayoutGrid size={20} />,
      action: () => { navigate(ROUTES.HOME); onClose(); },
    },
    {
      id: "favorites",
      label: "Favorites",
      icon: <Star size={20} />,
      action: () => { onClose(); },
    },
    {
      id: "recent",
      label: "Recent Conversions",
      icon: <Clock size={20} />,
      action: () => { onClose(); },
      divider: true,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings size={20} />,
      action: () => { navigate(ROUTES.HOME); onClose(); },
    },
    {
      id: "about",
      label: "About",
      icon: <Info size={20} />,
      action: () => { onClose(); },
      divider: true,
    },
    {
      id: "theme",
      label: theme.mode === "dark" ? "Light Mode" : "Dark Mode",
      icon: theme.mode === "dark" ? <Sun size={20} /> : <Moon size={20} />,
      action: () => { setMode(theme.mode === "dark" ? "light" : "dark"); },
    },
    {
      id: "feedback",
      label: "Feedback",
      icon: <MessageSquare size={20} />,
      action: () => { onClose(); },
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[55] lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="absolute inset-y-0 left-0 w-[280px] max-w-[80vw] bg-[var(--color-surface)] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-5 border-b border-[var(--color-border)]">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-secondary-500)] text-white">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.4 2.4 0 0 1 0-3.4l2.6-2.6a2.4 2.4 0 0 1 3.4 0Z" />
                    <path d="m14.5 6.5 3 3" />
                    <path d="m6.5 14.5 3 3" />
                  </svg>
                </div>
                <div>
                  <span className="text-sm font-bold text-[var(--color-text)]">{APP_NAME}</span>
                  <p className="text-[10px] text-[var(--color-text-tertiary)]">v1.0.0</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 min-h-[40px] min-w-[40px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)] transition-colors"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto px-3 py-3">
              <div className="space-y-0.5">
                {menuItems.map((item) => (
                  <div key={item.id}>
                    <button
                      onClick={item.action}
                      className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)] transition-all touch-ripple active:scale-[0.98]"
                    >
                      <span className="flex-shrink-0 opacity-70">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                    {item.divider && (
                      <div className="my-2 mx-3 border-t border-[var(--color-border)]" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-[var(--color-border)]">
              <p className="text-[10px] text-[var(--color-text-tertiary)] text-center">
                Free &amp; Open Source
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
