import * as d3 from 'd3';
import React, { useEffect, RefObject } from 'react';
import './D3Demo.css';

// inspiration:
// https://github.com/Apress/integrating-d3.js-with-react/blob/main/ch04-05/histogram-d3-ts/src/components/Histogram/Histogram.tsx

const initChart = (dataset: any) => {
  
  const w = 900;
  const h = 500;

  const padding = 60;

  const parseTime = d3.timeParse("%Y-%m-%d");
  dataset = dataset.map((elem: any) => [parseTime(elem[0]), elem[1], elem[0]]);

  const xScale = d3.scaleTime()
    .domain(d3.extent(dataset, (d: any) => (d)[0]) as any)
    .range([padding, w - padding]);
  const yScale = d3.scaleLinear()
     .domain([0, d3.max(dataset, (d: any) => d[1])] as any)
     .range([h - padding, padding]);
  
  const svg = d3.select("#svg_container")
    .append("svg")
    .attr("width", w)
    .attr("height", h);
  
  // create a tooltip
  var Tooltip = d3.select("#svg_container")
    .append("div")
    .style("opacity", 1)
    .attr("class", "tooltip")
    .attr("id", "tooltip")
    .style("background-color", "#36C9C6")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("position", "absolute")
    .style("opacity", 0)

  // Three function that change the tooltip when user hover / move / leave a cell
  // var mouseover = function() {
  //   Tooltip
  //     .style("opacity", 1)
  //   d3.select(this)
  //     .style("opacity", 1)
  // }
  // var mousemove = function(d: any) {
  //   Tooltip
  //     .html(`Date: ${d.srcElement.dataset.date} GDP:\n${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(parseInt(d.srcElement.dataset.gdp))} Billion`)
  //     .style("left", (d3.pointer(d)[0] + 30) + "px")
  //     .style("top", (d3.pointer(d)[1] + 0) + "px")
  //   .attr('data-date', d.srcElement.dataset.date)
  // }
  // var mouseleave = function() {
  //   Tooltip
  //     .style("opacity", 0)
  //   d3.select(this)
  //     .style("opacity", 0.8)
  // }

  console.log(dataset);
  
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);
  svg.selectAll("rect")
     .data(dataset)
     .enter()
     .append("rect")
     .attr("x", (d: any, i) => xScale(d[0]))
     .attr("y", (d: any, i) => yScale(d[1]))
     .attr("width", 4)
     .attr("height", (d: any, i) => h - yScale(d[1]) - padding)
     .attr("fill", "navy")
     .attr("class", "bar")
      .attr("data-month", (d: any) => d.month)
      .attr("data-year", (d: any) => d.year)
      .attr("data-variance", (d: any) => d.variance)
     .attr("data-date", (d: any) => d[2])
     .attr("data-gdp", (d: any) => d[1])
    // .on("mouseover", mouseover)
    // .on("mousemove", mousemove)
    // .on("mouseleave", mouseleave)

  svg.append("g")
     .attr("transform", "translate(0," + (h - padding) + ")")
     .attr("id", "x-axis")
     .call(xAxis);
  
  svg.append("g")
     .attr("transform", `translate(${padding}, 0)`)
     .attr("id", "y-axis")
     .call(yAxis);
  
}
const initApp = () => {
  const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';
  fetch(url)
    .then(res => {
      if (res.status === 200) {
        return res.json()
      }
      throw Error("Request for data failed");
    })
    .then(data => {
      initChart(data.data);
    })
}
const D3Demo = () => {
  const ref: RefObject<HTMLDivElement> = React.createRef()

  useEffect(() => {
    initApp()
  })

  // const draw = () => {
  //   d3.select(ref.current).append('p').text('Hello World')
  //   d3.select('svg').append('g').attr('transform', 'translate(250, 0)').append('rect').attr('width', 500).attr('height', 500).attr('fill', 'tomato')
  // }
  return (
    <div className="container">
      <div className="heading">
        <h1 id="title" className="title">United States GDP</h1>
        <div className="chart_container"> 
          <div id="svg_container" className="svg_container">
          </div>
        </div>
      </div>
    </div>
  )
}
export default D3Demo;