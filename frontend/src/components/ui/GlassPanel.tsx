import { type ReactNode } from "react";
import { cn } from "@/utils";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  intensity?: "light" | "medium" | "heavy";
  padding?: "sm" | "md" | "lg";
}

const intensityStyles: Record<string, string> = {
  light:
    "bg-[var(--glass-bg)]/50 backdrop-blur-sm border border-[var(--glass-border)]/50",
  medium:
    "bg-[var(--glass-bg)] backdrop-blur-[var(--glass-backdrop)] border border-[var(--glass-border)]",
  heavy:
    "bg-[var(--glass-bg)]/120 backdrop-blur-xl border border-[var(--glass-border)]/120 shadow-[var(--glass-shadow)]",
};

const paddingStyles: Record<string, string> = {
  sm: "p-3 sm:p-4",
  md: "p-4 sm:p-6",
  lg: "p-5 sm:p-8",
};

export function GlassPanel({
  children,
  className,
  intensity = "medium",
  padding = "md",
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        "rounded-2xl transition-all duration-[var(--duration-normal)]",
        intensityStyles[intensity],
        paddingStyles[padding],
        className
      )}
    >
      {children}
    </div>
  );
}
