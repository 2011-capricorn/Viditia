import React, {Component} from 'react'
import * as d3 from 'd3'
import firebase from '../../public/firebase'
const db = firebase.firestore()

// const data = [
//   {
//     categorie: "Student",
//     values: [
//       {
//           value: 0,
//           rate: "Not at all"
//       },
//       {
//           value: 4,
//           rate: "Not very much"
//       },
//       {
//           value: 12,
//           rate: "Medium"
//       },
//       {
//           value: 6,
//           rate: "Very much"
//       },
//       {
//           value: 0,
//           rate: "Tremendously"
//       }
//     ]
//   },
//   {
//     categorie: "Liberal Profession",
//     values: [
//       {
//           value: 1,
//           rate: "Not at all"
//       },
//       {
//           value: 21,
//           rate: "Not very much"
//       },
//       {
//           value: 13,
//           rate: "Medium"
//       },
//       {
//           value: 18,
//           rate: "Very much"
//       },
//       {
//           value: 6,
//           rate: "Tremendously"
//       }
//     ]
//   }
// ]

class BarChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chartData: [],
      reset: [],
      colors: [d3.rgb(226, 138, 138), d3.rgb(116, 176, 228)],
      users: [],
      doc: [],
      filter: '',
    }
    this.createBarChart = this.createBarChart.bind(this)
  }

  componentDidMount() {
    db.collection('polls')
      .doc('Jjxs5iWmny5Ox4cvhZPA')
      .onSnapshot((doc) => this.formatData(doc.data().answers))
    if (this.state.chartData.length) {
      this.createBarChart()
    }
  }

  componentDidUpdate() {
    if (this.state.chartData.length) {
      this.createBarChart()
    }
  }

  formatData(data) {
    if (data.length) {
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

  // createBarChart() {
  //   var margin = {top: 20, right: 20, bottom: 30, left: 40},
  //   width = 960 - margin.left - margin.right,
  //   height = 500 - margin.top - margin.bottom;

  //   var x0 = d3.scale.ordinal()
  //       .rangeRoundBands([0, width], .1);

  //   var x1 = d3.scale.ordinal();

  //   var y = d3.scale.linear()
  //       .range([height, 0]);

  //   var xAxis = d3.svg.axis()
  //       .scale(x0)
  //       .tickSize(0)
  //       .orient("bottom");

  //   var yAxis = d3.svg.axis()
  //       .scale(y)
  //       .orient("left");

  //   var color = d3.scale.ordinal()
  //       .range(["#ca0020","#f4a582","#d5d5d5","#92c5de","#0571b0"]);

  //   var svg = d3.select('body').append("svg")
  //       .attr("width", width + margin.left + margin.right)
  //       .attr("height", height + margin.top + margin.bottom)
  //     .append("g")
  //       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  //   d3.json("data.json", function(error, data) {

  //     var categoriesNames = data.map(function(d) { return d.categorie; });
  //     var rateNames = data[0].values.map(function(d) { return d.rate; });

  //     x0.domain(categoriesNames);
  //     x1.domain(rateNames).rangeRoundBands([0, x0.rangeBand()]);
  //     y.domain([0, d3.max(data, function(categorie) { return d3.max(categorie.values, function(d) { return d.value; }); })]);

  //     svg.append("g")
  //         .attr("class", "x axis")
  //         .attr("transform", "translate(0," + height + ")")
  //         .call(xAxis);

  //     svg.append("g")
  //         .attr("class", "y axis")
  //         .style('opacity','0')
  //         .call(yAxis)
  //     .append("text")
  //         .attr("transform", "rotate(-90)")
  //         .attr("y", 6)
  //         .attr("dy", ".71em")
  //         .style("text-anchor", "end")
  //         .style('font-weight','bold')
  //         .text("Value");

  //     svg.select('.y').transition().duration(500).delay(1300).style('opacity','1');

  //     var slice = svg.selectAll(".slice")
  //         .data(data)
  //         .enter().append("g")
  //         .attr("class", "g")
  //         .attr("transform",function(d) { return "translate(" + x0(d.categorie) + ",0)"; });

  //     slice.selectAll("rect")
  //         .data(function(d) { return d.values; })
  //     .enter().append("rect")
  //         .attr("width", x1.rangeBand())
  //         .attr("x", function(d) { return x1(d.rate); })
  //         .style("fill", function(d) { return color(d.rate) })
  //         .attr("y", function(d) { return y(0); })
  //         .attr("height", function(d) { return height - y(0); })
  //         .on("mouseover", function(d) {
  //             d3.select(this).style("fill", d3.rgb(color(d.rate)).darker(2));
  //         })
  //         .on("mouseout", function(d) {
  //             d3.select(this).style("fill", color(d.rate));
  //         });

  //     slice.selectAll("rect")
  //         .transition()
  //         .delay(function (d) {return Math.random()*1000;})
  //         .duration(1000)
  //         .attr("y", function(d) { return y(d.value); })
  //         .attr("height", function(d) { return height - y(d.value); });

  //     //Legend
  //     var legend = svg.selectAll(".legend")
  //         .data(data[0].values.map(function(d) { return d.rate; }).reverse())
  //     .enter().append("g")
  //         .attr("class", "legend")
  //         .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })
  //         .style("opacity","0");

  //     legend.append("rect")
  //         .attr("x", width - 18)
  //         .attr("width", 18)
  //         .attr("height", 18)
  //         .style("fill", function(d) { return color(d); });

  //     legend.append("text")
  //         .attr("x", width - 24)
  //         .attr("y", 9)
  //         .attr("dy", ".35em")
  //         .style("text-anchor", "end")
  //         .text(function(d) {return d; });

  //     legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","1");
  // })}

  createBarChart() {
    const data = this.state.chartData
    const width = 900
    const height = 450
    const margin = {top: 50, bottom: 50, left: 50, right: 50}

    const svg = d3
      .select('#d3-container')
      .append('svg')
      .attr('width', width - margin.left - margin.right)
      .attr('height', height - margin.top - margin.bottom)
      .attr('viewBox', [0, 0, width, height])

    const x = d3
      .scaleBand()
      .domain(d3.range(data.length))
      // .range([50, 00])
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

    // const color = d3.scaleOrdinal(this.state.colors)
    // const color = d3.scaleOrdinal(["#ca0020","#f4a582","#d5d5d5","#92c5de","#0571b0"])

    svg
      .append('g')
      .attr('fill', 'royalblue')
      // .attr("fill", function(d) { return color(d.rate) })
      .selectAll('rect')
      .data(data.sort((a, b) => d3.descending(a.value, b.value)))
      .join('rect')
      .attr('x', (d, i) => x(i))
      .attr('y', (d) => y(d.value))
      .attr('title', (d) => d.value)
      .attr('class', 'rect')
      .attr('height', (d) => y(0) - y(d.value))
      .attr('width', x.bandwidth())

    function yAxis(g) {
      g.attr('transform', `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(y).ticks(null, data.format))
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
  }

  render() {
    console.log('------>', this.state)
    return (
      <div id="d3-container" />
      // <svg
      //   ref={(node) => {
      //     this.node = node
      //     return this.node
      //   }}
      //   width={this.props.size[0]}
      //   height={this.props.size[1]}
      // ></svg>
    )
  }
}
export default BarChart
