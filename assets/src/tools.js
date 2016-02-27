var smile = function(){
  var $html = $("<b>:)</b>");

  $html.css({
    "display": "block",
    "position": "fixed",
    "bottom": "10px",
    "right": "10px",
    "-webkit-transform": "rotate(90deg)",
    "font-family": "Inconsolata, monospace"
  });

  $("body").append($html);
};

var insertDeskHash = function(){
  console.log('diverted?');
};

$(document).ready(function(){
  smile();
  insertDeskHash();
});
