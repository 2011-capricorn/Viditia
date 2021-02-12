import React, {Component} from 'react'

import './styles/Landing.css'

class Landing extends Component {
  constructor() {
    super()
    this.state = {
      visited: 'False',
    }
  }

  componentDidMount() {
    setTimeout(() => localStorage.setItem('Viditia', 'True'), 3000)
    setTimeout(
      () =>
        this.setState({
          visited: 'True',
        }),
      2650
    )
  }

  render() {
    const visitedStorage = localStorage.getItem('Viditia')
    return this.state.visited !== 'True' && visitedStorage !== 'True' ? (
      <div id="landingmaster">
        <div id="fulllanding">
          <div id="middlelanding">
            <h1 id="landingtitle">
              Viditia<div id="blocker"></div>
            </h1>
            <div id="masterLanding">
              <img src="/dummyPieChart0.png" className="dcredbluelanding" />
              <img src="/capitalV.png" className="vlanding" />
              <img src="/dummyPieChart2.png" className="dcgreenpurplelanding" />
              <img src="/dummyPieChart1.png" className="dcyellowpinklanding" />
            </div>
          </div>
        </div>
      </div>
    ) : (
      false
    )
  }
}

export default Landing
