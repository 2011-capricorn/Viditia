import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyB1gNGvTB_KWMYeMvfhvbv_kns5kIW35go',
  authDomain: 'viditia-cf976.firebaseapp.com',
  projectId: 'viditia-cf976',
  storageBucket: 'viditia-cf976.appspot.com',
  messagingSenderId: '489692885650',
  appId: '1:489692885650:web:ed1596c9e14d6ece8cac4b',
  measurementId: 'G-2HDTFJWVPH',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
export default firebaseApp
// If we do want to use realtime db
// const db = firebaseApp.firestore();
// export default db
