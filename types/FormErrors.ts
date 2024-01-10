export interface FormErrors {
  title?: string;
  description?: string;
  servingDetails?: string;
  prepTime?: string;
  cookTime?: string;
  additionalNotes?: string;
  // Define types for dynamic fields (ingredients and instructions)
  [key: string]: string | undefined;
}
