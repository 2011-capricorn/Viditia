import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@material-ui/core'
import {Visibility, VisibilityOff} from '@material-ui/icons'
import Alert from '@material-ui/lab/Alert'
import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {loginThunk, oauthLoginThunk} from '../store/user'

import './styles/LoginForm.css'

const LoginForm = ({isLoggedIn, login, oauthLogin, history}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (isLoggedIn) history.push('/home')
  }, [isLoggedIn])

  useEffect(() => {
    if (error === undefined) history.push('/vidits')
  }, [error])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(await login(email, password))
  }

  const handleOauth = async (type) => {
    setError(await oauthLogin(type))
  }

  return (
    <div className="flex aic shadow container">
      <form onSubmit={handleSubmit}>
        <h1 className="tac">Welcome back!</h1>
        <TextField
          label="Email"
          variant="outlined"
          required
          fullWidth={true}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormControl variant="outlined" id="mgt" fullWidth={true}>
          <InputLabel htmlFor="Password">Password</InputLabel>
          <OutlinedInput
            id="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          id="login-btn"
        >
          Login
        </Button>
      </form>
      <div>
        {error && <Alert severity="error">{error}</Alert>}
        <p className="tac">Or sign in with:</p>

        <p>
          <img
            src="/google.png"
            className="login-img"
            onClick={() => handleOauth('Google')}
          />
          <img
            src="/facebook.png"
            className="login-img"
            onClick={() => handleOauth('Facebook')}
          />
          <img
            src="/github.png"
            className="login-img"
            onClick={() => handleOauth('Github')}
          />
          <img
            src="/twitter.png"
            className="login-img"
            onClick={() => handleOauth('Twitter')}
          />
        </p>

        <p className="tac">
          New user? <Link to="/signup">Sign up!</Link>
        </p>
      </div>
    </div>
  )
}

const mapState = ({user: {userKey}}) => ({
  isLoggedIn: !!userKey,
})

const mapDispatch = (dispatch) => ({
  login: (email, password) => dispatch(loginThunk(email, password)),
  oauthLogin: (type) => dispatch(oauthLoginThunk(type)),
})

export default connect(mapState, mapDispatch)(LoginForm)
