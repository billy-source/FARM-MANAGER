import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAfHCMkQNCu1qR7h_RVuadXtpdZ3-PfGAI",
  authDomain: "agritracker-bbf50.firebaseapp.com",
  projectId: "agritracker-bbf50",
  storageBucket: "agritracker-bbf50.firebasestorage.app",
  messagingSenderId: "684177277102",
  appId: "1:684177277102:web:9d008f9c64b4a3cdbd2d3f",
  measurementId: "G-JW7P8SP4HJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// ✅ Export these:
export { db, auth };