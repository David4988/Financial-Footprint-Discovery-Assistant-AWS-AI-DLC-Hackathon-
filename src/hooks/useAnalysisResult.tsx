import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { FinancialFootprint } from '@/types';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface FileInfo {
  name: string;
  size: number;
}

interface AnalysisState {
  result: FinancialFootprint | null;
  isAnalyzing: boolean;
  error: string | null;
  uploadedFiles: FileInfo[];
}

interface AnalysisContextValue extends AnalysisState {
  setResult: (result: FinancialFootprint) => void;
  clearResult: () => void;
  setUploads: (files: FileInfo[]) => void;
  setAnalyzing: (value: boolean) => void;
  setError: (error: string | null) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────────────────────────────────────

const AnalysisContext = createContext<AnalysisContextValue | null>(null);

// ─────────────────────────────────────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────────────────────────────────────

interface AnalysisProviderProps {
  children: ReactNode;
}

export function AnalysisProvider({ children }: AnalysisProviderProps) {
  const [state, setState] = useState<AnalysisState>({
    result: null,
    isAnalyzing: false,
    error: null,
    uploadedFiles: [],
  });

  const setResult = useCallback((result: FinancialFootprint) => {
    setState((prev) => ({
      ...prev,
      result,
      isAnalyzing: false,
      error: null,
    }));
  }, []);

  const clearResult = useCallback(() => {
    setState({
      result: null,
      isAnalyzing: false,
      error: null,
      uploadedFiles: [],
    });
  }, []);

  const setUploads = useCallback((files: FileInfo[]) => {
    setState((prev) => ({
      ...prev,
      uploadedFiles: files,
    }));
  }, []);

  const setAnalyzing = useCallback((value: boolean) => {
    setState((prev) => ({
      ...prev,
      isAnalyzing: value,
      error: value ? null : prev.error,
    }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState((prev) => ({
      ...prev,
      error,
      isAnalyzing: false,
    }));
  }, []);

  const value: AnalysisContextValue = {
    ...state,
    setResult,
    clearResult,
    setUploads,
    setAnalyzing,
    setError,
  };

  return (
    <AnalysisContext value={value}>
      {children}
    </AnalysisContext>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────────────────────────

export function useAnalysisResult(): AnalysisContextValue {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysisResult must be used within an AnalysisProvider');
  }
  return context;
}
