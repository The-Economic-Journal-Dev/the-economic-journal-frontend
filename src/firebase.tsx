// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeMtW81BKrK236C_mCC-gLO_t2O28a9ZQ",
  authDomain: "the-economic-journal.firebaseapp.com",
  databaseURL:
    "https://the-economic-journal-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "the-economic-journal",
  storageBucket: "the-economic-journal.appspot.com",
  messagingSenderId: "1027265950885",
  appId: "1:1027265950885:web:547df5972a6724dbb9494c",
  measurementId: "G-2RFQHKCRZS",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();


export { auth, db, googleProvider};