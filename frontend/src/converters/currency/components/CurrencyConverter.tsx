import { useEffect, useState } from "react";
import { Coins, Copy, Check, RotateCcw, RefreshCw } from "lucide-react";
import { ConverterInput, ConverterResult } from "@/components/common";
import { Card, Button } from "@/components/ui";
import { useCurrencyConverter } from "../hooks/useCurrencyConverter";
import { CURRENCY_UNITS } from "../constants";
import type { SelectOption } from "@/types";
import type { CurrencyUnitId } from "../types";

const unitOptions: SelectOption[] = CURRENCY_UNITS.map((u) => ({
  value: u.id,
  label: `${u.name} (${u.symbol})`,
}));

export function CurrencyConverter() {
  const { state, setValue, setFromUnit, setToUnit, swapUnits, convert, reset } =
    useCurrencyConverter();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (state.value) convert();
  }, [state.value, state.fromUnit, state.toUnit, convert]);

  const handleCopy = async () => {
    if (state.result) {
      await navigator.clipboard.writeText(state.result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary-500)]/10 text-[var(--color-primary-500)]">
          <Coins size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">Currency Converter</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Live currency conversion with real-time market exchange rates
          </p>
        </div>
      </div>

      <ConverterInput
        inputValue={state.value}
        inputUnit={state.fromUnit}
        outputValue={state.result}
        outputUnit={state.toUnit}
        unitOptions={unitOptions}
        onInputChange={setValue}
        onInputUnitChange={(unit) => setFromUnit(unit as CurrencyUnitId)}
        onOutputUnitChange={(unit) => setToUnit(unit as CurrencyUnitId)}
        onSwap={swapUnits}
        isLoading={state.isConverting}
      />

      {/* Metadata bar */}
      {(state.rate || state.isConverting) && (
        <Card variant="flat" padding="sm" className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-[var(--color-text-secondary)]">
            {state.isConverting ? (
              <span className="flex items-center gap-1.5">
                <RefreshCw size={12} className="animate-spin" />
                Fetching live rate...
              </span>
            ) : state.rate ? (
              <>
                <span>
                  1 {state.fromUnit} = {state.rate.toFixed(6)} {state.toUnit}
                </span>
                {state.lastUpdated && (
                  <span>Updated: {new Date(state.lastUpdated).toLocaleString()}</span>
                )}
              </>
            ) : null}
          </div>
          <div className="flex items-center gap-1">
            {state.result && (
              <Button variant="ghost" size="sm" onClick={handleCopy} icon={copied ? <Check size={14} /> : <Copy size={14} />}>
                {copied ? "Copied" : "Copy"}
              </Button>
            )}
            {(state.value || state.result) && (
              <Button variant="ghost" size="sm" onClick={reset} icon={<RotateCcw size={14} />}>
                Clear
              </Button>
            )}
          </div>
        </Card>
      )}

      {state.error && (
        <Card variant="default" padding="md" className="border-[var(--color-error)]/30">
          <p className="text-sm text-[var(--color-error)]">{state.error}</p>
        </Card>
      )}

      {state.result && !state.isConverting && (
        <ConverterResult
          value={state.result}
          fromUnit={state.fromUnit}
          toUnit={state.toUnit}
        />
      )}
    </div>
  );
}
