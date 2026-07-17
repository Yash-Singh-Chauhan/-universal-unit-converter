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

  const inputUnitLabel = unitOptions.find((o) => o.value === inputUnit)?.label ?? inputUnit;
  const outputUnitLabel = unitOptions.find((o) => o.value === outputUnit)?.label ?? outputUnit;

  // Mobile: Apple Calculator-style layout
  if (isMobile) {
    return (
      <>
        <div className={cn("space-y-3", className)}>
          {/* FROM Section */}
          <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden shadow-sm">
            <div className="px-4 pt-3 pb-2">
              <label className="text-[10px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider">
                From
              </label>
              <div className="flex items-center gap-3 mt-1">
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="0"
                  value={inputValue}
                  onChange={(e) => onInputChange(e.target.value)}
                  disabled={isLoading}
                  className="flex-1 bg-transparent text-xl font-semibold text-[var(--color-text)] placeholder:text-[var(--color-text-tertiary)]/50 focus:outline-none py-2 min-h-[44px]"
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={() => setInputSheetOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[var(--color-background-secondary)] text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors flex-shrink-0"
                >
                  <span className="truncate max-w-[100px]">{inputUnitLabel}</span>
                  <ChevronDown size={14} className="flex-shrink-0 opacity-60" />
                </button>
              </div>
            </div>
          </div>

          {/* Swap + Output */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onSwap}
              disabled={isLoading}
              className="flex-shrink-0 rounded-full p-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-tertiary)] hover:text-[var(--color-text)] hover:border-[var(--color-border-hover)] transition-all active:scale-90"
              aria-label="Swap units"
            >
              <ArrowDownUp size={16} />
            </button>

            <div className="flex-1 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden shadow-sm">
              <div className="px-4 pt-3 pb-2">
                <label className="text-[10px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider">
                  To
                </label>
                <div className="flex items-center gap-3 mt-1">
                  <input
                    type="text"
                    placeholder="0"
                    value={outputValue}
                    readOnly
                    className="flex-1 bg-transparent text-xl font-semibold text-[var(--color-text)] focus:outline-none py-2 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setOutputSheetOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[var(--color-background-secondary)] text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors flex-shrink-0"
                  >
                    <span className="truncate max-w-[100px]">{outputUnitLabel}</span>
                    <ChevronDown size={14} className="flex-shrink-0 opacity-60" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Sheets */}
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
    );
  }

  // Desktop: Existing side-by-side layout
  return (
    <>
      <Card variant="default" padding="lg" className={cn("space-y-4 sm:space-y-6", className)}>
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-end">
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
          </div>

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
          </div>
        </div>
      </Card>
    </>
  );
}
