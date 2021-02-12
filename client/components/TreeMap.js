import React, {Component} from 'react'
import * as d3 from 'd3'

import './styles/TreeMap.css'
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

class TreeMap extends Component {
  constructor() {
    super()
    this.state = {
      chartData: [{name: 'loading...', value: '50'}],
      chartDataA: [{name: 'loading...', value: '50'}],
      chartDataB: [{name: 'loading...', value: '50'}],
      reset: [],
      color: '#8F7AA3',
      users: [],
      doc: [],
      filter: 'Hand',
      labelFilter: 'Hand',
      filterActive: false,
    }
    this.createMainTreeMap = this.createMainTreeMap.bind(this)
    this.createTreeMapA = this.createTreeMapA.bind(this)
    this.createTreeMapB = this.createTreeMapB.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.resetFilter = this.resetFilter.bind(this)
    this.chooseFilter = this.chooseFilter.bind(this)
    this.reloadMain = this.reloadMain.bind(this)
  }

  async componentDidMount() {
    window.scrollTo(0, 0)
    await db
      .collection('polls')
      .doc(this.props.pollKey)
      .onSnapshot((doc) => this.formatData(doc.data().answers))
  }

  componentDidUpdate() {
    this.reloadMain()
    this.createMainTreeMap()
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

  createMainTreeMap() {
    const dataFromState = {children: this.state.chartData}
    const svg = d3
      .select('#mainTreeMapDiv')
      .append('svg')
      .attr('id', 'MTM')
      .attr('width', 400)
      .attr('height', 400)
    const treemap = d3.treemap().size([400, 400]).padding(2)
    const root = d3.hierarchy(dataFromState).sum((d) => d.value)
    treemap(root)

    const cell = svg
      .selectAll('g')
      .data(root.leaves())
      .enter()
      .append('g')
      .attr('transform', (d) => `translate(${d.x0},${d.y0})`)
    const tile = cell
      .append('rect')
      .attr('class', 'tile')
      .attr('data-name', (d) => d.data.name)
      .attr('data-category', (d) => d.data.category)
      .attr('data-value', (d) => d.data.value)
      .attr('id', (d) => d.data.id)
      .attr('width', (d) => d.x1 - d.x0)
      .attr('height', (d) => d.y1 - d.y0)
      .attr('fill', '#8F7AA3')
    cell
      .append('text')
      .selectAll('tspan')
      .data((d) => d.data.name.split(/(?=[A-Z][^A-Z])/g)) //Regex
      .enter()
      .append('tspan')
      .attr('style', 'font-size: 13px')
      .attr('x', 4)
      .attr('y', (d, i) => 15 + i * 15)
      .text((d) => d)
  }

  createTreeMapA() {
    let dataFromState = this.state.chartDataA
    const filterWord = filterAB[this.state.filter][0]

    const dataFiltered = dataFromState.map((unit) => {
      unit.name = unit.name
        .split(' ')
        .filter((word) => !filterWord.includes(word))
        .join(' ')
      return unit
    })

    dataFromState = {children: dataFromState}

    const svg = d3
      .select('#TMFilterA')
      .append('svg')
      .attr('id', 'TMsvgA')
      .attr('width', 400)
      .attr('height', 400)
    const treemap = d3.treemap().size([400, 400]).padding(2)
    const root = d3.hierarchy(dataFromState).sum((d) => d.value)
    treemap(root)

    const cell = svg
      .selectAll('g')
      .data(root.leaves())
      .enter()
      .append('g')
      .attr('transform', (d) => `translate(${d.x0},${d.y0})`)
    const tile = cell
      .append('rect')
      .attr('class', 'tile')
      .attr('data-name', (d) => d.data.name)
      .attr('data-category', (d) => d.data.category)
      .attr('data-value', (d) => d.data.value)
      .attr('id', (d) => d.data.id)
      .attr('width', (d) => d.x1 - d.x0)
      .attr('height', (d) => d.y1 - d.y0)
      .attr('fill', '#8F7AA3')
    cell
      .append('text')
      .selectAll('tspan')
      .data((d) => d.data.name.split(/(?=[A-Z][^A-Z])/g)) //Regex
      .enter()
      .append('tspan')
      .attr('style', 'font-size: 13px')
      .attr('x', 4)
      .attr('y', (d, i) => 15 + i * 15)
      .text((d) => d)
  }

  createTreeMapB() {
    let dataFromState = this.state.chartDataB

    const filterWord = filterAB[this.state.filter][1]

    const dataFiltered = dataFromState.map((unit) => {
      unit.name = unit.name
        .split(' ')
        .filter((word) => !filterWord.includes(word))
        .join(' ')
      return unit
    })

    dataFromState = {children: dataFromState}

    const svg = d3
      .select('#TMFilterB')
      .append('svg')
      .attr('id', 'TMsvgB')
      .attr('width', 400)
      .attr('height', 400)
    const treemap = d3.treemap().size([400, 400]).padding(2)
    const root = d3.hierarchy(dataFromState).sum((d) => d.value)
    treemap(root)

    const cell = svg
      .selectAll('g')
      .data(root.leaves())
      .enter()
      .append('g')
      .attr('transform', (d) => `translate(${d.x0},${d.y0})`)
    const tile = cell
      .append('rect')
      .attr('class', 'tile')
      .attr('data-name', (d) => d.data.name)
      .attr('data-category', (d) => d.data.category)
      .attr('data-value', (d) => d.data.value)
      .attr('id', (d) => d.data.id)
      .attr('width', (d) => d.x1 - d.x0)
      .attr('height', (d) => d.y1 - d.y0)
      .attr('fill', '#8F7AA3')
    cell
      .append('text')
      .selectAll('tspan')
      .data((d) => d.data.name.split(/(?=[A-Z][^A-Z])/g)) //Regex
      .enter()
      .append('tspan')
      .attr('style', 'font-size: 13px')
      .attr('x', 4)
      .attr('y', (d, i) => 15 + i * 15)
      .text((d) => d)
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

    const currentFilter = this.state.filter

    await this.setState({
      chartDataA: splitResultA,
      chartDataB: splitResultB,
      labelFilter: currentFilter,
      filterActive: true,
    })
    this.createTreeMapA()
    this.createTreeMapB()

    const filterChartA = document.getElementById('TMFilterA')
    const filterChartB = document.getElementById('TMFilterB')
    const subTMLabelA = document.getElementById('subTMLabelA')
    const subTMLabelB = document.getElementById('subTMLabelB')
    const v = document.getElementById('VTM')

    filterChartA.className = 'TMfilterRideA'
    filterChartB.className = 'TMfilterRideB'
    subTMLabelA.className = 'subTMLabelAVisible'
    subTMLabelB.className = 'subTMLabelBVisible'
    v.className = 'vFlareTM'
  }

  resetFilter() {
    const {reset} = this.state
    this.setState({
      chartDataA: reset,
      chartDataB: reset,
      filterActive: false,
    })
    d3.select('#TMsvgA').remove()
    d3.select('#TMsvgB').remove()
    const filterChartA = document.getElementById('TMFilterA')
    const filterChartB = document.getElementById('TMFilterB')
    const subTMLabelA = document.getElementById('subTMLabelA')
    const subTMLabelB = document.getElementById('subTMLabelB')
    const v = document.getElementById('VTM')
    filterChartA.className = 'filterStartTM'
    filterChartB.className = 'filterStartTM'
    subTMLabelA.className = 'subTMLabelAHidden'
    subTMLabelB.className = 'subTMLabelBHidden'
    v.className = 'vHiddenTM'
  }

  reloadMain() {
    d3.select('#MTM').remove()
  }

  render() {
    return (
      <div id="singleTMViditFull">
        <div id="testChartTM">
          <img src="/capitalV.png" id="VTM" className="vHiddenTM" />
          <div id="mainTreeMap">
            <div id="mainTreeMapDiv"></div>

            <br></br>
            <br></br>
            <div id="filterControlsTM">
              <label htmlFor="filter">Choose a filter</label>
              <br></br>
              <select
                name="filter"
                id="filterChoiceTM"
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
                id="activateFilterTM"
              >
                Activate Filter
              </button>
              <br></br>
              <br></br>
              <button
                type="button"
                onClick={this.resetFilter}
                id="resetFilterTM"
              >
                Reset Filter
              </button>
            </div>
          </div>
          <div id="subTreeMaps">
            <p id="subTMLabelA" className="subTMLabelAHidden">
              {filterAB[this.state.labelFilter][0]}
            </p>
            <p id="subTMLabelB" className="subTMLabelBHidden">
              {filterAB[this.state.labelFilter][1]}
            </p>
            <div id="TMFilterA" className="FilterStartTM"></div>
            <div id="TMFilterB" className="FilterStartTM"></div>
          </div>
        </div>
      </div>
    )
  }
}

export default TreeMap
