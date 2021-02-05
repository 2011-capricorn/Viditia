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
