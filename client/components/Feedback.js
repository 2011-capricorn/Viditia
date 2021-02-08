import React, {useState} from 'react'
import {Button, TextField} from '@material-ui/core'

import './styles/Feedback.css'

import firebase from '../../public/firebase'
const db = firebase.firestore()

const Feedback = () => {
  const [name, setName] = useState('')
  const [feedback, setFeedback] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    db.collection('feedback').add({
      name: name === '' ? 'Anonymous' : name,
      feedback,
    })
    setName('')
    setFeedback('')
    setSubmitted(true)
  }

  return (
    <div className="feedback-container shadow">
      {submitted ? (
        <h1>Thank you for the feedback! Feel free to leave another one!</h1>
      ) : (
        <div>
          <h1>Feedback</h1>
          <p>
            Team Viditia would like to thank you for taking the time to beta
            test our web application.
          </p>
          <p>
            We would love to hear any question, comments, or concerns you may
            have about your experience here.
          </p>
          <p>
            Please complete and submit the form below. Note that you may opt out
            from entering a name.
          </p>
          <p>Thank you and stay fresh, cheese bags.</p>
        </div>
      )}
      <br />
      <form onSubmit={handleSubmit} className="feedback-input">
        <TextField
          label="Name"
          variant="outlined"
          fullWidth={true}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <TextField
          label="Feedback"
          multiline
          required
          rows={4}
          variant="outlined"
          fullWidth={true}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <br />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  )
}

export default Feedback
