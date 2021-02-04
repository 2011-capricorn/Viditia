import React, {Component} from 'react'
import * as d3 from 'd3'
import firebase from '../../public/firebase'

import './styles/ChartVoting.css'
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
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {}
  handleSubmit(e) {
    e.preventDefault()
    console.log(99999, e)
  }

  async handleChange(e) {
    await this.setState({
      [e.target.name]: e.target.value,
    })
  }

  render() {
    return (
      <div id="chartVoting" className="visable">
        <div id="formDiv">
          <form id="form" onSubmit={this.handleSubmit}>
            <label htmlFor=" Question at hand">Question at hand</label>
            <br />
            <br />
            <br />
            <br />
            <input
              type="radio"
              name="question"
              value="Answer A"
              id="Answer A"
              onChange={this.handleChange}
              checked={this.state.question === 'Answer A'}
            />
            <label htmlFor="Answer A">Answer A</label>
            <br />
            <br />
            <br />
            <br />
            <input
              type="radio"
              name="question"
              value="Answer B"
              id="Answer B"
              onChange={this.handleChange}
              checked={this.state.question === 'Answer B'}
            />
            <label htmlFor="Answer B">Answer B</label>
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
    )
  }
}

export default ChartVoting
