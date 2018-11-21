import p5 from 'p5';
import Siema from 'siema';

new p5(function(p5) {
  let lines;
  let lineColour = {
    rainbow: true,
    orange: false,
    yellow: false,
    red: false,
    purple: false,
    pink: false,
    green: false,
    blue: false 
  } // data structure to allow users to set line colours on function call in console

  window.changeColour = (colour) => {
    lineColour = {
      rainbow: false,
      orange: false,
      yellow: false,
      red: false,
      purple: false,
      pink: false,
      green: false,
      blue: false
    }

    const printMessage = () => {
      return console.log("%c Try other colours!", "background: #000080; color: #bada55");
    }

    if (colour === 'orange') {
      lineColour.orange = true;
      printMessage();
    } else if (colour === 'yellow') {
      lineColour.yellow = true;
      printMessage();
    } else if (colour === 'red') {
      lineColour.red = true;
      printMessage();
    } else if (colour === 'purple') {
      lineColour.purple = true;
      printMessage();
    } else if (colour === 'pink') {
      lineColour.pink = true;
      printMessage();
    } else if (colour === 'green') {
      lineColour.green = true;
      printMessage();
    } else if (colour === 'blue') {
      lineColour.blue = true;
      printMessage();
    } else {
      lineColour.rainbow = true;
      printMessage();
    }
  } // allows for user to set colour when calling function in console


  p5.setup = () => {
    let canvas = p5.createCanvas(((80 / 100) * p5.windowWidth), ((80 / 100) * p5.windowHeight));
    canvas.parent('canvas-container');
    p5.colorMode(p5.HSB, 255); // Use Hue Saturation Brightness, with a range of 0-255 for each
    lines = new LineSystem();
  }

  p5.draw = () => {
    p5.background('#ffffff');
    lines.run();
    lines.addParticle();
  }

  p5.windowResized = () => {
    p5.resizeCanvas(((80 / 100) * p5.windowWidth), ((80 / 100) * p5.windowHeight));
  }

  // Setting up Line class with relevant "blueprint values"
  const Line = function () {
    this.currentColour = () => {
      const colourRange = {
        rainbow: Math.floor(p5.random(0, 255)),
        orange: Math.floor(p5.random(5, 40)),
        yellow: Math.floor(p5.random(35, 55)),
        red: Math.floor(p5.random(220, 255)),
        purple: Math.floor(p5.random(160, 210)),
        pink: Math.floor(p5.random(200, 230)),
        green: Math.floor(p5.random(50, 110)),
        blue: Math.floor(p5.random(110, 170))
      }

      for (const key in lineColour) {
        if (lineColour[key]) {
          return colourRange[key]
        }
      }
    }
    
    this.colour = this.currentColour(); // Set a random colour for every line
    this.x = p5.random(0, (p5.windowWidth)); // unique X coordinate for this particular particle
    this.y = p5.random(0, (p5.windowHeight)); // unique Y coordinate for this particular particle
    this.lifespan = 40; // How long a line "lives" before it is taken out of the array of Particles. Taken out when it gets to 0.
    this.baseIncrementX = this.x / this.lifespan; // make sure every line has its own increment counter. Division by the lifespan enables use to get different angled lines that are incremented at a steady rate.
    this.baseIncrementY = this.y / this.lifespan; // make sure every line has its own increment counter. Division by the lifespan enables use to get different angled lines that are incremented at a steady rate.
    this.incrementLineX = 0; // need to keep a seperate counter between how much the line increments and how much it is incremented by so that the rate it increments remains constant. 
    this.incrementLineY = 0; // need to keep a seperate counter between how much the line increments and how much it is incremented by so that the rate it increments remains constant.     
    this.vectorHistory = [p5.createVector(this.x, this.y)]; // initialise an array with the first coordinate ready to access for the draw function.
  };

  // Method to display the line.
  Line.prototype.display = function () {
    if (!this.isDead()) {
      this.lifespan -= 1;
      let v = p5.createVector(this.x + this.incrementLineX, this.y + this.incrementLineY);
      // at every iteration, we save the current coordinate into an array so we have access to all the coordinates later on for use.
      this.vectorHistory.push(v);
    } // we only want to use createVector function if the line is still "alive"
    p5.stroke( this.colour, 120, 255);
    p5.strokeWeight(4);
    p5.line(this.vectorHistory[0].x, this.vectorHistory[0].y, this.vectorHistory[this.vectorHistory.length - 1].x, this.vectorHistory[this.vectorHistory.length - 1].y);
    // Every new coordinate is stored in the vectorHistory array by the createVector function
    // At every loop of the draw function, we reset the background colour which effectively makes everything clear.
    // The coordinate is incremented by a given amount  and then we take the first X and Y value in the stored vectoryHistory and final X and Y value in the same array (which represents the most recent increment) and draw a line between both points.
  };

  // once the line has been fully drawn, make it incrementally disappear
  Line.prototype.disappear = function () {
    this.vectorHistory.splice(0, 1);
    this.display();
  };

  Line.prototype.isDead = function () {
    return this.lifespan < 0;
  };

  const LineSystem = function () {
    this.lines = [];
  };

  LineSystem.prototype.addParticle = function () {
    this.lines.push(new Line());
  };

  LineSystem.prototype.run = function () {
    for (let i = 0; i < this.lines.length; i++) {
      let line = this.lines[i];
      if (line.isDead()) {
        if (line.vectorHistory.length === 1) {
          this.lines.splice(0, 1);
        } else {
          line.disappear();
        }
      } else {
        line.incrementLineX += line.baseIncrementX; // adding the base increment so that the line is increased at a smooth rate.
        line.incrementLineY += line.baseIncrementY; // adding the base increment so that the line is increased at a smooth rate.
        line.display();
      }
    }
  };
})

document.addEventListener('DOMContentLoaded', function(){
  console.log("%c The biggest reason you should hire me is because my mum thinks I'm cool.", "background: #000080; color: #bada55");
  console.log("%c Like the p5 animation? Want to change the colour (cause you are boring and don't like the rainbow)? Call changeColour() and pass it string for a colour you like! Eg changeColour('red').", "background: #000080; color: #bada55");

  const positionName = () => {
    const p5Canvas = document.getElementById('p5');
    const name = document.getElementById('name');
    name.style.top = (p5Canvas.getBoundingClientRect().height - name.getBoundingClientRect().height) / 2 + "px";
    name.style.left = (p5Canvas.getBoundingClientRect().width - name.getBoundingClientRect().width) / 2 + "px";
  } // position element smack in the middle while still having the padding a particular size.

  positionName();

  const mySiema = new Siema({
    duration: 600,
    loop: true
  }); // Code for carousel

  const navbarButton = document.getElementsByClassName("js-navbar-button")[0];
  navbarButton.addEventListener("click", function (e) {
    const navbarIcon = document.getElementsByClassName("navbar-icon")[0];
    const navbar = document.getElementById('navbar');
    e.preventDefault();
    navbarIcon.classList.toggle('is-active');
    navbar.classList.toggle('navbar-container--transition');
  }, false);

  window.addEventListener('resize', function() {
    positionName();
  }) 

  document.getElementById('prev').addEventListener('click', () => mySiema.prev());
  document.getElementById('next').addEventListener('click', () => mySiema.next());
}, false);