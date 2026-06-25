import { useState, useCallback, useRef, type DragEvent } from 'react';
import { Upload, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DropZoneProps {
  onFilesAdded: (files: File[]) => void;
  disabled?: boolean;
}

export function DropZone({ onFilesAdded, disabled }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  }, [disabled]);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFilesAdded(files);
    }
  }, [disabled, onFilesAdded]);

  const handleClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length > 0) {
      onFilesAdded(files);
    }
    // Reset input so same file can be re-selected
    e.target.value = '';
  };

  return (
    <div
      data-testid="upload-drop-zone"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      className={cn(
        'relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-colors',
        isDragging
          ? 'border-primary bg-primary/5'
          : 'border-border hover:border-primary/50 hover:bg-muted/30',
        disabled && 'pointer-events-none opacity-50'
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,application/pdf"
        multiple
        onChange={handleInputChange}
        className="hidden"
        data-testid="upload-file-input"
      />

      <div className="flex flex-col items-center gap-4 text-center">
        {isDragging ? (
          <FileText className="h-12 w-12 text-primary" />
        ) : (
          <Upload className="h-12 w-12 text-muted-foreground" />
        )}

        <div>
          <p className="text-sm font-medium text-foreground">
            {isDragging ? 'Drop your files here' : 'Drag & drop PDF documents here'}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            or click to browse · PDF only · up to 10 MB each · max 5 files
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-full bg-muted px-2 py-1">Bank Statements</span>
          <span className="rounded-full bg-muted px-2 py-1">Credit Card Statements</span>
          <span className="rounded-full bg-muted px-2 py-1">Insurance Receipts</span>
          <span className="rounded-full bg-muted px-2 py-1">Loan Statements</span>
        </div>
      </div>
    </div>
  );
}
