// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmy1tn6SwsQ0eZ-CFNDWDfkXGeFn05Yjg",
  authDomain: "todo-main-62555.firebaseapp.com",
  projectId: "todo-main-62555",
  storageBucket: "todo-main-62555.firebasestorage.app",
  messagingSenderId: "466345725787",
  appId: "1:466345725787:web:12090e6fcfc39e5a62547e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
