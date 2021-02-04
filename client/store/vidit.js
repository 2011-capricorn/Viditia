import firebase from '../../public/firebase'
const db = firebase.firestore()

const ADD_VIDIT = 'ADD_VIDIT'

const addVidit = (vidit) => ({
  type: ADD_VIDIT,
  vidit,
})

export const addViditThunk = (vidit) => {
  console.log('vidit in thunk -->', vidit)
  return async (dispatch) => {
    try {
      const result = await db.collection('polls').add(vidit)
      console.log('document written -->', result.id)
      console.log(
        'document written -->',
        await db.collection('polls').doc(result.id)
      )
      dispatch(addVidit(result.id))
    } catch (error) {
      console.error(error)
    }
  }
}

const defaultState = {
  allVidit: [],
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case ADD_VIDIT:
      return {allVidit: [...state.allVidit, action.vidit]}
    default:
      return state
  }
}
