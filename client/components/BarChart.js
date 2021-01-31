import React, {Component} from 'react'
import * as d3 from 'd3'

class BarChart extends Component {
  constructor(props) {
    super(props)
    this.createBarChart = this.createBarChart.bind(this)
  }

  componentDidMount() {
    this.createBarChart()
  }

  componentDidUpdate() {
    this.createBarChart()
  }

  createBarChart() {
    const node = this.node
    const dataMax = d3.max(this.props.data)

    // Scales the bars width
    const xScale = d3.scaleLinear().domain([0, this.props.size[0]])

    // Scales the bars height
    const yScale = d3
      .scaleBand()
      .domain([0, dataMax]) // 0 to the maximum value in our dataset
      .range([0, this.props.size[1]]) // Basically the size of the chart; 0 - width

    // node references the svg tag that this component returns
    d3.select(node)
      .selectAll('rect')
      .data(this.props.data)
      .enter()
      .append('rect')

    d3.select(node).selectAll('rect').data(this.props.data).exit().remove()

    // Create each bar
    d3.select(node)
      .selectAll('rect')
      .data(this.props.data)
      .style('fill', '#fe9922')
      .attr('x', (d, i) => i * 25)
      // .attr('y', d => this.props.size[1] — yScale(d))
      .attr('height', (d) => yScale(d))
      .attr('width', 25)
  }

  render() {
    return (
      <svg
        ref={(node) => {
          this.node = node
          return this.node
        }}
        width={this.props.size[0]}
        height={this.props.size[1]}
      ></svg>
    )
  }
}
export default BarChart
