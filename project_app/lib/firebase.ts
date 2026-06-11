// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Import the functions you need from the SDKs you need

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC65PgkfRKdcTRLEuahfRlCKFppr-sEkw0",
  authDomain: "app-stats-dcf56.firebaseapp.com",
  projectId: "app-stats-dcf56",
  storageBucket: "app-stats-dcf56.firebasestorage.app",
  messagingSenderId: "812311000399",
  appId: "1:812311000399:web:846ad4420f0d3c0909813a"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);