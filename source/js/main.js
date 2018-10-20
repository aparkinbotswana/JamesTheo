document.addEventListener('DOMContentLoaded', function(){

  const auslanInterpreter = document.getElementById('auslanInterpreteraus');
  const usernameChecker = document.getElementById('usernameChecker');
  const fraga = document.getElementById('fraga');
  const projects = document.getElementsByClassName('projects')
  const projectsArray = Array.from(projects);

  projectsArray.map((project) => {
    project.addEventListener('mouseover', function(){
      document.getElementById(project.dataset.target).classList.remove('noscale')
    })

    project.addEventListener('mouseleave', function () {
      document.getElementById(project.dataset.target).classList.add('noscale')
    })
  })

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


  // window.addEventListener("resize", function () {
  //   contentWidth();

  //   if (window.innerWidth < 769) {
  //     if (animated === false) {
  //       navBarMobile.classList.remove('list');
  //       mobileNav.appendChild(navBarMobile);
  //       navBarMobile.appendChild(document.getElementById('mobile-1'));
  //       navBarMobile.appendChild(document.getElementById('mobile-2'));
  //       navBarMobile.appendChild(document.getElementById('mobile-3'));
  //       for (let i = 0; i < mobile.length; i++) {
  //         mobile[i].style.visibility = 'visible';
  //       }
  //       animated = true
  //     }
  //   } else if (animated === true) {
  //     navBarMobile.classList.add('list');
  //     animated = false
  //   }
  // });

  // if (typeof InstallTrigger !== 'undefined') {
  //   return // Fireforx does not like appending makisu classes for some reason and screws around with the anchor scroll
  //         // in order to keep scroll working, this works to check if the browser being run is Firefox and if so, breaks out of the function. No fancy Makisu, but the nav bar works this way.
  // } else {
  //   if (window.innerWidth < 769) {
  //     let intervalCount = 1;
  //     navBarMobile.classList.remove('list');
  //     navBarMobile.remove();
  //     mobileNav.appendChild(navBarMobile);
  //     const mobileMakisu = function (el) {
  //       $(el).css('visibility', 'visible');
  //       $(el).makisu({
  //         selector: 'div',
  //         overlap: 0.6,
  //         speed: 0.8
  //       });
  //       $(el).makisu('open');
  //       intervalCount += 1
  //       if (intervalCount === 4) {
  //         clearInterval(mobileMakisuInterval);
  //       }
  //     }
  //     const mobileMakisuInterval = setInterval(function () { mobileMakisu(`#mobile-${intervalCount.toString()}`) }, 300)
  //   }
  //   else {
  //     $('.list').makisu({
  //       selector: '.mobile',
  //       overlap: 0.65,
  //       speed: 0.8
  //     });
  //     $('.list').makisu('open');
  //   } // ^^^^ this IF statement dictaates how makisu nav animation behaves between mobile and desktop devices ^^^^
  // }
