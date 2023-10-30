// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBSs9n7myR__F49KkN8Rn7jgAWR3Xtl2Pc",
  authDomain: "trivio-testing.firebaseapp.com",
  projectId: "trivio-testing",
  storageBucket: "trivio-testing.appspot.com",
  messagingSenderId: "151680417370",
  appId: "1:151680417370:web:b2fbd1d7d6b75c260e6263",
  measurementId: "G-ESFETEX1L7"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore, firebase };