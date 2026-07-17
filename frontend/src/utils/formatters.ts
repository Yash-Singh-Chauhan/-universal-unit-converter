/**
 * Format a number to a fixed number of decimal places,
 * removing trailing zeros where appropriate.
 */
export function formatNumber(
  value: number,
  decimals: number = 4,
  maxDecimals: number = 12
): string {
  const clampedDecimals = Math.min(
    Math.max(decimals, 0),
    maxDecimals
  );
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: clampedDecimals,
  });
}

/**
 * Format a number with a unit suffix.
 */
export function formatWithUnit(
  value: number,
  unit: string,
  decimals?: number
): string {
  return `${formatNumber(value, decimals)} ${unit}`;
}

/**
 * Format a large number with SI prefixes (K, M, B, T).
 */
export function formatCompactNumber(value: number): string {
  if (Math.abs(value) >= 1_000_000_000_000) {
    return `${(value / 1_000_000_000_000).toFixed(2)}T`;
  }
  if (Math.abs(value) >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(2)}B`;
  }
  if (Math.abs(value) >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)}M`;
  }
  if (Math.abs(value) >= 1_000) {
    return `${(value / 1_000).toFixed(2)}K`;
  }
  return formatNumber(value);
}

/**
 * Capitalize the first letter of a string.
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Truncate a string to a given length with ellipsis.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}...`;
}
