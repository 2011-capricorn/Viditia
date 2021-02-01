import React, {Component} from 'react'
import * as d3 from 'd3'

class PieChart extends Component {
  constructor() {
    super()
    this.createPieChart = this.createPieChart.bind(this)
    // this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.createPieChart()
  }

  componentDidUpdate() {
    this.createPieChart()
  }

  createPieChart() {
    let width = this.props.size[0]
    let height = this.props.size[1]
    let data = [
      {value: 60, name: 'summer'},
      {value: 34, name: 'winter'},
    ]
    let color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.name))
      .range(
        d3
          .quantize((t) => d3.interpolateSpectral(t * 0.8 + 0.1), data.length)
          .reverse()
      )
    let pie = d3
      .pie()
      .padAngle(0.005)
      .sort(null)
      .value((d) => d.value)

    const arc = () => {
      const radius = Math.min(width, height) / 2
      return d3
        .arc()
        .innerRadius(radius * 0.1)
        .outerRadius(radius * 0.1)
    }

    const arcs = pie(data)

    const svg = d3
      .select('svg')
      .attr('viewBox', [-width / 2, -height / 2, width, height])

    svg
      .selectAll('path')
      .data(arcs)
      .join('path')
      .attr('fill', (d) => color(d.data.name))
      .attr('d', arc())
      .append('title')
      .text((d) => `${d.data.name}: ${d.data.value.toLocaleString()}`)

    svg
      .append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 12)
      .attr('text-anchor', 'middle')
      .selectAll('text')
      .data(arcs)
      .join('text')
      .attr('transform', (d) => `translate(${arc().centroid(d)})`)
      .call((text) =>
        text
          .append('tspan')
          .attr('y', '-0.4em')
          .attr('font-weight', 'bold')
          .text((d) => d.data.name)
      )
      .call((text) =>
        text
          .filter((d) => d.endAngle - d.startAngle > 0.25)
          .append('tspan')
          .attr('x', 0)
          .attr('y', '0.7em')
          .attr('fill-opacity', 0.7)
          .text((d) => d.data.value.toLocaleString())
      )
  }

  // createPieChart() {
  //   // set the dimensions and margins of the graph
  //   let width = this.props.size[0],
  //     height = this.props.size[1],
  //     margin = 40

  //   // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
  //   let radius = Math.min(width, height) / 2 - margin

  //   // append the svg object to the div called 'my_dataviz'
  //   const chart = d3
  //     .select('svg')
  //     .attr('width', width)
  //     .attr('height', height)
  //     .append('g')
  //     .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

  //   // Create dummy data
  //   let data = {a: 60, b: 34}

  //   let ref = {
  //     a: 'summer',
  //     b: 'winter',
  //   }

  //   let colorRange = ['#0000ff', '#ff0000']

  //   // set the color scale
  //   let color = d3.scaleOrdinal().domain(data).range(colorRange)

  //   // Compute the position of each group on the pie:
  //   let pie = d3.pie().value(function (d) {
  //     return d.value
  //   })
  //   let data_ready = pie(d3.entries(data))
  //   // Now I know that group A goes from 0 degrees to x degrees and so on.

  //   // shape helper to build arcs:
  //   let arcGenerator = d3.arc().innerRadius(0).outerRadius(radius)

  //   // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  //   chart
  //     .selectAll('mySlices')
  //     .data(data_ready)
  //     .enter()
  //     .append('path')
  //     .attr('d', arcGenerator)
  //     .attr('fill', function (d) {
  //       return color(d.data.key)
  //     })
  //     .attr('stroke', 'black')
  //     .style('stroke-width', '2px')
  //     .style('opacity', 0.7)

  //   // Now add the annotation. Use the centroid method to get the best coordinates
  //   chart
  //     .selectAll('mySlices')
  //     .data(data_ready)
  //     .enter()
  //     .append('text')
  //     .text(function (d) {
  //       return `${
  //         ref[d.data.key]
  //       } ${Math.round(((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100)}%`
  //     })
  //     .attr('transform', function (d) {
  //       return 'translate(' + arcGenerator.centroid(d) + ')'
  //     })
  //     .style('text-anchor', 'middle')
  //     .style('font-size', 17)
  // }

  // handleClick() {
  //   d3.select('svg').remove()
  //   d3.select('div').append('svg')

  //   // console.log('button clicked');
  //   let width = 600,
  //     height = 600,
  //     margin = 40

  //   let radius = Math.min(width, height) / 2 - margin

  //   let svg = d3
  //     .select('svg')
  //     .attr('width', width)
  //     .attr('height', height)
  //     .append('g')
  //     .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

  //   let data = {a: 60, b: 34}
  //   data.a = 48
  //   data.b = 33
  //   data.c = 12
  //   data.d = 1
  //   let ref = {
  //     a: 'summer',
  //     b: 'winter',
  //   }

  //   ref.a = 'summer (right handed)'
  //   ref.b = 'winter (right handed)'
  //   ref.c = 'summer (left handed)'
  //   ref.d = 'winter (left handed)'

  //   let colorRange = ['#0000ff', '#ff0000', '#00ff00', '#ffff00']

  //   let color = d3.scaleOrdinal().domain(data).range(colorRange)

  //   let pie = d3.pie().value(function (d) {
  //     return d.value
  //   })
  //   let data_ready = pie(d3.entries(data))

  //   let arcGenerator = d3.arc().innerRadius(0).outerRadius(radius)

  //   svg
  //     .selectAll('mySlices')
  //     .data(data_ready)
  //     .enter()
  //     .append('path')
  //     .attr('d', arcGenerator)
  //     .attr('fill', function (d) {
  //       return color(d.data.key)
  //     })
  //     .attr('stroke', 'black')
  //     .style('stroke-width', '2px')
  //     .style('opacity', 0.7)

  //   svg
  //     .selectAll('mySlices')
  //     .data(data_ready)
  //     .enter()
  //     .append('text')
  //     .text(function (d) {
  //       return `${
  //         ref[d.data.key]
  //       } ${Math.round(((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100)}%`
  //     })
  //     .attr('transform', function (d) {
  //       return 'translate(' + arcGenerator.centroid(d) + ')'
  //     })
  //     .style('text-anchor', 'middle')
  //     .style('font-size', 17)
  // }

  render() {
    return (
      <div>
        <svg
          ref={(node) => {
            this.node = node
            return this.node
          }}
        >
          width={this.props.size[0]}
          height={this.props.size[1]}
        </svg>
        <button type="button" onClick={this.handleClick}>
          Filter by right/left hand
        </button>
      </div>
    )
  }
}

export default PieChart
