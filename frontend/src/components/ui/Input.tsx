import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[var(--color-text-secondary)]"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-3.5 py-2.5 rounded-lg",
            "bg-[var(--color-surface)] text-[var(--color-text)]",
            "border border-[var(--color-border)]",
            "placeholder:text-[var(--color-text-secondary)] placeholder:text-sm",
            "transition-all duration-[var(--duration-fast)] ease-[var(--ease-out)]",
            "hover:border-[var(--color-border-hover)]",
            "focus:outline-none focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/20",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]/20",
            className
          )}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          {...props}
        />
        {error && (
          <p
            id={`${inputId}-error`}
            className="text-xs text-[var(--color-error)]"
            role="alert"
          >
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-xs text-[var(--color-text-secondary)]">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
