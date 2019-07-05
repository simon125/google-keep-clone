import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { logIn, logOut } from "./redux/auth";
import { getNotes } from "./redux/notes";
import { store } from "./redux/storeConfig";

const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const firebaseConfig = {
  apiKey: "AIzaSyDkwiqR5UIPumMbcAFjUEXqY1gTHjA3_kQ",
  authDomain: "keep-clone-app.firebaseapp.com",
  databaseURL: "https://keep-clone-app.firebaseio.com",
  projectId: "keep-clone-app",
  storageBucket: "",
  messagingSenderId: "324619407062",
  appId: "1:324619407062:web:c66d15ae773c4655"
};

firebase.initializeApp(firebaseConfig);
//Listener for auth status changing
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    const { email, uid } = user;
    store.dispatch(logIn({ email, uid }));
  } else {
    //redux action which is invoking after signOut (firebase)
    store.dispatch(logOut());
  }
});

export const signInWithGoogle = () => {
  firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then(function(result) {
      // var token = result.credential.accessToken;
      // var user = result.user;
      const { uid, email } = firebase.auth().currentUser();
      store.dispatch(logIn({ email, uid }));
      // debugger;
    })
    .catch(function(error) {
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // var email = error.email;
      // var credential = error.credential;
      // debugger;
    });
};
export const signInWithFacebook = () => {
  firebase
    .auth()
    .signInWithPopup(facebookProvider)
    .then(function(result) {
      // var token = result.credential.accessToken;
      // var user = result.user;
      // debugger;
    })
    .catch(function(error) {
      var errorCode = error.code;
      var credential = error.credential;
      if (errorCode === "auth/account-exists-with-different-credential") {
        var email = error.email;
        firebase
          .auth()
          .fetchSignInMethodsForEmail(email)
          .then(function(methods) {
            debugger;
            if (methods[0] === "password") {
              const newPassword = prompt("Enter password: ");
              firebase
                .auth()
                .signInWithEmailAndPassword(email, newPassword)
                .then(function({ user }) {
                  return user.linkWithCredential(credential);
                })
                .then(function(res) {
                  debugger;
                });
            }
          });
      }
    });
};
export const createUserWithEmailAndPassword = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};
export const signInWithEmailAndPassword = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};
//sign out from firebase service
export const signOut = () => {
  firebase.auth().signOut();
};

export const db = firebase.firestore();

db.collection("test1").onSnapshot(
  snapshot => {
    const notes = [];
    snapshot.forEach(el => {
      notes.push({ ...el.data(), id: el.id });
    });
    store.dispatch(getNotes(notes));
  },
  err => {
    console.log(err);
  }
);
