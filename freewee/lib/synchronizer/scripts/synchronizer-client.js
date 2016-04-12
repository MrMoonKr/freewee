// client-side script

(function(window, document){
  'use strict';

  var _instance;

  var synchronizer = {
    get: function() {
      return _instance;
    },
    init: function(type, socket){
      return _instance || new Synchronizer({
        type: type,
        socket: socket
      })
    }
  };

  /**
   * Synchronizer Constructor
   */
  function Synchronizer(options){
    _instance = this;
    this.id = Math.floor(Math.random()*9000) + 1000; // generate random code
    // this.id = generateWord();
    this.username = "";
    this.roomId = this.id;
    this.type = options.type;
    this.socket = options.socket;
    this.prevOrientation = null;
    this.prevMotion = null;
    this.buttons = [];

    if (this.type == 'game-screen'){
      // tell server to create a room of this.id
      this.socket.emit('synchronizer-create', this.id);
      console.log(this.id);
    }
  }

  Synchronizer.prototype.onJoin = function(callback){
    synchronizer = this;
    // received 'synchronizer-join' event from server
    this.socket.on('synchronizer-join', function(data){
      var err;
      synchronizer.roomId = data.id;
      if (synchronizer.type === 'controller'){
        synchronizer.send();
      }
      if (!data.success){
        err = { msg: data.msg }
      }
      callback(data, err);
    });
  };

  Synchronizer.prototype.join = function(username, id){
    if (this.type == 'controller'){
      this.socket.emit('synchronizer-join', {
        id: id,
        username: username
      });
      this.username = username;
    }
  };

  Synchronizer.prototype.send = function() {

    if (window.DeviceOrientationEvent && window.DeviceMotionEvent) {
      var options = {
            alphaThreshold: 5,
            betaThreshold: 5,
            gammaThreshold: 5,
            yThreshold: 0
          };

      _instance.prevOrientation = {
        alpha: 0,
        beta: 0,
        gamma: 0
      };

      _instance.prevMotion = {
        y: 0,
      };

      window.addEventListener('deviceorientation', function (eventData) {

        var orientation = {
          alpha: eventData.alpha,
          beta: eventData.beta,
          gamma: eventData.gamma
        };

        if(Math.abs(orientation.alpha - _instance.prevOrientation.alpha) >= options.alphaThreshold ||
            Math.abs(orientation.beta - _instance.prevOrientation.beta) >= options.betaThreshold ||
            Math.abs(orientation.gamma - _instance.prevOrientation.gamma) >= options.gammaThreshold
            ) {

          _instance.socket.emit('synchronizer-data',
            {
              username: _instance.username,
              roomId: _instance.roomId,
              buttons: _instance.buttons,
              orientation: orientation,
              motion: _instance.prevMotion,
              timestamp: Date.now()
            });
          _instance.prevOrientation = orientation;
        }
      })

      window.addEventListener('devicemotion', function (eventData) {

        var motion = {
          y: eventData.accelerationIncludingGravity.y.toFixed(3)
        };

        if(Math.abs(motion.y - _instance.prevMotion.y) >= options.yThreshold) {

          _instance.socket.emit('synchronizer-data',
            {
              username: _instance.username,
              roomId: _instance.roomId,
              buttons: _instance.buttons,
              orientation: _instance.prevOrientation,
              motion: motion,
              timestamp: Date.now()
            });
          _instance.prevMotion = motion;
        }
      })
    }

    // // Add button listeners
    // var buttons = document.getElementsByClassName('synchronizer-button');

    // for(var i = 0; i < buttons.length; i++){
    //   buttons[i].addEventListener('touchstart', function(e){
    //     if (_instance.buttons.indexOf(this.id) < 0){
    //       _instance.buttons.push(this.id);
    //     }
    //     _instance.socket.emit('synchronizer-data',
    //       {
    //         username: _instance.username,
    //         roomId: _instance.roomId,
    //         buttons: _instance.buttons,
    //         orientation: _instance.prevOrientation,
    //         motion: _instance.prevMotion,
    //         timestamp: Date.now()
    //       });
    //   });

    //   buttons[i].addEventListener('touchmove', function(e){
    //     e.preventDefault()
    //   });

    //   buttons[i].addEventListener('touchend', function(e){
    //     if (_instance.buttons.indexOf(this.id) > -1){
    //       _instance.buttons.splice(_instance.buttons.indexOf(this.id), 1)
    //     }
    //     _instance.socket.emit('synchronizer-data',
    //       {
    //         username: _instance.username,
    //         roomId: _instance.roomId,
    //         buttons: _instance.buttons,
    //         orientation: _instance.prevOrientation,
    //         motion: _instance.prevMotion,
    //         timestamp: Date.now()
    //       });
    //   });
    // }


  };

  Synchronizer.prototype.receive = function(callback){
    this.socket.on('synchronizer-data', function(data){
      callback(data);
    })
  };


  window.synchronizer = synchronizer;

}(window, document));

function RandomWord() {
    var requestStr = "http://randomword.setgetgo.com/get.php?len=4";

    $.ajax({
        type: "GET",
        url: requestStr,
        dataType: "jsonp",
        jsonpCallback: 'RandomWordComplete'
    });
}

function generateWord(){
  var vowels = ['a', 'e', 'i', 'o', 'u'];
  var consts =  ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'qu', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z', 'tt', 'ch', 'sh'];

  var len = 4;

  var word = '';

  var is_vowel = false;

  var arr;

  for (var i = 0; i < len; i++) {

    if (is_vowel) arr = vowels
    else arr = consts
    is_vowel = !is_vowel;

    word += arr[Math.round(Math.random()*(arr.length-1))];
  }
  return word;
}