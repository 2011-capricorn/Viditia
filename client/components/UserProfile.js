import React, {useState} from 'react'
import {connect} from 'react-redux'

import {Divider} from '@material-ui/core'

import UserForm from './UserForm'
import UserCreatedList from './UserCreatedList'
import './styles/UserProfile.css'

export const UserProfile = ({created, allVidit}) => {
  const [showUserInformation, setShowUserInformation] = useState(false)
  const userCreated = allVidit.filter((vidit) =>
    created.includes(vidit.pollKey)
  )

  return (
    <div>
      <h1 className="tac">
        {showUserInformation ? 'User Information' : 'Created Vidits'}
      </h1>
      <div className="flex profile-container">
        <div className="profile-nav">
          <p onClick={() => setShowUserInformation(true)}>User Information</p>
          <p onClick={() => setShowUserInformation(false)}>Created Vidits</p>
        </div>
        <Divider orientation="vertical" />
        <div className="profile-content">
          {showUserInformation && <UserForm />}
          {!showUserInformation && <UserCreatedList polls={userCreated} />}
        </div>
      </div>
    </div>
  )
}

const mapState = ({user: {created}, vidit: {allVidit}}) => ({
  created,
  allVidit,
})

export default connect(mapState)(UserProfile)
