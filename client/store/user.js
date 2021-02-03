import firebase from '../../public/firebase'
const db = firebase.firestore()

const GET_USER = 'GET_USER'
const SET_USER = 'SET_USER'
const REMOVE_USER = 'REMOVE_USER'

const defaultUser = ''

export const getUser = () => {
  if (firebase.auth().currentUser)
    return {type: GET_USER, user: firebase.auth().currentUser.uid}

  // firebase
  //   .auth()
  //   .signInAnonymously()
  //   .then(({user: {uid}}) => {
  //     return {type: GET_USER, user: uid}
  //   })
}
export const setUser = (user, signUpAnswers) => {
  return async (dispatch) => {
    const result = await db
      .collection('users')
      .doc(user)
      .set({signUpAnswers})
      .then(() => {
        return {type: SET_USER, user}
      })
    dispatch(result)
  }
}
const removeUser = () => ({type: REMOVE_USER})

export default function (state = defaultUser, action) {
  console.log('got to reducer')
  switch (action.type) {
    case SET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
