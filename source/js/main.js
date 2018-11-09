import p5 from 'p5';

new p5(function(p5) {
  let lines;

  p5.setup = () => {
    let canvas = p5.createCanvas(((80 / 100) * p5.windowWidth), ((80 / 100) * p5.windowHeight));
    canvas.parent('canvas-container');
    p5.colorMode(p5.HSB, 255); // Use Hue Saturation Brightness, with a range of 0-255 for each
    lines = new LineSystem();
  }

  p5.draw = () => {
    p5.background('#f9f9f9')
    lines.run();
    lines.addParticle();
  }

  p5.windowResized = () => {
    p5.resizeCanvas(((80 / 100) * p5.windowWidth), ((80 / 100) * p5.windowHeight));
  }

  // Setting up Line class with relevant "blueprint values"
  const Line = function () {
    this.lifespan = 40; // How long a line "lives" before it is taken out of the array of Particles. Taken out when it gets to 0.
    this.increment = 1; // make sure every line has its own increment counter
    this.colour = Math.floor(p5.random(0, 255)); // Set a random colour for every line
    this.x = p5.random(0, (p5.windowWidth - 200)); // unique X coordinate for this particular particle
    this.y = p5.random(0, (p5.windowHeight - 200)); // unique Y coordinate for this particular particle
    this.isDead = false;
    this.vectorHistory = [p5.createVector(this.x, this.y)]; // initialise an array with the first coordinate ready to access for the draw function.
  };

  // Method to display
  Line.prototype.display = function () {
    if (!this.isDead) {
      this.lifespan -= 1;
      let v = p5.createVector(this.x + this.increment, this.y + this.increment);
      // at every iteration, we save the current coordinate into an array so we have access to all the coordinates later on for use.
      this.vectorHistory.push(v);
      if (this.lifespan <= 0) {
        this.isDead = true;
      }
    } // we only want to use createVector function if the line is still "alive"
     

    // var startY = p5.random(0, p5.windowHeight - 200);
    // var startX = p5.random(0, p5.windowWidth - 200);
    // p5.stroke(p5.random(0, 255), 120, 255);
    // p5.line(startX, startY, startX + p5.random(startX + 100, startX + 100), startY + p5.random(startY + 100, startY + 100));
    p5.stroke( this.colour, 120, 255);
    p5.line(this.vectorHistory[0].x, this.vectorHistory[0].y, this.vectorHistory[this.vectorHistory.length - 1].x, this.vectorHistory[this.vectorHistory.length - 1].y);
    // Every new coordinate is stored in the vectorHistory array by the createVector function
    // At every loop of the draw function, we reset the background colour which effectively makes everything clear.
    // The coordinate is incremented by a given amount  and then we take the first X and Y value in the stored vectoryHistory and final X and Y value in the same array (which represents the most recent increment) and draw a line between both points.
    p5.strokeWeight(4);
  };

  // once the line has been fully drawn, make it incrementally disappear
  Line.prototype.disappear = function () {
    this.vectorHistory.splice(0, 1);
    this.display();
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
      if (line.isDead) {
        if (line.vectorHistory.length === 1) {
          this.lines.splice(0, 1);
        } else {
          line.disappear();
        }
      } else {
        line.increment += 5; // making sure increment increases for every instance of Line, not every Line simultaneously 
        line.display();
      }
    }
    // console.log(this.lines[0]);
// for (let index = 0; index < array.length; index++) {
//   const element = array[index];
  
// }
    // console.log(this.lines)

  };
})
document.addEventListener('DOMContentLoaded', function(){
  // const canvas = document.getElementById('defaultCanvas0')
  // console.log(canvas)
  // const projects = document.getElementsByClassName('projects')
  // const projectsArray = Array.from(projects);

  // projectsArray.map((project) => {
  //   project.addEventListener('mouseover', function(){
  //     document.getElementById(project.dataset.target).classList.remove('noscale')
  //   })

  //   project.addEventListener('mouseleave', function () {
  //     document.getElementById(project.dataset.target).classList.add('noscale')
  //   })
  // })

}, false);

  // const navBarMobile = document.getElementById('nav-column-mobile');
  // const mobileNav = document.getElementById('mobile-nav')
  // const headingName = document.getElementById('heading-name');
  // const content = document.getElementById('content');
  // const mobile = document.getElementsByClassName('mobile');
  // const contentMargin = document.getElementsByClassName('content__margin');
  // const picture = document.getElementById('picture');
  // const myIframe = document.getElementById('iframe');

  // function contentWidth() {
  //   let pictureWidth = picture.getBoundingClientRect().width
  //   for (let i = 0; i < contentMargin.length; i++) {
  //     contentMargin[i].style.width = `${pictureWidth}px`;
  //   }
  //     myIframe.style.width = picture.getBoundingClientRect().width + "px";
  //     myIframe.style.height = picture.getBoundingClientRect().height + "px";
  // } // resizes the iframe and images 

  // picture.addEventListener("load", function () {
  //   contentWidth();
  // }); // This is for the benefit of Firefox. Chrome loads and executes everything properly
  //     // But for some reason Firefox images in the DOM have not fully loaded yet and this ensures they have before taking width measurement.


  // let stickPoint = getDistance(headingName);


  // function getDistance(el) {
  //   let topDist = el.offsetTop;
  //   return topDist;
  // }

  // // this chunk of code for sticky header
  // let stuck = false;
  // window.onscroll = function(e) {
  //   let distance = getDistance(headingName) - window.pageYOffset;
  //   let offset = window.pageYOffset;
  //   let contentOffset = getDistance(content)
  //   if ( (distance <= 0) && !stuck) {
  //     content.style.marginTop = contentOffset + 'px'  
  //     headingName.style.position = 'fixed';
  //     headingName.style.top = '0px';
  //     stuck = true;
  //   } else if (stuck && (offset <= stickPoint)){
  //     headingName.style.position = 'static';
  //     content.style.marginTop = '0px'  
  //     stuck = false;
  //   }
  // } // this chunk of code for sticky header


  // // this chunk of code for anchor tag scroll
  // function anchorLinkHandler(e) {
  //   let headerOffset = getDistance(content);
  //   const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
  //   e.preventDefault();
  //   const targetID = this.getAttribute("href");
  //   const targetAnchor = document.querySelector(targetID);
  //   if (!targetAnchor) return;
  //   const originalTop = distanceToTop(targetAnchor);
  //   window.scrollBy({ top: originalTop - headerOffset, left: 0, behavior: "smooth" });
  //   const checkIfDone = setInterval(function() {
  //       const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
  //       if (distanceToTop(targetAnchor) === 0 || atBottom) {
  //         targetAnchor.tabIndex = "-1";
  //         window.history.pushState("", "", targetID);
  //         clearInterval(checkIfDone);
  //       }
  //   }, 100);
  // } 
  // const linksToAnchors = document.querySelectorAll('a[href^="#"]');
  // linksToAnchors.forEach(each => (each.onclick = anchorLinkHandler));
  // // ^^^^ this chunk of code for anchor tag scroll ^^^^

  //   myIframe.addEventListener("load", function () {
  //     myIframe.style.width = picture.getBoundingClientRect().width + "px" ;
  //     myIframe.style.height = picture.getBoundingClientRect().height + "px";
  //   }); // Waits for Iframe to load before executing code
  // can probably do this with css. why am i doing it in JS? Confirm that shit.
