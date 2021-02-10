import React, {Component} from 'react'
import * as d3 from 'd3'

import './styles/LineChart.css'
import {lineChartColors} from './styles/ChartColors'
import firebase from '../../public/firebase'
import filterAB from '../filterAB'

const db = firebase.firestore()

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
      margin: {top: 50, right: 50, bottom: 50, left: 50},
      unsubscribe: null,
    }
    this.createLineChart = this.createLineChart.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.resetFilter = this.resetFilter.bind(this)
    this.chooseFilter = this.chooseFilter.bind(this)
    this.reloadMain = this.reloadMain.bind(this)
  }

  componentDidMount() {
    this.setState({
      unsubscribe: db
        .collection('polls')
        .doc(this.props.pollKey)
        .onSnapshot((doc) => this.formatData(doc.data().answers)),
    })
    let randomNumber = Math.floor(Math.random() * 13)

    this.setState({
      color: lineChartColors[randomNumber],
      units: this.props.units,
    })
  }

  componentDidUpdate() {
    this.reloadMain()
    this.createLineChart('#mainLineChartDiv', 'LCMain', false)
  }

  componentWillUnmount() {
    this.state.unsubscribe()
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

  convertDataToXY(data) {
    return data
      .map((obj) => {
        return {x: Number(obj.name), y: obj.value}
      })
      .filter((obj) => obj.x >= 0)
      .sort((a, b) => {
        return a.x - b.x
      })
  }

  getAxisRange(data, axis) {
    return data.map((obj) => obj[axis]).sort((a, b) => a - b)
  }

  setXScale(rangeData, range) {
    return d3
      .scaleLinear()
      .domain([rangeData[0], rangeData[rangeData.length - 1]])
      .range([0, range])
  }

  setYScale(rangeData, range) {
    return d3
      .scaleLinear()
      .domain([rangeData[0], rangeData[rangeData.length - 1]])
      .range([range, 0])
  }

  createLine(xScale, yScale) {
    return d3
      .line()
      .x(function (d) {
        return xScale(d.x)
      })
      .y(function (d) {
        return yScale(d.y)
      })
      .curve(d3.curveMonotoneX)
  }

  createSVG(selectValue, idValue, width, height, margin) {
    return d3
      .select(selectValue)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .attr('id', idValue)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  }

  appendXAxis(svg, xScale, height) {
    svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(xScale).ticks(5))
  }

  appendYAxis(svg, yScale) {
    svg.append('g').attr('class', 'y axis').call(d3.axisLeft(yScale))
  }

  appendPath(svg, line, rangeData) {
    svg
      .append('path')
      .datum(rangeData)
      .attr('class', 'line')
      .attr('stroke', this.state.color || '#ffab00')
      .attr('d', line)
  }

  appendXLabel(svg, width, height) {
    svg
      .append('text')
      .attr('class', 'x label')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height + 40)
      .text(this.state.units)
  }

  appendYLabel(svg) {
    svg
      .append('text')
      .attr('class', 'y label')
      .attr('text-anchor', 'end')
      .attr('y', -45)
      .attr('dy', '.75em')
      .attr('transform', 'rotate(-90)')
      .text('Responses')
  }

  appendSubLabel(svg, width, filterWord) {
    svg
      .append('text')
      .attr('class', 'LCSubLabel')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .text(filterWord)
  }

  createLineChart(selectValue, idValue, filtering, filterChart) {
    const data = filtering ? this.state[filterChart] : this.state.chartData
    let filterWord = null
    let dataFiltered = null
    if (filtering) {
      filterWord =
        filterChart === 'chartDataA'
          ? filterAB[this.state.filter][0]
          : filterAB[this.state.filter][1]

      dataFiltered = data.map((unit) => {
        unit.name = unit.name
          .split(' ')
          .filter((word) => !filterWord.includes(word))
          .join(' ')
        return unit
      })
    }

    const toXY = filtering
      ? this.convertDataToXY(dataFiltered)
      : this.convertDataToXY(data)

    const rangeOfX = this.getAxisRange(toXY, 'x')
    const rangeOfY = this.getAxisRange(toXY, 'y')

    const {margin} = this.state

    const width = 400 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom

    const xScale = this.setXScale(rangeOfX, width)
    const yScale = this.setYScale(rangeOfY, height)

    const line = this.createLine(xScale, yScale)

    const svg = this.createSVG(selectValue, idValue, width, height, margin)

    this.appendXAxis(svg, xScale, height)
    this.appendYAxis(svg, yScale)
    this.appendPath(svg, line, toXY)
    this.appendXLabel(svg, width, height)
    this.appendYLabel(svg)
    if (filtering) this.appendSubLabel(svg, width, filterWord)
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
    this.createLineChart('#LCFilterA', 'LCsvgA', true, 'chartDataA')
    this.createLineChart('#LCFilterB', 'LCsvgB', true, 'chartDataB')

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
