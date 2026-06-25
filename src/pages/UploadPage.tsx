import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container, PageTitle } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/feedback';
import { useAnalysisResult } from '@/hooks/useAnalysisResult';
import { DropZone, FileList, validateFiles } from '@/features/upload';

export function UploadPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setUploads } = useAnalysisResult();

  const handleFilesAdded = useCallback(
    (newFiles: File[]) => {
      const { accepted, errors } = validateFiles(newFiles, selectedFiles);

      if (errors.length > 0) {
        errors.forEach((err) => toast(err, 'error'));
      }

      if (accepted.length > 0) {
        setSelectedFiles((prev) => [...prev, ...accepted]);
      }
    },
    [selectedFiles, toast]
  );

  const handleRemove = useCallback((index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleAnalyze = () => {
    if (selectedFiles.length === 0) return;

    // Store file info in context for processing page
    setUploads(
      selectedFiles.map((f) => ({ name: f.name, size: f.size }))
    );

    // Navigate to processing, passing files via state
    navigate('/processing', { state: { files: selectedFiles } });
  };

  return (
    <Container className="max-w-3xl">
      <PageTitle
        title="Upload Documents"
        subtitle="Upload up to 5 PDF financial documents for analysis. We'll detect evidence of recurring expenses, loans, insurance, and investments."
      />

      <DropZone onFilesAdded={handleFilesAdded} />

      <FileList files={selectedFiles} onRemove={handleRemove} />

      <div className="mt-8 flex justify-end">
        <Button
          size="lg"
          onClick={handleAnalyze}
          disabled={selectedFiles.length === 0}
          data-testid="upload-analyze-button"
        >
          Analyze Documents
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </Container>
  );
}
