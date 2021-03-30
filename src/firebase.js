import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDNQazoK-ZgnB0gYnSS5B40sxdx65lQ-WI",
    authDomain: "todo-app-f0caa.firebaseapp.com",
    projectId: "todo-app-f0caa",
    storageBucket: "todo-app-f0caa.appspot.com",
    messagingSenderId: "816668186977",
    appId: "1:816668186977:web:71c0e87523a972c16acd20",
    measurementId: "G-20GRD16T0X"
});

const db = firebaseApp.firestore();

export default db;