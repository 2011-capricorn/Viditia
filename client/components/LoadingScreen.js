import React, {Component} from 'react'

import './styles/LoadingScreen.css'

const LoadingScreen = (props) => {
  return (
    <div id="fullloading">
      <div id="middleloading">
        <h1 id="loadingtitle">Loading...</h1>
        <div id="masterLoading">
          <img src="/dummyPieChart0.png" className="dcredblueloading" />
          <img src="/capitalV.png" className="vloading" />
          <img src="/dummyPieChart1.png" className="dcgreenpurpleloading" />
          <img src="/dummyPieChart2.png" className="dcyellowpinkloading" />
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
