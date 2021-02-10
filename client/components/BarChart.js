import React, {Component} from 'react'
import * as d3 from 'd3'

import './styles/BarChart.css'
import {barChartColors} from './styles/ChartColors'
import firebase from '../../public/firebase'
import filterAB from '../filterAB'

const db = firebase.firestore()

class BarChart extends Component {
  constructor() {
    super()
    this.state = {
      chartData: ['no data'],
      chartDataA: [],
      chartDataB: [],
      reset: [],
      color: '',
      users: [],
      doc: [],
      filter: 'Hand',
      filterActive: false,
      width: 400,
      height: 400,
      margin: {top: 60, bottom: 60, left: 60, right: 60},
      unsubscribe: null,
    }
    this.createBarChart = this.createBarChart.bind(this)
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
      color: barChartColors[randomNumber],
    })
  }

  componentDidUpdate() {
    this.reloadMain()
    this.createBarChart('#mainMainChartDiv', 'BCMain')
  }

  componentWillUnmount() {
    this.state.unsubscribe()
  }

  formatData(data) {
    if (data.length) {
      const users = data.map((entry) => entry.userKey)

      const doc = data.reduce((result, next) => {
        result[next.userKey] = next.answer
        return result
      }, {})

      const preProcess = data.reduce((result, next) => {
        if (result[next.answer]) result[next.answer]++
        else result[next.answer] = 1
        return result
      }, {})

      let result = Object.keys(preProcess).map((key) => ({
        name: key.slice(0, 4),
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
  createSVG(selectValue, idValue) {
    const {height, width, margin} = this.state
    return d3
      .select(selectValue)
      .append('svg')
      .attr('width', width - margin.left - margin.right)
      .attr('height', height - margin.top - margin.bottom)
      .attr('viewBox', [0, 0, width, height])
      .attr('id', idValue)
  }

  chartFormat(data, filterWord, filtering) {
    if (this.props.type === 'Range') {
      if (filtering) {
        const dataFiltered = data.map((unit) => {
          unit.name = unit.name
            .split(' ')
            .filter((word) => !filterWord.includes(word))
            .join(' ')
          return unit
        })
      }
      let numRange = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      let keys = data.map((obj) => Number(obj.name))

      for (let i = 0; i < numRange.length; i++) {
        if (!keys.includes(numRange[i])) {
          data.push({name: numRange[i], value: 0})
        }
      }
      return data
        .map((obj) => {
          return {name: Number(obj.name), value: obj.value}
        })
        .filter((obj) => obj.name >= 0)
        .sort((a, b) => {
          return a.name - b.name
        })
    } else {
      let keys = data.map((obj) => obj.name)
      let choicesArr = []
      choicesArr.push(this.props.choices.a.slice(0, 4))
      choicesArr.push(this.props.choices.b.slice(0, 4))
      choicesArr.push(this.props.choices.c.slice(0, 4))
      if (this.props.choices.d) {
        choicesArr.push(this.props.choices.d.slice(0, 4))
      }

      let finalData = []

      for (let i = 0; i < choicesArr.length; i++) {
        if (!keys.includes(choicesArr[i])) {
          data.push({name: choicesArr[i], value: 0})
        }
        finalData.push(data.filter((obj) => obj.name === choicesArr[i])[0])
      }
      return finalData
    }
  }

  yAxis(g, y) {
    const {margin} = this.state
    g.attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y).ticks(5))
      .attr('font-size', '20px')
  }

  xAxis(g, data, x) {
    const {margin, height} = this.state
    g.attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat((i) => data[i].name))
      .attr('font-size', '20px')
  }

  getXValue(data) {
    const {margin, width} = this.state
    return d3
      .scaleBand()
      .domain(d3.range(data.length))
      .range([margin.left, width - margin.right])
      .padding(0.1)
  }

  getYValue(data) {
    const {height, margin} = this.state
    return d3
      .scaleLinear()
      .domain([
        0,
        Math.max.apply(
          Math,
          data.map(function (o) {
            return o.value
          })
        ) * 1.25,
      ])
      .range([height - margin.bottom, margin.top])
  }

  changeGraphStructure(svg, data, x, y) {
    svg
      .append('g')
      .attr('fill', this.state.color)
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => x(i))
      .attr('y', (d) => y(d.value))
      .attr('title', (d) => d.value)
      .attr('class', 'rect')
      .attr('height', (d) => y(0) - y(d.value))
      .attr('width', x.bandwidth())
  }

  setXLabel(svg) {
    const {width, height} = this.state
    svg
      .append('text')
      .attr('class', 'x label')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height - 15)
      .text(this.props.masterLabel || this.props.rangeLabel5)
  }

  setYLabel(svg) {
    svg
      .append('text')
      .attr('class', 'y label')
      .attr('text-anchor', 'end')
      .attr('y', 15)
      .attr('x', -150)
      .attr('transform', 'rotate(-90)')
      .text('Responses')
  }

  setBCSubLabel(svg, filterWord) {
    const {width, height} = this.state
    svg
      .append('text')
      .attr('class', 'BCSubLabel')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height - 360)
      .text(filterWord)
  }

  createBarChart(selectValue, idValue, filtering, filterChart) {
    let data = filtering ? this.state[filterChart] : this.state.chartData
    let filterWord = null
    if (filtering) {
      filterWord =
        filterChart === 'chartDataA'
          ? filterAB[this.state.filter][0]
          : filterAB[this.state.filter][1]
      data = data.map((obj) => {
        obj.name = obj.name.slice(0, 4)
        return obj
      })
    }

    data = filtering
      ? this.chartFormat(data, filterWord, true)
      : this.chartFormat(data, filterWord)

    const svg = this.createSVG(selectValue, idValue)

    const x = this.getXValue(data)
    const y = this.getYValue(data)

    this.changeGraphStructure(svg, data, x, y)

    svg.append('g').call((g) => this.xAxis(g, data, x))
    svg.append('g').call((g) => this.yAxis(g, y))
    svg.node()

    this.setXLabel(svg)
    this.setYLabel(svg)
    if (filtering) this.setBCSubLabel(svg, filterWord)
  }

  async handleClick() {
    document.getElementById('activateFilterBC').disabled = true
    setTimeout(() => {
      document.getElementById('activateFilterBC').disabled = false
    }, 3000)
    if (this.state.filterActive) {
      this.resetFilter()
    }

    const {users, filter} = this.state
    const usersAnswerFilter = await Promise.all(
      users.map(async (key) => {
        const userRef = await db.collection('users').doc(key).get()
        return {
          userKey: key,
          [filter]: userRef.data().signUpAnswers[filter],
        }
      })
    )

    let result = []
    for (let feature of usersAnswerFilter) {
      let unique = true
      for (let entry of result) {
        if (
          entry.name === `${this.state.doc[feature.userKey]} ${feature[filter]}`
        ) {
          unique = false
          entry.value++
        }
      }
      if (unique) {
        result.push({
          name: `${this.state.doc[feature.userKey]} ${feature[filter]}`,
          value: 1,
        })
      }
    }

    let splitResultA = result.filter((data) =>
      data.name.includes(filterAB[filter][0])
    )
    let splitResultB = result.filter((data) =>
      data.name.includes(filterAB[filter][1])
    )

    this.setState({
      chartDataA: splitResultA,
      chartDataB: splitResultB,
      filterActive: true,
    })
    this.createBarChart('#BCFilterA', 'BCsvgA', true, 'chartDataA')
    this.createBarChart('#BCFilterB', 'BCsvgB', true, 'chartDataB')

    const filterChartA = document.getElementById('BCFilterA')
    const filterChartB = document.getElementById('BCFilterB')
    const v = document.getElementById('VBC')

    filterChartA.className = 'BCfilterRideA'
    filterChartB.className = 'BCfilterRideB'
    v.className = 'vFlareBC'
  }

  resetFilter() {
    const {reset} = this.state
    this.setState({
      chartDataA: reset,
      chartDataB: reset,
      filterActive: false,
    })
    d3.select('#BCsvgA').remove()
    d3.select('#BCsvgB').remove()
    const filterChartA = document.getElementById('BCFilterA')
    const filterChartB = document.getElementById('BCFilterB')
    const v = document.getElementById('VBC')
    filterChartA.className = 'filterStartBC'
    filterChartB.className = 'filterStartBC'
    v.className = 'vHiddenBC'
  }

  reloadMain() {
    d3.select('#BCMain').remove()
  }

  render() {
    return (
      <div id="singleBCViditFull">
        <div id="testChartBC">
          <img src="/capitalV.png" id="VBC" className="vHiddenBC" />
          <div id="mainMainChart">
            <div id="mainMainChartDiv"></div>

            <br></br>
            <br></br>
            <div id="filterControlsBC">
              <label htmlFor="filter">Choose a filter</label>
              <br></br>
              <select
                name="filter"
                id="filterChoiceBC"
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
                id="activateFilterBC"
              >
                Activate Filter
              </button>
              <br></br>
              <br></br>
              <button
                type="button"
                onClick={this.resetFilter}
                id="resetFilterBC"
              >
                Reset Filter
              </button>
            </div>
          </div>
          <div id="subBarCharts">
            <div id="BCFilterA" className="BCFilterStart"></div>
            <div id="BCFilterB" className="BCFilterStart"></div>
          </div>
        </div>
      </div>
    )
  }
}

export default BarChart
