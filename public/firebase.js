import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyD4hIWsr4OFDkruVGqORICaeCqyUGLVRiM',
  authDomain: 'viditia-e6fc4.firebaseapp.com',
  projectId: 'viditia-e6fc4',
  storageBucket: 'viditia-e6fc4.appspot.com',
  messagingSenderId: '987179537921',
  appId: '1:987179537921:web:3f66c06145de0b23371200',
  measurementId: 'G-SWMZN48X5N'
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

// If we do want to use realtime db
// const db = firebaseApp.firestore();
// export default db
