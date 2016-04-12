/******************************************************************************/
/******************************** SYNCHRONIZER ********************************/
/******************************************************************************/
var socket = io();

var n = synchronizer.init('game-screen', socket);

var players = {};

var numPlayers = 0;

var globalY = [0,0,0,0,0];
//var globalGamma[data.id] = 0;
var globalGamma=[0,0,0,0,0];
var gotUpdate = false;

n.onJoin(function(data){

    // if player is not already in room
    if (!players[data.username]){
      numPlayers+=1;
      players[data.username] = numPlayers; // players["mary"] = 0;
      $('.users').append(" " + data.username + "");
      
      /*** TODO: instantiate and render new SUMO ***/
      createSumo(numPlayers)

    }

    n.receive(function(data){
      if (players[data.username]){
        data.id = players[data.username];
        globalGamma[data.id] = data.orientation.gamma;
        globalY[data.id] = data.motion.y;
        $('.yval').text(globalY);
        $('.gammaval').text(globalGamma);
      }
      gotUpdate = true;
    })
});

$(document).ready(function(){

    $('.roomid').append(n.roomId)
});




/******************************************************************************/
/********************************* GAME LOGIC *********************************/
/******************************************************************************/
