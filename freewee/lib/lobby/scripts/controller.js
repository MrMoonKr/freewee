/******************************************************************************/
/******************************** SYNCHRONIZER ********************************/
/******************************************************************************/

var socket = io();
var n = synchronizer.init('controller', socket);


n.onJoin(function(data, err){
  if (!err){
    fadeIn('controller');
    fadeOut('join');
    $('.displayusername').text("user connected: " + n.username)
  } else {
    alert(err.msg)
  }
});

/******************************************************************************/
/**************************** CONTROLLER UTILITIES ****************************/
/******************************************************************************/

function fadeOut(id){
  $('#' + id)
      .removeClass('animate fadeIn')
      .addClass('animate fadeOut')
      .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this)
            .css('display', 'none')
            .removeClass('animate fadeOut');
        });
}

function join(){
  n.join($('#username').val(), $('#roomId').val());
}

function fadeIn(id){
  $('#' + id)
      .addClass('animate fadeIn')
      .css('display', 'block');
}