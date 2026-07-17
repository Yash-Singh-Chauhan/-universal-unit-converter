import { type ReactNode } from "react";
import { cn } from "@/utils";

type BadgeVariant = "default" | "primary" | "success" | "warning" | "danger" | "glass";
type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] border border-[var(--color-border)]",
  primary:
    "bg-[var(--color-primary-500)]/10 text-[var(--color-primary-500)] border border-[var(--color-primary-500)]/20",
  success:
    "bg-[var(--color-success)]/10 text-[var(--color-success)] border border-[var(--color-success)]/20",
  warning:
    "bg-[var(--color-warning)]/10 text-[var(--color-warning)] border border-[var(--color-warning)]/20",
  danger:
    "bg-[var(--color-error)]/10 text-[var(--color-error)] border border-[var(--color-error)]/20",
  glass:
    "bg-[var(--glass-bg)] backdrop-blur-[var(--glass-backdrop)] border border-[var(--glass-border)] text-[var(--color-text)]",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
  lg: "px-3 py-1.5 text-base",
};

export function Badge({
  variant = "default",
  size = "sm",
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-medium rounded-full whitespace-nowrap",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}
