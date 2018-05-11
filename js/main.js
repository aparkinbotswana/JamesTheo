// const HexaFlip = require('hexaflip')
var OriDomi = require('oridomi')

document.addEventListener('DOMContentLoaded', function(){


  // var cubeSet = new HexaFlip(document.getElementById('hex'),
  //   {
  //     prince: ['For You', 'Prince', 'Dirty Mind', 'Controversy', '1999', 'Around the World in a Day'],
  //     curtis: ['Curtis', 'Roots', 'Super Fly', 'Back to the World', 'Got to Find a Way', 'Sweet Exorcist']
  //   }
  // );
  var folded = new OriDomi(document.getElementsByClassName('paper')[0], {
    vPanels:         5,     // number of panels when folding left or right (vertically oriented)
    hPanels:         3,     // number of panels when folding top or bottom
    speed:           1000,  // folding duration in ms
    ripple:          2,     // backwards ripple effect when animating
    shadingIntensity: 0.4,    // lessen the shading effect
    perspective:     800,   // smaller values exaggerate 3D distortion
    maxAngle:        40,    // keep the user's folds within a range of -40 to 40 degrees
    shading:         'soft' // change the shading type
  });

  // (img, {
    
 }, false);
