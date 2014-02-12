
var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

/*
d3.select('body').selectAll('div')
  .data(dataset)
  .enter()
  .append('div')
  .attr('class', 'bar')
  .style('height', function (d) {
    var barHeight = d * 5;
    return barHeight + 'px';
  })
*/
var w = 500, h = 200,
  barPadding = 1,
  scaleHeight = 4;

var svg = d3.select('body')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

// Generate vertical color coded bars based on the data
svg.selectAll('rect').data(dataset)
  .enter()
  .append('rect')
  .attr('x', function (d, i) {
    return i * (w / dataset.length);
  })
  .attr('y', function (d) {
    return h - (d*scaleHeight);
  })
  .attr('width', function (d, i) {
    return (w / dataset.length) - barPadding;
  })
  .attr('height', function (d) {
    return d * scaleHeight;
  })
  .attr('fill', function (d) {
    console.log(arguments);
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



