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
            <div key={vidit.pollKey} id="SVCardMasterMaster">
              {vidit.type === 'Multiple 2' ? (
                <ViditCard
                  question={vidit.question}
                  votes={vidit.totalVoteCount}
                  imageUrl="/donutChartIcon.png"
                  pollKey={vidit.pollKey}
                  history={this.props.history}
                  chartType="Donut Chart"
                />
              ) : vidit.type === 'Range' || vidit.type === 'Multiple +' ? (
                <ViditCard
                  question={vidit.question}
                  votes={vidit.totalVoteCount}
                  imageUrl="/barChartIcon.png"
                  pollKey={vidit.pollKey}
                  history={this.props.history}
                  chartType="Bar Chart"
                />
              ) : vidit.type === 'Open' && vidit.dataType === 'Number' ? (
                <ViditCard
                  question={vidit.question}
                  votes={vidit.totalVoteCount}
                  imageUrl="/lineChartIcon.png"
                  pollKey={vidit.pollKey}
                  history={this.props.history}
                  chartType="Line Chart"
                />
              ) : (
                <ViditCard
                  question={vidit.question}
                  votes={vidit.totalVoteCount}
                  imageUrl="/treeMapIcon.png"
                  pollKey={vidit.pollKey}
                  history={this.props.history}
                  chartType="Tree Map"
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
