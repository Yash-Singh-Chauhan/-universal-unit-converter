import { SEOHead } from "@/components/common";
import { Moon, Sun, Volume2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme, useSettings } from "@/hooks";
import { ROUTES } from "@/constants";

export function SettingsPage() {
  const navigate = useNavigate();
  const { theme, setMode } = useTheme();
  const { settings, updateSettings } = useSettings();

  return (
    <>
      <SEOHead title="Settings" />

      {/* Mobile Header for settings page */}
      <div className="flex sm:hidden items-center gap-2 mb-4">
        <button
          onClick={() => navigate(ROUTES.HOME)}
          className="rounded-full p-2 min-h-[40px] min-w-[40px] flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-[var(--color-text)]">Settings</h1>
      </div>

      {/* Desktop title */}
      <h1 className="hidden sm:block text-2xl font-bold text-[var(--color-text)] mb-6">Settings</h1>

      <div className="space-y-3 max-w-lg">
        {/* Theme */}
        <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden">
          <div className="px-4 py-3 border-b border-[var(--color-border)]">
            <h2 className="text-sm font-semibold text-[var(--color-text)]">Appearance</h2>
          </div>

          <button
            onClick={() => setMode(theme.mode === "dark" ? "light" : "dark")}
            className="w-full flex items-center justify-between px-4 py-3.5 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] transition-colors active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              {theme.mode === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              <span>Dark Mode</span>
            </div>
            <div
              className={`w-11 h-6 rounded-full transition-colors relative ${
                theme.mode === "dark" ? "bg-[var(--color-primary-500)]" : "bg-[var(--color-border)]"
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                  theme.mode === "dark" ? "translate-x-[22px]" : "translate-x-0.5"
                }`}
              />
            </div>
          </button>
        </div>

        {/* Conversion Settings */}
        <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden">
          <div className="px-4 py-3 border-b border-[var(--color-border)]">
            <h2 className="text-sm font-semibold text-[var(--color-text)]">Conversion</h2>
          </div>

          <div className="px-4 py-3.5 text-sm text-[var(--color-text-secondary)] space-y-3">
            <div className="flex items-center justify-between">
              <span>Decimal Places</span>
              <select
                value={settings.decimalPlaces}
                onChange={(e) => updateSettings({ decimalPlaces: Number(e.target.value) })}
                className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg px-2 py-1 text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary-500)]"
              >
                {[0, 1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            <label className="flex items-center justify-between cursor-pointer">
              <span>Auto Convert</span>
              <input
                type="checkbox"
                checked={settings.autoConvert}
                onChange={(e) => updateSettings({ autoConvert: e.target.checked })}
                className="rounded border-[var(--color-border)] text-[var(--color-primary-500)] focus:ring-[var(--color-primary-500)]"
              />
            </label>
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden">
          <div className="px-4 py-3 border-b border-[var(--color-border)]">
            <h2 className="text-sm font-semibold text-[var(--color-text)]">Preferences</h2>
          </div>

          <label className="w-full flex items-center justify-between px-4 py-3.5 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <Volume2 size={18} />
              <span>Sound Effects</span>
            </div>
            <input
              type="checkbox"
              checked={settings.soundEnabled}
              onChange={(e) => updateSettings({ soundEnabled: e.target.checked })}
              className="rounded border-[var(--color-border)] text-[var(--color-primary-500)] focus:ring-[var(--color-primary-500)]"
            />
          </label>
        </div>
      </div>
    </>
  );
}
