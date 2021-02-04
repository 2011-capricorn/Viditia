import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'
import React from 'react'
import {useState, useEffect} from 'react'

export default function CreateVidit() {
  const [question, setQuestion] = useState('')
  const [type, setType] = useState('')
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(0)

  const [choices, setChoices] = useState({})
  useEffect(() => {
    const splitType = type.split(' ')
    const isMultiple = splitType[0] === 'Multiple'
    if (isMultiple) {
      if (splitType[1] === '2') setChoices({a: '', b: ''})
      if (splitType[1] === '3') setChoices({a: '', b: '', c: ''})
      if (splitType[1] === '4') setChoices({a: '', b: '', c: '', d: ''})
    }
  }, [type])

  console.log('choices -->', choices)
  console.log('choices keys -->', Object.keys(choices))

  // need a state for range type
  // min and max? anything else?

  // console.log('type -->', type)
  // console.log(type.length ? `split type --> ${type.split(' ')}` : 'No type yet' )

  console.log('min -->', min)
  console.log('max -->', max)

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
      {/* render choice inputs based off number of choices */}
      {choices !== {} &&
        Object.keys(choices).map((choice) => (
          <TextField
            key={choice}
            fullWidth={true}
            required
            label={choice.toUpperCase()}
            value={choices[choice]}
            onChange={(e) => setChoices({...choices, [choice]: e.target.value})}
          />
        ))}
      {type === 'Range' && (
        <div>
          <TextField
            fullWidth={true}
            required
            label="min"
            value={min}
            min={0}
            type="number"
            onChange={(e) => setMin(e.target.value)}
          />
          <TextField
            fullWidth={true}
            required
            label="max"
            value={max}
            min={0}
            type="number"
            onChange={(e) => setMax(e.target.value)}
          />
        </div>
      )}
    </div>
  )
}
