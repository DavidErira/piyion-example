
import firebase from "firebase/app";

import 'firebase/auth';
import "firebase/firestore";
import "firebase/storage";

//se debe crear variables de entorno para cada campo de firebaseConfig
const firebaseConfig = {
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: process.env.FIREBASE_AUTHDOMAIN,
    projectId: process.env.FIREBASE_PROJECTID,
    storageBucket: process.env.FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
    appId: process.env.FIREBASE_APPID,
    measurementId: process.env.FIREBASE_MEASUREMENTID
};

firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const db = firebase.firestore();
export const auth = firebase.auth();
export const localPersistence = firebase.auth.Auth.Persistence.LOCAL;
//export const storage = firebase.storage();


/* match /{document=**} {
    
  allow read, write: if
      request.time < timestamp.date(2021, 8, 10);

} */