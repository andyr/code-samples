
var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];


// Generate a dynamic dataset
var maxValue = 25;
var numValues = 20;

function generateData(pts) {
  pts = pts || numValues;
  var set = [];
  for(var i=0; i<pts; i++) {
    var newnumber = Math.round(Math.random() * maxValue);
    set.push( newnumber<2 ? newnumber+2 : newnumber );
  }
  return set;
};

var w = 600, h = 250,
  barPadding = 1,
  scaleHeight = 4;

// For setting x position of each bar
var xScale = d3.scale.ordinal()
  .domain( d3.range(dataset.length) ) // ordinal usually for enumerated values (Sun-Sat)
  .rangeRoundBands( [0, w], 0.05 );   // specifies width per bar and padding

var yScale = d3.scale.linear()
  .domain( [0, d3.max(dataset)] )     // rect heights set to min/max values for chart
  .range( [0, h] );                   // range of the heights falls in height of the chart


var svg = d3.select('body')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

// Generate vertical color coded bars based on the data
svg.selectAll('rect').data(dataset)
  .enter()
  .append('rect')
  .attr('x', function (d, i) {
    return xScale(i);
  })
  .attr('y', function (d) {
    return h - yScale(d);
  })
  .attr('width', function (d, i) {
    return xScale.rangeBand();
  })
  .attr('height', function (d) {
    return yScale(d);
  })
  .attr('fill', function (d) {
    //console.log(arguments);
    return 'rgb(0, 0, '+ (d * 10) +')'; 
  });

// Add text labels to the top of the bars
svg.selectAll('text').data(dataset)
  .enter()
  .append('text')
  .text(function (d) {
    return d;
  })
  .attr('x', function (d, i) {
    //return i * (w / dataset.length) + ((w / dataset.length - barPadding) / 2);
    return xScale(i) + xScale.rangeBand()/2;
  })
  .attr('y', function (d, i) {
    //return h - (d * scaleHeight) + (w / dataset.length / 2);
    return h - yScale(d) + 14;
  })
  .attr('font-family', 'sans-serif')
  .attr('font-size', '11px')
  .attr('fill', 'white')
  .attr('text-anchor', 'middle')

// When updating data from server (paging, etc.)
d3.select('.reload').on('click', function () {
  
  //dataset = generateData(numValues);

  var newnumber = Math.floor( Math.random() * maxValue );
  dataset.push( newnumber );
  console.log(dataset);

  // recalibrate y-axis
  // update the y-scale domain (don't need to recalibrate function)
  yScale.domain([0, d3.max(dataset)]);
  xScale.domain(d3.range(dataset.length));

  // -- bind visuals to new data --

  // Get a ref to set of elements data bound to.
  var bars = svg.selectAll('rect')
    .data(dataset);

  // References the enter selection
  bars.enter()
    .append('rect')
    .attr('x', w)   // set the x off the chart
    .attr('y', function (d) { return h - yScale(d); })
    .attr('width', xScale.rangeBand())
    .attr('height', function (d) { return yScale(d); })
    .attr('fill', function (d) {
      return 'rgb(0, 0, '+ (d*10) +')';
    });

  // Run transition on update selection
  bars.transition()
    .duration(500)
    .attr('x', function (d, i) { return xScale(i); })
    .attr('y', function (d) { return h - yScale(d); })
    .attr('height', function (d) { return yScale(d); })
    .attr('fill', function (d) {
      return 'rgb(0, 0, '+ d*10 +')';
    })

  var labels = svg.selectAll('text')
    .data(dataset);

  labels.enter()
    .append('text')
    .text(function (d) { return d; })
    .attr('x', w)
    .attr('y', function (d) { return h - yScale(d) + 14; })
    .attr('font-family', 'sans-serif')
    .attr('font-size', '11px')
    .attr('fill', 'white')
    .attr('text-anchor', 'middle')
  
  labels.transition()
    .duration(500)
    .attr('x', function (d, i) { return xScale(i) + xScale.rangeBand()/2; })

/*
  svg.selectAll('text')
    .data(dataset)
    .transition()
    .duration(500)
    .text(function (d) { return d; })
    .attr('x', function (d, i) {
      //console.log(i, xScale(i), xScale.rangeBand());
      return xScale(i) + xScale.rangeBand() / 2;
    })
    .attr('y', function (d) {
      return h - yScale(d) + 14;
    })
*/
});


