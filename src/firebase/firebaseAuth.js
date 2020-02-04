import * as firebase from 'firebase/app';
import { app } from './firebaseConfig';
import 'firebase/auth';
import { logIn, logOut } from '../redux/auth';
import { store } from '../redux/storeConfig';
import {
  getStructureFromDBv2,
  getTagsFromDB,
  getNotesFromDB
} from './firebaseAPI';

const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const auth = app.auth();

// let notesUnsubscribe, tagsUnsubscribe, structureUnsubscribe;

auth.onAuthStateChanged((user) => {
  if (user) {
    const { email, uid } = user;
    store.dispatch(logIn({ email, uid }));
    // notesUnsubscribe =
    // tagsUnsubscribe =
    // structureUnsubscribe =
    getNotesFromDB(uid);
    getTagsFromDB(uid);
    getStructureFromDBv2(uid);
  } else {
    //redux action which is invoking after signOut (firebase)
    // notesUnsubscribe();
    // tagsUnsubscribe();
    // structureUnsubscribe();
    store.dispatch(logOut());
  }
});

export const signInWithGoogle = () => {
  auth
    .signInWithPopup(googleProvider)
    .then((result) => {
      const { uid, email } = auth.currentUser();
      store.dispatch(logIn({ email, uid }));
    })
    .catch((err) => {
      console.error(err);
      // var errorCode = error.code;
      // var errorMessage = error.message;
    });
};
export const signInWithFacebook = () => {
  auth
    .signInWithPopup(facebookProvider)
    .then((result) => {})
    .catch((error) => {
      const errorCode = error.code;
      const credential = error.credential;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        const email = error.email;
        auth.fetchSignInMethodsForEmail(email).then((methods) => {
          if (methods[0] === 'password') {
            const newPassword = prompt('Enter password: ');
            auth
              .signInWithEmailAndPassword(email, newPassword)
              .then(({ user }) => {
                return user.linkWithCredential(credential);
              })
              .catch((err) => console.error(err));
          }
        });
      }
    });
};
export const createUserWithEmailAndPassword = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};
export const signInWithEmailAndPassword = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};
//sign out from firebase service
export const signOut = () => {
  auth.signOut();
};
