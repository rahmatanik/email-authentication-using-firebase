// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmheyWn59cFATnZMyyEZ8bNldiACV3YHw",
  authDomain: "user-email-password-auth-405bd.firebaseapp.com",
  projectId: "user-email-password-auth-405bd",
  storageBucket: "user-email-password-auth-405bd.appspot.com",
  messagingSenderId: "1086314822768",
  appId: "1:1086314822768:web:39c348dacbb5fed9dc48b5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
