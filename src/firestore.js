import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyDZoS0UEn8b2_wIqnNZlIQ3D2o1p6wzk7E",
    authDomain: "pizza-pizza-50b70.firebaseapp.com",
    databaseURL: "https://pizza-pizza-50b70.firebaseio.com",
    projectId: "pizza-pizza-50b70",
    storageBucket: "pizza-pizza-50b70.appspot.com",
    messagingSenderId: "10532940493",
    appId: "1:10532940493:web:58b642a3e397056ae8d784",
    measurementId: "G-12RFV8C5Y1"
  };

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export {db};