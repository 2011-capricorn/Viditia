import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'

import ConfirmPassword from './ConfirmPassword'
import {signUpThunk} from '../store/user'
import './styles/SignUpForm.css'

const SignUpForm = ({register, history}) => {
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
    Scenery: ['Beach or mountains?', ['Beach', 'Mountains']],
    Travel: ['Do you like to travel?', ['Yes', 'No']],
    Food: ['Cheeseburger or hotdog?', ['Cheeseburger', 'Hotdog']],
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

  const proceedRegister = async () => {
    if (!error) setError(await register(email, password, signUpAnswers))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
    } else if (checkAnswers()) {
      setError('Please answer all the questions!')
    }

    proceedRegister()
  }

  useEffect(() => {
    if (error === undefined) history.push('/vidits')
  }, [error])

  return (
    <div className="flex jcc aic signup-container">
      <h1 className="tac">Welcome to Viditia!</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            required
            fullWidth={true}
            variant="outlined"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <ConfirmPassword
            title1="Password"
            title2="Confirm Password"
            password={password}
            confirmPassword={confirmPassword}
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
            setShowPassword={setShowPassword}
            setShowConfirmPassword={setShowConfirmPassword}
          />
        </div>

        <Divider style={{margin: '20px'}} />

        <div>
          <h2 className="tac" style={{margin: 0}}>
            Tell us a little about yourself!
          </h2>

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
        </div>
        {error !== '' && (
          <p className="tac" style={{marginBottom: 0}}>
            {error}
          </p>
        )}
        <Button variant="contained" color="primary" type="submit" id="mgt">
          Sign up!
        </Button>
      </form>
    </div>
  )
}

const mapDispatch = (dispatch) => ({
  register: (email, password, answers) =>
    dispatch(signUpThunk(email, password, answers)),
})

export default connect(null, mapDispatch)(SignUpForm)
