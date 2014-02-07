
var w = 500,
    h = 300,
    padding = 30;

function generateData(pts) {
  pts = pts || 20;
  var set = [],
      maxRange = Math.random() * 1000;
  for(var i=0; i<pts; i++) {
    var n1 = Math.floor( Math.random() * maxRange );
    var n2 = Math.floor( Math.random() * maxRange );
    set.push([n1, n2]);
  }
  return set;
}

var dataset = [],
    numDataPoints = 50;

dataset = generateData(numDataPoints);

var xScale = d3.scale.linear()
  .domain([0, d3.max(dataset, function (d) { return d[0]; })])
  .range([padding, w - padding * 2]);

var yScale = d3.scale.linear()
  .domain([0, d3.max(dataset, function (d) { return d[1]; })])
  .range([h - padding, padding]);

var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient('bottom')
  .ticks(5);

var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient('left')
  .ticks(5);

var svg = d3.select('body')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

svg.append('clipPath')
  .attr('id', 'chart-area')
  .append('rect')
  .attr('x', padding)
  .attr('y', padding)
  .attr('width', w - padding * 3)
  .attr('height', h - padding * 2);

svg.append('g')
  .attr('id', 'circles')
  .attr('clip-path', 'url(#chart-area)')
  .selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle')
  .attr('cx', function (d) { return xScale(d[0]); })
  .attr('cy', function (d) { return yScale(d[1]); })
  .attr('r', 2);

svg.append('g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0, '+ (h-padding) +')')
  .call(xAxis);

svg.append('g')
  .attr('class', 'y axis')
  .attr('transform', 'translate('+ padding +', 0)')
  .call(yAxis);

d3.select('.reload').on('click', function () {
  dataset = generateData( numDataPoints );
  var duration = 1000;

  xScale.domain([0, d3.max(dataset, function (d) { return d[0]; })]);
  yScale.domain([0, d3.max(dataset, function (d) { return d[1]; })]);

  svg.selectAll('circle')
    .data(dataset)
    .transition()
    .duration(duration)
    .each('start', function () {
      d3.select(this)
        .attr('fill', 'red')
        .attr('r', 3);
    })
    .attr('cx', function (d, i) {
      return xScale(d[0]);
    })
    .attr('cy', function (d) {
      return yScale(d[1]);    
    })
/*    .each('end', function () {
      d3.select(this)
        .transition()
        .duration(duration)
        .attr('fill', 'black')
        .attr('r', 9);
    })
*/    .transition()
    .duration(duration)
    .attr('fill', 'orange')
    .attr('r', 7)
    .transition()
    .duration(duration)
    .attr('fill', 'black')
    .attr('r', 2);

  svg.select('.x')
    .transition()
    .duration(duration)
    .call(xAxis);

  svg.select('.y')
    .transition()
    .duration(duration)
    .call(yAxis);



});


