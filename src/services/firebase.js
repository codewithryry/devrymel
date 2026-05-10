import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9IYDG4t8BGNU06WJfvLqxIUc8HYmPJ98",
  authDomain: "devrymelcms.firebaseapp.com",
  databaseURL: "https://devrymelcms-default-rtdb.firebaseio.com",
  projectId: "devrymelcms",
  storageBucket: "devrymelcms.firebasestorage.app",
  messagingSenderId: "1018066169761",
  appId: "1:1018066169761:web:b1c9e0683d135e5e92a5e0",
  measurementId: "G-LQESSMWXHY"
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };