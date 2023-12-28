import { doc, setDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../FirebaseConfig';

// Function to get the balance from the database
// export async function getApiBalance() {
//   try {
//     const querySnapshot = await getDocs(collection(FIREBASE_DB, 'balance'));
//     const allDocs = querySnapshot.docs.map((doc) => doc.data());
//     return allDocs[0];
//   } catch (error) {
//     console.error('Error getting balance:', error);
//     throw error; // Propagate the error to the caller
//   }
// }

// Function to update the balance in the database
// export async function updateApiBalance(balance) {
//   try {
//     const balanceRef = doc(FIREBASE_DB, 'balance', balance.id);
//     await setDoc(balanceRef, balance);
//   } catch (error) {
//     console.error('Error updating balance:', error);
//     throw error; // Propagate the error to the caller
//   }
// }

// Function to write the daily special to the database
export async function writeDailySpecial(
  description: string,
  price: number,
  milk: string,
  vegan: boolean
) {
  try {
    const specialOfTheDay = doc(FIREBASE_DB, 'dailySpecial/2023-12-28');
    const docData = {
      description,
      price,
      milk,
      vegan,
    };
    await setDoc(specialOfTheDay, docData);
  } catch (error) {
    console.error('Error writing daily special:', error);
    throw error; // Propagate the error to the caller
  }
}
