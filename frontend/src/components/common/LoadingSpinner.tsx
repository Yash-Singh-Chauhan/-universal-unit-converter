import { cn } from "@/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

const sizeStyles: Record<string, string> = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-[3px]",
  lg: "w-10 h-10 border-[4px]",
};

export function LoadingSpinner({
  size = "md",
  className,
  label,
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn("flex items-center gap-2", className)}
      role="status"
      aria-label={label ?? "Loading"}
    >
      <span
        className={cn(
          "inline-block rounded-full border-[var(--color-primary-500)] border-t-transparent animate-spin",
          sizeStyles[size]
        )}
      />
      {label && (
        <span className="text-sm text-[var(--color-text-secondary)]">{label}</span>
      )}
    </div>
  );
}
