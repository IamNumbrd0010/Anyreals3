
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCKzknGAjh-Q2G1dylh5ks4liDgyIwaVoM",
    authDomain: "anyreals-df658.firebaseapp.com",
    projectId: "anyreals-df658",
    storageBucket: "anyreals-df658.firebasestorage.app",
    messagingSenderId: "713717630507",
    appId: "1:713717630507:web:c2c4cf29ecb855bac84c6e",
    measurementId: "G-2EPQS89YSQ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
 
  export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
