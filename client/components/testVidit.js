import React from 'react'
import BarChart from './BarChart'
import PieChart from './PieChart'

import firebase from '../../public/firebase'

const db = firebase.firestore()

// db.collection('users')
//   .doc('Qcnh71oMAUn89QMyLq28')
//   .onSnapshot((doc) => console.log('Current data: ', doc.data()))

const testVidit = () => {
  return (
    <div>
      <h1>Test Vidit</h1>
      {/* <BarChart data={[2, 4, 6, 8]} size={[500, 500]} /> */}
      <PieChart size={{width: 500, height: 500}} />
    </div>
  )
}

export default testVidit
