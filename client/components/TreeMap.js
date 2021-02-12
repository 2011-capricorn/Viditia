import React, {Component} from 'react'
import * as d3 from 'd3'

import './styles/TreeMap.css'
import firebase from '../../public/firebase'
import filterAB from '../filterAB'

const db = firebase.firestore()

class TreeMap extends Component {
  constructor() {
    super()
    this.state = {
      chartData: [{name: 'loading...', value: '50'}],
      chartDataA: [{name: 'loading...', value: '50'}],
      chartDataB: [{name: 'loading...', value: '50'}],
      reset: [],
      users: [],
      doc: [],
      filter: 'Hand',
      labelFilter: 'Hand',
      filterActive: false,
      unsubscribe: null,
    }
    this.createGraph = this.createGraph.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.resetFilter = this.resetFilter.bind(this)
    this.chooseFilter = this.chooseFilter.bind(this)
    this.reloadMain = this.reloadMain.bind(this)
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    this.setState({
      unsubscribe: db
        .collection('polls')
        .doc(this.props.pollKey)
        .onSnapshot((doc) => this.formatData(doc.data().answers)),
    })
  }

  componentDidUpdate() {
    this.reloadMain()
    this.createGraph('#mainTreeMapDiv', 'MTM', 'chartData')
  }

  componentWillUnmount() {
    this.state.unsubscribe()
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

      const preProcess = data.reduce((result, next) => {
        if (result[next.answer]) result[next.answer]++
        else result[next.answer] = 1
        return result
      }, {})

      this.setState({
        users: data.map((entry) => entry.userKey),
      })

      let result = Object.keys(preProcess).map((key) => ({
        name: key.slice(0, 4),
        value: preProcess[key],
      }))

      this.setState({chartData: result, reset: result})
    }
  }

  chooseFilter(e) {
    let filter = e.target.value
    this.setState({
      filter: filter,
    })
  }

  createSVG(selectValue, idValue) {
    return d3
      .select(selectValue)
      .append('svg')
      .attr('id', idValue)
      .attr('width', 400)
      .attr('height', 400)
  }

  createTreeMap() {
    return d3.treemap().size([400, 400]).padding(2)
  }

  createRoot(dataFromState) {
    return d3.hierarchy(dataFromState).sum((d) => d.value)
  }

  createCell(svg, root) {
    return svg
      .selectAll('g')
      .data(root.leaves())
      .enter()
      .append('g')
      .attr('transform', (d) => `translate(${d.x0},${d.y0})`)
  }

  createTile(cell) {
    return cell
      .append('rect')
      .attr('class', 'tile')
      .attr('data-name', (d) => d.data.name)
      .attr('data-category', (d) => d.data.category)
      .attr('data-value', (d) => d.data.value)
      .attr('id', (d) => d.data.id)
      .attr('width', (d) => d.x1 - d.x0)
      .attr('height', (d) => d.y1 - d.y0)
      .attr('fill', '#8F7AA3')
  }

  appendText(cell) {
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

  createGraph(selectValue, idValue, chartData, filtering) {
    let dataFromState = !filtering
      ? {children: this.state[chartData]}
      : this.state[chartData]
    if (filtering) {
      const filterWord = filterAB[this.state.filter][0]

      const dataFiltered = dataFromState.map((unit) => {
        unit.name = unit.name
          .split(' ')
          .filter((word) => !filterWord.includes(word))
          .join(' ')
        return unit
      })

      dataFromState = {children: dataFromState}
    }

    const svg = this.createSVG(selectValue, idValue)
    const treemap = this.createTreeMap()
    const root = this.createRoot(dataFromState)
    treemap(root)

    const cell = this.createCell(svg, root)
    const tile = this.createTile(cell)
    this.appendText(cell)
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

    const {filter} = this.state

    this.setState({
      chartDataA: splitResultA,
      chartDataB: splitResultB,
      labelFilter: filter,
      filterActive: true,
    })
    this.createGraph('#TMFilterA', 'TMsvgA', 'chartDataA', true)
    this.createGraph('#TMFilterB', 'TMsvgB', 'chartDataB', true)

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
