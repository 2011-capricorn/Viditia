import React, {Component} from 'react'
import firebase from '../../public/firebase'
import {getAllViditThunk} from '../store/vidit.js'
import {Link} from 'react-router-dom'

import './styles/AllVidits.css'

import {connect} from 'react-redux'

const db = firebase.firestore()

class AllVidits extends Component {
  constructor() {
    super()
    this.state = {}
  }

  async componentDidMount() {
    await this.props.getAllVidits()
  }

  render() {
    let {allVidit} = this.props.vidits
    return (
      <div id="allViditContainer">
        {allVidit.map((vidit) => (
          <div key={vidit.pollKey} className="singleVidit">
            <Link className="viditQuestion" to={`/vidit/${vidit.pollKey}`}>
              {vidit.question}
            </Link>
            <h6 className="viditVoteCount">{vidit.totalVoteCount} Votes</h6>
            {vidit.type === 'Multiple' ? (
              <Link to={`/vidit/${vidit.pollKey}`}>
                <img src="dummyPieChart.png" className="pieChartImg" />
              </Link>
            ) : vidit.type === 'Range' ? (
              <Link to={`/vidit/${vidit.pollKey}`}>
                <img src="dummyBarChart.png" className="barChartImg" />
              </Link>
            ) : (
              <Link to={`/vidit/${vidit.pollKey}`}>
                <img src="dummyLineChart.png" className="lineChartImg" />
              </Link>
            )}
          </div>
        ))}
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    vidits: state.vidit,
    users: state.user,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getAllVidits() {
      dispatch(getAllViditThunk())
    },
  }
}

export default connect(mapState, mapDispatch)(AllVidits)
