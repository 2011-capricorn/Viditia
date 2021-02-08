import React, {useState} from 'react'
import {connect} from 'react-redux'

import {Divider} from '@material-ui/core'

import UserForm from './UserForm'
import './styles/UserProfile.css'

export const UserProfile = ({userKey, created, allVidit}) => {
  const [showUserInformation, setShowUserInformation] = useState(true)
  const userCreated = allVidit.filter((vidit) =>
    created.includes(vidit.pollKey)
  )

  return (
    <div>
      <h3 className="tac">User Profile</h3>
      <div className="flex profile-container">
        <div className="profile-nav">
          <p onClick={() => setShowUserInformation(true)}>User Information</p>
          <p onClick={() => setShowUserInformation(false)}>Created Vidits</p>
        </div>
        <Divider orientation="vertical" />
        <div className="profile-content">
          {showUserInformation && <UserForm />}
        </div>
      </div>
    </div>
  )
}

const mapState = ({user: {userKey, created}, vidit: {allVidit}}) => ({
  userKey,
  created,
  allVidit,
})

export default connect(mapState)(UserProfile)
