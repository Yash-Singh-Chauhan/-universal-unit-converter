export interface SelectOption<T = string> {
  value: T;
  label: string;
}

export interface ConverterResult<T = number> {
  value: T;
  unit: string;
  formatted: string;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export type Direction = "ltr" | "rtl";
