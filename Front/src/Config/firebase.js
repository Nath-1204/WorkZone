import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore";
import "firebase/compat/storage";
/* import { initializeApp } from "firebase/app"; */
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhF0tn17Zt3zYkNIEZJLU3eNvByi93QQY",
  authDomain: "workzone-b48f2.firebaseapp.com",
  projectId: "workzone-b48f2",
  storageBucket: "workzone-b48f2.appspot.com",
  messagingSenderId: "680176321938",
  appId: "1:680176321938:web:fed9390da631a38b472d4b"
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;