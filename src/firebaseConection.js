import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA-5dGwc5Yrskv7PDE4TatHmuQPmeuwpNc",
  authDomain: "crud-922aa.firebaseapp.com",
  projectId: "crud-922aa",
  storageBucket: "crud-922aa.appspot.com",
  messagingSenderId: "575494377485",
  appId: "1:575494377485:web:02c125b684034bc8414544"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
