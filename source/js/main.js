import p5 from 'p5';

new p5(function(p5) {
  let lines;

  p5.setup = () => {
    let canvas = p5.createCanvas(((80 / 100) * p5.windowWidth), ((80 / 100) * p5.windowHeight));
    canvas.parent('canvas-container');
    p5.colorMode(p5.HSB, 255); // Use Hue Saturation Brightness, with a range of 0-255 for each
    lines = new ParticleSystem(p5.width / 2, 50);
  }


  p5.draw = () => {
    p5.background('#f9f9f9')

    lines.run();
    lines.addParticle();
    // debugger

  }

  p5.windowResized = () => {
    p5.resizeCanvas(((80 / 100) * p5.windowWidth), ((80 / 100) * p5.windowHeight));
  }

  // Particle class
  const Particle = function (position) {
    // this.acceleration = p5.createVector(0, 0.05);
    // this.velocity = p5.createVector(p5.random(-1, 1), p5.random(-1, 0));
    // this.position = position.copy();
    this.lifespan = 40; // How long a line "lives" before it is taken out of the array of Particles. Taken out when it gets to 0.
    this.vectorHistory = []; // initialise an empty array to track the X and Y coordinates of the entire line. Data from createVector gets dumped into this.
    this.increment = 1; // make sure every line has its own increment counter
    this.colour = Math.floor(p5.random(0, 255)); // Set a random colour for every line
    this.x = p5.random(0, (p5.windowWidth - 200)); // unique X coordinate for this particular particle
    this.y = p5.random(0, (p5.windowHeight - 200)); // unique Y coordinate for this particular particle

  };
 
  Particle.prototype.run = function () {
    // this.update();
    this.display();
  }; // may not need this function? Might be able to move functionality to other areas. Check this at the end when everything else is working.

  // Method to update position
  Particle.prototype.update = function () {
    // this.velocity.add(this.acceleration);
    // this.position.add(this.velocity);
    // let v = createVector
    this.lifespan -= 2;
  };

  // Method to display
  Particle.prototype.display = function () {
    this.lifespan -= 2;

    // let y = p5.random(0, ( p5.windowHeight - 200));
    // let x = p5.random(0, (p5.windowWidth - 200)); 
    // let y = Math.floor(p5.random(0, 500));
    // let x = 0;
    // console.log(x + this.increment)
    // console.log(y + this.increment)
    let v = p5.createVector(this.x + this.increment, this.y + this.increment)
    this.vectorHistory.push(v)
    console.log(this.vectorHistory[0].x)

    p5.stroke( this.colour, 120, 255);
    // p5.line(x, y, x + p5.random((x + 100), (x + 100)), y + p5.random((y + 100), (y + 100)));
    p5.line(this.vectorHistory[0].x, this.vectorHistory[0].y, this.vectorHistory[(this.vectorHistory.length - 1)].x + this.increment, this.vectorHistory[(this.vectorHistory.length - 1)].y + this.increment);
    p5.strokeWeight(4);
  };

  // Is the particle still useful?
  Particle.prototype.isDead = function () {
    return this.lifespan < 0;
  };

  const ParticleSystem = function (position) {
    // this.origin = position.copy();
    this.particles = [];
  };

  ParticleSystem.prototype.addParticle = function () {
    this.particles.push(new Particle(this.origin));
  };

  ParticleSystem.prototype.run = function () {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      let line = this.particles[i];
      line.increment += 10 // making sure increment increases for every instance of Particle, not every Particle simultaneously 
      line.run();
      if (line.isDead()) {
        this.particles.splice(i, 1);
      }
    }
    // console.log(this.particles)

  };
})

document.addEventListener('DOMContentLoaded', function(){
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
