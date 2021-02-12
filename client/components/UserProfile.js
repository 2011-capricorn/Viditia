import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import {Divider} from '@material-ui/core'

import UserForm from './UserForm'
import UserCreatedList from './UserCreatedList'
import './styles/UserProfile.css'

export const UserProfile = ({isLoggedIn, created, allVidit, history}) => {
  const [showUserInformation, setShowUserInformation] = useState(true)
  const userCreated = allVidit.filter((vidit) =>
    created.includes(vidit.pollKey)
  )

  useEffect(() => {
    if (!isLoggedIn) history.push('/login')
  }, [isLoggedIn])

  return (
    isLoggedIn && (
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
  )
}

const mapState = ({user: {userKey, created}, vidit: {allVidit}}) => ({
  isLoggedIn: !!userKey,
  created,
  allVidit,
})

export default connect(mapState)(UserProfile)
