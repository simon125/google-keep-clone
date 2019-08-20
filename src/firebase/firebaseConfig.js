import * as firebase from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "keep-clone-app.firebaseapp.com",
  databaseURL: "https://keep-clone-app.firebaseio.com",
  projectId: "keep-clone-app",
  storageBucket: "",
  messagingSenderId: "324619407062",
  appId: process.env.REACT_APP_APP_ID
};

export const app = firebase.initializeApp(firebaseConfig);
