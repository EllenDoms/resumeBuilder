import * as firebase from "firebase";

export const config = {
  apiKey: "AIzaSyCqGDoMqHoRMp8u917L5mbsqO0LKrXpmjw",
  authDomain: "resume-db248.firebaseapp.com",
  databaseURL: "https://resume-db248.firebaseio.com/",
  projectId: "resume-db248",
  storageBucket: "resume-db248.appspot.com",
  messagingSenderId: "1006018239430",
  auth: ".json?auth=EBRWKRaOxTSi7t9dAdeRL4sbv74SWh4VSUJErfgI"
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const authRef = firebase.auth();
export const databaseRef = firebase.database().ref();
export const provider = new firebase.auth.GoogleAuthProvider();
