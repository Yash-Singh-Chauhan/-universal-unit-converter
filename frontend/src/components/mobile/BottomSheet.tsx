import { useState, useEffect, useRef } from "react";
import { Search, X, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils";

interface BottomSheetOption {
  value: string;
  label: string;
}

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  options: BottomSheetOption[];
  selectedValue?: string;
  onSelect: (value: string) => void;
  searchable?: boolean;
}

const STORAGE_KEY = "uc-recent-selections";

function loadRecentSelections(): string[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function saveRecentSelections(values: string[]): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(values.slice(0, 5)));
  } catch {
    // Silently fail
  }
}

export function BottomSheet({
  isOpen,
  onClose,
  title = "Select option",
  options,
  selectedValue,
  onSelect,
  searchable = false,
}: BottomSheetProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSelections, setRecentSelections] = useState<string[]>(loadRecentSelections);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && searchable) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, searchable]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setSearchQuery(""), 200);
    }
  }, [isOpen]);

  const filteredOptions = searchQuery
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  const recentOptions = recentSelections
    .map((val) => options.find((o) => o.value === val))
    .filter((o): o is BottomSheetOption => o !== undefined)
    .filter((o) => o.value !== selectedValue);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleSelect = (value: string) => {
    onSelect(value);
    const updated = [value, ...recentSelections.filter((v) => v !== value)];
    setRecentSelections(updated);
    saveRecentSelections(updated);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 350 }}
            className="relative z-10 w-full max-h-[80vh] rounded-t-3xl bg-[var(--color-surface)] border-t border-[var(--color-border)] shadow-2xl flex flex-col"
          >
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-[var(--color-text-tertiary)]/30" />
            </div>

            <div className="flex items-center justify-between px-6 pb-3 pt-1">
              <h2 className="text-base font-semibold text-[var(--color-text)]">{title}</h2>
              <button
                onClick={onClose}
                className="rounded-full p-2 min-h-[40px] min-w-[40px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)] transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {searchable && (
              <div className="px-4 pb-3">
                <div className="relative">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm bg-[var(--color-background-secondary)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:border-[var(--color-primary-500)] transition-colors"
                  />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-0.5">
              {/* Recent selections */}
              {!searchQuery && recentOptions.length > 0 && (
                <div className="mb-2">
                  <div className="flex items-center gap-1.5 px-4 py-2">
                    <Clock size={12} className="text-[var(--color-text-tertiary)]" />
                    <span className="text-[10px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider">Recent</span>
                  </div>
                  {recentOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSelect(option.value)}
                      className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)] transition-all"
                    >
                      {option.label}
                    </button>
                  ))}
                  <div className="border-t border-[var(--color-border)] my-2 mx-4" />
                </div>
              )}

              {/* All options */}
              {filteredOptions.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-sm text-[var(--color-text-tertiary)]">No results found</p>
                </div>
              ) : (
                filteredOptions.map((option) => {
                  const isSelected = option.value === selectedValue;
                  return (
                    <button
                      key={option.value}
                      onClick={() => handleSelect(option.value)}
                      className={cn(
                        "w-full text-left px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-150",
                        isSelected
                          ? "bg-[var(--color-primary-500)]/10 text-[var(--color-primary-500)]"
                          : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={cn(
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0",
                            isSelected
                              ? "border-[var(--color-primary-500)] bg-[var(--color-primary-500)]"
                              : "border-[var(--color-border-hover)]"
                          )}
                        >
                          {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                        </span>
                        <span>{option.label}</span>
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
