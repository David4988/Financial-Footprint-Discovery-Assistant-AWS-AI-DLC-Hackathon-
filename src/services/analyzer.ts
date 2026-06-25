import type { FinancialFootprint } from '@/types';
import { mockAnalyzer } from './mockAnalyzer';

/**
 * Analyze uploaded financial documents and return a structured financial footprint.
 *
 * THIS IS THE ONLY BACKEND INTEGRATION POINT.
 *
 * Current: calls mockAnalyzer() which returns pre-defined data.
 * Future:  replace the body with a single fetch call to POST /api/analyze.
 *
 * No React component should import this file's dependencies (mockAnalyzer, mock JSON).
 * Components only know about the FinancialFootprint type returned by this function.
 *
 * @example Future implementation:
 * ```typescript
 * export async function analyzeDocuments(files: File[]): Promise<FinancialFootprint> {
 *   const formData = new FormData();
 *   files.forEach((file) => formData.append('documents', file));
 *   const response = await fetch('/api/analyze', { method: 'POST', body: formData });
 *   if (!response.ok) throw new Error(`Analysis failed: ${response.statusText}`);
 *   return response.json();
 * }
 * ```
 */
export async function analyzeDocuments(files: File[]): Promise<FinancialFootprint> {
  return mockAnalyzer(files);
}
