// Function to write the daily special to the database
// export async function writeDailySpecial(
//   description: string,
//   price: number,
//   milk: string,
//   vegan: boolean
// ) {
//   try {
//     const specialOfTheDay = doc(FIREBASE_DB, 'dailySpecial/2023-12-28');
//     const docData = {
//       description,
//       price,
//       milk,
//       vegan,
//     };
//     await setDoc(specialOfTheDay, docData);
//   } catch (error) {
//     console.error('Error writing daily special:', error);
//     throw error; // Propagate the error to the caller
//   }
// }

export interface Recipe {
  title: string;
  description?: string;
  imageUrl: string;
  // imageUrls: string[]; Om vi ska spara flera bilder längre fram
  servingDetails?: string;
  prepTime?: string;
  cookTime?: string;
  ingredients: IngredientGroup[];
  instructions: InstructionGroup[];
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
