// import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
// import { db } from '../firebaseConfig';
// import { BalanceState } from '../store/balanceSlice';

// export async function getApiBalance(): Promise<BalanceState> {
//   const querySnapshot = await getDocs(collection(db, 'balance'));
//   const allDocs = querySnapshot.docs.map((doc) => doc.data());
//   return allDocs[0] as BalanceState;
// }

// export async function updateApiBalance(balance: BalanceState) {
//   const balanceRef = doc(db, 'balance', balance.id);
//   await setDoc(balanceRef, balance);
// }
