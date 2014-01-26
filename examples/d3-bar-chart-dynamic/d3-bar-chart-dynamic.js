
var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];


// Generate a dynamic dataset
var maxValue = 100;
                
function generateData(pts) {
  pts = pts || 20;
  var set = [];
  for(var i=0; i<pts; i++) {
    set.push( Math.round( Math.random() * maxValue ) );
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
    return i * (w / dataset.length) + ((w / dataset.length - barPadding) / 2);
  })
  .attr('y', function (d, i) {
    return h - (d * scaleHeight) + (w / dataset.length / 2);
  })
  .attr('font-family', 'sans-serif')
  .attr('font-size', '11px')
  .attr('fill', 'white')
  .attr('text-anchor', 'middle')

// When updating data from server (paging, etc.)
d3.select('.reload').on('click', function () {
  dataset = generateData();
  console.log(dataset);

  // update the y-scale domain (don't need to recalibrate function)
  yScale.domain([0, d3.max(dataset)]);

  // bind visuals to new data
  svg.selectAll('rect')
    .data(dataset)
    .transition()
    .delay(function (d, i) {
      return i * 20;
    })
    .duration(500)
    .ease('elastic')
    .attr('y', function (d) {
      return h - yScale(d);
    })
    .attr('height', function (d) {
      return yScale(d);
    })
    .attr('fill', function (d) {
      return 'rgb(0, 0, '+ d*10 +')';
    })

  svg.selectAll('text')
    .data(dataset)
    .transition()
    .duration(500)
    .delay(function (d, i) {
      return i * 20;
    })
    .ease('elastic')
    .text(function (d) {
      return d;
    })
    .attr('x', function (d, i) {
      return xScale(i) + xScale.rangeBand() / 2;
    })
    .attr('y', function (d) {
      return h - yScale(d) + 14;
    })

});


