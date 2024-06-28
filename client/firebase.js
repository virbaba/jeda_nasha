// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "jeda-nasha.firebaseapp.com",
  projectId: "jeda-nasha",
  storageBucket: "jeda-nasha.appspot.com",
  messagingSenderId: "147462513124",
  appId: "1:147462513124:web:5d2522879f3a84c69a67f1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);