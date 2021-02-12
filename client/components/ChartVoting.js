/* eslint-disable complexity */
import React, {Component} from 'react'
import {connect} from 'react-redux'

import './styles/ChartVoting.css'
import {updateVoteThunk} from '../store/vidit'
import {updateAnsweredThunk} from '../store/user'
import firebase from '../../public/firebase'
const db = firebase.firestore()

import LoadingScreen from './LoadingScreen'
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
  TextField,
} from '@material-ui/core'

class ChartVoting extends Component {
  constructor() {
    super()
    this.state = {
      question: '',
      choices: {},
      type: '',
      loading: true,
      multiple: '',
      numberOpen: -1,
      stringOpen: '',
      range: -1,
      units: '',
      max: 0,
      dataType: '',
      rangeLabel1: '',
      rangeLabel5: '',
      rangeLabel10: '',
      masterLabel: '',
      answered: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    window.scrollTo(0, 0)
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
    voteBtn.disabled = true
  }

  handleSubmit(e) {
    e.preventDefault()

    const thankYou = document.getElementById('thankYou')
    const fullDiv = document.getElementById('chartVotingFull')
    const mainDiv = document.getElementById('chartVoting')
    const voteBtn = document.getElementById('submitBtnVote')
    thankYou.className = 'tyReveal'
    mainDiv.className = 'chartVotingFade'
    fullDiv.className = 'chartVotingFade'
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
      answer = this.state.stringOpen
    }

    function clearDivs() {
      mainDiv.remove()
      fullDiv.remove()
    }

    setTimeout(() => clearDivs(), 2150)
    setTimeout(() => updateViditStore(pollKey, answer, userKey), 3100)
    setTimeout(() => updateUserStore(pollKey, userKey), 3100)
  }

  async handleChange(e) {
    console.log('slide on change -->', e.target)
    await this.setState({
      [e.target.name]: e.target.value,
    })
    const voteBtn = document.getElementById('submitBtnVote')
    if (
      this.state.multiple === '' &&
      (Number(this.state.numberOpen) < 0 ||
        this.state.numberOpen === '' ||
        Number(this.state.numberOpen) > Number(this.state.max)) &&
      this.state.stringOpen === '' &&
      (Number(this.state.range) < 1 ||
        this.state.range === '' ||
        Number(this.state.range) > 10)
    ) {
      this.setState({answered: false})
      // voteBtn.disabled = true
      // voteBtn.className = 'submitBtnVoteDisabled'
    } else {
      this.setState({answered: true})
      // voteBtn.disabled = false
      // voteBtn.className = 'submitBtnVoteEnabled'
    }
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
      <div id="chartVotingFull" className="visable">
        <div id="chartVoting" className="visable">
          <div id="formDivVote">
            <form id="formVote" onSubmit={this.handleSubmit}>
              <label id="votequestion" htmlFor=" Question at hand">
                {question}
              </label>
              {type.includes('Multiple') && (
                <FormControl>
                  <RadioGroup
                    value={this.state.multiple}
                    onChange={this.handleChange}
                    name="multiple"
                  >
                    {Object.keys(choices).map((choice) => (
                      <FormControlLabel
                        key={choice}
                        value={choices[choice]}
                        control={<Radio color="primary" />}
                        label={choices[choice]}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
              {type === 'Range' && (
                <div id="rangeFull">
                  {masterLabel !== undefined ? (
                    <p>{masterLabel}</p>
                  ) : (
                    <p>1 - 10</p>
                  )}
                  <div id="rangeInputBox">
                    <Slider
                      id="mui-slider"
                      defaultValue={0}
                      getAriaValueText={(value) => `${value}`}
                      aria-labelledby="discrete-slider-custom"
                      valueLabelDisplay="auto"
                      step={1}
                      marks={[
                        {value: 1, label: rangeLabel1 ? rangeLabel1 : '1'},
                        {
                          value: 5,
                          label: rangeLabel5
                            ? rangeLabel5
                            : masterLabel
                            ? masterLabel
                            : '5',
                        },
                        {value: 10, label: rangeLabel10 ? rangeLabel10 : '10'},
                      ]}
                      // value={this.state.range}
                      min={0}
                      max={10}
                      onChange={this.handleChange}
                      name="range"
                    />
                  </div>
                  {masterLabel !== undefined && <p>1 - 10</p>}
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
              {this.state.answered ? (
                <Button
                  variant="outlined"
                  color="primary"
                  type="submit"
                  id="submitBtnVote"
                  className="submitBtnVoteDisabled"
                >
                  VOTE
                </Button>
              ) : (
                <Button
                  disabled
                  variant="outlined"
                  color="primary"
                  type="submit"
                  id="submitBtnVote"
                  className="submitBtnVoteDisabled"
                >
                  VOTE
                </Button>
              )}
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
