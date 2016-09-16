import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDv7yfFhDvLkMM2Jfp9TYR0mE9n-Dq6CvM",
  authDomain: "shoot-the-breeze-ff2b0.firebaseapp.com",
  databaseURL: "https://shoot-the-breeze-ff2b0.firebaseio.com",
  storageBucket: "shoot-the-breeze-ff2b0.appspot.com",
  messagingSenderId: "414153994801"
};

firebase.initializeApp(config);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export default firebase;
export const signIn = () => auth.signInWithPopup(provider);
export const reference = firebase.database().ref('messages');
