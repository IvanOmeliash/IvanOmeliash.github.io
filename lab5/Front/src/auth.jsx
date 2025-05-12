import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBdaFBnBpc8ViLLvGKDJjrVbIb_Zw5dNjo",
  authDomain: "deliever-bd4ef.firebaseapp.com",
  projectId: "deliever-bd4ef",
  storageBucket: "deliever-bd4ef.firebasestorage.app",
  messagingSenderId: "526353601550",
  appId: "1:526353601550:web:daafbcb5f702c5247a185f",
  measurementId: "G-VYPE2FKQ0D"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
const auth = getAuth(app);

export default auth;