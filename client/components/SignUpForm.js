import React, {useState} from 'react'
import {connect} from 'react-redux'
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

import {setUser} from '../store/user'
import firebase from '../../public/firebase'
import './styles/SignUpForm.css'

// eslint-disable-next-line react/display-name
const SignUpForm = React.forwardRef(({register}, ref) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({user}) => register(user.uid))
      .catch((err) => setError(err.message))
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="sign-up-form flex fdc jcc aic"
        ref={ref}
      >
        <TextField
          required
          variant="outlined"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <FormControl variant="outlined" id="mgt">
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

        <FormControl variant="outlined" id="mgt">
          <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
          <OutlinedInput
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        {error !== '' && <p>{error}</p>}
        <Button variant="outlined" color="primary" type="submit" id="mgt">
          Sign up!
        </Button>
      </form>
    </div>
  )
})

const mapDispatch = (dispatch) => ({
  register: (user) => dispatch(setUser(user)),
})

export default connect(null, mapDispatch)(SignUpForm)
