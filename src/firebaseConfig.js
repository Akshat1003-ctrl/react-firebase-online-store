import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace this with your own config object from the Firebase console
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Firestore so we can use it in other components
export const db = getFirestore(app);