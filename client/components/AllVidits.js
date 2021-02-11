import React, {Component} from 'react'
import {connect} from 'react-redux'

import './styles/AllVidits.css'
import {getAllViditThunk} from '../store/vidit.js'
import ViditCard from './ViditCard'

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
      <div id="allViditFull">
        <div id="allViditContainer">
          {allVidit.map((vidit) => (
            <div key={vidit.pollKey} style={{width: '25%', margin: '2%'}}>
              {vidit.type === 'Multiple 2' ? (
                <ViditCard
                  question={vidit.question}
                  votes={vidit.totalVoteCount}
                  imageUrl={`/dummyPieChart${Math.floor(
                    Math.random() * 3
                  )}.png`}
                  pollKey={vidit.pollKey}
                  history={this.props.history}
                />
              ) : vidit.type === 'Range' || vidit.type === 'Multiple +' ? (
                <ViditCard
                  question={vidit.question}
                  votes={vidit.totalVoteCount}
                  imageUrl={`/dummyBarChart${Math.floor(
                    Math.random() * 3
                  )}.png`}
                  pollKey={vidit.pollKey}
                  history={this.props.history}
                />
              ) : vidit.type === 'Open' && vidit.dataType === 'Number' ? (
                <ViditCard
                  question={vidit.question}
                  votes={vidit.totalVoteCount}
                  imageUrl={`/dummyLineChart${Math.floor(
                    Math.random() * 3
                  )}.png`}
                  pollKey={vidit.pollKey}
                  history={this.props.history}
                />
              ) : (
                <ViditCard
                  question={vidit.question}
                  votes={vidit.totalVoteCount}
                  imageUrl={`/dummyTreeMap${Math.floor(Math.random() * 3)}.png`}
                  pollKey={vidit.pollKey}
                  history={this.props.history}
                />
              )}
            </div>
          ))}
        </div>
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
