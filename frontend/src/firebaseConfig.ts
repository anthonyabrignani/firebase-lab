import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAvWuel61JNk8xdqahrgzDLCp_HPkyLsSk",
  authDomain: "fir-lab-6bb67.firebaseapp.com",
  databaseURL: "https://fir-lab-6bb67-default-rtdb.firebaseio.com",
  projectId: "fir-lab-6bb67",
  storageBucket: "fir-lab-6bb67.appspot.com",
  messagingSenderId: "395333503686",
  appId: "1:395333503686:web:919dc6258bc1370e1325c7",
  measurementId: "G-JLJYZZTK97",
};

firebase.initializeApp(firebaseConfig);

export const authProvider = new firebase.auth.GoogleAuthProvider();

export function signInWithGoogle(): void {
    firebase.auth().signInWithPopup(authProvider);
}

export function signOut(): void {
    firebase.auth().signOut();
}

export default firebase;