import React, {Component} from 'react'
import * as d3 from 'd3'

class PieChart extends Component {
  constructor() {
    super()
    this.state = {
      chartData: [
        {
          name: 'Summer',
          value: 60,
        },
        {
          name: 'Winter',
          value: 34,
        },
      ],
      colors: [d3.rgb(226, 138, 138), d3.rgb(116, 176, 228)],
    }
    this.createPieChart = this.createPieChart.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.resetFilter = this.resetFilter.bind(this)
  }

  componentDidMount() {
    this.createPieChart()
  }

  componentDidUpdate() {
    this.createPieChart()
  }

  createPieChart() {
    const data = this.state.chartData

    const svg = d3.select('svg'),
      width = svg.attr('width'),
      height = svg.attr('height')

    const radius = 200
    const g = svg
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`)

    const color = d3.scaleOrdinal(this.state.colors)

    const pie = d3
      .pie()
      .sort(null)
      .value((d) => d.value)

    const path = d3.arc().outerRadius(radius).innerRadius(110)

    const label = d3
      .arc()
      .outerRadius(radius)
      .innerRadius(radius - 90)

    const pies = g
      .selectAll('.arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc')

    pies
      .append('path')
      .attr('d', path)
      .attr('fill', (d) => color(d.data.value))

    pies
      .append('text')
      .attr('transform', function (d) {
        d.innerRadius = 0
        d.outerRadius = radius
        return `translate(${label.centroid(d)})`
      })
      .attr('text-anchor', 'middle')
      .text((d) => d.data.name)
  }

  handleClick() {
    this.setState({
      chartData: [
        {
          name: 'Summer (R)',
          value: 48,
        },
        {
          name: 'Summer (L)',
          value: 12,
        },
        {
          name: 'Winter (R)',
          value: 33,
        },
        {
          name: 'Winter (L)',
          value: 1,
        },
      ],
      colors: [
        d3.rgb(226, 138, 138),
        d3.rgb(226, 75, 75),
        d3.rgb(116, 176, 228),
        d3.rgb(38, 140, 229),
      ],
    })
  }

  resetFilter() {
    this.setState({
      chartData: [
        {
          name: 'Summer',
          value: 60,
        },
        {
          name: 'Winter',
          value: 34,
        },
      ],
      colors: [d3.rgb(226, 138, 138), d3.rgb(116, 176, 228)],
    })
  }

  render() {
    return (
      <div id="testChart">
        <svg width="400" height="400"></svg>
        <br></br>
        <br></br>
        <button type="button" onClick={this.handleClick}>
          Filter by right/left hand
        </button>
        <br></br>
        <br></br>
        <button type="button" onClick={this.resetFilter}>
          Reset Filter
        </button>
      </div>
    )
  }
}

export default PieChart
