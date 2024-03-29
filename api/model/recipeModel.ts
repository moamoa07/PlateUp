import { Timestamp } from 'firebase/firestore';

export interface Recipe {
  imageUrl: string | null;
  // imageUrls: string[]; Om vi ska spara flera bilder längre fram
  title: string;
  description: string;
  servingDetails: string;
  prepTime: string;
  cookTime?: string;
  ingredients: IngredientGroup[];
  instructions: InstructionGroup[];
  additionalNotes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IngredientGroup {
  ingredientSubtitle?: string;
  items: IngredientItem[];
}

export interface IngredientItem {
  quantity: string;
  name: string;
}

export interface InstructionGroup {
  instructionSubtitle?: string;
  steps: InstructionStep[];
}

export interface InstructionStep {
  instruction: string;
}

export interface RecipeWithId extends Recipe {
  id: string;
  userId?: string;
}
