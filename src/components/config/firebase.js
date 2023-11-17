// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCuWdJWYI1xoBSgmy3uESAfN7QiDEsPbtg",
  authDomain: "astore-601c4.firebaseapp.com",
  projectId: "astore-601c4",
  storageBucket: "astore-601c4.appspot.com",
  messagingSenderId: "85536622346",
  appId: "1:85536622346:web:1672ec29b637af43d55cf3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
