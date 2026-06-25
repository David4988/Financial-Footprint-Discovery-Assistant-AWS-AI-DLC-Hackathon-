import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from '@/components/layout';
import { ErrorBoundary, ToastProvider } from '@/components/feedback';
import { AnalysisProvider } from '@/hooks/useAnalysisResult';
import {
  HomePage,
  UploadPage,
  ProcessingPage,
  RevealPage,
  DashboardPage,
  AnalyticsPage,
  NotFoundPage,
} from '@/pages';

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AnalysisProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/processing" element={<ProcessingPage />} />
                <Route path="/reveal" element={<RevealPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AnalysisProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
