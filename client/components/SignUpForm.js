import React, {useState} from 'react'
import {connect} from 'react-redux'
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
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
  const signUpQuestions = {
    Season: ['Summer or winter?', ['Summer', 'Winter']],
    Awake: [
      'Are you an early bird or a night owl?',
      ['Early Bird', 'Night Owl'],
    ],
    Animal: ['Cat or dog?', ['Cat', 'Dog']],
    Hand: ['Are you right or left handed?', ['Right', 'Left']],
    Drink: ['Coffee or tea?', ['Coffee', 'Tea']],
    Scenery: ['Beach or mountains?', ['Beach', 'Moutains']],
    Travel: ['Do you like to travel?', ['Yes', 'No']],
    Food: ['Cheeseburger or hotdog?', ['CheeseBurger', 'Hotdog']],
    Artist: ['Beyonce or Black Sabbath?', ['Beyonce', 'Black Sabbath']],
    Boolean: ['Yes or no?', ['Yes', 'No']],
  }
  const [signUpAnswers, setSignUpAnswers] = useState({
    Season: '',
    Awake: '',
    Animal: '',
    Hand: '',
    Drink: '',
    Scenery: '',
    Travel: '',
    Food: '',
    Artist: '',
    Boolean: '',
  })
  const [error, setError] = useState('')

  const checkAnswers = () => {
    return Object.keys(signUpAnswers).some(
      (answer) => signUpAnswers[answer] === ''
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    } else if (checkAnswers()) {
      setError('Please answer all the questions!')
      return
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({user}) => register(user.uid, signUpAnswers))
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
          fullWidth={true}
          variant="outlined"
          label="Email"
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

        <FormControl variant="outlined" id="mgt" fullWidth={true}>
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

        <h2>Tell us a little about yourself!</h2>

        {Object.keys(signUpQuestions).map((question) => {
          return (
            <FormControl key={question} id="mgt" fullWidth={true}>
              <InputLabel>{signUpQuestions[question][0]}</InputLabel>
              <Select
                value={signUpAnswers[question]}
                onChange={(e) => {
                  setSignUpAnswers({
                    ...signUpAnswers,
                    [question]: e.target.value,
                  })
                  console.log(signUpAnswers)
                }}
                label="Answer"
              >
                <MenuItem value={signUpQuestions[question][1][0]}>
                  {signUpQuestions[question][1][0]}
                </MenuItem>
                <MenuItem value={signUpQuestions[question][1][1]}>
                  {signUpQuestions[question][1][1]}
                </MenuItem>
              </Select>
            </FormControl>
          )
        })}
        {error !== '' && <p>{error}</p>}
        <Button variant="outlined" color="primary" type="submit" id="mgt">
          Sign up!
        </Button>
      </form>
    </div>
  )
})

const mapDispatch = (dispatch) => ({
  register: (user, answers) => dispatch(setUser(user, answers)),
})

export default connect(null, mapDispatch)(SignUpForm)
