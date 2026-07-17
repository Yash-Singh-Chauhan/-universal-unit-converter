import { Search, Mic } from "lucide-react";
import { cn } from "@/utils";

interface MobileSearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function MobileSearchBar({
  value = "",
  onChange,
  onSubmit,
  placeholder = "Search converters...",
  className,
}: MobileSearchBarProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("relative w-full", className)}
    >
      <div className="relative flex items-center">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="w-full h-11 pl-10 pr-12 rounded-2xl text-sm bg-[var(--color-background-secondary)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/10 transition-all"
        />
        {/* Voice icon placeholder */}
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-[var(--color-text-tertiary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors"
          aria-label="Voice search"
        >
          <Mic size={16} />
        </button>
      </div>
    </form>
  );
}
