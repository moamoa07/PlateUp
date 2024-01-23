import { getAuth } from 'firebase/auth';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { FIREBASE_DB } from '../../FirebaseConfig';
import { CustomUser } from '../model/userModel';

// Async function för att hämta den inloggade användaren
export async function getLoggedInUser(): Promise<CustomUser | null> {
  try {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      // Om användaren är inloggad, hämta användarprofil baserat på ID
      const userProfile = await getUserProfile(currentUser.uid);
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

// Async function för att hämta en användares profil
export async function getUserProfile(
  userId: string
): Promise<CustomUser | null> {
  try {
    // Skapa en referens till användardokumentet i databasen
    const userDocRef = doc(FIREBASE_DB, 'users', userId);

    // Hämta snapshot av användardokumentet
    const userDocSnap = await getDoc(userDocRef);

    // Om användardokumentet existerar
    if (userDocSnap.exists()) {
      // Extrahera användardata och anta att det är av typen CustomUser
      const userData = userDocSnap.data() as CustomUser;
      return userData; // Returnera användardata
    } else {
      // Om användardokumentet inte finns i databasen
      console.error('Användaren finns inte i databasen');
      return null; // Returnera null för att indikera att användaren inte finns
    }
  } catch (error) {
    // Hantera eventuella fel som kan uppstå vid hämtning av användarprofil
    console.error('Fel vid hämtning av användarprofil:', error);
    return null; // Returnera null om något går fel
  }
}
