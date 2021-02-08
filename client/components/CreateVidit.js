import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'

import {addViditThunk} from '../store/vidit'
import {addCreated} from '../store/user'

const CreateVidit = ({userKey, addNewVidit, addUserCreated, history}) => {
  const [question, setQuestion] = useState('')
  const [type, setType] = useState('')
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(0)
  const [dataType, setDataType] = useState('String')
  const [error, setError] = useState('')

  const [choices, setChoices] = useState({})
  useEffect(() => {
    const splitType = type.split(' ')
    const isMultiple = splitType[0] === 'Multiple'
    if (isMultiple) {
      if (splitType[1] === '2') setChoices({a: '', b: ''})
      if (splitType[1] === '3') setChoices({a: '', b: '', c: ''})
      if (splitType[1] === '4') setChoices({a: '', b: '', c: '', d: ''})
    } else {
      setChoices({})
    }
  }, [type])

  const checkField = (field, name) => {
    if (field.length) return false
    setError(`${name} cannot be empty!`)
    return true
  }

  const checkRange = () => {
    if (max <= min) {
      setError('Max cannot be less than min!')
      return true
    }
    return false
  }

  const checkChoices = () => {
    for (let key in choices) {
      if (choices[key] === '') {
        setError('Choices cannot be empty!')
        return true
      }
    }
    return false
  }

  const getReturnValue = async () => {
    const returnValue = {question, type, answers: []}
    let pollKey = ''
    if (type === 'Open')
      pollKey = await addNewVidit({...returnValue, dataType}, userKey)
    else if (type === 'Range')
      pollKey = await addNewVidit({...returnValue, min, max}, userKey)
    else pollKey = await addNewVidit({...returnValue, choices}, userKey)
    addUserCreated(pollKey)
    history.push('/vidits')
  }

  const handleSubmit = () => {
    setError('')
    let errorExists =
      checkField(question, 'Question') || checkField(type, 'Format')
    if (type === 'Range') errorExists = checkRange() || errorExists
    if (type.split(' ')[0] === 'Multiple')
      errorExists = checkChoices() || errorExists
    if (!errorExists) getReturnValue()
  }

  return (
    <div>
      <h1>Create Vidit!</h1>

      <FormControl fullWidth={true}>
        <p>Question:</p>
        <TextField
          required
          label="Enter a question..."
          variant="outlined"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </FormControl>
      <p>What type of question is this?</p>
      <FormControl fullWidth={true}>
        <InputLabel>Format:</InputLabel>
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <MenuItem value="Multiple 2">A-B</MenuItem>
          <MenuItem value="Multiple 3">A-B-C</MenuItem>
          <MenuItem value="Multiple 4">A-B-C-D</MenuItem>
          <MenuItem value="Range">Number Range</MenuItem>
          <MenuItem value="Open">Free Response</MenuItem>
        </Select>
      </FormControl>

      {Object.keys(choices).length !== 0 && (
        <div>
          <p>What are the choices?</p>
          {Object.keys(choices).map((choice) => (
            <TextField
              key={choice}
              fullWidth={true}
              required
              label={choice.toUpperCase()}
              value={choices[choice]}
              onChange={(e) =>
                setChoices({...choices, [choice]: e.target.value})
              }
            />
          ))}
        </div>
      )}

      {type === 'Range' && (
        <div>
          <p>What is the range?</p>
          <TextField
            fullWidth={true}
            required
            label="min"
            value={min}
            InputProps={{inputProps: {min: 0}}}
            type="number"
            onChange={(e) => setMin(e.target.value)}
          />
          <TextField
            fullWidth={true}
            required
            label="max"
            value={max}
            InputProps={{inputProps: {min: 0}}}
            type="number"
            onChange={(e) => setMax(e.target.value)}
          />
        </div>
      )}
      {type === 'Open' && (
        <div>
          <FormControl fullWidth={true}>
            <InputLabel>Data Type:</InputLabel>
            <Select
              value={dataType}
              onChange={(e) => setDataType(e.target.value)}
            >
              <MenuItem value="String">String</MenuItem>
              <MenuItem value="Number">Number</MenuItem>
            </Select>
          </FormControl>
        </div>
      )}
      {error.length > 0 && <p>{error}</p>}
      <Button onClick={handleSubmit} variant="outlined" color="primary">
        Submit
      </Button>
    </div>
  )
}

const mapState = ({user: {userKey}}) => ({
  userKey,
})

const mapDispatch = (dispatch) => ({
  addNewVidit: (vidit, userKey) => dispatch(addViditThunk(vidit, userKey)),
  addUserCreated: (pollKey) => dispatch(addCreated(pollKey)),
})

export default connect(mapState, mapDispatch)(CreateVidit)
