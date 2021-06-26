import firebase from "firebase"
import "firebase/firestore"

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyAvVRXxivBinBH87I5OZM-kmkxjV_KNKL0",
	authDomain: "qwittr-857d8.firebaseapp.com",
	projectId: "qwittr-857d8",
	storageBucket: "qwittr-857d8.appspot.com",
	messagingSenderId: "63467223956",
	appId: "1:63467223956:web:fbc7f9c92a9ef00edb6d81",
	measurementId: "G-J8QFQCQG7R",
})

const db = firebaseApp.firestore()

db.settings({
	timestampsInSnapshots: true,
	merge: true
})

const auth = firebaseApp.auth()
const storage = firebaseApp.storage()

export { db, auth, storage }