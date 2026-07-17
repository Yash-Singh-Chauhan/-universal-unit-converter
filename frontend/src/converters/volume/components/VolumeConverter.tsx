import { useEffect } from "react";
import { FlaskConical } from "lucide-react";
import { ConverterInput, ConverterResult } from "@/components/common";
import { Card } from "@/components/ui";
import { useVolumeConverter } from "../hooks/useVolumeConverter";
import { VOLUME_UNITS } from "../constants";
import type { SelectOption } from "@/types";
import type { VolumeUnitId } from "../types";

const unitOptions: SelectOption[] = VOLUME_UNITS.map((u) => ({
  value: u.id,
  label: `${u.name} (${u.symbol})`,
}));

export function VolumeConverter() {
  const { state, setValue, setFromUnit, setToUnit, swapUnits, convert } =
    useVolumeConverter();

  useEffect(() => {
    if (state.value) convert();
  }, [state.value, state.fromUnit, state.toUnit, convert]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary-500)]/10 text-[var(--color-primary-500)]">
          <FlaskConical size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">Volume Converter</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Convert between liters, gallons, cups, and more
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
        onInputUnitChange={(unit) => setFromUnit(unit as VolumeUnitId)}
        onOutputUnitChange={(unit) => setToUnit(unit as VolumeUnitId)}
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
