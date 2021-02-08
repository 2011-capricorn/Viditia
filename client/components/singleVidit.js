import React from 'react'
import {connect} from 'react-redux'

import BarChart from './BarChart'
import PieChart from './PieChart'
import LineChart from './LineChart'
import ChartVoting from './ChartVoting'
import './styles/SingleVidit.css'
import firebase from '../../public/firebase'
import LoadingScreen from './LoadingScreen'
const db = firebase.firestore()

const SingleVidit = (props) => {
  const {id} = props.match.params
  const data = props.allVidit.filter((vidit) => vidit.pollKey === id)[0]
  const userAnswered = props.answered.some((key) => key === data.pollKey)

  const renderChartVoting = () => {
    if (!userAnswered) return <ChartVoting pollKey={data.pollKey} />
  }

  const renderCharts = () => {
    if (userAnswered) {
      if (data.type === 'Multiple 2')
        return <PieChart size={[500, 500]} pollKey={id} />
      if (data.dataType === 'Number')
        return <LineChart pollKey={id} units={data.units} />
    }
  }

  return data ? (
    <div>
      <h1 id="SVTitle">{data.question}</h1>
      {renderChartVoting()}

      {renderCharts()}

      {/* userAnswered && data.type !== 'Multiple' && <BarChart data={[2, 4, 6, 8]} size={[500, 500]} /> */}
    </div>
  ) : (
    <LoadingScreen />
  )
}

const mapState = ({user: {answered}, vidit: {allVidit}}) => ({
  allVidit,
  answered,
})

export default connect(mapState)(SingleVidit)
