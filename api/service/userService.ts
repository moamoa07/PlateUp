import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { FIREBASE_DB } from '../../FirebaseConfig';
import { CustomUser } from '../model/userModel';

// Async function för att hämta den inloggade användaren
export async function getLoggedInUser(): Promise<CustomUser | null> {
  try {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      // Om användaren är inloggad, hämta användarprofil baserat på ID
      const userProfile = await findUserById(currentUser.uid);
      return userProfile;
    } else {
      // Om ingen användare är inloggad
      console.error('Ingen användare är inloggad');
      return null;
    }
  } catch (error) {
    // Hantera eventuella fel som kan uppstå vid hämtning av användarprofil
    console.error('Fel vid hämtning av inloggad användare:', error);
    return null;
  }
}

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

export const findUserById = async (userId: string) => {
  const usersCollection = collection(FIREBASE_DB, 'users');
  const q = query(usersCollection, where('id', '==', userId));

  const querySnapshot = await getDocs(q);
  console.log('SNÄLLA VISA RÄTT DOC' + querySnapshot);

  if (querySnapshot.size === 0) {
    console.error('Användaren finns inte i databasen');
    return null;
  }

  const userDoc = querySnapshot.docs[0];
  const userData = userDoc.data() as CustomUser;

  return userData;
};
