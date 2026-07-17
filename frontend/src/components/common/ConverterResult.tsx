import { Card, Badge } from "@/components/ui";
import { cn } from "@/utils";

interface ConverterResultProps {
  value: string;
  fromUnit: string;
  toUnit: string;
  formula?: string;
  className?: string;
}

export function ConverterResult({
  value,
  fromUnit,
  toUnit,
  formula,
  className,
}: ConverterResultProps) {
  if (!value) return null;

  return (
    <Card
      variant="default"
      padding="md"
      className={cn("animate-fade-in-up", className)}
    >
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="primary" size="sm">Result</Badge>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-[var(--color-text)] font-mono tracking-tight">
            {value}
          </span>
          <span className="text-lg font-medium text-[var(--color-text-secondary)]">
            {toUnit}
          </span>
        </div>

        {formula && (
          <p className="text-sm text-[var(--color-text-secondary)] font-mono">
            {formula}
          </p>
        )}

        <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
          <span>From: {fromUnit}</span>
          <span aria-hidden="true">&middot;</span>
          <span>To: {toUnit}</span>
        </div>
      </div>
    </Card>
  );
}
