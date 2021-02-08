import React, {Component} from 'react'
import {connect} from 'react-redux'

import './styles/ChartVoting.css'
import {updateVoteThunk} from '../store/vidit'
import {updateAnsweredThunk} from '../store/user'
import firebase from '../../public/firebase'
const db = firebase.firestore()

import LoadingScreen from './LoadingScreen'

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
    const voteBtn = document.getElementById('submitBtnVote')
    voteBtn.disabled = false
  }

  handleSubmit(e) {
    e.preventDefault()

    const thankYou = document.getElementById('thankYou')
    const mainDiv = document.getElementById('chartVoting')
    const voteBtn = document.getElementById('submitBtnVote')
    thankYou.className = 'tyReveal'
    mainDiv.className = 'chartVotingFade'
    voteBtn.className = 'submitBtnVoteHidden'
    voteBtn.disabled = true
    const {pollKey, userKey, updateViditStore, updateUserStore} = this.props
    const {answer} = this.state
    setTimeout(() => updateViditStore(pollKey, answer, userKey), 3100)
    setTimeout(() => updateUserStore(pollKey, userKey), 3100)
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
        <div id="formDivVote">
          <form id="formVote" onSubmit={this.handleSubmit}>
            <label id="votequestion" htmlFor=" Question at hand">
              {question}
            </label>
            {type === 'Multiple 2' &&
              Object.keys(choices).map((choice) => (
                <div key={choice}>
                  <input
                    type="radio"
                    name={pollKey}
                    value={choices[choice]}
                    onChange={this.handleChange}
                    checked={answer === choices[choice]}
                    className="radioButtonVote"
                  />
                  <label htmlFor={pollKey} className="radioLabelVote">
                    {choices[choice]}
                  </label>
                </div>
              ))}
            {type === 'Range' && <div>Range questions</div>}
            {type === 'Open' && <div>Open questions</div>}
            <br />
            <br />
            <br />
            <br />
            <button id="submitBtnVote" type="submit">
              VOTE
            </button>
            <h3 id="thankYou" className="tyHidden">
              Thank you for voting!
            </h3>
          </form>
        </div>
      </div>
    ) : (
      <LoadingScreen />
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
