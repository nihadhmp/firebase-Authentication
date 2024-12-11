// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1my-YDUssupcPqpJ8hnS9pr5n5swRwao",
  authDomain: "wild-view.firebaseapp.com",
  projectId: "wild-view",
  storageBucket: "wild-view.firebasestorage.app",
  messagingSenderId: "683473399131",
  appId: "1:683473399131:web:80d90b25a1ee7b19c93e7e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

export const auth = getAuth(app);
export const db = getFirestore(app);
