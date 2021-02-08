import React from 'react'
import {connect} from 'react-redux'

export const UserProfile = ({userKey}) => {
  return (
    <div>
      <h3>Welcome, {userKey}</h3>
    </div>
  )
}

const mapState = ({user: {userKey}}) => ({
  userKey,
})

export default connect(mapState)(UserProfile)
