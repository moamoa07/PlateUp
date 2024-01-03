import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../FirebaseConfig';
import { Recipe } from './model/recipeModel';

export async function addRecipe(recipeData: Recipe) {
  try {
    const recipeRef = await addDoc(
      collection(FIREBASE_DB, 'recipes'),
      recipeData
    );
    console.log(`Recipe added with ID: ${recipeRef.id}`);
    return recipeRef.id; // Returning the auto-generated ID
  } catch (error) {
    console.error('Error adding recipe:', error);
    throw error;
  }
}

export async function getRecipeById(recipeId: string) {
  try {
    const docRef = doc(FIREBASE_DB, 'recipes', recipeId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data(); // Returns the document data
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching document:', error);
    throw error;
  }
}
