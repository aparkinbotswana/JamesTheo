$( document ).ready(function() {

  var initiated = false;
  var running = false;
  var previousId = null;

  function navMove (id) {
    if (running) return;

    running = true;
    $(previousId).slideUp(2000, function () {
      $(id).slideDown(2000, function () {
        running = false;
        previousId = id;
      });
    });
  };

  function navFunc() {
    var id = $(this).data('target');

    if (initiated) return navMove(id);

    initiated = true;
    running = true;
    $(id).slideDown(2000, function () {
      running = false;
      previousId = id;
    })
  }


  $( "#nav-about" ).click(navFunc);
  $( "#nav-projects" ).click(navFunc);
  $( "#nav-contact" ).click(navFunc);

  // $( "#nav-freelance" ).click(navFunc);


  particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 1200,
        "density": {
          "enable": true,
          "value_area": 600
        }
      },
      "color": {
        "value": "#612940"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 10,
          "color": "#612940"
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
        "distance": 35,
        "color": "#35CE8D",
        "opacity": 0.7,
        "width": 7
      },
      "move": {
        "enable": true,
        "speed": 4,
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
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "bubble"
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
          "distance": 1000,
          "size": 40,
          "duration": 3,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 50,
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
});
