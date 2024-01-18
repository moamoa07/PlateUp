import { Timestamp } from 'firebase/firestore';
import { RecipeWithId } from '../api/model/recipeModel';

function convertFirestoreRecipeToAppRecipe(doc: any): RecipeWithId {
  const data = doc.data();
  return {
    ...data,
    id: doc.id, // Ensure the id is included
    createdAt:
      data.createdAt instanceof Timestamp
        ? data.createdAt.toDate().toISOString()
        : data.createdAt,
    updatedAt:
      data.updatedAt instanceof Timestamp
        ? data.updatedAt.toDate().toISOString()
        : data.updatedAt,
  };
}

export default convertFirestoreRecipeToAppRecipe;
