import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB9lCHUdnd-Bz0oDM68TEwk7Y-Dp4tfn8E",
  authDomain: "reeam-signature-d298b.firebaseapp.com",
  projectId: "reeam-signature-d298b",
  storageBucket: "reeam-signature-d298b.firebasestorage.app",
  messagingSenderId: "484657144875",
  appId: "1:484657144875:web:ca788826864dc9ef3e366e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
