import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { FIREBASE_DB } from '../../FirebaseConfig';
import { RecipeWithId } from '../model/recipeModel';
import { CustomUser } from '../model/userModel';

export async function getAllUsers() {
  const querySnapshot = await getDocs(collection(FIREBASE_DB, 'users'));

  const fetchedUsers = querySnapshot.docs.map((doc) => ({
    ...(doc.data() as CustomUser),
    docId: doc.id,
  }));

  return {
    users: fetchedUsers,
  };
}

export async function getUserProfileFromFirestore(
  userId: string
): Promise<CustomUser | null> {
  const userRef = doc(FIREBASE_DB, 'users', userId);
  try {
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id } as CustomUser;
    } else {
      console.log('No such user!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}

export async function getUserRecipesFromFirestore(
  userId: string
): Promise<RecipeWithId[]> {
  const recipesRef = collection(FIREBASE_DB, 'recipes');
  const q = query(recipesRef, where('userId', '==', userId));
  try {
    const querySnapshot = await getDocs(q);
    const recipes = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as RecipeWithId[];
    return recipes;
  } catch (error) {
    console.error("Error fetching user's recipes:", error);
    throw error;
  }
}