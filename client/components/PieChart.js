import React, {Component} from 'react'
import * as d3 from 'd3'

import './styles/PieChart.css'
import {pieChartColors} from './styles/ChartColors'
import firebase from '../../public/firebase'
import filterAB from '../filterAB'

const db = firebase.firestore()

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
      filterActive: false,
    }
    this.createMainPieChart = this.createMainPieChart.bind(this)
    this.createFilterPieChart = this.createFilterPieChart.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.resetFilter = this.resetFilter.bind(this)
    this.chooseFilter = this.chooseFilter.bind(this)
  }

  componentDidMount() {
    db.collection('polls')
      .doc(this.props.pollKey)
      .onSnapshot((doc) => this.formatData(doc.data().answers))
    let randomNumber = Math.floor(Math.random() * 12)
    const one = pieChartColors[randomNumber][0]
    const two = pieChartColors[randomNumber][1]
    const three = pieChartColors[randomNumber][2]
    const four = pieChartColors[randomNumber][3]
    const five = pieChartColors[randomNumber][4]
    const six = pieChartColors[randomNumber][5]
    this.setState({
      colors: [d3.rgb(one, two, three), d3.rgb(four, five, six)],
    })
    this.createMainPieChart()
  }

  componentDidUpdate() {
    this.createMainPieChart()
  }

  formatData(data) {
    if (data.length) {
      const doc = data.reduce((result, next) => {
        result[next.userKey] = next.answer
        return result
      }, {})

      const preProcess = data.reduce((result, next) => {
        if (result[next.answer]) result[next.answer]++
        else result[next.answer] = 1
        return result
      }, {})

      const users = data.map((entry) => entry.userKey)

      let result = Object.keys(preProcess).map((key) => ({
        name: key,
        value: preProcess[key],
      }))

      this.setState({doc, chartData: result, reset: result, users})
    }
  }

  chooseFilter(e) {
    let filter = e.target.value
    this.setState({
      filter: filter,
    })
  }

  createSVG(selectValue, width, height, idValue) {
    return d3
      .select(selectValue)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('id', idValue)
  }

  setColors() {
    return d3.scaleOrdinal(this.state.colors)
  }

  createGroup(svg) {
    const width = svg.attr('width'),
      height = svg.attr('height')
    return svg
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`)
  }

  createPie() {
    return d3
      .pie()
      .sort(null)
      .value((d) => d.value)
  }

  createPies(g, pie, data) {
    return g
      .selectAll('.arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc')
  }

  createPath(radius) {
    return d3.arc().outerRadius(radius).innerRadius(110)
  }

  createLabel(radius) {
    return d3
      .arc()
      .outerRadius(radius)
      .innerRadius(radius - 90)
  }

  appendPath(pies, path, color) {
    pies
      .append('path')
      .attr('d', path)
      .attr('fill', (d, i) => color(i))
  }

  appendText(pies, radius, label) {
    pies
      .append('text')
      .attr('transform', function (d) {
        d.innerRadius = 0
        d.outerRadius = radius
        return `translate(${label.centroid(d)})`
      })
      .attr('text-anchor', 'middle')
      .attr('class', `sliceWord`)
      .text((d) => d.data.name)
  }

  appendFilterText(g, filterWord) {
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('font-size', '30px')
      .attr('class', `centerWord`)
      .text(filterWord)
  }

  createMainPieChart() {
    const data = this.state.chartData
    const svg = d3.select('#mainChartSVG')
    const radius = 200
    const g = this.createGroup(svg)
    const color = this.setColors()
    const pie = this.createPie()
    const path = this.createPath(radius)
    const label = this.createLabel(radius)
    const pies = this.createPies(g, pie, data)
    this.appendPath(pies, path, color)
    this.appendText(pies, radius, label)
  }

  createFilterPieChart(selectValue, idValue, chart) {
    const data = this.state[chart]
    const filterWord =
      chart === 'chartDataA'
        ? filterAB[this.state.filter][0]
        : filterAB[this.state.filter][1]
    data[0].name = data[0].name
      .split(' ')
      .filter((word) => !filterWord.includes(word))
      .join(' ')
    data[1].name = data[1].name
      .split(' ')
      .filter((word) => !filterWord.includes(word))
      .join(' ')
    const svg = this.createSVG(selectValue, 400, 400, idValue)
    const radius = 200
    const g = this.createGroup(svg)
    const color = this.setColors()
    const pie = this.createPie()
    const path = this.createPath(radius)
    const label = this.createLabel(radius)
    const pies = this.createPies(g, pie, data)
    this.appendPath(pies, path, color)
    this.appendText(pies, radius, label)
    this.appendFilterText(g, filterWord)
  }

  async handleClick() {
    if (this.state.filterActive) {
      this.resetFilter()
    }
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

    this.setState({
      chartDataA: splitResultA,
      chartDataB: splitResultB,
      filterActive: true,
    })
    this.createFilterPieChart('#filterA', 'svgA', 'chartDataA')
    this.createFilterPieChart('#filterB', 'svgB', 'chartDataB')

    const filterChartA = document.getElementById('filterA')
    const filterChartB = document.getElementById('filterB')
    const v = document.getElementById('V')

    filterChartA.className = 'filterRideA'
    filterChartB.className = 'filterRideB'
    v.className = 'vFlare'
  }

  resetFilter() {
    const {reset} = this.state
    this.setState({
      chartDataA: reset,
      chartDataB: reset,
      filterActive: false,
    })
    d3.select('#svgA').remove()
    d3.select('#svgB').remove()
    const filterChartA = document.getElementById('filterA')
    const filterChartB = document.getElementById('filterB')
    const v = document.getElementById('V')
    filterChartA.className = 'filterStart'
    filterChartB.className = 'filterStart'
    v.className = 'vHidden'
  }

  render() {
    return (
      <div id="singleViditFull">
        <div id="testChart">
          <img src="/capitalV.png" id="V" className="vHidden" />
          <div id="mainChart">
            <svg width="400" height="400" id="mainChartSVG"></svg>

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
              <button
                type="button"
                onClick={this.handleClick}
                id="activateFilter"
              >
                Activate Filter
              </button>
              <br></br>
              <br></br>
              <button type="button" onClick={this.resetFilter} id="resetFilter">
                Reset Filter
              </button>
            </div>
          </div>
          <div id="subCharts">
            <div id="filterA" className="filterStart"></div>
            <div id="filterB" className="filterStart"></div>
          </div>
        </div>
      </div>
    )
  }
}

export default PieChart
