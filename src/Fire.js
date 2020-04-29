import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyCLGgSXDVuRzviUqcd6w5NRNs__LS2Fq6Q",
    authDomain: "fireplacestore-8a740.firebaseapp.com",
    databaseURL: "https://fireplacestore-8a740.firebaseio.com",
    projectId: "fireplacestore-8a740",
    storageBucket: "fireplacestore-8a740.appspot.com",
    messagingSenderId: "309355407496",
    appId: "1:309355407496:web:d3ee3288bc1257a6b8973d"

};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
