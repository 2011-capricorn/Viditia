import React from 'react'
import {connect} from 'react-redux'

import {List, ListItem, ListItemIcon} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

import {removeCreatedThunk} from '../store/user'
import {deleteViditThunk} from '../store/vidit'
import './styles/UserCreatedList.css'

const UserCreatedList = ({userKey, polls, removeVidit, deleteVidit}) => {
  const update = (pollKey, uid) => {
    deleteVidit(pollKey)
    removeVidit(pollKey, uid)
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
              onClick={() => update(poll.pollKey, userKey)}
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
  deleteVidit: (pollKey) => dispatch(deleteViditThunk(pollKey)),
})

export default connect(mapState, mapDispatch)(UserCreatedList)
