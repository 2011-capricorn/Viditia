import React, {Component} from 'react'

import './styles/LoadingScreen.css'

const LoadingScreen = (props) => {
  return (
    <div id="full">
      <div>
        <h1 id="loading">Loading...</h1>
        <div id="master">
          <img src="/dummyPieChart.png" className="dcredblue" />
          <img src="/capitalV.png" className="v" />
          <img src="/donutGreenPurple.png" className="dcgreenpurple" />
          <img src="/donutYellowPink.png" className="dcyellowpink" />
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
