import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace this with your own config object from the Firebase console
const firebaseConfig = {
    apiKey: "AIzaSyCd8OReFzsvNFQwogPlsRk-UR_N6rK5FrI",
    authDomain: "online-store-6e884.firebaseapp.com",
    projectId: "online-store-6e884",
    storageBucket: "online-store-6e884.firebasestorage.app",
    messagingSenderId: "895462834988",
    appId: "1:895462834988:web:597859b36bbedd349ce289",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Firestore so we can use it in other components
export const db = getFirestore(app);