export interface Recipe {
  title: string;
  description: string;
  imageUrl?: string;
  // imageUrls: string[]; Om vi ska spara flera bilder längre fram
  servingDetails: string;
  prepTime: string;
  cookTime?: string;
  ingredients: IngredientGroup[];
  instructions?: InstructionGroup[];
  additionalNotes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IngredientGroup {
  subtitle?: string;
  items: IngredientItem[];
}

export interface IngredientItem {
  quantity: string;
  name: string;
}

export interface InstructionGroup {
  subtitle?: string;
  steps: InstructionStep[];
}

export interface InstructionStep {
  direction: string;
}
