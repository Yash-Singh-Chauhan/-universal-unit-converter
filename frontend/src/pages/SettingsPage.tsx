import { SEOHead } from "@/components/common";
import {
  Moon, Sun, Volume2, ArrowLeft, Sparkles,
  Info, Star, Share2, Shield, FileText, ChevronRight, Sliders,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme, useSettings } from "@/hooks";
import { ROUTES, APP_NAME, APP_VERSION } from "@/constants";

export function SettingsPage() {
  const navigate = useNavigate();
  const { theme, setMode, toggleGlassmorphism, toggleReducedMotion } = useTheme();
  const { settings, updateSettings } = useSettings();

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: APP_NAME,
        text: "Check out this amazing unit converter app!",
        url: window.location.origin,
      });
    }
  };

  return (
    <>
      <SEOHead title="Settings" />

      {/* Mobile header */}
      <div className="flex sm:hidden items-center gap-2 mb-5">
        <button
          onClick={() => navigate(ROUTES.HOME)}
          className="rounded-full p-2 min-h-[48px] min-w-[48px] flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] transition-colors active:scale-[0.95]"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-[var(--color-text)]">Settings</h1>
      </div>

      {/* Desktop title */}
      <h1 className="hidden sm:block text-2xl font-bold text-[var(--color-text)] mb-6">Settings</h1>

      <div className="space-y-4 max-w-lg pb-8">
        {/* ===== APPEARANCE ===== */}
        <div className="rounded-2xl bg-[var(--color-surface)]/80 backdrop-blur-xl border border-[var(--color-border)] overflow-hidden shadow-sm">
          <div className="relative px-4 py-3.5 border-b border-[var(--color-border)] bg-gradient-to-r from-[var(--color-primary-500)]/5 to-transparent">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[var(--color-primary-500)]/10 text-[var(--color-primary-500)]">
                <Sparkles size={14} />
              </div>
              <h2 className="text-sm font-semibold text-[var(--color-text)]">Appearance</h2>
            </div>
          </div>

          <div className="divide-y divide-[var(--color-border)]">
            {/* Dark Mode */}
            <div className="px-4 py-3 text-sm space-y-2">
              <label className="text-[11px] font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider">Theme</label>
              <div className="flex gap-2">
                {[
                  { mode: "light" as const, icon: Sun, label: "Light" },
                  { mode: "dark" as const, icon: Moon, label: "Dark" },
                ].map(({ mode, icon: Icon, label }) => (
                  <button
                    key={mode}
                    onClick={() => setMode(mode)}
                    className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl text-xs font-medium transition-all duration-200 min-h-[48px] ${
                      theme.mode === mode
                        ? "bg-[var(--color-primary-500)]/10 text-[var(--color-primary-500)] border border-[var(--color-primary-500)]/20"
                        : "bg-[var(--color-background)]/50 text-[var(--color-text-tertiary)] border border-[var(--color-border)] hover:text-[var(--color-text-secondary)]"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Glassmorphism */}
            <div className="px-4 py-3.5">
              <label className="flex items-center justify-between cursor-pointer min-h-[48px]">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[var(--color-primary-500)]/10 text-[var(--color-primary-500)]">
                    <Sparkles size={14} />
                  </div>
                  <div>
                    <span className="text-sm text-[var(--color-text)]">Glassmorphism</span>
                    <p className="text-[11px] text-[var(--color-text-tertiary)]">Frosted glass effects</p>
                  </div>
                </div>
                <div
                  role="switch"
                  aria-checked={theme.glassmorphism}
                  onClick={toggleGlassmorphism}
                  className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                    theme.glassmorphism ? "bg-[var(--color-primary-500)]" : "bg-[var(--color-border)]"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                      theme.glassmorphism ? "translate-x-[22px]" : "translate-x-0.5"
                    }`}
                  />
                </div>
              </label>
            </div>

            {/* Animations */}
            <div className="px-4 py-3.5">
              <label className="flex items-center justify-between cursor-pointer min-h-[48px]">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[var(--color-accent-500)]/10 text-[var(--color-accent-500)]">
                    <Sparkles size={14} />
                  </div>
                  <div>
                    <span className="text-sm text-[var(--color-text)]">Animations</span>
                    <p className="text-[11px] text-[var(--color-text-tertiary)]">Reduced motion</p>
                  </div>
                </div>
                <div
                  role="switch"
                  aria-checked={!theme.reducedMotion}
                  onClick={toggleReducedMotion}
                  className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                    !theme.reducedMotion ? "bg-[var(--color-primary-500)]" : "bg-[var(--color-border)]"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                      !theme.reducedMotion ? "translate-x-[22px]" : "translate-x-0.5"
                    }`}
                  />
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* ===== CONVERSION SETTINGS ===== */}
        <div className="rounded-2xl bg-[var(--color-surface)]/80 backdrop-blur-xl border border-[var(--color-border)] overflow-hidden shadow-sm">
          <div className="relative px-4 py-3.5 border-b border-[var(--color-border)] bg-gradient-to-r from-[var(--color-secondary-500)]/5 to-transparent">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[var(--color-secondary-500)]/10 text-[var(--color-secondary-500)]">
                <Sliders size={14} />
              </div>
              <h2 className="text-sm font-semibold text-[var(--color-text)]">Conversion</h2>
            </div>
          </div>

          <div className="divide-y divide-[var(--color-border)]">
            {/* Decimal places */}
            <div className="px-4 py-3.5 flex items-center justify-between min-h-[48px]">
              <span className="text-sm text-[var(--color-text)]">Decimal Places</span>
              <select
                value={settings.decimalPlaces}
                onChange={(e) => updateSettings({ decimalPlaces: Number(e.target.value) })}
                className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg px-3 py-1.5 text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary-500)] focus:ring-1 focus:ring-[var(--color-primary-500)]/20 min-h-[36px]"
              >
                {[0, 1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            {/* Auto Convert */}
            <label className="px-4 py-3.5 flex items-center justify-between cursor-pointer min-h-[48px]">
              <span className="text-sm text-[var(--color-text)]">Auto Convert</span>
              <div
                role="switch"
                aria-checked={settings.autoConvert}
                onClick={() => updateSettings({ autoConvert: !settings.autoConvert })}
                className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                  settings.autoConvert ? "bg-[var(--color-primary-500)]" : "bg-[var(--color-border)]"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                    settings.autoConvert ? "translate-x-[22px]" : "translate-x-0.5"
                  }`}
                />
              </div>
            </label>

            {/* Sound Effects */}
            <label className="px-4 py-3.5 flex items-center justify-between cursor-pointer min-h-[48px]">
              <div className="flex items-center gap-3">
                <Volume2 size={16} className="text-[var(--color-text-tertiary)]" />
                <span className="text-sm text-[var(--color-text)]">Sound Effects</span>
              </div>
              <div
                role="switch"
                aria-checked={settings.soundEnabled}
                onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
                className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                  settings.soundEnabled ? "bg-[var(--color-primary-500)]" : "bg-[var(--color-border)]"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                    settings.soundEnabled ? "translate-x-[22px]" : "translate-x-0.5"
                  }`}
                />
              </div>
            </label>
          </div>
        </div>

        {/* ===== ABOUT ===== */}
        <div className="rounded-2xl bg-[var(--color-surface)]/80 backdrop-blur-xl border border-[var(--color-border)] overflow-hidden shadow-sm">
          <div className="relative px-4 py-3.5 border-b border-[var(--color-border)] bg-gradient-to-r from-[var(--color-accent-500)]/5 to-transparent">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[var(--color-accent-500)]/10 text-[var(--color-accent-500)]">
                <Info size={14} />
              </div>
              <h2 className="text-sm font-semibold text-[var(--color-text)]">About</h2>
            </div>
          </div>

          <div className="divide-y divide-[var(--color-border)]">
            {/* Rate App */}
            <button
              onClick={() => {/* In-app rating - native flow */}}
              className="w-full px-4 py-3.5 flex items-center justify-between text-sm text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors min-h-[48px] active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <Star size={16} className="text-[var(--color-warning)]" />
                <span>Rate App</span>
              </div>
              <ChevronRight size={16} className="text-[var(--color-text-tertiary)]" />
            </button>

            {/* Share App */}
            <button
              onClick={handleShare}
              className="w-full px-4 py-3.5 flex items-center justify-between text-sm text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors min-h-[48px] active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <Share2 size={16} className="text-[var(--color-primary-500)]" />
                <span>Share App</span>
              </div>
              <ChevronRight size={16} className="text-[var(--color-text-tertiary)]" />
            </button>

            {/* Privacy Policy */}
            <button
              onClick={() => {/* Navigate to privacy */}}
              className="w-full px-4 py-3.5 flex items-center justify-between text-sm text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors min-h-[48px] active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <Shield size={16} className="text-[var(--color-success)]" />
                <span>Privacy Policy</span>
              </div>
              <ChevronRight size={16} className="text-[var(--color-text-tertiary)]" />
            </button>

            {/* Terms */}
            <button
              onClick={() => {/* Navigate to terms */}}
              className="w-full px-4 py-3.5 flex items-center justify-between text-sm text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors min-h-[48px] active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <FileText size={16} className="text-[var(--color-text-tertiary)]" />
                <span>Terms of Service</span>
              </div>
              <ChevronRight size={16} className="text-[var(--color-text-tertiary)]" />
            </button>
          </div>
        </div>

        {/* ===== APP VERSION ===== */}
        <div className="rounded-2xl bg-[var(--color-surface)]/40 backdrop-blur-sm border border-[var(--color-border)] overflow-hidden text-center py-4">
          <p className="text-xs text-[var(--color-text-tertiary)] mb-1">
            {APP_NAME}
          </p>
          <p className="text-[11px] font-mono text-[var(--color-text-tertiary)]">
            v{APP_VERSION}
          </p>
          <p className="text-[10px] text-[var(--color-text-tertiary)] mt-1.5 opacity-60">
            Free &amp; Open Source
          </p>
        </div>
      </div>
    </>
  );
}
