import { useEffect } from "react";
import { Globe } from "lucide-react";
import { ConverterInput, ConverterResult } from "@/components/common";
import { Card } from "@/components/ui";
import { usePlanetGravityConverter } from "../hooks/usePlanetGravityConverter";
import { PLANET_GRAVITY_UNITS } from "../constants";
import type { SelectOption } from "@/types";
import type { PlanetGravityUnitId } from "../types";

const unitOptions: SelectOption[] = PLANET_GRAVITY_UNITS.map((u) => ({
  value: u.id,
  label: `${u.name} ${u.symbol}`,
}));

export function PlanetGravityConverter() {
  const { state, setValue, setFromUnit, setToUnit, swapUnits, convert } =
    usePlanetGravityConverter();

  useEffect(() => {
    if (state.value) convert();
  }, [state.value, state.fromUnit, state.toUnit, convert]);

  return (
    <div className="space-y-4 sm:space-y-5 md:space-y-6">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-[var(--color-primary-500)]/10 text-[var(--color-primary-500)] flex-shrink-0">
          <Globe size={18} className="sm:size-[20px]" />
        </div>
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text)] truncate">Planet Weight Converter</h1>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] truncate">
            Calculate your weight on other planets and celestial bodies
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
        onInputUnitChange={(unit) => setFromUnit(unit as PlanetGravityUnitId)}
        onOutputUnitChange={(unit) => setToUnit(unit as PlanetGravityUnitId)}
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
