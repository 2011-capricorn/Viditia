require('../secrets')
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID,
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
export default firebaseApp

// If we do want to use realtime db
// const db = firebaseApp.firestore();
// export default db
