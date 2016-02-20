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

function barchartrender(){
    $('#bar-chart-bg').empty();
    var n = 4, // number of layers
    m = 58, // number of samples per layer
    stack = d3.layout.stack(),
    layers = stack(d3.range(n).map(function() { return bumpLayer(m, .1); })),
    yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y; }); }),
    yStackMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); });

    var margin = {top: 50, right: 0, bottom: 0, left: 0},
    width = $('#bar-chart-bg').width() - margin.left - margin.right,
    height = $('#bar-chart-bg').height() - margin.top - margin.bottom;
    // width = 960 - margin.left - margin.right,
    // height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .domain(d3.range(m))
    .rangeRoundBands([0, width], .08);

var y = d3.scale.linear()
    .domain([0, yStackMax])
    .range([height, 0]);

var color = d3.scale.linear()
    .domain([0, n - 1])
    .range(["#2196F3", "#5ca8e7"]);

var svg = d3.select("#bar-chart-bg").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var layer = svg.selectAll(".layer")
    .data(layers)
  .enter().append("g")
    .attr("class", "layer")
    .style("fill", function(d, i) { return color(i); });

var rect = layer.selectAll("rect")
    .data(function(d) { return d; })
  .enter().append("rect")
    .attr("x", function(d) { return x(d.x); })
    .attr("y", height)
    .attr("width", x.rangeBand())
    .attr("height", 0);

rect.transition()
    .delay(function(d, i) { return i * 10; })
    .attr("y", function(d) { return y(d.y0 + d.y); })
    .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); });

  // Inspired by Lee Byron's test data generator.
  function bumpLayer(n, o) {

    function bump(a) {
      var x = 1 / (.1 + Math.random()),
          y = 2 * Math.random() - .5,
          z = 10 / (.1 + Math.random());
      for (var i = 0; i < n; i++) {
        var w = (i / n - y) * z;
        a[i] += x * Math.exp(-w * w);
      }
    }

    var a = [], i;
    for (i = 0; i < n; ++i) a[i] = o + o * Math.random();
    for (i = 0; i < 5; ++i) bump(a);
    return a.map(function(d, i) { return {x: i, y: Math.max(0, d)}; });
  }
}

function msg_send(success){
    if (success) {
        $('#form-email').val("");
        toastService.showSimpleToastTimeMillis("E-mail cadastrado com sucesso", 1000);
        // $('#form-contact').addClass('animated fadeOutRight');
        // $('#form-contact').hide(500);
        // $('.form-result-ok').show().addClass('animated fadeInLeft');
        // $('.form-result-ok').attr('position', 'relative');
    }else{
        toastService.showSimpleToastTimeMillis("Erro ao cadastrar E-mail", 500);
        // $('#form-contact').addClass('animated fadeOutLeft');
        // $('#form-contact').hide(500);
        // $('.form-result-error').show().addClass('animated fadeInRight');
        // $('.form-result-error').attr('position', 'relative');
    };
}

function hide_form_result(){
    // $('.form-result-ok').hide();
    // $('.form-result-error').hide();
}

function add_contact_form_click() {
    $('#form-contact').click(function(e){
        e.preventDefault();
        $.ajax({
            url: "//formspree.io/startupaluminus@gmail.com",
            method: "POST",
            data: {
                message: "Cadastrar na newsletter para receber mais informacoes da Aluminus",
                _replyto: $('#form-email').val(),
                name: $('#form-email').val()},
            dataType: "json",
            success: function(data) {
                msg_send(true);
            },
            error: function(data) {
                msg_send(false);
            }
        });
    });
}

// $(window).resize(function() {
//     barchartrender();
// });

$(document).ready(function(){
    scrollspy();
    init_wow();
    barchartrender();
    add_contact_form_click();
});
