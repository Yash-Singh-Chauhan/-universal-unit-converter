import { useCallback, useState } from "react";
import { performWeightConversion } from "../services/weightService";
import type { WeightUnitId } from "../types";

interface WeightConverterState {
  value: string;
  fromUnit: WeightUnitId;
  toUnit: WeightUnitId;
  result: string;
  error: string | null;
}

const INITIAL: WeightConverterState = {
  value: "",
  fromUnit: "kilograms",
  toUnit: "pounds",
  result: "",
  error: null,
};

export function useWeightConverter() {
  const [state, setState] = useState<WeightConverterState>(INITIAL);

  const setValue = useCallback((value: string) => {
    setState((p) => ({ ...p, value, result: "", error: null }));
  }, []);

  const setFromUnit = useCallback((unit: WeightUnitId) => {
    setState((p) => ({ ...p, fromUnit: unit, result: "", error: null }));
  }, []);

  const setToUnit = useCallback((unit: WeightUnitId) => {
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
        const r = performWeightConversion(num, p.fromUnit, p.toUnit);
        return { ...p, result: r.value.toFixed(4), error: null };
      } catch (err) {
        return { ...p, error: err instanceof Error ? err.message : "Conversion failed" };
      }
    });
  }, []);

  const reset = useCallback(() => setState(INITIAL), []);

  return { state, setValue, setFromUnit, setToUnit, swapUnits, convert, reset };
}
