import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { FIREBASE_DB } from '../../FirebaseConfig';
import { UserBookmarks } from '../../types/UserBookmarks';

// Firestore service functions for bookmarks
const bookmarksRef = collection(FIREBASE_DB, 'bookmarks');

export async function addBookmarkToFirestore(
  userId: string,
  recipeId: string
): Promise<void> {
  try {
    const userBookmarkDocRef = doc(bookmarksRef, userId);
    await setDoc(
      userBookmarkDocRef,
      {
        recipeIds: arrayUnion(recipeId),
      },
      { merge: true }
    );
  } catch (error) {
    console.error('Error adding bookmark:', error);
    throw error; // Re-throw the error if you want to handle it in the caller
  }
}

export async function removeBookmarkFromFirestore(
  userId: string,
  recipeId: string
): Promise<void> {
  try {
    const userBookmarkDocRef = doc(bookmarksRef, userId);
    await updateDoc(userBookmarkDocRef, {
      recipeIds: arrayRemove(recipeId),
    });
  } catch (error) {
    console.error('Error removing bookmark:', error);
    throw error;
  }
}

export async function getBookmarksFromFirestore(
  userId: string
): Promise<string[]> {
  try {
    const userBookmarkDocRef = doc(bookmarksRef, userId);
    const docSnap = await getDoc(userBookmarkDocRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as UserBookmarks;
      return data.recipeIds;
    } else {
      // Initialize the bookmarks document for new users
      await setDoc(userBookmarkDocRef, { recipeIds: [] });
      return [];
    }
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    throw error;
  }
}
