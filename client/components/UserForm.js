import React, {useState} from 'react'

import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create'
import firebase from 'firebase'

import ConfirmPassword from './ConfirmPassword'
import './styles/UserForm.css'

const UserForm = () => {
  const [updateEmail, setUpdateEmail] = useState(false)
  const [updatePassword, setUpdatePassword] = useState(false)
  const [email, setEmail] = useState(firebase.auth().currentUser.email)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [emailChangeMessage, setEmailChangeMessage] = useState('')
  const [passwordChangeMessage, setPasswordChangeMessage] = useState('')
  const user = firebase.auth().currentUser

  const handleUpdateEmail = async () => {
    try {
      const error = await user.updateEmail(email)
      if (!error)
        setEmailChangeMessage(`Email successfully changed to ${email}`)
    } catch (err) {
      setEmailChangeMessage(err.message)
    }
  }

  const handleUpdatePassword = async () => {
    if (newPassword === confirmNewPassword) {
      try {
        const error = await user.updatePassword(newPassword)
        if (!error) setPasswordChangeMessage('Password successfully changed')
      } catch (err) {
        setPasswordChangeMessage(err.message)
      }
    } else {
      setPasswordChangeMessage('Passwords do not match')
    }
  }

  return (
    <div>
      <List>
        <ListItem id="update-form-item">
          <ListItemText primary="Update Email?" id="update-text" />
          <ListItemIcon>
            <CreateIcon
              id="update-form-icon"
              onClick={() => setUpdateEmail(!updateEmail)}
            />
          </ListItemIcon>
        </ListItem>
        {updateEmail && (
          <div className="flex update-form">
            <TextField
              label="Email"
              variant="outlined"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              type="button"
              id="mgt"
              onClick={handleUpdateEmail}
            >
              Update Email
            </Button>
            {emailChangeMessage !== '' && (
              <p className="tac">{emailChangeMessage}</p>
            )}
          </div>
        )}

        <Divider className="update-divider" />

        <ListItem id="update-form-item">
          <ListItemText primary="Update Password?" id="update-text" />
          <ListItemIcon>
            <CreateIcon
              id="update-form-icon"
              onClick={() => setUpdatePassword(!updatePassword)}
            />
          </ListItemIcon>
        </ListItem>
        {updatePassword && (
          <div className="flex update-form">
            <ConfirmPassword
              title1="New Password"
              title2="Confirm New Password"
              password={newPassword}
              confirmPassword={confirmNewPassword}
              showPassword={showNewPassword}
              showConfirmPassword={showConfirmPassword}
              setPassword={setNewPassword}
              setConfirmPassword={setConfirmNewPassword}
              setShowPassword={setShowNewPassword}
              setShowConfirmPassword={setShowConfirmPassword}
            />

            <Button
              variant="contained"
              color="primary"
              type="button"
              id="mgt"
              onClick={handleUpdatePassword}
            >
              Update Password
            </Button>
            {passwordChangeMessage !== '' && (
              <p className="tac">{passwordChangeMessage}</p>
            )}
          </div>
        )}
      </List>
    </div>
  )
}

export default UserForm
