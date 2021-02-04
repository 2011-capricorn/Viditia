import React from 'react'
import BarChart from './BarChart'
import PieChart from './PieChart'

import firebase from '../../public/firebase'
import './styles/SingleVidit.css'

const db = firebase.firestore()

// db.collection('users')
//   .doc('Qcnh71oMAUn89QMyLq28')
//   .onSnapshot((doc) => console.log('Current data: ', doc.data()))

const singleVidit = () => {
  return (
    <div>
      <h1 id="title">Single Vidit</h1>
      {/* <BarChart data={[2, 4, 6, 8]} size={[500, 500]} /> */}
      <PieChart size={[500, 500]} />
    </div>
  )
}

export default singleVidit
