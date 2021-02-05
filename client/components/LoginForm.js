import {Button, Divider, TextField} from '@material-ui/core'
import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {loginThunk, oauthLoginThunk} from '../store/user'

import './styles/LoginForm.css'

const LoginForm = ({login, oauthLogin, history}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(await login(email, password))
    if (!error) history.push('/vidits')
  }

  return (
    <div className="flex jcc aic container">
      <form onSubmit={handleSubmit}>
        <button
          type="button"
          onClick={() => setError('OAuth is still in the works!')}
          className="flex aic login-btn"
        >
          <img src="/google.jpg" className="login-img" />
          <Divider />
          <p className="login-btn-text">Log in with Google</p>
        </button>
        <button
          type="button"
          onClick={() => setError('OAuth is still in the works!')}
          className="flex aic login-btn"
        >
          <img src="/facebook.png" className="login-img" />
          <Divider />
          <p>Log in with Facebook</p>
        </button>
        <button
          type="button"
          onClick={() => setError('OAuth is still in the works!')}
          className="flex aic login-btn"
        >
          <img src="/github.png" className="login-img" />
          <Divider />
          <p>Log in with GitHub</p>
        </button>
        <TextField
          label="Email"
          variant="outlined"
          required
          fullWidth={true}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          required
          fullWidth={true}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error !== '' && <p>{error}</p>}
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
        {/* <button type="submit">Submit</button> */}
      </form>
      <br />
      <div>
        New user? <Link to="/signup">Sign up!</Link>
      </div>
    </div>
  )
}

const mapDispatch = (dispatch) => ({
  login: (email, password) => dispatch(loginThunk(email, password)),
  oauthLogin: (type) => dispatch(oauthLoginThunk(type)),
})

export default connect(null, mapDispatch)(LoginForm)
