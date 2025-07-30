// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ✅ Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCkUqlymKTXuv-cwjgYtBF90LPy9wB62e4",
  authDomain: "inventoryapp-e3e0c.firebaseapp.com",
  projectId: "inventoryapp-e3e0c",
  storageBucket: "inventoryapp-e3e0c.appspot.com",  // ✅ Corrected this line
  messagingSenderId: "590434565264",
  appId: "1:590434565264:web:152b5586868b972e7e6c15"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// ✅ Export Firestore database instance
export { db };
