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
});
