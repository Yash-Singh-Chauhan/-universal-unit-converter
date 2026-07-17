import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "glass";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-primary-500)] text-white hover:bg-[var(--color-primary-600)] active:bg-[var(--color-primary-700)] shadow-md hover:shadow-lg",
  secondary:
    "bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-hover)]",
  ghost:
    "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]",
  danger:
    "bg-[var(--color-error)] text-white hover:opacity-90 active:opacity-80",
  glass:
    "bg-[var(--glass-bg)] backdrop-blur-[var(--glass-backdrop)] border border-[var(--glass-border)] text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-2 text-sm gap-1.5",
  md: "px-4 py-2.5 text-sm sm:text-base gap-2 min-h-[44px]",
  lg: "px-5 py-3 sm:px-6 sm:py-3 text-base sm:text-lg gap-2.5 min-h-[48px]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      icon,
      iconPosition = "left",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-[var(--duration-fast)] ease-[var(--ease-out)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-500)] disabled:opacity-50 disabled:pointer-events-none select-none",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : icon && iconPosition === "left" ? (
          <span className="flex-shrink-0">{icon}</span>
        ) : null}
        {children}
        {!isLoading && icon && iconPosition === "right" ? (
          <span className="flex-shrink-0">{icon}</span>
        ) : null}
      </button>
    );
  }
);

Button.displayName = "Button";
