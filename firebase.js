// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';



const firebaseConfig = {
    apiKey: "AIzaSyBiwv-nXdeQRlPvqzh11iIR6RJMMxlDhI0",
    authDomain: "facebook-clone-9fa72.firebaseapp.com",
    projectId: "facebook-clone-9fa72",
    storageBucket: "facebook-clone-9fa72.appspot.com",
    messagingSenderId: "111323649846",
    appId: "1:111323649846:web:40fc570d816170bc2a0597",
    measurementId: "G-GBSG0MJGQL"
};

const app = initializeApp(firebaseConfig);

// const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };