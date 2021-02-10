import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import BarChart from './BarChart'
import PieChart from './PieChart'
import LineChart from './LineChart'
import TreeMap from './TreeMap'
import ChartVoting from './ChartVoting'
import './styles/SingleVidit.css'
import LoadingScreen from './LoadingScreen'

// eslint-disable-next-line complexity
const SingleVidit = (props) => {
  const [loading, setLoading] = useState(true)
  const {id} = props.match.params
  let data
  let userAnswered

  useEffect(() => {
    try {
      data = props.allVidit.filter((vidit) => vidit.pollKey === id)[0]
      userAnswered = props.answered.some((key) => key === data.pollKey)
      setLoading(false)
    } catch (error) {
      setLoading(true)
    }
  }, [])

  console.log('singleVidit loading -->', loading)

  return !loading ? (
    <div>
      <h1 id="SVTitle">{data.question}</h1>
      {!userAnswered && <ChartVoting pollKey={id} />}
      {data.type === 'Multiple 2' && (
        <PieChart size={[500, 500]} pollKey={id} />
      )}
      {(data.type === 'Multiple +' || data.type === 'Range') && (
        <BarChart
          pollKey={id}
          rangeLabel1={data.rangeLabel1}
          rangeLabel5={data.rangeLabel5}
          rangeLabel10={data.rangeLabel10}
          masterLabel={data.masterLabel}
          type={data.type}
          choices={data.choices}
        />
      )}
      {data.type === 'Open' && data.dataType === 'Number' && (
        <LineChart pollKey={id} units={data.units} />
      )}
      {data.type === 'Open' && data.dataType === 'String' && (
        <TreeMap pollKey={id} />
      )}
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
