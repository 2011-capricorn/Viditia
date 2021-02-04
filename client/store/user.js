import firebase from 'firebase'
import myFirebase from '../../public/firebase'
const db = myFirebase.firestore()

const GET_USER = 'GET_USER'
const SET_USER = 'SET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_ANSWERED = 'UPDATE_ANSWERED'

const defaultUser = {
  // userKey: 'bddR4THyLXZh0kw7DEYb2iusoY42',
  userKey: '',
  answered: [],
  created: [],
}

export const setUser = (user) => ({type: SET_USER, user})
const updateAnswered = (pollKey) => ({type: UPDATE_ANSWERED, pollKey})

export const getUserThunk = () => {
  return async (dispatch) => {
    try {
      console.log('get me thunk')
      // const user = firebase.auth().currentUser
      // if (user) {
      //   const userKey = user.uid
      //   const {created, answered} = (
      //     await db.collection('users').doc(userKey).get()
      //   ).data()
      //   dispatch(setUser({userKey, answered, created}))
      // } else {
      // const user = await firebase
      //   .auth()
      //   .signInAnonymously()
      // console.log('anonymous user -->', user)
      //   .then(({user: {uid}}) => {
      //     return {type: GET_USER, user: uid}
      //   })
      //}
    } catch (error) {
      console.error(error)
    }
  }
}

export const loginThunk = (email, password) => {
  return async (dispatch) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      const userKey = firebase.auth().currentUser.uid
      // const userKey = 'bddR4THyLXZh0kw7DEYb2iusoY42'
      const {created, answered} = (
        await db.collection('users').doc(userKey).get()
      ).data()
      dispatch(setUser({userKey, answered, created}))
    } catch (err) {
      return 'Invalid email or password'
    }
  }
}

export const signUpThunk = (email, password, signUpAnswers) => {
  return async (dispatch) => {
    try {
      const register = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
      const userKey = register.user.uid
      db.collection('users')
        .doc(userKey)
        .set({signUpAnswers, answered: [], created: []})
      dispatch(setUser({userKey, answered: [], created: []}))
    } catch (error) {
      return error.message
    }
  }
}

const removeUser = () => ({type: REMOVE_USER})

export const updateAnsweredThunk = (pollKey, userKey) => {
  return async (dispatch) => {
    try {
      const userRef = await db.collection('users').doc(userKey)
      userRef.update({
        answered: firebase.firestore.FieldValue.arrayUnion(pollKey),
      })
      dispatch(updateAnswered(pollKey))
    } catch (error) {
      console.error(error)
    }
  }
}

export default function (state = defaultUser, action) {
  switch (action.type) {
    case SET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case UPDATE_ANSWERED: {
      const newState = [...state.answered, action.pollKey]
      return {...state, answered: newState}
    }
    default:
      return state
  }
}
