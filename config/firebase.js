var firebase = require("firebase");

var config = {
    apiKey: "AIzaSyDHx6dQeFcpW9rpg6P41NwNJ1GJ3q3liME",
    authDomain: "photo-op-firebase.firebaseapp.com",
    databaseURL: "https://photo-op-firebase.firebaseio.com",
    projectId: "photo-op-firebase",
    storageBucket: "photo-op-firebase.appspot.com",
    messagingSenderId: "671875176904"
  };
  var firebase = firebase.initializeApp(config);

  export default firebase;
