/******************************************************************************/
/******************************** SYNCHRONIZER ********************************/
/******************************************************************************/

var socket = io();
var n = synchronizer.init('controller', socket);


n.onJoin(function(data, err){
  if (!err){
    fadeOut('join');
    setTimeout(function(){
      fadeIn('controller')
    }, 1000);
    
    $('.displayusername').text(n.username)
  } else {
    alert(err.msg)
  }
});

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

function join(){
  n.join($('#username').val(), $('#roomId').val());
}

function fadeIn(id){
  $('#' + id)
      .css('display', 'block')
      .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this)
        });
}