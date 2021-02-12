import React, {useState} from 'react'
import {connect} from 'react-redux'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

import {removeCreatedThunk} from '../store/user'
import {deleteViditThunk} from '../store/vidit'
import './styles/UserCreatedList.css'

const UserCreatedList = ({userKey, polls, removeVidit, deleteVidit}) => {
  const [open, setOpen] = useState(false)

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
              onClick={() => setOpen(true)}
              // onClick={() => update(poll.pollKey, userKey)}
            />
          </ListItemIcon>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="draggable-dialog-title"
          >
            <DialogTitle>Please confirm</DialogTitle>
            <DialogContent>
              <DialogContentText>
                This action is cannot be undone. Are you sure you would like to
                delete this vidit?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={() => setOpen(false)} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  update(poll.pollKey, userKey)
                  setOpen(false)
                }}
                color="secondary"
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
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
