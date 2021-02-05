import React from 'react'
import BarChart from './BarChart'
import PieChart from './PieChart'
import ChartVoting from './ChartVoting'
import firebase from '../../public/firebase'
import './styles/SingleVidit.css'

import {connect} from 'react-redux'

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
      <h1 id="title">Single Vidit</h1>
      {!userAnswered && <ChartVoting pollKey={data.pollKey} />}
      {userAnswered && data.type === 'Multiple' && <PieChart pollKey={id} />}
      {/* userAnswered && data.type !== 'Multiple' && <BarChart data={[2, 4, 6, 8]} size={[500, 500]} /> */}
    </div>
  ) : (
    <div>loading</div>
  )
}

const mapState = ({user: {answered}, vidit: {allVidit}}) => ({
  allVidit,
  answered,
})

export default connect(mapState)(SingleVidit)
