import { useState } from "react";
import { ArrowDownUp, ChevronDown } from "lucide-react";
import { Input, Select, Card } from "@/components/ui";
import { Button } from "@/components/ui/Button";
import { BottomSheet } from "@/components/mobile";
import { cn } from "@/utils";
import { useIsMobile } from "@/hooks";
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
  const isMobile = useIsMobile();
  const [inputSheetOpen, setInputSheetOpen] = useState(false);
  const [outputSheetOpen, setOutputSheetOpen] = useState(false);

  // Find selected labels
  const inputUnitLabel = unitOptions.find((o) => o.value === inputUnit)?.label ?? inputUnit;
  const outputUnitLabel = unitOptions.find((o) => o.value === outputUnit)?.label ?? outputUnit;

  return (
    <>
      <Card variant="default" padding="lg" className={cn("space-y-4 sm:space-y-6", className)}>
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-end">
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
            {/* Desktop: Select dropdown */}
            <div className="hidden sm:block">
              <Select
                id="from-unit"
                label="Unit"
                options={unitOptions}
                value={inputUnit}
                onChange={(e) => onInputUnitChange(e.target.value)}
                disabled={isLoading}
              />
            </div>
            {/* Mobile: Bottom sheet trigger */}
            {isMobile && (
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[var(--color-text-secondary)]">Unit</label>
                <button
                  type="button"
                  onClick={() => setInputSheetOpen(true)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm sm:text-base bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-all"
                >
                  <span className="truncate">{inputUnitLabel}</span>
                  <ChevronDown size={16} className="flex-shrink-0 text-[var(--color-text-tertiary)] ml-2" />
                </button>
              </div>
            )}
          </div>

          {/* Swap Button */}
          <div className="flex justify-center sm:pb-1">
            <Button
              variant="secondary"
              size="md"
              onClick={onSwap}
              icon={<ArrowDownUp size={16} />}
              aria-label="Swap units"
              className="rounded-full h-11 w-11 sm:h-10 sm:w-10 p-0"
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
              className="font-mono font-semibold text-sm sm:text-base bg-[var(--color-primary-500)]/5 border-[var(--color-primary-500)]/20"
            />
            {/* Desktop: Select dropdown */}
            <div className="hidden sm:block">
              <Select
                id="to-unit"
                label="Unit"
                options={unitOptions}
                value={outputUnit}
                onChange={(e) => onOutputUnitChange(e.target.value)}
                disabled={isLoading}
              />
            </div>
            {/* Mobile: Bottom sheet trigger */}
            {isMobile && (
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[var(--color-text-secondary)]">Unit</label>
                <button
                  type="button"
                  onClick={() => setOutputSheetOpen(true)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm sm:text-base bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-all"
                >
                  <span className="truncate">{outputUnitLabel}</span>
                  <ChevronDown size={16} className="flex-shrink-0 text-[var(--color-text-tertiary)] ml-2" />
                </button>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Mobile Bottom Sheets */}
      {isMobile && (
        <>
          <BottomSheet
            isOpen={inputSheetOpen}
            onClose={() => setInputSheetOpen(false)}
            title="Select unit"
            options={unitOptions.map((o) => ({ value: o.value, label: o.label }))}
            selectedValue={inputUnit}
            onSelect={(val) => onInputUnitChange(val)}
            searchable
          />
          <BottomSheet
            isOpen={outputSheetOpen}
            onClose={() => setOutputSheetOpen(false)}
            title="Select unit"
            options={unitOptions.map((o) => ({ value: o.value, label: o.label }))}
            selectedValue={outputUnit}
            onSelect={(val) => onOutputUnitChange(val)}
            searchable
          />
        </>
      )}
    </>
  );
}
