import * as firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDkwiqR5UIPumMbcAFjUEXqY1gTHjA3_kQ',
  authDomain: 'keep-clone-app.firebaseapp.com',
  databaseURL: 'https://keep-clone-app.firebaseio.com',
  projectId: 'keep-clone-app',
  storageBucket: '',
  messagingSenderId: '324619407062',
  appId: '1:324619407062:web:c66d15ae773c4655'
};

export const app = firebase.initializeApp(firebaseConfig);
