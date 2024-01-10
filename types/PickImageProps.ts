export interface PickImageProps {
  onChange: (imageUrl: string | null) => void;
  resetTrigger: boolean;
  onResetComplete?: () => void;
  errorMessage?: string; // Error message for the image
  maxSizeInMB?: number; // Maximum file size in MB
  onImageUploadError?: (error: string) => void;
}
