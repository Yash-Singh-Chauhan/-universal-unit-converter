import { useCallback, useState } from "react";
import { performHeightConversion } from "../services/heightService";
import type { HeightUnitId } from "../types";

interface HeightConverterState {
  value: string;
  fromUnit: HeightUnitId;
  toUnit: HeightUnitId;
  result: string;
  error: string | null;
}

interface UseHeightConverterReturn {
  state: HeightConverterState;
  setValue: (value: string) => void;
  setFromUnit: (unit: HeightUnitId) => void;
  setToUnit: (unit: HeightUnitId) => void;
  swapUnits: () => void;
  convert: () => void;
  reset: () => void;
}

const INITIAL_STATE: HeightConverterState = {
  value: "",
  fromUnit: "meters",
  toUnit: "feet",
  result: "",
  error: null,
};

export function useHeightConverter(): UseHeightConverterReturn {
  const [state, setState] = useState<HeightConverterState>(INITIAL_STATE);

  const setValue = useCallback((value: string) => {
    setState((prev) => ({ ...prev, value, result: "", error: null }));
  }, []);

  const setFromUnit = useCallback((unit: HeightUnitId) => {
    setState((prev) => ({ ...prev, fromUnit: unit, result: "", error: null }));
  }, []);

  const setToUnit = useCallback((unit: HeightUnitId) => {
    setState((prev) => ({ ...prev, toUnit: unit, result: "", error: null }));
  }, []);

  const swapUnits = useCallback(() => {
    setState((prev) => ({
      ...prev,
      fromUnit: prev.toUnit,
      toUnit: prev.fromUnit,
      value: prev.result || prev.value,
      result: prev.value,
    }));
  }, []);

  const convert = useCallback(() => {
    setState((prev) => {
      const numValue = Number.parseFloat(prev.value);
      if (Number.isNaN(numValue)) {
        return { ...prev, error: "Please enter a valid number" };
      }

      try {
        const result = performHeightConversion({
          value: numValue,
          fromUnit: prev.fromUnit,
          toUnit: prev.toUnit,
        });
        return {
          ...prev,
          result: result.value.toFixed(4),
          error: null,
        };
      } catch (err) {
        return {
          ...prev,
          error: err instanceof Error ? err.message : "Conversion failed",
        };
      }
    });
  }, []);

  const reset = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  return {
    state,
    setValue,
    setFromUnit,
    setToUnit,
    swapUnits,
    convert,
    reset,
  };
}
