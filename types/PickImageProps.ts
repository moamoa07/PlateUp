export interface PickImageProps {
  onChange: (imageUrl: string | null) => void;
  resetTrigger: boolean;
  onResetComplete?: () => void;
  errorMessage?: string; // Error message for the image
  onImageUploadError?: (error: string) => void;
}
