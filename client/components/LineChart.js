import React, {Component} from 'react'
import * as d3 from 'd3'

import './styles/LineChart.css'
import {lineChartColors} from './styles/ChartColors'
import firebase from '../../public/firebase'

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

class LineChart extends Component {
  constructor() {
    super()
    this.state = {
      chartData: ['no data'],
      chartDataA: [],
      chartDataB: [],
      reset: [],
      color: '',
      units: 'units',
      users: [],
      doc: [],
      filter: 'Hand',
      filterActive: false,
    }
    this.createMainLineChart = this.createMainLineChart.bind(this)
    this.createLineChartA = this.createLineChartA.bind(this)
    this.createLineChartB = this.createLineChartB.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.resetFilter = this.resetFilter.bind(this)
    this.chooseFilter = this.chooseFilter.bind(this)
    this.reloadMain = this.reloadMain.bind(this)
  }

  async componentDidMount() {
    await db
      .collection('polls')
      .doc(this.props.pollKey)
      .onSnapshot((doc) => this.formatData(doc.data().answers))
    let randomNumber = Math.floor(Math.random() * 13)

    await this.setState({
      color: lineChartColors[randomNumber],
      units: this.props.units,
    })
    // this.createMainLineChart()
  }

  componentDidUpdate() {
    this.reloadMain()
    this.createMainLineChart()
  }

  async formatData(data) {
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

      await this.setState({chartData: result, reset: result})
    }
  }

  async chooseFilter(e) {
    let filter = e.target.value
    await this.setState({
      filter: filter,
    })
  }

  createMainLineChart() {
    const data = this.state.chartData

    const toXY = data
      .map((obj) => {
        return {x: Number(obj.name), y: obj.value}
      })
      .filter((obj) => obj.x >= 0)
      .sort((a, b) => {
        return a.x - b.x
      })

    const rangeOfX = toXY.map((obj) => obj.x).sort((a, b) => a - b)
    const rangeOfY = toXY.map((obj) => obj.y).sort((a, b) => a - b)

    var margin = {top: 50, right: 50, bottom: 50, left: 50},
      width = 400 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom

    var xScale = d3
      .scaleLinear()
      .domain([rangeOfX[0], rangeOfX[rangeOfX.length - 1]])
      .range([0, width])

    var yScale = d3
      .scaleLinear()
      .domain([rangeOfY[0], rangeOfY[rangeOfY.length - 1]])
      .range([height, 0])

    var line = d3
      .line()
      .x(function (d) {
        return xScale(d.x)
      })
      .y(function (d) {
        return yScale(d.y)
      })
      .curve(d3.curveMonotoneX)

    var svg = d3
      .select('#mainLineChartDiv')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .attr('id', 'LCMain')
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(xScale).ticks(5))

    svg.append('g').attr('class', 'y axis').call(d3.axisLeft(yScale))

    svg
      .append('path')
      .datum(toXY)
      .attr('class', 'line')
      .attr('stroke', this.state.color)
      .attr('d', line)

    svg
      .append('text')
      .attr('class', 'x label')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height + 40)
      .text(this.state.units)

    svg
      .append('text')
      .attr('class', 'y label')
      .attr('text-anchor', 'end')
      .attr('y', -45)
      .attr('dy', '.75em')
      .attr('transform', 'rotate(-90)')
      .text('Responses')

    // 12. Appends a circle for each datapoint
    // svg
    //   .selectAll('.dot')
    //   .data(dataset)
    //   .enter()
    //   .append('circle') // Uses the enter().append() method
    //   .attr('class', 'dot') // Assign a class for styling
    //   .attr('cx', function (d, i) {
    //     return xScale(i)
    //   })
    //   .attr('cy', function (d) {
    //     return yScale(d.y)
    //   })
    //   .attr('r', 5)
    //   .on('mouseover', function (a, b, c) {
    //     console.log(a)
    //     this.attr('class', 'focus')
    //   })
  }

  createLineChartA() {
    const data = this.state.chartDataA
    const filterWord = filterAB[this.state.filter][0]

    const dataFiltered = data.map((unit) => {
      unit.name = unit.name
        .split(' ')
        .filter((word) => !filterWord.includes(word))
        .join(' ')
      return unit
    })

    const toXY = dataFiltered
      .map((obj) => {
        return {x: Number(obj.name), y: obj.value}
      })
      .filter((obj) => obj.x >= 0)
      .sort((a, b) => {
        return a.x - b.x
      })

    const rangeOfX = toXY.map((obj) => obj.x).sort((a, b) => a - b)
    const rangeOfY = toXY.map((obj) => obj.y).sort((a, b) => a - b)

    var margin = {top: 50, right: 50, bottom: 50, left: 50},
      width = 400 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom

    var xScale = d3
      .scaleLinear()
      .domain([rangeOfX[0], rangeOfX[rangeOfX.length - 1]])
      .range([0, width])

    var yScale = d3
      .scaleLinear()
      .domain([rangeOfY[0], rangeOfY[rangeOfY.length - 1]])
      .range([height, 0])

    var line = d3
      .line()
      .x(function (d) {
        return xScale(d.x)
      })
      .y(function (d) {
        return yScale(d.y)
      })
      .curve(d3.curveMonotoneX)

    var svg = d3
      .select('#LCFilterA')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .attr('id', 'LCsvgA')
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(xScale).ticks(5))

    svg.append('g').attr('class', 'y axis').call(d3.axisLeft(yScale))

    svg
      .append('path')
      .datum(toXY)
      .attr('class', 'line')
      .attr('stroke', this.state.color)
      .attr('d', line)

    svg
      .append('text')
      .attr('class', 'x label')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height + 40)
      .text(this.state.units)

    svg
      .append('text')
      .attr('class', 'y label')
      .attr('text-anchor', 'end')
      .attr('y', -45)
      .attr('dy', '.75em')
      .attr('transform', 'rotate(-90)')
      .text('Responses')

    svg
      .append('text')
      .attr('class', 'LCSubLabel')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .text(filterWord)
  }

  createLineChartB() {
    const data = this.state.chartDataB

    const filterWord = filterAB[this.state.filter][1]

    const dataFiltered = data.map((unit) => {
      unit.name = unit.name
        .split(' ')
        .filter((word) => !filterWord.includes(word))
        .join(' ')
      return unit
    })

    const toXY = dataFiltered
      .map((obj) => {
        return {x: Number(obj.name), y: obj.value}
      })
      .filter((obj) => obj.x >= 0)
      .sort((a, b) => {
        return a.x - b.x
      })

    const rangeOfX = toXY.map((obj) => obj.x).sort((a, b) => a - b)
    const rangeOfY = toXY.map((obj) => obj.y).sort((a, b) => a - b)

    var margin = {top: 50, right: 50, bottom: 50, left: 50},
      width = 400 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom

    var xScale = d3
      .scaleLinear()
      .domain([rangeOfX[0], rangeOfX[rangeOfX.length - 1]])
      .range([0, width])

    var yScale = d3
      .scaleLinear()
      .domain([rangeOfY[0], rangeOfY[rangeOfY.length - 1]])
      .range([height, 0])

    var line = d3
      .line()
      .x(function (d) {
        return xScale(d.x)
      })
      .y(function (d) {
        return yScale(d.y)
      })
      .curve(d3.curveMonotoneX)

    var svg = d3
      .select('#LCFilterB')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .attr('id', 'LCsvgB')
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(xScale).ticks(5))

    svg.append('g').attr('class', 'y axis').call(d3.axisLeft(yScale))

    svg
      .append('path')
      .datum(toXY)
      .attr('class', 'line')
      .attr('stroke', this.state.color)
      .attr('d', line)

    svg
      .append('text')
      .attr('class', 'x label')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height + 40)
      .text(this.state.units)

    svg
      .append('text')
      .attr('class', 'y label')
      .attr('text-anchor', 'end')
      .attr('y', -45)
      .attr('dy', '.75em')
      .attr('transform', 'rotate(-90)')
      .text('Responses')

    svg
      .append('text')
      .attr('class', 'LCSubLabel')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .text(filterWord)
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

    await this.setState({
      chartDataA: splitResultA,
      chartDataB: splitResultB,
      filterActive: true,
    })
    this.createLineChartA()
    this.createLineChartB()

    const filterChartA = document.getElementById('LCFilterA')
    const filterChartB = document.getElementById('LCFilterB')
    const v = document.getElementById('VLC')

    filterChartA.className = 'LCfilterRideA'
    filterChartB.className = 'LCfilterRideB'
    v.className = 'vFlareLC'
  }

  resetFilter() {
    const {reset} = this.state
    this.setState({
      chartDataA: reset,
      chartDataB: reset,
      filterActive: false,
    })
    d3.select('#LCsvgA').remove()
    d3.select('#LCsvgB').remove()
    const filterChartA = document.getElementById('LCFilterA')
    const filterChartB = document.getElementById('LCFilterB')
    const v = document.getElementById('VLC')
    filterChartA.className = 'filterStartLC'
    filterChartB.className = 'filterStartLC'
    v.className = 'vHiddenLC'
  }

  reloadMain() {
    d3.select('#LCMain').remove()
  }

  render() {
    return (
      <div id="singleLCViditFull">
        <div id="testChartLC">
          <img src="/capitalV.png" id="VLC" className="vHiddenLC" />
          <div id="mainLineChart">
            <div id="mainLineChartDiv"></div>

            <br></br>
            <br></br>
            <div id="filterControlsLC">
              <label htmlFor="filter">Choose a filter</label>
              <br></br>
              <select
                name="filter"
                id="filterChoiceLC"
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
                id="activateFilterLC"
              >
                Activate Filter
              </button>
              <br></br>
              <br></br>
              <button
                type="button"
                onClick={this.resetFilter}
                id="resetFilterLC"
              >
                Reset Filter
              </button>
            </div>
          </div>
          <div id="subLineCharts">
            <div id="LCFilterA" className="LCFilterStart"></div>
            <div id="LCFilterB" className="LCFilterStart"></div>
          </div>
        </div>
      </div>
    )
  }
}

export default LineChart
