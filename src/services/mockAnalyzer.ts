import type { FinancialFootprint } from '@/types';
import mockData from '@/mock/financialFootprint.json';
import { delay } from '@/utils/delay';

/**
 * Mock analyzer that returns pre-defined financial footprint data.
 * Simulates a short processing delay to mimic real backend behavior.
 *
 * This function is ONLY called by analyzer.ts — no other module should import it.
 */
export async function mockAnalyzer(_files: File[]): Promise<FinancialFootprint> {
  // Simulate backend processing time
  await delay(500);

  // Return typed mock data
  return mockData as FinancialFootprint;
}
