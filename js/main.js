$( document ).ready(function() {

  $( "#nav-fun" ).click(function() {
    $('.content').fadeOut(2000);
    $('#fun').delay(2000).fadeIn(2000);
  });

  $( "#nav-about" ).click(function() {
    $('.content').fadeOut(2000);
    $('#about').delay(2000).fadeIn(2000);
  });

  $( "#nav-projects" ).click(function() {
    $('.content').fadeOut(2000);
    $('#projects').delay(2000).fadeIn(2000);
  });

  $( "#nav-contact" ).click(function() {
    $('.content').fadeOut(2000);
    $('#contact').delay(2000).fadeIn(2000);
  });


  // onclick = "window.open(this.href)" // click function that opens new tab and directs to correct website.

  /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
  /* ---- particles.js config ---- */

  particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 600,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#35CE8D"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 10,
          "color": "#35CE8D"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": false,
        "distance": 150,
        "color": "#35CE8D",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "bounce",
        "bounce": true,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 140,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });


  /* ---- stats.js config ---- */

  var count_particles, stats, update;
  stats = new Stats;
  stats.setMode(0);
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  document.body.appendChild(stats.domElement);
  count_particles = document.querySelector('.js-count-particles');
  update = function() {
    stats.begin();
    stats.end();
    if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
      count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
    }
    requestAnimationFrame(update);
  };
  requestAnimationFrame(update);


});
