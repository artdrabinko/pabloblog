import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyD8occ3FZKfF9pqkgGigqyfLHfwR6OQ8y8",
  authDomain: "most-tech.firebaseapp.com",
  databaseURL: "https://most-tech.firebaseio.com",
  projectId: "most-tech",
  storageBucket: "most-tech.appspot.com",
  messagingSenderId: "682854484807"
};

firebase.initializeApp(config);

export const database = firebase.database().ref("/posts");
export const firebaseDB = firebase.database();
export const storageRef = firebase.storage().ref();
export const firebaseStorage = firebase.storage;
export const auth = firebase.auth();
//export const googleProvider = new firebase.auth.GoogleAuthProvider();
