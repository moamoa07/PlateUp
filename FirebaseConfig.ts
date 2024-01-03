// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);

// const newRecipe = doc(FIREBASE_DB, 'recipes/Recipe');

// function addRecipe() {
//   const docData = {
//     title: 'Chokladkaka',
//     description:
//       'Denna maffiga chokladkaka är verkligen en chokladälskares dröm! Ljuvligt krämig blir den, och vacker med den glansiga ganachen. Baka gärna chokladkakan dagen innan den ska serveras för bästa resultat. Servera med fluffig grädde och färska bär.',
//     imageUrl: '/assets/img/chokladkaka.jpeg',
//     servingDetails: '12 bitar',
//     prepTime: '20 min',
//     cookTime: '17 min',
//     ingredients: [
//       {
//         subtitle: 'Chokladkaka',
//         items: [
//           { quantity: '200g', name: 'Smör' },
//           { quantity: '200g', name: 'Mörk choklad, hackad' },
//           { quantity: '4', name: 'Ägg' },
//           { quantity: '2 dl', name: 'Strösocker' },
//           { quantity: '2 dl', name: 'Vetemjöl' },
//           { quantity: '1 krm', name: 'Salt' },
//         ],
//       },
//       {
//         subtitle: 'Ganache',
//         items: [
//           { quantity: '50g', name: 'Smör' },
//           { quantity: '1 dl', name: 'Vispgrädde' },
//           { quantity: '150g', name: 'Mörk choklad, hackad' },
//         ],
//       },
//     ],
//     instructions: [
//       {
//         subtitle: 'Chokladkaka',
//         steps: [
//           { direction: 'Värm ugnen till 200°.' },
//           {
//             direction:
//               'Lägg bakplåtspapper i botten på en form med löstagbar kant, ca 22 cm i diameter och smörj kanterna.',
//           },
//           {
//             direction:
//               'Smält smöret och ta från värmen. Lägg i chokladen och rör tills den smält.',
//           },
//           { direction: 'Vispa ägg och socker pösigt.' },
//           {
//             direction:
//               'Sikta ner mjölet och tillsätt saltet i äggsmeten. Vänd ner med en slickepott.',
//           },
//           {
//             direction:
//               'Tillsätt chokladsmöret och blanda försiktigt till en slät smet. Häll smeten i formen och grädda i mitten av ugnen ca 17 min.',
//           },
//           {
//             direction:
//               'Låt kakan kallna i formen och sedan stå 1 tim i kylen, innan ganachen breds på.',
//           },
//         ],
//       },
//       {
//         subtitle: 'Ganache',
//         steps: [
//           {
//             direction:
//               'Koka upp smör och grädde i en kastrull. Ta från värmen och lägg i chokladen. 	Rör till en slät chokladkräm.',
//           },
//           {
//             direction:
//               'Bred ganachen på chokladkakan. Servera med lättvispad grädde och färska bär.',
//           },
//         ],
//       },
//     ],
//     additionalNotes: 'Passar perfekt både till vardags och fest!',
//   };
//   setDoc(newRecipe, docData);
// }

// addRecipe();
