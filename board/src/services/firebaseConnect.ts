import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiF6NE4hKkeHjKlgWPjmGE4JHDavqG-nQ",
  authDomain: "boardapp-15d3d.firebaseapp.com",
  projectId: "boardapp-15d3d",
  storageBucket: "boardapp-15d3d.appspot.com",
  messagingSenderId: "419718807425",
  appId: "1:419718807425:web:027e57aaf88805da10b280",
  measurementId: "G-ENF68YZCRP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export default db;