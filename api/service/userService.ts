import { collection, getDocs } from 'firebase/firestore';
import { FIREBASE_DB } from '../../FirebaseConfig';
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
