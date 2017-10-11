import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCgcqOA1M4Ddxa4YGPzSbCr75Q7hkSkbS4",
  authDomain: "recommendations-ad700.firebaseapp.com",
  databaseURL: "https://recommendations-ad700.firebaseio.com",
  projectId: "recommendations-ad700",
  storageBucket: "",
  messagingSenderId: "116914566902"
};
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;