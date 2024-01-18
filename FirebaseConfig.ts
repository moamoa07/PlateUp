// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBeNIY00IjPVYGiq8uPbAlPMGqfs7tpvqU',
  authDomain: 'plateup-1507b.firebaseapp.com',
  projectId: 'plateup-1507b',
  storageBucket: 'plateup-1507b.appspot.com',
  messagingSenderId: '725439259612',
  appId: '1:725439259612:web:58f9c9d7a291909fed2519',
};

// Backup database
// const firebaseConfig = {
//   apiKey: 'AIzaSyBkRty0aVrJFkursrSbfmbWtbGBok09rqE',
//   authDomain: 'plateup2.firebaseapp.com',
//   projectId: 'plateup2',
//   storageBucket: 'plateup2.appspot.com',
//   messagingSenderId: '52300252680',
//   appId: '1:52300252680:web:8e6964e9cb01374812b3bd',
// };

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
