var socket = io();

var n = synchronizer.init('host', socket);

var players = {};

var numPlayers = 0;

n.onJoin(function(data){

// if player is not already in room
if (!players[data.username]){
  numPlayers+=1;
  players[data.username] = numPlayers; // players["mary"] = 0;
  $('.users').append("<br>" + data.username + "");
  var newBall = document.createElement("div");
  newBall.setAttribute("id", "ball" + numPlayers);
  newBall.setAttribute("class", "ball");
  var canvas = document.getElementById("canvas");
  document.body.insertBefore(newBall, canvas);

}

n.receive(function(data){
  if (players[data.username]){
    data.id = players[data.username];
    if (data.buttons.indexOf("UP") > -1) {
        console.log("UPUPUPUPUP");
        handleOrientation(1, data.id);
    } else if (data.buttons.indexOf("DOWN") > -1) {
        console.log("downdownDOWN");
        handleOrientation(-1, data.id);
    }
  }
})
});

$(document).ready(function(){

$('.roomid').text(n.roomId)
});