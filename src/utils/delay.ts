/**
 * Utility to create a promise-based delay.
 * Used in mock mode to simulate network/processing latency.
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
