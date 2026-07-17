/**
 * Utility for conditionally joining CSS class names.
 * Tailwind v4 with CSS variables doesn't need clsx/twMerge;
 * this lightweight helper handles conditional classes.
 */
export function cn(
  ...classes: (string | boolean | undefined | null | 0)[]
): string {
  return classes.filter(Boolean).join(" ");
}
