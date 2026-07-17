import { useCallback, useState } from "react";
import { performPlanetGravityConversion } from "../services/planetGravityService";
import type { PlanetGravityUnitId } from "../types";

interface PlanetGravityState {
  value: string;
  fromUnit: PlanetGravityUnitId;
  toUnit: PlanetGravityUnitId;
  result: string;
  error: string | null;
}

const INITIAL: PlanetGravityState = {
  value: "",
  fromUnit: "earth",
  toUnit: "mars",
  result: "",
  error: null,
};

export function usePlanetGravityConverter() {
  const [state, setState] = useState<PlanetGravityState>(INITIAL);

  const setValue = useCallback((value: string) => {
    setState((p) => ({ ...p, value, result: "", error: null }));
  }, []);

  const setFromUnit = useCallback((unit: PlanetGravityUnitId) => {
    setState((p) => ({ ...p, fromUnit: unit, result: "", error: null }));
  }, []);

  const setToUnit = useCallback((unit: PlanetGravityUnitId) => {
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
      if (Number.isNaN(num) || p.value.trim() === "") {
        return { ...p, result: "", error: null };
      }

      try {
        const result = performPlanetGravityConversion({
          value: num,
          fromUnit: p.fromUnit,
          toUnit: p.toUnit,
        });
        return {
          ...p,
          result: result.value.toFixed(4),
          error: null,
        };
      } catch (err) {
        return {
          ...p,
          error: err instanceof Error ? err.message : "Conversion failed",
        };
      }
    });
  }, []);

  const reset = useCallback(() => setState(INITIAL), []);

  return { state, setValue, setFromUnit, setToUnit, swapUnits, convert, reset };
}
