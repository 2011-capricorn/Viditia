import React from 'react'
import {connect} from 'react-redux'

import {List, ListItem, ListItemIcon} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

import {removeCreatedThunk} from '../store/user'
import './styles/UserCreatedList.css'

import myFirebase from '../../public/firebase'
const db = myFirebase.firestore()

const UserCreatedList = ({userKey, polls, removeVidit}) => {
  const test = async (pollKey, uid) => {
    const pollRef = db.collection('polls').doc(pollKey)
    const {answers} = (await pollRef.get()).data()
    console.log('answers -->', answers)
  }

  return (
    <List>
      {polls.map((poll) => (
        <ListItem key={poll.pollKey} className="shadow" id="created-list-item">
          <p>{poll.question}</p>
          <p>Contributions: {poll.totalVoteCount}</p>
          <ListItemIcon>
            <DeleteIcon
              className="created-list-delete"
              // onClick={() => removeVidit(poll.pollKey, userKey)}
              onClick={() => test(poll.pollKey, userKey)}
            />
          </ListItemIcon>
        </ListItem>
      ))}
    </List>
  )
}

const mapState = ({user: {userKey}}) => ({
  userKey,
})

const mapDispatch = (dispatch) => ({
  removeVidit: (pollKey, userKey) =>
    dispatch(removeCreatedThunk(pollKey, userKey)),
})

export default connect(mapState, mapDispatch)(UserCreatedList)
