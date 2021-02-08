import firebase from 'firebase'
import myFirebase from '../../public/firebase'
const db = myFirebase.firestore()

const SET_USER = 'SET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_ANSWERED = 'UPDATE_ANSWERED'
const ADD_CREATED = 'ADD_CREATED'
const REMOVE_CREATED = 'REMOVE_CREATED'

const defaultUser = {
  // userKey: 'bddR4THyLXZh0kw7DEYb2iusoY42',
  userKey: '',
  answered: [],
  created: [],
}

const setUser = (user) => ({type: SET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const updateAnswered = (pollKey) => ({type: UPDATE_ANSWERED, pollKey})
export const addCreated = (pollKey) => ({type: ADD_CREATED, pollKey})
const removeCreated = (pollKey) => ({type: REMOVE_CREATED, pollKey})

export const getUserThunk = () => {
  return (dispatch) => {
    try {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          const userKey = user.uid
          const {created, answered} = (
            await db.collection('users').doc(userKey).get()
          ).data()
          dispatch(setUser({userKey, answered, created}))
        }
      })
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

export const oauthLoginThunk = (type) => {
  return async (dispatch) => {
    try {
      let provider
      if (type === 'Google') provider = new firebase.auth.GoogleAuthProvider()
      if (type === 'Facebook')
        provider = new firebase.auth.FacebookAuthProvider()
      if (type === 'Github') provider = new firebase.auth.GithubAuthProvider()
      if (type === 'Twitter') provider = new firebase.auth.TwitterAuthProvider()

      const {
        user: {uid},
      } = await firebase.auth().signInWithPopup(provider)

      const user = await db.collection('users').doc(uid).get()
      if (user.exists)
        dispatch(
          setUser({
            userKey: uid,
            answered: user.answered,
            created: user.created,
          })
        )
      else {
        db.collection('users').doc(uid).set({
          answered: [],
          created: [],
          signUpAnswers: {},
        })
        dispatch(setUser({userKey: uid, answered: [], created: []}))
      }
    } catch (error) {
      return 'Something went wrong'
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

export const logoutThunk = () => {
  return async (dispatch) => {
    try {
      await firebase.auth().signOut()
      dispatch(removeUser())
    } catch (error) {
      console.error(error)
    }
  }
}

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

export const removeCreatedThunk = (pollKey, userKey) => {
  return async (dispatch) => {
    try {
      console.log('pollKey, userKey')
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
    case ADD_CREATED: {
      const newState = [...state.created, action.pollKey]
      return {...state, created: newState}
    }
    default:
      return state
  }
}
