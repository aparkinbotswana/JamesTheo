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


  onclick = "window.open(this.href)" // click function that opens new tab and directs to correct website.

});
