import React, {Component} from 'react'
import * as d3 from 'd3'

class PieChart extends Component {
  constructor(props) {
    super(props)
    this.createPieChart = this.createPieChart.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  createPieChart() {}

  handleClick() {}

  componentDidMount() {
    this.createPieChart()
  }

  componentDidUpdate() {
    this.createPieChart()
  }
  render() {
    return <div id="my_dataviz"></div>
  }
}

export default PieChart
