
exports.svg_example = function(req, res) {
  res.render('svg-example', { title: 'd3 SVG drawing examples' });
};

exports.d3_bar_chart = function (req, res) {
  res.render('d3-bar-chart', { title: 'D3 Bar Chart example'});
};

exports.scatterplot = function(req, res) {
  res.render('d3-scatterplot', { title: 'D3 Scatterplot example' });
};

exports.d3_bar_chart_dynamic = function (req, res) {
  res.render('d3-bar-chart-dynamic', { title: 'D3 Bar chart with random data and animation' });
};

exports.scatterplot_dynamic = function(req, res) {
  res.render('d3-scatterplot-dynamic', { title: 'D3 Dynamic Scatterplot' });
};
