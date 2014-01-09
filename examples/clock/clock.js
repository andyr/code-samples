
exports.showClock = function(req, res){
  var data = {
    title: 'Clock'
  };
  res.render('clock', data);
};


/*
// loop for drawing segments around a clock - top, left, angle
// i=0 corresponds to 12
el = {}; // tick element
angle = 0;
for (i=0; i<12; i++) {
  var h_offset = 150;
  var top=0, left=0;
  top = i + offset;
  left = i + offset; //(start at 0,0)

  top = top - (150 * sin(60))
}

*/
