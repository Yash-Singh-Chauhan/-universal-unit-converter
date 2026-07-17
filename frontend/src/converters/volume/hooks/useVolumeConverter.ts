import { useCallback, useState } from "react";
import { performVolumeConversion } from "../services/volumeService";
import type { VolumeUnitId } from "../types";

interface VolumeState {
  value: string;
  fromUnit: VolumeUnitId;
  toUnit: VolumeUnitId;
  result: string;
  error: string | null;
}

const INITIAL: VolumeState = {
  value: "",
  fromUnit: "liters",
  toUnit: "gallons",
  result: "",
  error: null,
};

export function useVolumeConverter() {
  const [state, setState] = useState<VolumeState>(INITIAL);

  const setValue = useCallback((value: string) => {
    setState((p) => ({ ...p, value, result: "", error: null }));
  }, []);

  const setFromUnit = useCallback((unit: VolumeUnitId) => {
    setState((p) => ({ ...p, fromUnit: unit, result: "", error: null }));
  }, []);

  const setToUnit = useCallback((unit: VolumeUnitId) => {
    setState((p) => ({ ...p, toUnit: unit, result: "", error: null }));
  }, []);

  const swapUnits = useCallback(() => {
    setState((p) => ({
      ...p,
      fromUnit: p.toUnit,
      toUnit: p.fromUnit,
      value: p.result || p.value,
      result: p.value,
    }));
  }, []);

  const convert = useCallback(() => {
    setState((p) => {
      const num = Number.parseFloat(p.value);
      if (Number.isNaN(num)) return { ...p, error: "Enter a valid number" };
      try {
        const r = performVolumeConversion(num, p.fromUnit, p.toUnit);
        return { ...p, result: r.value.toFixed(4), error: null };
      } catch (err) {
        return { ...p, error: err instanceof Error ? err.message : "Conversion failed" };
      }
    });
  }, []);

  const reset = useCallback(() => setState(INITIAL), []);

  return { state, setValue, setFromUnit, setToUnit, swapUnits, convert, reset };
}
