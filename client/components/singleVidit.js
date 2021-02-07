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

// db.collection('users')
//   .doc('Qcnh71oMAUn89QMyLq28')
//   .onSnapshot((doc) => console.log('Current data: ', doc.data()))

const SingleVidit = (props) => {
  // console.log(1111, props.match.params)
  const {id} = props.match.params
  const data = props.allVidit.filter((vidit) => vidit.pollKey === id)[0]
  const userAnswered = props.answered.some((key) => key === data.pollKey)
  return data ? (
    <div>
      <h1 id="SVTitle">{data.question}</h1>
      {!userAnswered && data.type === 'Multiple' && (
        <ChartVoting pollKey={data.pollKey} />
      )}

      {data.type === 'Multiple' && <PieChart size={[500, 500]} pollKey={id} />}

      {data.type === 'Open' && data.dataType === 'Number' && (
        <LineChart pollKey={id} units={data.units} />
      )}

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
