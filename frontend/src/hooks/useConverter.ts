import { useCallback, useMemo, useState } from "react";
import type { ConverterState, ConverterUnit } from "@/types";

interface UseConverterOptions {
  units: ConverterUnit[];
  defaultInputUnit?: string;
  defaultOutputUnit?: string;
}

interface UseConverterReturn {
  state: ConverterState;
  setInputValue: (value: string) => void;
  setInputUnit: (unit: string) => void;
  setOutputUnit: (unit: string) => void;
  swapUnits: () => void;
  reset: () => void;
  inputUnitObj: ConverterUnit | undefined;
  outputUnitObj: ConverterUnit | undefined;
}

export function useConverter({
  units,
  defaultInputUnit,
  defaultOutputUnit,
}: UseConverterOptions): UseConverterReturn {
  const firstUnit = units[0]?.id ?? "";
  const secondUnit = units[1]?.id ?? units[0]?.id ?? "";

  const [state, setState] = useState<ConverterState>({
    inputValue: "",
    inputUnit: defaultInputUnit ?? firstUnit,
    outputValue: "",
    outputUnit: defaultOutputUnit ?? secondUnit,
    isConverting: false,
    error: null,
  });

  const setInputValue = useCallback((value: string) => {
    setState((prev) => ({
      ...prev,
      inputValue: value,
      outputValue: "",
      error: null,
    }));
  }, []);

  const setInputUnit = useCallback((unit: string) => {
    setState((prev) => ({
      ...prev,
      inputUnit: unit,
      outputValue: "",
      error: null,
    }));
  }, []);

  const setOutputUnit = useCallback((unit: string) => {
    setState((prev) => ({
      ...prev,
      outputUnit: unit,
      outputValue: "",
      error: null,
    }));
  }, []);

  const swapUnits = useCallback(() => {
    setState((prev) => ({
      ...prev,
      inputUnit: prev.outputUnit,
      outputUnit: prev.inputUnit,
      inputValue: prev.outputValue || prev.inputValue,
      outputValue: prev.inputValue,
    }));
  }, []);

  const reset = useCallback(() => {
    setState({
      inputValue: "",
      inputUnit: defaultInputUnit ?? firstUnit,
      outputValue: "",
      outputUnit: defaultOutputUnit ?? secondUnit,
      isConverting: false,
      error: null,
    });
  }, [defaultInputUnit, defaultOutputUnit, firstUnit, secondUnit]);

  const inputUnitObj = useMemo(
    () => units.find((u) => u.id === state.inputUnit),
    [units, state.inputUnit]
  );

  const outputUnitObj = useMemo(
    () => units.find((u) => u.id === state.outputUnit),
    [units, state.outputUnit]
  );

  return {
    state,
    setInputValue,
    setInputUnit,
    setOutputUnit,
    swapUnits,
    reset,
    inputUnitObj,
    outputUnitObj,
  };
}
