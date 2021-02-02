import React, {useState} from 'react'
import {connect} from 'react-redux'
import {setUser} from '../store/user'
import firebase from '../../public/firebase'

const LoginForm = ({login}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => login(firebase.auth().currentUser.uid))
      .catch(() => setError('Invalid email or password'))
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
      {error !== '' && <p>{error}</p>}
      <button type="submit">Submit</button>
    </form>
  )
}

const mapDispatch = (dispatch) => ({
  login: (user) => dispatch(setUser(user)),
})

export default connect(null, mapDispatch)(LoginForm)
