import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAxDwcSD_QOEKBnIvMDJK_d7rAOlkxACpI",
  authDomain: "fun-food-friends-6f552.firebaseapp.com",
  databaseURL: "https://fun-food-friends-6f552.firebaseio.com",
  projectId: "fun-food-friends-6f552",
  storageBucket: "fun-food-friends-6f552.appspot.com",
  messagingSenderId: "174168614083"
};
firebase.initializeApp(config);

export default firebase;