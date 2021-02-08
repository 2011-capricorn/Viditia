import React, {Component} from 'react'
import * as d3 from 'd3'

import './styles/BarChart.css'
import {barChartColors} from './styles/ChartColors'
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

class BarChart extends Component {
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
    this.createMainBarChart = this.createMainBarChart.bind(this)
    this.createBarChartA = this.createBarChartA.bind(this)
    this.createBarChartB = this.createBarChartB.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.resetFilter = this.resetFilter.bind(this)
    this.chooseFilter = this.chooseFilter.bind(this)
    this.reloadMain = this.reloadMain.bind(this)
  }

  async componentDidMount() {
    await db
      .collection('polls')
      .doc('s2GdZnP781WE0Rde2pve')
      .onSnapshot((doc) => this.formatData(doc.data().answers))
    let randomNumber = Math.floor(Math.random() * 13)

    await this.setState({
      color: barChartColors[randomNumber],
      // units: this.props.units, //IMPORTANT@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    })
  }

  componentDidUpdate() {
    this.reloadMain()
    this.createMainBarChart()
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
        result.push({name: key.slice(0, 4), value: test[key]})
      }

      this.setState({chartData: result, reset: result})
    }
  }

  async chooseFilter(e) {
    let filter = e.target.value
    await this.setState({
      filter: filter,
    })
  }

  createMainBarChart() {
    const data = this.state.chartData
    const width = 400
    const height = 400
    const margin = {top: 60, bottom: 60, left: 60, right: 60}

    const svg = d3
      .select('#mainMainChartDiv')
      .append('svg')
      .attr('width', width - margin.left - margin.right)
      .attr('height', height - margin.top - margin.bottom)
      .attr('viewBox', [0, 0, width, height])
      .attr('id', 'BCMain')

    const x = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .range([margin.left, width - margin.right])
      .padding(0.1)

    const y = d3
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

    svg
      .append('g')
      .attr('fill', this.state.color)
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', (d, i) => x(i))
      .attr('y', (d) => y(d.value))
      .attr('title', (d) => d.value)
      .attr('class', 'rect')
      .attr('height', (d) => y(0) - y(d.value))
      .attr('width', x.bandwidth())

    function yAxis(g) {
      g.attr('transform', `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(y).ticks(5))
        .attr('font-size', '20px')
    }

    function xAxis(g) {
      g.attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat((i) => data[i].name))
        .attr('font-size', '20px')
    }

    svg.append('g').call(xAxis)
    svg.append('g').call(yAxis)
    svg.node()

    svg
      .append('text')
      .attr('class', 'x label')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height - 15)
      .text(this.state.units)

    svg
      .append('text')
      .attr('class', 'y label')
      .attr('text-anchor', 'end')
      .attr('y', 15)
      .attr('x', -150)
      .attr('transform', 'rotate(-90)')
      .text('Responses')
  }

  createBarChartA() {
    const data = this.state.chartDataA
    const filterWord = filterAB[this.state.filter][0]
    const dataFiltered = data.map((unit) => {
      unit.name = unit.name
        .split(' ')
        .filter((word) => !filterWord.includes(word))
        .join(' ')
      return unit
    })

    const width = 400
    const height = 400
    const margin = {top: 60, bottom: 60, left: 60, right: 60}

    const svg = d3
      .select('#BCFilterA')
      .append('svg')
      .attr('width', width - margin.left - margin.right)
      .attr('height', height - margin.top - margin.bottom)
      .attr('viewBox', [0, 0, width, height])
      .attr('id', 'BCsvgA')

    const x = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .range([margin.left, width - margin.right])
      .padding(0.1)

    const y = d3
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

    svg
      .append('g')
      .attr('fill', this.state.color)
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', (d, i) => x(i))
      .attr('y', (d) => y(d.value))
      .attr('title', (d) => d.value)
      .attr('class', 'rect')
      .attr('height', (d) => y(0) - y(d.value))
      .attr('width', x.bandwidth())

    function yAxis(g) {
      g.attr('transform', `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(y).ticks(5))
        .attr('font-size', '20px')
    }

    function xAxis(g) {
      g.attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat((i) => data[i].name.slice(0, 4)))
        .attr('font-size', '20px')
    }

    svg.append('g').call(xAxis)
    svg.append('g').call(yAxis)
    svg.node()

    svg
      .append('text')
      .attr('class', 'x label')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height - 15)
      .text(this.state.units)

    svg
      .append('text')
      .attr('class', 'y label')
      .attr('text-anchor', 'end')
      .attr('y', 15)
      .attr('x', -150)
      .attr('transform', 'rotate(-90)')
      .text('Responses')

    svg
      .append('text')
      .attr('class', 'BCSubLabel')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height - 360)
      .text(filterWord)
  }

  createBarChartB() {
    const data = this.state.chartDataB
    const filterWord = filterAB[this.state.filter][1]

    const dataFiltered = data.map((unit) => {
      unit.name = unit.name
        .split(' ')
        .filter((word) => !filterWord.includes(word))
        .join(' ')
      return unit
    })

    const width = 400
    const height = 400
    const margin = {top: 60, bottom: 60, left: 60, right: 60}

    const svg = d3
      .select('#BCFilterB')
      .append('svg')
      .attr('width', width - margin.left - margin.right)
      .attr('height', height - margin.top - margin.bottom)
      .attr('viewBox', [0, 0, width, height])
      .attr('id', 'BCsvgB')

    const x = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .range([margin.left, width - margin.right])
      .padding(0.1)

    const y = d3
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

    svg
      .append('g')
      .attr('fill', this.state.color)
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', (d, i) => x(i))
      .attr('y', (d) => y(d.value))
      .attr('title', (d) => d.value)
      .attr('class', 'rect')
      .attr('height', (d) => y(0) - y(d.value))
      .attr('width', x.bandwidth())

    function yAxis(g) {
      g.attr('transform', `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(y).ticks(5))
        .attr('font-size', '20px')
    }

    function xAxis(g) {
      g.attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat((i) => data[i].name.slice(0, 4)))
        .attr('font-size', '20px')
    }

    svg.append('g').call(xAxis)
    svg.append('g').call(yAxis)
    svg.node()

    svg
      .append('text')
      .attr('class', 'x label')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height - 15)
      .text(this.state.units)

    svg
      .append('text')
      .attr('class', 'y label')
      .attr('text-anchor', 'end')
      .attr('y', 15)
      .attr('x', -150)
      .attr('transform', 'rotate(-90)')
      .text('Responses')

    svg
      .append('text')
      .attr('class', 'BCSubLabel')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height - 360)
      .text(filterWord)
  }

  async handleClick() {
    document.getElementById('activateFilterBC').disabled = true
    setTimeout(() => {
      document.getElementById('activateFilterBC').disabled = false
    }, 3000)
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
    console.log(6, splitResultA)
    await this.setState({
      chartDataA: splitResultA,
      chartDataB: splitResultB,
      filterActive: true,
    })
    this.createBarChartA()
    this.createBarChartB()

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
