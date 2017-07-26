$( document ).ready(function() {

  var divEmpty = function () {
    $("content").hide('slow')
  }

  $( "#nav-about" ).click(function() {
     divEmpty()
     $('#about').animate({height: "toggle"})
  });

  $( "#nav-projects" ).click(function() {
    divEmpty()
    $('#projects').animate({height: "toggle"})


  });

  $( "#nav-contact" ).click(function() {
    divEmpty()
    $('#contact').animate({height: "toggle"})

  });

  $( "#nav-fun" ).click(function() {
    // divEmpty()
    $('#fun').animate({height: "toggle"})


  });

});
