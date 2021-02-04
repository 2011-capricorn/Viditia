import React, {Component} from 'react'
import * as d3 from 'd3'
import firebase from '../../public/firebase'

import './styles/PieChart.css'

const db = firebase.firestore()

const signUpQuestions = {
  hand: 'AydpVc7N4PlfCgafhsFO',
  season: 'CP21nrZ0iDdwf6trKR8c',
  animal: 'jbFoVzlEJmuNK7vLkxK5',
  drink: 'Kh8m2S1k0ED9VFYgAw3F',
  scenery: 'zQIfSpxEVLEm2tyv0n9w',
  travel: '23cVgvROTUzo24WHKl6w',
  food: '1qb7vLsHAkCz3GvnjYtK',
  artist: 'JqzBPNZ4QyZr0HKXWjzA',
  boolean: 'PjRhb7Y5pmuwaI9Ds4Jf',
  awake: 'ZGKpkv4LFvbyAGrR09yD',
}

class PieChart extends Component {
  constructor() {
    super()
    this.state = {
      chartData: [],
      reset: [],
      colors: [d3.rgb(226, 138, 138), d3.rgb(116, 176, 228)],
      users: [],
      doc: [],
      filter: 'Hand',
    }
    this.createPieChart = this.createPieChart.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.resetFilter = this.resetFilter.bind(this)
    this.chooseFilter = this.chooseFilter.bind(this)
  }

  componentDidMount() {
    db.collection('polls')
      .doc('Jjxs5iWmny5Ox4cvhZPA')
      .onSnapshot((doc) => this.formatData(doc.data().answers))
    this.createPieChart()
  }

  componentDidUpdate() {
    this.createPieChart()
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

    this.setState({
      chartData: result,
      colors: [
        d3.rgb(226, 138, 138),
        d3.rgb(226, 75, 75),
        d3.rgb(116, 176, 228),
        d3.rgb(38, 140, 229),
      ],
    })
  }

  resetFilter() {
    const {reset} = this.state
    this.setState({
      chartData: reset,
      colors: [d3.rgb(226, 138, 138), d3.rgb(116, 176, 228)],
    })
  }

  render() {
    return (
      <div id="testChart">
        <img src="capitalV.png" id="V" />
        <div id="mainChart">
          <svg width="400" height="400"></svg>
          <br></br>
          <br></br>
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
            <option value="Animal">Dog or cat</option>
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
        <div id="subCharts"></div>
      </div>
    )
  }
}

export default PieChart
