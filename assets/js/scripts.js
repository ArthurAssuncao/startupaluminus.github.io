function init_wow(){
    // new WOW().init();
    new WOW({
        boxClass:     'wow-nonmobile',      // default
        animateClass: 'animated', // default
        offset:       0,          // default
        mobile:       false,       // default
        live:         true        // default
    }).init(); //wow-nonmobile
}

function scrollspy(){
    $(window).scroll(function() {
      if ($(document).scrollTop() > 50) {
        $('#nav_f').addClass('nav-shrink');
        console.log("add nav-shrink");
      } else {
        $('#nav_f').removeClass('nav-shrink');
        console.log("rm nav-shrink");
      }
    });
}

$(document).ready(function(){
    scrollspy();
    init_wow();
});
