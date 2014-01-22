var static_dataset = [
  [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
  [410, 12], [475, 44], [25, 67], [85, 21], [220, 88],
  [600, 150]
];

// Generate a dynamic dataset
var dataset = (function (pts) {
  var set = [];
  var xRange = Math.random() * 1000;
  var yRange = Math.random() * 1000;
  for(var i=0; i<pts; i++) {
    set.push([
      Math.round( Math.random() * xRange ),
      Math.round( Math.random() * yRange )
    ]);
  }
  return set;
})(50);

var w = 500,
    h = 300,
    padding = 30;


// Scale x positions to fall proportionally between padded edges of the svg
var xScale = d3.scale.linear()
  .domain([0, d3.max(dataset, function (d) {
    return d[0];    
  })])
  .range([padding, w - padding * 2]);

// Scale y positions to fall proportionally between padded edges of the svg
var yScale = d3.scale.linear()
  .domain([0, d3.max(dataset, function (d) { return d[1]; })])
  .range([h - padding, padding]);

// Radius scale
// Guarentee min radius of 2 and max 5 proportional to the y value
var rScale = d3.scale.linear()
  .domain([0, d3.max(dataset, function (d) { return d[1]; })])
  .range([2, 5])

var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient('bottom')
  .ticks(5);

var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient('left')
  .ticks(5);



// Draw the svg
var svg = d3.select('body')
            .append('svg')
            .attr('width', w)
            .attr('height', h);

// Draw circle elements and fix positions and radii
// to scale with the points in the dataset
svg.selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle')
  .attr('cx', function (d) {
    return xScale(d[0]);
  })
  .attr('cy', function (d) {
    return yScale(d[1]);
  })
  .attr('r', function (d) {
    return rScale(d[1]);
  });

/*
// Draw text elements at the same origins as the circles
svg.selectAll('text')
  .data(dataset)
  .enter()
  .append('text')
  .text(function (d) {
    return '(' + d[0] + ', ' + d[1] + ')'
  })
  .attr('x', function (d) {
    return xScale(d[0]);
  })
  .attr('y', function (d) {
    return yScale(d[1]);
  })
  .attr('font-family', 'sans-serif')
  .attr('font-size', '11px')
  .attr('fill', 'red');
*/


// Add a group element and call xAxis function
svg.append('g')
  .attr('class', 'axis')
  .attr('transform', 'translate(0, '+ (h - padding) +')')
  .call(xAxis);

svg.append('g')
  .attr('class', 'axis')
  .attr('transform', 'translate('+ padding +', 0)')
  .call(yAxis);


