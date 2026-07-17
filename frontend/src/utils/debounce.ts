/**
 * Creates a debounced version of the provided function.
 * The debounced function delays invoking `fn` until after `delayMs`
 * milliseconds have elapsed since the last time it was invoked.
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delayMs: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return (...args: Parameters<T>) => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = undefined;
    }, delayMs);
  };
}
