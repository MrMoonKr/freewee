/******************************************************************************/
/******************************** SYNCHRONIZER ********************************/
/******************************************************************************/

var socket = io();
var sync = synchronizer.init('controller', socket);
var currentGame = 0;

sync.onJoin(function(data, err){
  if (!err){
    fadeOut('join');
    setTimeout(function(){
      fadeIn('controller0')
    }, 1000);
    
    $('.displayusername').text(sync.username)
  } else {
    alert(err.msg)
  }
});

sync.onStartGame(function(data, err){
  if (!err){
    fadeOut('controller' + currentGame);
    setTimeout(function(){
      fadeIn('controller' + data.gameId) // controller1, controller2 ...
    }, 1000);
    
  } else {
    alert(err.msg)
  }
});


function join(){
  sync.join($('#username').val(), $('#roomId').val());
}

/******************************************************************************/
/**************************** CONTROLLER UTILITIES ****************************/
/******************************************************************************/

function fadeOut(id){
  $('#' + id)
      .addClass('animated fadeOut')
      .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this)
            .css('display', 'none')
            .removeClass('animated fadeOut');
        });
}

function fadeIn(id){
  $('#' + id)
      .css('display', 'block')
      .addClass('animated fadeIn')      
      .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this)
        .css('display', 'block')
        .removeClass('animated fadeIn')      
        });
}