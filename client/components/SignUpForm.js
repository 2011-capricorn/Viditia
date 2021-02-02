import React, {useState} from 'react'
import {connect} from 'react-redux'
import {setUser} from '../store/user'
import firebase from '../../public/firebase'

const SignUpForm = ({register}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({user}) => register(user.uid))
      .catch((err) => setError(err.message))
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        name="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        name="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {error !== '' && <p>{error}</p>}
      <button type="submit">Submit</button>
    </form>
  )
}

const mapDispatch = (dispatch) => ({
  register: (user) => dispatch(setUser(user)),
})

export default connect(null, mapDispatch)(SignUpForm)
