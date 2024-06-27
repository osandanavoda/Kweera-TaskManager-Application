import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, push, remove, set } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCmmZV9Cm8yIkM3penTf6tmUSz25GCZdZQ",
    authDomain: "taskmgr-kweera.firebaseapp.com",
    projectId: "taskmgr-kweera",
    storageBucket: "taskmgr-kweera.appspot.com",
    messagingSenderId: "511211109855",
    appId: "1:511211109855:web:f058a99b826ff4da6b186a"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, onValue, push, remove, set };
