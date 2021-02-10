import firebase from 'firebase'
import myFirebase from '../../public/firebase'
const db = myFirebase.firestore()

const ADD_VIDIT = 'ADD_VIDIT'
const GET_ALL_VIDIT = 'GET_ALL_VIDIT'
const UPDATE_VIDIT = 'UPDATE_VIDIT'
const DELETE_VIDIT = 'DELETE_VIDIT'

const getAllVidit = (vidits) => ({
  type: GET_ALL_VIDIT,
  vidits,
})

const addVidit = (vidit) => ({
  type: ADD_VIDIT,
  vidit,
})

const updateVidit = (pollKey) => ({
  type: UPDATE_VIDIT,
  pollKey,
})

const deleteVidit = (pollKey) => ({
  type: DELETE_VIDIT,
  pollKey,
})

export const getAllViditThunk = () => {
  return async (dispatch) => {
    try {
      const polls = (await db.collection('polls').get()).docs
      const result = await Promise.all(
        polls.map((poll) => {
          const {
            question,
            type,
            answers,
            dataType,
            units,
            max,
            rangeLabel1,
            rangeLabel5,
            rangeLabel10,
            masterLabel,
            choices,
          } = poll.data()
          return {
            pollKey: poll.id,
            question,
            type,
            dataType,
            units,
            max,
            rangeLabel1,
            rangeLabel5,
            rangeLabel10,
            masterLabel,
            choices,
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

      const {
        question,
        type,
        answers,
        dataType,
        units,
        max,
        rangeLabel1,
        rangeLabel5,
        rangeLabel10,
        masterLabel,
        choices,
      } = vidit
      dispatch(
        addVidit({
          pollKey: result.id,
          question,
          type,
          totalVoteCount: answers.length,
          dataType,
          units,
          max,
          rangeLabel1,
          rangeLabel5,
          rangeLabel10,
          masterLabel,
          choices,
        })
      )
      return result.id
    } catch (error) {
      console.error(error)
    }
  }
}

export const updateVoteThunk = (pollKey, answer, userKey) => {
  return async (dispatch) => {
    try {
      const pollRef = await db.collection('polls').doc(pollKey)
      pollRef.update({
        answers: firebase.firestore.FieldValue.arrayUnion({
          answer,
          userKey,
        }),
      })
      dispatch(updateVidit(pollKey))
    } catch (error) {
      console.error(error)
    }
  }
}

export const deleteViditThunk = (pollKey) => {
  return async (dispatch) => {
    try {
      const pollRef = db.collection('polls').doc(pollKey)
      const {answers} = (await pollRef.get()).data()
      answers.forEach(async (answer) => {
        const userRef = db.collection('users').doc(answer.userKey)
        const {answered} = (await userRef.get()).data()
        const newAnswered = answered.filter((item) => item !== pollKey)
        userRef.update({answered: newAnswered})
      })
      pollRef.delete()
      dispatch(deleteVidit(pollKey))
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
    case UPDATE_VIDIT: {
      const newState = state.allVidit.map((vidit) => {
        if (vidit.pollKey === action.pollKey) {
          vidit.totalVoteCount++
        }
        return vidit
      })
      return {...state, allVidit: newState}
    }
    case DELETE_VIDIT: {
      const newState = state.allVidit.filter(
        (vidit) => vidit.pollKey !== action.pollKey
      )
      return {...state, allVidit: newState}
    }
    default:
      return state
  }
}
