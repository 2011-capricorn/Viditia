import React, {Component} from 'react'
import * as d3 from 'd3'
import firebase from '../../public/firebase'

import './styles/PieChart.css'

const db = firebase.firestore()

const filterAB = {
  Hand: ['Right', 'Left'],
  Season: ['Summer', 'Winter'],
  Animal: ['Cat', 'Dog'],
  Drink: ['Coffee', 'Tea'],
  Scenery: ['Beach', 'Mountains'],
  Travel: ['Yes', 'No'],
  Food: ['Cheeseburger', 'Hotdog'],
  Artist: ['Beyonce', 'Black Sabbath'],
  Boolean: ['Yes', 'No'],
  Awake: ['Early Bird', 'Night Owl'],
}

class PieChart extends Component {
  constructor() {
    super()
    this.state = {
      chartData: [],
      chartDataA: [],
      chartDataB: [],
      reset: [],
      colors: [d3.rgb(226, 138, 138), d3.rgb(116, 176, 228)],
      users: [],
      doc: [],
      filter: 'Hand',
    }
    this.createMainPieChart = this.createMainPieChart.bind(this)
    this.createPieChartA = this.createPieChartA.bind(this)
    this.createPieChartB = this.createPieChartB.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.resetFilter = this.resetFilter.bind(this)
    this.chooseFilter = this.chooseFilter.bind(this)
  }

  componentDidMount() {
    db.collection('polls')
      .doc('Jjxs5iWmny5Ox4cvhZPA')
      .onSnapshot((doc) => this.formatData(doc.data().answers))
    this.createMainPieChart()
  }

  componentDidUpdate() {
    this.createMainPieChart()
  }

  formatData(data) {
    if (data.length) {
      this.setState({doc: data})

      this.setState({
        doc: data.reduce((result, next) => {
          result[next.userKey] = next.answer
          return result
        }, {}),
      })

      const test = data.reduce((result, next) => {
        if (result[next.answer]) result[next.answer]++
        else result[next.answer] = 1
        return result
      }, {})

      this.setState({
        users: data.map((entry) => entry.userKey),
      })

      let result = []
      for (let key in test) {
        result.push({name: key, value: test[key]})
      }

      this.setState({chartData: result, reset: result})
    }
  }

  async chooseFilter(e) {
    let filter = e.target.value
    this.setState({
      filter: filter,
    })
  }

  createMainPieChart() {
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
      .attr('fill', (d, i) => color(i))

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

  createPieChartA() {
    const data = this.state.chartDataA
    const svgWidth = 400
    const svgHeight = 400

    const svg = d3
      .select('#filterA')
      .append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight)
      .attr('id', 'svgA')

    const width = svg.attr('width')
    const height = svg.attr('height')

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
      .attr('fill', (d, i) => color(i))

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

  createPieChartB() {
    const data = this.state.chartDataB
    const svgWidth = 400
    const svgHeight = 400

    const svg = d3
      .select('#filterB')
      .append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight)
      .attr('id', 'svgB')

    const width = svg.attr('width')
    const height = svg.attr('height')

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
      .attr('fill', (d, i) => color(i))

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

  async handleClick() {
    const filterChoice = this.state.filter
    const users = await Promise.all(
      this.state.users.map(async (user) => {
        const test = await db.collection('users').doc(user).get()
        return {
          userKey: user,
          [filterChoice]: test.data().signUpAnswers[filterChoice],
        }
      })
    )

    let result = []
    for (let feature of users) {
      let unique = true
      for (let entry of result) {
        if (
          entry.name ===
          `${this.state.doc[feature.userKey]} ${feature[filterChoice]}`
        ) {
          unique = false
          entry.value++
        }
      }
      if (unique) {
        result.push({
          name: `${this.state.doc[feature.userKey]} ${feature[filterChoice]}`,
          value: 1,
        })
      }
    }

    let splitResultA = result.filter((data) =>
      data.name.includes(filterAB[filterChoice][0])
    )
    let splitResultB = result.filter((data) =>
      data.name.includes(filterAB[filterChoice][1])
    )
    const first = this.state.chartData[0].name

    if (!splitResultA[0].name.includes(first)) {
      splitResultA = splitResultA.reverse()
    }
    if (!splitResultB[0].name.includes(first)) {
      splitResultB = splitResultB.reverse()
    }

    await this.setState({
      chartDataA: splitResultA,
      chartDataB: splitResultB,
    })
    this.createPieChartA()
    this.createPieChartB()
  }

  resetFilter() {
    const {reset} = this.state
    this.setState({
      chartDataA: reset,
      chartDataB: reset,
    })
    d3.select('#svgA').remove()
    d3.select('#svgB').remove()
  }

  render() {
    return (
      <div id="testChart">
        <img src="capitalV.png" id="V" />
        <div id="mainChart">
          <svg width="400" height="400"></svg>
          <br></br>
          <br></br>
          <div id="filterControls">
            <label htmlFor="filter">Choose a filter</label>
            <br></br>
            <select
              name="filter"
              id="filterChoice"
              onChange={this.chooseFilter}
              defaultValue="Hand"
            >
              <option value="Hand">Right or left hand</option>
              <option value="Season">Summer or winter</option>
              <option value="Animal">Cat or Dog</option>
              <option value="Drink">Coffee or tea</option>
              <option value="Scenery">Beach or Mountains</option>
              <option value="Travel">Do you like to travel</option>
              <option value="Food">Cheeseburger or hotdog</option>
              <option value="Artist">Beyonce or Black Sabbath</option>
              <option value="Boolean">Yes or no</option>
              <option value="Awake">Early bird or night owl</option>
            </select>
            <br></br>
            <br></br>
            <button type="button" onClick={this.handleClick}>
              Activate Filter
            </button>
            <br></br>
            <br></br>
            <button type="button" onClick={this.resetFilter}>
              Reset Filter
            </button>
          </div>
        </div>
        <div id="subCharts">
          <div id="filterA"></div>
          <div id="filterB"></div>
          {/* <svg id="filterA" className="filterCharts" width="400" height="400"></svg>
          <svg id="filterB" className="filterCharts" width="400" height="400"></svg> */}
        </div>
      </div>
    )
  }
}

export default PieChart
