import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyCySxGCR_8b-wukNRU4QoHA9_DP4Q5YLWQ",
    authDomain: "fireplace-store-6cb1c.firebaseapp.com",
    databaseURL: "https://fireplace-store-6cb1c.firebaseio.com",
    projectId: "fireplace-store-6cb1c",
    storageBucket: "fireplace-store-6cb1c.appspot.com",
    messagingSenderId: "35196510464",
    appId: "1:35196510464:web:c928ae987c97c26d4dd3e5"

};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
