import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/utils";
import type { SelectOption } from "@/types";

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, placeholder, id, ...props }, ref) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-[var(--color-text-secondary)]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              "w-full px-3.5 py-2.5 rounded-lg appearance-none",
              "bg-[var(--color-surface)] text-[var(--color-text)]",
              "border border-[var(--color-border)]",
              "transition-all duration-[var(--duration-fast)] ease-[var(--ease-out)]",
              "hover:border-[var(--color-border-hover)]",
              "focus:outline-none focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/20",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              error && "border-[var(--color-error)]",
              className
            )}
            aria-invalid={error ? "true" : undefined}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-text-secondary)]">
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
              <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
        {error && (
          <p className="text-xs text-[var(--color-error)]" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
