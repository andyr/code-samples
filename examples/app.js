
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');

/* routes returning exports */
var user = require('./routes/user');
var clock = require('./routes/clock');
var d3intro = require('./routes/d3-intro');

var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/clock', clock.showClock);
app.get('/d3/svg', d3intro.svg_example);
app.get('/d3/barchart', d3intro.d3_bar_chart);
app.get('/d3/barchart-dynamic', d3intro.d3_bar_chart_dynamic);
app.get('/d3/scatterplot', d3intro.scatterplot);
app.get('/d3/scatterplot-dynamic', d3intro.scatterplot_dynamic);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
