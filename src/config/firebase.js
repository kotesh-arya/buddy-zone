// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqWFf6x564TpnkxQhEX4381RTIS6YXaPE",
  authDomain: "buddy-zone-9ac04.firebaseapp.com",
  projectId: "buddy-zone-9ac04",
  storageBucket: "buddy-zone-9ac04.firebasestorage.app",
  messagingSenderId: "1084180017638",
  appId: "1:1084180017638:web:fcffc9b7c2f071194ba627",
  measurementId: "G-H888V378DQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Deriving authentication and DB features with this app creds

const auth = getAuth(app);
const db = getFirestore(app);
console.log("auth", auth);

export { auth, db };
