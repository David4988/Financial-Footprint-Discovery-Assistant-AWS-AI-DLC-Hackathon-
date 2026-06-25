const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const MAX_FILE_COUNT = 5;
const ACCEPTED_TYPE = 'application/pdf';

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateFile(file: File, existingFiles: File[]): ValidationResult {
  if (file.type !== ACCEPTED_TYPE) {
    return { valid: false, error: `"${file.name}" is not a PDF file. Only PDF documents are supported.` };
  }

  if (file.size > MAX_FILE_SIZE) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
    return { valid: false, error: `"${file.name}" is ${sizeMB} MB. Maximum file size is 10 MB.` };
  }

  if (existingFiles.length >= MAX_FILE_COUNT) {
    return { valid: false, error: `Maximum ${MAX_FILE_COUNT} documents per session. Remove a file first.` };
  }

  const duplicate = existingFiles.some((f) => f.name === file.name && f.size === file.size);
  if (duplicate) {
    return { valid: false, error: `"${file.name}" is already selected.` };
  }

  return { valid: true };
}

export function validateFiles(newFiles: File[], existingFiles: File[]): { accepted: File[]; errors: string[] } {
  const accepted: File[] = [];
  const errors: string[] = [];

  for (const file of newFiles) {
    const currentList = [...existingFiles, ...accepted];
    const result = validateFile(file, currentList);
    if (result.valid) {
      accepted.push(file);
    } else {
      errors.push(result.error!);
    }
  }

  return { accepted, errors };
}
