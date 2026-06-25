import { FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileListProps {
  files: File[];
  onRemove: (index: number) => void;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileList({ files, onRemove }: FileListProps) {
  if (files.length === 0) return null;

  return (
    <div className="mt-4 space-y-2" data-testid="upload-file-list">
      <p className="text-sm font-medium text-foreground">
        {files.length} {files.length === 1 ? 'document' : 'documents'} selected
      </p>
      <ul className="space-y-2">
        {files.map((file, index) => (
          <li
            key={`${file.name}-${file.size}`}
            className="flex items-center gap-3 rounded-md border border-border bg-card p-3"
            data-testid={`upload-file-item-${index}`}
          >
            <FileText className="h-5 w-5 shrink-0 text-muted-foreground" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                {file.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatFileSize(file.size)}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemove(index)}
              className="h-8 w-8 shrink-0"
              aria-label={`Remove ${file.name}`}
              data-testid={`upload-remove-file-${index}`}
            >
              <X className="h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
