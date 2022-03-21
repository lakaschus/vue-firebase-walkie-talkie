import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCV-46OUph2wn41G8f7bFV-33OD7g0oR_o",
    authDomain: "vuefirebase-bff01.firebaseapp.com",
    projectId: "vuefirebase-bff01",
    storageBucket: "vuefirebase-bff01.appspot.com",
    messagingSenderId: "790079899417",
    appId: "1:790079899417:web:2456af194ffe9d7468e788",
    measurementId: "G-ZJMNRGC4J8"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();