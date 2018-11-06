import p5 from 'p5';

new p5(function(p5) {
  // let lines;
  // let increment = 1; // probably needs to be scoped elsewhere
  // const drawLine = () => {
  //   let startY = p5.random(0, ( p5.windowHeight - 200));
  //   let startX = p5.random(0, (p5.windowWidth - 200)); 
  //   p5.stroke(p5.random(0, 255), 120, 255);
  //   p5.line(startX, startY, startX + p5.random((startX + 100), (startX + 100)), startY + p5.random((startY + 100), (startY + 100)));
  //   p5.strokeWeight(4);
  //   increment += 2;
  //   if (increment > 300) {
  //     p5.line.remove();
  //   }
  // }
  
  // p5.setup = () => {
  //   let canvas = p5.createCanvas(((80 / 100) * p5.windowWidth), ((80 / 100) * p5.windowHeight));
  //   canvas.parent('canvas-container');
  //   p5.colorMode(p5.HSB, 255); // Use Hue Saturation Brightness, with a range of 0-255 for each
  // }; // setup function sets up the initial properties of our canvas

  // p5.draw = () => {
  //   // drawLine();

  // }

  // p5.windowResized = () => {
  //   p5.resizeCanvas(((80 / 100) * p5.windowWidth), ((80 / 100) * p5.windowHeight));
  //   increment = 1
  // }
  let lines;
  let increment = 1;

  p5.setup = () => {
    let canvas = p5.createCanvas(720, 400);
    p5.background('black');
    canvas.parent('canvas-container');

    lines = new ParticleSystem(p5.createVector(p5.width / 2, 50));
    console.log(lines);

  }

  p5.draw = () => {
    p5.background('black');
    lines.addParticle();
    lines.run();
    // console.log(lines)
  }

  // A simple Particle class
  var Particle = function (position) {
    this.acceleration = p5.createVector(0, 0.05);
    this.velocity = p5.createVector(p5.random(-1, 1), p5.random(-1, 0));
    this.position = position.copy();
    this.lifespan = 255;
  };

  Particle.prototype.run = function () {
    this.update();
    this.display();
  };

  // Method to update position
  Particle.prototype.update = function () {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2;
  };

  // Method to display
  Particle.prototype.display = function () {
    let startY = p5.random(0, ( p5.windowHeight - 200));
    let startX = p5.random(0, (p5.windowWidth - 200)); 
    p5.stroke(p5.random(0, 255), 120, 255);
    p5.line(startX, startY, startX + p5.random((startX + 100), (startX + 100)), startY + p5.random((startY + 100), (startY + 100)));
    p5.strokeWeight(4);

  };

  // Is the particle still useful?
  Particle.prototype.isDead = function () {
    return this.lifespan < 0;
  };

  var ParticleSystem = function (position) {
    this.origin = position.copy();
    this.particles = [];
  };

  ParticleSystem.prototype.addParticle = function () {
    this.particles.push(new Particle(this.origin));
  };

  ParticleSystem.prototype.run = function () {
    for (var i = this.particles.length - 1; i >= 0; i--) {
      var line = this.particles[i];
      line.run();
      if (line.isDead()) {
        this.particles.splice(i, 1);
      }
    }
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
