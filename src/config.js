// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBNmVUj6t3jQYS4JzIdeQEwYBF2NiHKfzo',
  authDomain: 'co-rides.firebaseapp.com',
  projectId: 'co-rides',
  storageBucket: 'co-rides.appspot.com',
  messagingSenderId: '328549100864',
  appId: '1:328549100864:web:14e796a0be7e78d8529ea5',
  measurementId: 'G-4CZFR80BN9',
};

console.log(process.env.FIREBASE_KEY);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase};
