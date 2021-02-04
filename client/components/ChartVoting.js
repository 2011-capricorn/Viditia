import React, {Component} from 'react'
import * as d3 from 'd3'
import firebase from '../../public/firebase'

import './styles/ChartVoting.css'
import {connect} from 'react-redux'
import {updateVoteThunk} from '../store/vidit'
import {updateAnsweredThunk} from '../store/user'
const db = firebase.firestore()
//FUNCTIONS
//HandleSubmit

//What we need to Render
//Poll Question
//Poll Choices
//Voting Button
//Click Handler
//Visual Graph

class ChartVoting extends Component {
  constructor() {
    super()
    this.state = {
      question: '',
      choices: {},
      type: '',
      loading: true,
      answer: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    const {question, choices, type} = (
      await db.collection('polls').doc(this.props.pollKey).get()
    ).data()

    this.setState({question, choices, type, loading: false})
  }

  handleSubmit(e) {
    e.preventDefault()
    const {pollKey, userKey, updateViditStore, updateUserStore} = this.props
    const {answer} = this.state
    updateViditStore(pollKey, answer, userKey)
    updateUserStore(pollKey, userKey)
  }

  async handleChange(e) {
    await this.setState({
      answer: e.target.value,
    })
  }

  render() {
    const {question, choices, type, loading, answer} = this.state
    const {pollKey} = this.props

    return !loading ? (
      <div id="chartVoting" className="visable">
        <div id="formDiv">
          <form id="form" onSubmit={this.handleSubmit}>
            <label htmlFor=" Question at hand">{question}</label>
            {type === 'Multiple' &&
              Object.keys(choices).map((choice) => (
                <div key={choice}>
                  <input
                    type="radio"
                    name={pollKey}
                    value={choices[choice]}
                    onChange={this.handleChange}
                    checked={answer === choices[choice]}
                  />
                  <label htmlFor={pollKey}>{choices[choice]}</label>
                </div>
              ))}
            {type === 'Range' && <div>Range questions</div>}
            {type === 'Open' && <div>Open questions</div>}
            <br />
            <br />
            <br />
            <br />
            <button id="submitBtn" type="submit">
              VOTE
            </button>
          </form>
        </div>
      </div>
    ) : (
      <div>loading</div>
    )
  }
}

const mapState = ({user: {userKey}}) => ({
  userKey,
})

const mapDispatch = (dispatch) => ({
  updateViditStore: (pollKey, answer, userKey) =>
    dispatch(updateVoteThunk(pollKey, answer, userKey)),
  updateUserStore: (pollKey, userKey) =>
    dispatch(updateAnsweredThunk(pollKey, userKey)),
})

export default connect(mapState, mapDispatch)(ChartVoting)
