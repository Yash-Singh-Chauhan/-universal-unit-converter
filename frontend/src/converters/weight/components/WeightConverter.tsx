import { useEffect } from "react";
import { Weight as WeightIcon } from "lucide-react";
import { ConverterInput, ConverterResult } from "@/components/common";
import { Card } from "@/components/ui";
import { useWeightConverter } from "../hooks/useWeightConverter";
import { WEIGHT_UNITS } from "../constants";
import type { SelectOption } from "@/types";
import type { WeightUnitId } from "../types";

const unitOptions: SelectOption[] = WEIGHT_UNITS.map((u) => ({
  value: u.id,
  label: `${u.name} (${u.symbol})`,
}));

export function WeightConverter() {
  const { state, setValue, setFromUnit, setToUnit, swapUnits, convert } =
    useWeightConverter();

  useEffect(() => {
    if (state.value) convert();
  }, [state.value, state.fromUnit, state.toUnit, convert]);

  return (
    <div className="space-y-4 sm:space-y-5 md:space-y-6">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-[var(--color-primary-500)]/10 text-[var(--color-primary-500)] flex-shrink-0">
          <WeightIcon size={18} className="sm:size-[20px]" />
        </div>
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text)] truncate">Weight Converter</h1>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] truncate">
            Convert between kilograms, pounds, ounces, and more
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
        onInputUnitChange={(unit) => setFromUnit(unit as WeightUnitId)}
        onOutputUnitChange={(unit) => setToUnit(unit as WeightUnitId)}
        onSwap={swapUnits}
      />

      {state.error && (
        <Card variant="default" padding="md" className="border-[var(--color-error)]/30">
          <p className="text-sm text-[var(--color-error)]">{state.error}</p>
        </Card>
      )}

      {state.result && (
        <ConverterResult value={state.result} fromUnit={state.fromUnit} toUnit={state.toUnit} />
      )}
    </div>
  );
}
