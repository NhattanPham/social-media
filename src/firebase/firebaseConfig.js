// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACwfelJAVdjXb-JicPfKDHgNQFcW4msDY",
  authDomain: "file-upload-50fd1.firebaseapp.com",
  projectId: "file-upload-50fd1",
  storageBucket: "file-upload-50fd1.appspot.com",
  messagingSenderId: "763372264286",
  appId: "1:763372264286:web:4a8710be08f1c9d9e74dcf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
export default storage