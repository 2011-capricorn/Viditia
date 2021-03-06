import React, {Component} from 'react'
import {connect} from 'react-redux'
import BarChart from './BarChart'
import PieChart from './PieChart'
import LineChart from './LineChart'
import TreeMap from './TreeMap'
import ChartVoting from './ChartVoting'
import './styles/SingleVidit.css'
import LoadingScreen from './LoadingScreen'

class SingleVidit extends Component {
  constructor() {
    super()
    this.state = {
      pollKey: '',
      loading: true,
      data: [],
      userAnswered: false,
    }
  }

  componentDidMount() {
    if (!this.props.isLoggedIn) this.props.history.push('/login')
    const pollKey = this.props.match.params.id
    const data = this.props.allVidit.filter(
      (vidit) => vidit.pollKey === pollKey
    )[0]
    const userAnswered = this.props.answered.some((key) => key === data.pollKey)

    this.setState({
      pollKey,
      data,
      userAnswered,
      loading: false,
    })
  }

  componentDidUpdate() {
    if (!this.props.isLoggedIn) this.props.history.push('/login')
  }

  renderChart(data, id) {
    if (data.type === 'Multiple 2') {
      return (
        <PieChart size={[500, 500]} pollKey={id} question={data.question} />
      )
    }
    if (data.type === 'Multiple +' || data.type === 'Range') {
      return (
        <BarChart
          pollKey={id}
          rangeLabel1={data.rangeLabel1}
          rangeLabel5={data.rangeLabel5}
          rangeLabel10={data.rangeLabel10}
          masterLabel={data.masterLabel}
          type={data.type}
          choices={data.choices}
          question={data.question}
        />
      )
    }
    if (data.type === 'Open' && data.dataType === 'Number') {
      return (
        <LineChart pollKey={id} units={data.units} question={data.question} />
      )
    }
    if (data.type === 'Open' && data.dataType === 'String') {
      return <TreeMap pollKey={id} question={data.question} />
    }
  }

  render() {
    let {pollKey: id, data, userAnswered, loading} = this.state
    return !loading ? (
      <div id="singleViditContainer">
        {/* <h1 id="SVTitle">{data.question}</h1> */}
        {!userAnswered && <ChartVoting pollKey={id} />}
        {this.renderChart(data, id)}
      </div>
    ) : (
      <LoadingScreen />
    )
  }
}

const mapState = ({user: {userKey, answered}, vidit: {allVidit}}) => ({
  isLoggedIn: !!userKey,
  allVidit,
  answered,
})
export default connect(mapState)(SingleVidit)
