import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Card, CardTitle, CardContent, Badge } from "@/components/ui";
import { cn } from "@/utils";
import type { ConverterDefinition } from "@/types";

interface ConverterCardProps {
  converter: ConverterDefinition;
  className?: string;
  index?: number;
}

export function ConverterCard({ converter, className, index = 0 }: ConverterCardProps) {
  const Icon = converter.icon;

  return (
    <Link
      to={converter.route}
      className={cn(
        "group block",
        "animate-fade-in-up",
        className
      )}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <Card
        variant="default"
        padding="md"
        className="h-full transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)] group-hover:shadow-[var(--shadow-lg)] group-hover:border-[var(--color-primary-500)]/30 group-hover:-translate-y-0.5"
      >
        <CardContent className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary-500)]/10 text-[var(--color-primary-500)] transition-colors group-hover:bg-[var(--color-primary-500)]/20">
              <Icon size={20} />
            </div>
            <Badge variant="primary" size="sm">
              {converter.category}
            </Badge>
          </div>

          <CardTitle className="text-base">{converter.title}</CardTitle>

          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            {converter.description}
          </p>

          <div className="flex items-center gap-1 text-xs font-medium text-[var(--color-primary-500)] mt-auto pt-2">
            <span>Open converter</span>
            <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
