// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBHOhWtmNr_DwBPwEB2dFMzjgYThhjgUAk",
  authDomain: "tastlink-a3875.firebaseapp.com",
  projectId: "tastlink-a3875",
  storageBucket: "tastlink-a3875.appspot.com",
  messagingSenderId: "662272184688",
  appId: "1:662272184688:web:4be8759bd0bc6cb837bfb5",
  measurementId: "G-LRD286YSFM"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
