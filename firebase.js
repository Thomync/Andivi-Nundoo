// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAhJrvE3fYRtAudRC0PtPu67XLL4FUc078",
    authDomain: "nasa-bae28.firebaseapp.com",
    projectId: "nasa-bae28",
    storageBucket: "nasa-bae28.appspot.com",
    messagingSenderId: "113962794826",
    appId: "1:113962794826:web:8ac9f68e3fb713a13d4bb3",
    measurementId: "G-CV6ZX6D092"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut, db, storage, doc, setDoc, serverTimestamp, collection, firebaseConfig };
