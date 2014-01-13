

var sa=0, ma=0, ha=0,
    s_el = $('.second-hand'),
    m_el = $('.minute-hand'),
    h_el = $('.hour-hand');
var interval = 25;

setInterval(function () { 
  sa += 6/(1000/interval) % 360; // 6deg/s
  ma += 6/(60 * 1000/interval) % 360; // 6deg/min
  ha += 30/(3600 * 1000/interval) % 360; // 30deg/1hr
  
  function rotate(el, angle) {
    el.css({ transform: 'rotate('+angle+'deg)' });
  };

  rotate(s_el, sa);
  rotate(m_el, ma);
  rotate(h_el, ha);

}, interval);



