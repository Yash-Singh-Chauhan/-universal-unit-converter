import { useCallback, useRef, useState } from "react";
import { convertCurrencyApi } from "../services/currencyService";
import type { CurrencyUnitId } from "../types";

interface CurrencyState {
  value: string;
  fromUnit: CurrencyUnitId;
  toUnit: CurrencyUnitId;
  result: string;
  rate: number | null;
  lastUpdated: string | null;
  isConverting: boolean;
  error: string | null;
}

const INITIAL: CurrencyState = {
  value: "",
  fromUnit: "USD",
  toUnit: "EUR",
  result: "",
  rate: null,
  lastUpdated: null,
  isConverting: false,
  error: null,
};

export function useCurrencyConverter() {
  const [state, setState] = useState<CurrencyState>(INITIAL);
  const abortRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setValue = useCallback((value: string) => {
    setState((p) => ({ ...p, value, result: "", rate: null, error: null }));
  }, []);

  const setFromUnit = useCallback((unit: CurrencyUnitId) => {
    setState((p) => ({ ...p, fromUnit: unit, result: "", rate: null, error: null }));
  }, []);

  const setToUnit = useCallback((unit: CurrencyUnitId) => {
    setState((p) => ({ ...p, toUnit: unit, result: "", rate: null, error: null }));
  }, []);

  const swapUnits = useCallback(() => {
    setState((p) => ({
      ...p,
      fromUnit: p.toUnit,
      toUnit: p.fromUnit,
      value: p.result || p.value,
      result: p.value,
      rate: p.rate ? 1 / p.rate : null,
    }));
  }, []);

  const convert = useCallback(() => {
    // Cancel previous request
    if (abortRef.current) {
      abortRef.current.abort();
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setState((p) => {
      const num = Number.parseFloat(p.value);
      if (Number.isNaN(num) || p.value.trim() === "" || num <= 0) {
        return { ...p, result: "", rate: null, isConverting: false, error: null };
      }

      // Debounce: wait 300ms before calling API
      const controller = new AbortController();
      abortRef.current = controller;

      timeoutRef.current = setTimeout(async () => {
        try {
          setState((prev) => ({ ...prev, isConverting: true, error: null }));

          const res = await convertCurrencyApi(num, p.fromUnit, p.toUnit, controller.signal);

          setState((prev) => ({
            ...prev,
            result: res.convertedAmount.toFixed(4),
            rate: res.rate,
            lastUpdated: res.lastUpdated,
            isConverting: false,
            error: null,
          }));
        } catch (err) {
          if (err instanceof DOMException && err.name === "AbortError") return;
          setState((prev) => ({
            ...prev,
            isConverting: false,
            error: err instanceof Error ? err.message : "Conversion failed. Please try again.",
          }));
        }
      }, 300);

      return { ...p, isConverting: true };
    });
  }, []);

  const reset = useCallback(() => setState(INITIAL), []);

  return { state, setValue, setFromUnit, setToUnit, swapUnits, convert, reset };
}
