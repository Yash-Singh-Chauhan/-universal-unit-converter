import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/utils";

type CardVariant = "default" | "glass" | "bordered" | "flat";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: "none" | "sm" | "md" | "lg";
  children: ReactNode;
  as?: "div" | "section" | "article";
}

const variantStyles: Record<CardVariant, string> = {
  default:
    "bg-[var(--color-surface)] shadow-[var(--shadow-md)] border border-[var(--color-border)]",
  glass:
    "bg-[var(--glass-bg)] backdrop-blur-[var(--glass-backdrop)] border border-[var(--glass-border)] shadow-[var(--glass-shadow)]",
  bordered:
    "bg-transparent border border-[var(--color-border)] hover:border-[var(--color-border-hover)]",
  flat: "bg-[var(--color-surface)]",
};

const paddingStyles: Record<string, string> = {
  none: "p-0",
  sm: "p-3",
  md: "p-5",
  lg: "p-7",
};

export function Card({
  className,
  variant = "default",
  padding = "md",
  children,
  as: Component = "div",
  ...props
}: CardProps) {
  return (
    <Component
      className={cn(
        "rounded-xl transition-all duration-[var(--duration-normal)] ease-[var(--ease-out)]",
        variantStyles[variant],
        paddingStyles[padding],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 mb-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-lg font-semibold text-[var(--color-text)]",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
}
