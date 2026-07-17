import { ArrowDownUp } from "lucide-react";
import { Input, Select, Card } from "@/components/ui";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils";
import type { SelectOption } from "@/types";

interface ConverterInputProps {
  inputValue: string;
  inputUnit: string;
  outputValue: string;
  outputUnit: string;
  unitOptions: SelectOption[];
  onInputChange: (value: string) => void;
  onInputUnitChange: (unit: string) => void;
  onOutputUnitChange: (unit: string) => void;
  onSwap: () => void;
  onReset?: () => void;
  isLoading?: boolean;
  className?: string;
}

export function ConverterInput({
  inputValue,
  inputUnit,
  outputValue,
  outputUnit,
  unitOptions,
  onInputChange,
  onInputUnitChange,
  onOutputUnitChange,
  onSwap,
  isLoading = false,
  className,
}: ConverterInputProps) {
  return (
    <Card variant="default" padding="lg" className={cn("space-y-6", className)}>
      <div className="grid gap-6 sm:grid-cols-[1fr_auto_1fr] items-end">
        {/* Input Side */}
        <div className="space-y-3">
          <Input
            id="input-value"
            label="From"
            type="text"
            inputMode="decimal"
            placeholder="Enter value..."
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            disabled={isLoading}
          />
          <Select
            id="from-unit"
            label="Unit"
            options={unitOptions}
            value={inputUnit}
            onChange={(e) => onInputUnitChange(e.target.value)}
            disabled={isLoading}
          />
        </div>

        {/* Swap Button */}
        <div className="flex justify-center pb-1">
          <Button
            variant="secondary"
            size="md"
            onClick={onSwap}
            icon={<ArrowDownUp size={16} />}
            aria-label="Swap units"
            className="rounded-full h-10 w-10 p-0"
            disabled={isLoading}
          />
        </div>

        {/* Output Side */}
        <div className="space-y-3">
          <Input
            id="output-value"
            label="To"
            type="text"
            placeholder="Result..."
            value={outputValue}
            readOnly
            className="font-mono font-semibold text-base bg-[var(--color-primary-500)]/5 border-[var(--color-primary-500)]/20"
          />
          <Select
            id="to-unit"
            label="Unit"
            options={unitOptions}
            value={outputUnit}
            onChange={(e) => onOutputUnitChange(e.target.value)}
            disabled={isLoading}
          />
        </div>
      </div>
    </Card>
  );
}
