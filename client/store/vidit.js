import firebase from '../../public/firebase'
const db = firebase.firestore()

const ADD_VIDIT = 'ADD_VIDIT'
const GET_ALL_VIDIT = 'GET_ALL_VIDIT'

const getAllVidit = (vidits) => ({
  type: GET_ALL_VIDIT,
  vidits,
})

const addVidit = (vidit) => ({
  type: ADD_VIDIT,
  vidit,
})

export const getAllViditThunk = () => {
  return async (dispatch) => {
    try {
      const polls = (await db.collection('polls').get()).docs
      const result = await Promise.all(
        polls.map((poll) => {
          const {question, type, answers} = poll.data()
          return {
            pollKey: poll.id,
            question,
            type,
            totalVoteCount: answers.length,
          }
        })
      )
      dispatch(getAllVidit(result))
    } catch (error) {
      console.error(error)
    }
  }
}

export const addViditThunk = (vidit, userKey) => {
  return async (dispatch) => {
    try {
      const result = await db.collection('polls').add(vidit)

      const userRef = await db.collection('users').doc(userKey)
      const data = (await userRef.get()).data()
      userRef.update({created: [...data.created, result.id]})

      const {question, type, answers} = vidit
      dispatch(
        addVidit({
          pollkey: result.id,
          question,
          type,
          totalVoteCount: answers.length,
        })
      )
    } catch (error) {
      console.error(error)
    }
  }
}

const defaultState = {
  allVidit: [],
  singleVidit: {pollKey: '', results: []},
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_ALL_VIDIT:
      return {...state, allVidit: action.vidits}
    case ADD_VIDIT:
      return {...state, allVidit: [...state.allVidit, action.vidit]}
    default:
      return state
  }
}
