import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Replace this with your own config object from the Firebase console
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);