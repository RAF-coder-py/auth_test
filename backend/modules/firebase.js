import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// CONFIG //
const firebaseConfig = {
  apiKey: "AIzaSyDvzZhQjxf0hfmientbU0Wg5cksDYvgAaY",
  authDomain: "test-node-282e5.firebaseapp.com",
  projectId: "test-node-282e5",
  storageBucket: "test-node-282e5.firebasestorage.app",
  messagingSenderId: "762414376573",
  appId: "1:762414376573:web:45d4e71e9a26b4167ef314",
  measurementId: "G-BXJKNMBPRB",
};

// INIT //
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// FUNCTIONS //
async function addDataToDB(dataObject, collectionName) {
  try {
    const docRef = await addDoc(collection(db, collectionName), dataObject);
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.error("Error adding document: ", err);
  }
}

async function readDataFromDB(collectionName) {
  const querySnapshot = await getDocs(collection(db, collectionName));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
}

async function signIn(email, password) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  // console.log(userCredential);
  return user;
}

export { addDataToDB, readDataFromDB, signIn };
export default auth;
