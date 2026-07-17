import { cn } from "@/utils";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular" | "card";
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  className,
  variant = "text",
  width,
  height,
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-[var(--color-surface-hover)] rounded-md",
        variant === "circular" && "rounded-full",
        variant === "card" && "rounded-xl",
        className
      )}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-[var(--color-border)] p-5 space-y-4 bg-[var(--color-surface)]">
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="space-y-2 flex-1">
          <Skeleton width="60%" height={16} />
          <Skeleton width="40%" height={12} />
        </div>
      </div>
      <Skeleton variant="text" width="100%" height={12} />
      <Skeleton variant="text" width="80%" height={12} />
      <Skeleton variant="text" width="45%" height={12} />
    </div>
  );
}
