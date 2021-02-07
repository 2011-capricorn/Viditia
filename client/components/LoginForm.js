import {
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@material-ui/core'
import {Visibility, VisibilityOff} from '@material-ui/icons'
import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {loginThunk, oauthLoginThunk} from '../store/user'

import './styles/LoginForm.css'

const LoginForm = ({login, oauthLogin, history}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(await login(email, password))
    if (!error) history.push('/vidits')
  }

  const handleOauth = async (type) => {
    setError(await oauthLogin(type))
    // if (!error) history.push('/vidits')
  }

  return (
    <div className="flex jcb aic container">
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
          style={{marginTop: '20px'}}
        >
          Login
        </Button>
      </form>
      <div>
        {error !== '' && <p className="tac">{error}</p>}
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
        </p>

        <p style={{textDecoration: 'none'}} className="tac">
          New user? <Link to="/signup">Sign up!</Link>
        </p>
      </div>
    </div>
  )
}

const mapDispatch = (dispatch) => ({
  login: (email, password) => dispatch(loginThunk(email, password)),
  oauthLogin: (type) => dispatch(oauthLoginThunk(type)),
})

export default connect(null, mapDispatch)(LoginForm)
