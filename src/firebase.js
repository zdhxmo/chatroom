import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAGbEz-KTvS4AaIKTcPhUFPKWwzmfudEJA",
    authDomain: "chatrooms-7d.firebaseapp.com",
    projectId: "chatrooms-7d",
    storageBucket: "chatrooms-7d.appspot.com",
    messagingSenderId: "101927627614",
    appId: "1:101927627614:web:7d2641d135d253e86e3dcf",
    measurementId: "G-5LMZ83F8KE"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebaseApp.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db