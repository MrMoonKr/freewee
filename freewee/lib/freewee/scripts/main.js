/******************************************************************************/
/******************************** SYNCHRONIZER ********************************/
/******************************************************************************/
var socket = io();

var n = synchronizer.init('game-screen', socket);

var players = {};

var numPlayers = 0;

var globalY = [0,0,0,0];
var globalGamma=[0,0,0,0];
var gotUpdate = false;

n.onJoin(function(data){
  if (!players[data.username]){
    numPlayers+=1;
    players[data.username] = numPlayers; // players["mary"] = 0;
    $('.users').append("<br>" + data.username + "");
  }
  n.receive(function(data){
    if (players[data.username]){
      data.id = players[data.username];
      globalGamma[data.id - 1] = data.orientation.gamma;
      globalY[data.id - 1] = data.motion.y;
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
/******************************** PHASER GAME *********************************/
/******************************************************************************/
var game
,   music;

$(function() { //equal to $(document).ready() {
  $('.ready').click(function() {
    $('#welcome').css('display', 'none');
    var gameHeight = screen.availHeight;
    var gameWidth = screen.availWidth;
    var conf = {
      width: gameWidth,
      height: gameHeight,
      renderer: Phaser.AUTO,
      parent: 'phaser-example',
      transparent: false,
      antialias: false,
      state: this,
      scaleMode: Phaser.ScaleManager.EXACT_FIT,
      resolution: 2,
  };
    game = new Phaser.Game(conf);

    // game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    // game.scale.minWidth = gameWidth/2;
    // game.scale.minHeight = gameHeight/2;
    // game.scale.maxWidth = gameWidth;
    // game.scale.maxHeight = gameHeight;
    // game.scale.setScreenSize(true);

    game.state.add('Lobby', Lobby);

    game.state.add('SumoMenu', SumoMenu);
    game.state.add('SumoGame', SumoGame);
    game.state.add('SumoGameOver', SumoGameOver);
    game.state.start('Lobby');
    
  });
});