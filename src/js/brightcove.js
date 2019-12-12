var callbacks = [];
var player;

var video = document.querySelector("video");
var a = video.getAttribute("data-account");
var p = video.getAttribute("data-player");
var e = video.getAttribute("data-embed");

var src=`//players.brightcove.net/${a}/${p}_${e}/index.min.js`;
var script = document.createElement("script");
script.src = src;
script.onload = function() {
  var bc = videojs("player");
  bc.ready(function() {
    callbacks.forEach(fn => fn(bc));
    player = bc;
  });
};
document.head.appendChild(script);

module.exports = function(fn) {
  if (player) {
    return fn(player);
  }
  callbacks.push(fn);
};