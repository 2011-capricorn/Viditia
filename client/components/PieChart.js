// import React from 'react';
// import * as d3 from 'd3'

// const PieChart = () => {
//   // set the dimensions and margins of the graph
//   let width = 600
//   height = 600
//   margin = 40

// // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
// let radius = Math.min(width, height) / 2 - margin

// // append the svg object to the div called 'my_dataviz'
// let svg = d3.select("#my_dataviz")
// .append("svg")
//   .attr("width", width)
//   .attr("height", height)
// .append("g")
//   .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// // Create dummy data
// let data = {a: 60, b: 34}

// let ref = {
//   a: "summer",
//   b: "winter"
// }

// let colorRange = ["#0000ff", "#ff0000"]

// // set the color scale
// let color = d3.scaleOrdinal()
// .domain(data)
// .range(colorRange);

// // Compute the position of each group on the pie:
// let pie = d3.pie()
// .value(function(d) {return d.value; })
// let data_ready = pie(d3.entries(data))
// // Now I know that group A goes from 0 degrees to x degrees and so on.

// // shape helper to build arcs:
// let arcGenerator = d3.arc()
// .innerRadius(0)
// .outerRadius(radius)

// // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
// svg
// .selectAll('mySlices')
// .data(data_ready)
// .enter()
// .append('path')
//   .attr('d', arcGenerator)
//   .attr('fill', function(d){ return(color(d.data.key)) })
//   .attr("stroke", "black")
//   .style("stroke-width", "2px")
//   .style("opacity", 0.7)

// // Now add the annotation. Use the centroid method to get the best coordinates
// svg
// .selectAll('mySlices')
// .data(data_ready)
// .enter()
// .append('text')
// .text(function(d){ return `${ref[d.data.key]} ${Math.round((d.endAngle - d.startAngle)/(2*Math.PI)*100)}%`})
// .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
// .style("text-anchor", "middle")
// .style("font-size", 17)

// let button = document.getElementById("filter");

// button.addEventListener("click", e => {
// d3.select("svg").remove();

// // console.log('button clicked');
// let width = 600
//   height = 600
//   margin = 40

// let radius = Math.min(width, height) / 2 - margin

// let svg = d3.select("#my_dataviz")
// .append("svg")
//   .attr("width", width)
//   .attr("height", height)
// .append("g")
//   .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// let data = {a: 60, b: 34}
// data.a = 48;
// data.b = 33;
// data.c = 12;
// data.d = 1;
// let ref = {
//   a: "summer",
//   b: "winter"
// }

// ref.a = "summer (right handed)";
// ref.b = "winter (right handed)";
// ref.c = "summer (left handed)";
// ref.d = "winter (left handed)";

// let colorRange = ["#0000ff", "#ff0000", "#00ff00", "#ffff00"]

// let color = d3.scaleOrdinal()
// .domain(data)
// .range(d3.schemeSet2);

// let pie = d3.pie()
// .value(function(d) {return d.value; })
// let data_ready = pie(d3.entries(data))

// let arcGenerator = d3.arc()
// .innerRadius(0)
// .outerRadius(radius)

// svg
// .selectAll('mySlices')
// .data(data_ready)
// .enter()
// .append('path')
//   .attr('d', arcGenerator)
//   .attr('fill', function(d){ return(color(d.data.key)) })
//   .attr("stroke", "black")
//   .style("stroke-width", "2px")
//   .style("opacity", 0.7)

// svg
// .selectAll('mySlices')
// .data(data_ready)
// .enter()
// .append('text')
// .text(function(d){ return `${ref[d.data.key]} ${Math.round((d.endAngle - d.startAngle)/(2*Math.PI)*100)}%`})
// .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
// .style("text-anchor", "middle")
// .style("font-size", 17)
// })

// }

// export default PieChart
