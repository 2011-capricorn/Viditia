import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'

import {addViditThunk} from '../store/vidit'
import {addCreated} from '../store/user'

// eslint-disable-next-line complexity
const CreateVidit = ({userKey, addNewVidit, addUserCreated, history}) => {
  const [question, setQuestion] = useState('')
  const [type, setType] = useState('')
  const [masterLabel, setMasterLabel] = useState('')
  const [openMaxValue, setOpenMaxValue] = useState(0)
  const [units, setUnits] = useState('')
  const [rangeDescription, setRangeDescription] = useState(false)
  const [rangeLabel1, setRangeLabel1] = useState('') // rangeLabel1
  const [rangeLabel5, setRangeLabel5] = useState('') // rangeLabel10
  const [rangeLabel10, setRangeLabel10] = useState('') // rangeLabel5
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
    const split = type.split(' ')
    const returnType =
      split[0] === 'Multiple' && split[1] > 2 ? 'Multiple +' : type
    const returnValue = {question, type: returnType, answers: []}
    let pollKey = ''
    if (type === 'Open') {
      pollKey =
        dataType === 'String'
          ? await addNewVidit({...returnValue, dataType}, userKey)
          : await addNewVidit(
              {...returnValue, dataType, max: openMaxValue, units},
              userKey
            )
    } else if (type === 'Range')
      pollKey = await addNewVidit({...returnValue}, userKey)
    else if (returnType === 'Multiple +')
      pollKey = await addNewVidit(
        {...returnValue, choices, masterLabel},
        userKey
      )
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

  console.log(1111, rangeLabel1, rangeLabel10, rangeLabel5)

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
          <p>
            Range questions are only 1-10. Need more? Use a Free Response type!
          </p>
          <FormControl>
            <p>Is your question measured in quantity or spectrum?</p>
            <RadioGroup
              row
              value={rangeDescription}
              onChange={(e) => {
                const value = e.target.value === 'true'
                setRangeDescription(value)
              }}
            >
              <FormControlLabel
                value={true}
                control={<Radio color="primary" />}
                label="Spectrum"
              />
              <FormControlLabel
                value={false}
                control={<Radio color="primary" />}
                label="Quantity"
              />
            </RadioGroup>
          </FormControl>
        </div>
      )}

      {type === 'Range' && rangeDescription && (
        <div>
          <TextField
            fullWidth={true}
            required
            label="1 describes.."
            value={rangeLabel1}
            onChange={(e) => setRangeLabel1(e.target.value)}
          />
          <TextField
            fullWidth={true}
            label="(Optional) 5 describes.."
            value={rangeLabel5}
            onChange={(e) => setRangeLabel5(e.target.value)}
          />
          <TextField
            fullWidth={true}
            required
            label="10 describes.."
            value={rangeLabel10}
            onChange={(e) => setRangeLabel10(e.target.value)}
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

      {dataType === 'Number' && (
        <div>
          <p>*Graphs are better with a thoughtful max!*</p>
          <TextField
            fullWidth={true}
            required
            label="What is the maximum value?"
            value={openMaxValue}
            min={0}
            type="number"
            onChange={(e) => setOpenMaxValue(e.target.value)}
          />
          <TextField
            fullWidth={true}
            required
            label="Graph x axis unit"
            value={units}
            onChange={(e) => setUnits(e.target.value)}
          />
        </div>
      )}

      {(type === 'Multiple 3' || type === 'Multiple 4') && (
        <div>
          <TextField
            fullWidth={true}
            required
            label="How would you describe the choices in one word?"
            value={masterLabel}
            onChange={(e) => setMasterLabel(e.target.value)}
          />
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
