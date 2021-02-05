import React, {useState} from 'react'
import {connect} from 'react-redux'
import {loginThunk} from '../store/user'

const LoginForm = ({login, history}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(await login(email, password))
    if (!error) history.push('/home')
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
  login: (email, password) => dispatch(loginThunk(email, password)),
})

export default connect(null, mapDispatch)(LoginForm)
