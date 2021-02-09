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
      multiple: '',
      numberOpen: 0,
      stringOpen: '',
      units: '',
      max: 0,
      dataType: '',
      rangeLabel1: '',
      rangeLabel5: '',
      rangeLabel10: '',
      masterLabel: '',
      range: 1,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    const {
      question,
      choices,
      type,
      dataType,
      units,
      max,
      rangeLabel1,
      rangeLabel5,
      rangeLabel10,
      masterLabel,
    } = (await db.collection('polls').doc(this.props.pollKey).get()).data()

    this.setState({
      question,
      choices,
      type,
      loading: false,
      dataType,
      units,
      max,
      rangeLabel1,
      rangeLabel5,
      rangeLabel10,
      masterLabel,
    })
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
    let answer = null
    if (this.state.type.includes('Multiple')) {
      answer = this.state.multiple
    } else if (this.state.type === 'Range') {
      answer = this.state.range
    } else if (this.state.type === 'Open' && this.state.dataType === 'Number') {
      answer = this.state.numberOpen
    } else if (this.state.type === 'Open' && this.state.dataType === 'String') {
      answer = this.state.numberOpen
    }
    setTimeout(() => updateViditStore(pollKey, answer, userKey), 3100)
    setTimeout(() => updateUserStore(pollKey, userKey), 3100)
  }

  async handleChange(e) {
    await this.setState({
      [e.target.name]: e.target.value,
    })
  }

  render() {
    const {
      question,
      choices,
      type,
      loading,
      multiple,
      dataType,
      units,
      max,
      rangeLabel1,
      rangeLabel5,
      rangeLabel10,
      masterLabel,
    } = this.state
    const {pollKey} = this.props

    return !loading ? (
      <div id="chartVotingFull">
        <div id="chartVoting" className="visable">
          <div id="formDivVote">
            <form id="formVote" onSubmit={this.handleSubmit}>
              <label id="votequestion" htmlFor=" Question at hand">
                {question}
              </label>
              {type.includes('Multiple') &&
                Object.keys(choices).map((choice) => (
                  <div key={choice}>
                    <input
                      type="radio"
                      name="multiple"
                      value={choices[choice]}
                      onChange={this.handleChange}
                      checked={multiple === choices[choice]}
                      className="radioButtonVote"
                    />
                    <label htmlFor={pollKey} className="radioLabelVote">
                      {choices[choice]}
                    </label>
                  </div>
                ))}
              {type === 'Range' && (
                <div id="rangeFull">
                  {masterLabel !== undefined && <p>{masterLabel}</p>}
                  <div id="rangeInputBox">
                    {rangeLabel1 !== undefined && <p>{rangeLabel1}</p>}
                    <input
                      type="number"
                      min="1"
                      max="10"
                      name="range"
                      value={this.state.range}
                      onChange={this.handleChange}
                      id="rangeInput"
                    />
                    {rangeLabel10 !== undefined && <p>{rangeLabel10}</p>}
                  </div>
                  {rangeLabel5 !== undefined && <p>{rangeLabel5}</p>}
                </div>
              )}
              {type === 'Open' && dataType === 'Number' && (
                <div id="openNumberFull">
                  <div id="minMaxOpenNumber">
                    <p>Min-Max: 0 - {max}</p>
                  </div>
                  <div id="openNumberBox">
                    <input
                      type="number"
                      max={max}
                      min="0"
                      name="numberOpen"
                      value={this.state.numberOpen}
                      onChange={this.handleChange}
                      id="openNumberInput"
                    />
                    <label htmlFor="numberOpen" id="openNumberLabel">
                      {units}
                    </label>
                  </div>
                </div>
              )}
              {type === 'Open' && dataType === 'String' && (
                <div id="stringOpenContainer">
                  <input
                    type="text"
                    name="stringOpen"
                    value={this.state.stringOpen}
                    onChange={this.handleChange}
                    id="openStringInput"
                  />
                </div>
              )}
              <button id="submitBtnVote" type="submit">
                VOTE
              </button>
              <h3 id="thankYou" className="tyHidden">
                Thank you for voting!
              </h3>
            </form>
          </div>
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
