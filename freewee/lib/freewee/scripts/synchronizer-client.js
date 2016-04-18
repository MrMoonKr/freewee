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
   * initializes
   */
  function Synchronizer(options){
    _instance = this;
    this.type = options.type;
    if (this.type === "game-screen") {
      this.id = Math.floor(Math.random()*10000); // generate random code      
    }
    this.username = "";
    this.playerOrder = null;
    this.roomId = this.id;
    this.gameId = null;
    this.socket = options.socket;
    this.prevOrientation = null;
    this.prevMotion = null;
    this.buttons = [];
    this.currentListeners = [];
    this.microphoneOn = false;

    if (this.type == 'game-screen'){
      // tell server to create a room of this.id
      this.socket.emit('synchronizer-create', this.id);
      console.log(this.id);
    }
  }

  Synchronizer.prototype.join = function(username, id){
    if (this.type == 'controller'){
      this.socket.emit('synchronizer-join', {
        id: id,
        username: username
      });
      this.username = username;
    }
  };

  Synchronizer.prototype.onJoin = function(callback){
    synchronizer = this;
    // received 'synchronizer-join' event from server
    this.socket.on('synchronizer-join', function(data){
      var err;
      synchronizer.roomId = data.id; // override controller's generated ID
      if (synchronizer.playerOrder == null) {
        synchronizer.playerOrder = data.playerOrder; 
      }
      if (!data.success){
        err = { msg: data.msg }
      }
      callback(data, err);
    });
  };

  Synchronizer.prototype.startGame = function(gameId){
    if (this.type == 'game-screen'){
      this.gameId = gameId;
      this.socket.emit('synchronizer-game', {
        roomId: _instance.roomId,
        gameId: gameId
      });
    }
  };

  Synchronizer.prototype.onStartGame = function(callback){
    synchronizer = this;
    /* Received 'synchronizer-game' event from server.
     * Format of msg:
     *    {gameId: msg.gameId, success: true}
     */
    this.socket.on('synchronizer-game', function(msg){
      var err;
      this.gameId = gameId;

      // TODO: add and remove event listeners
      if (synchronizer.type === 'controller'){
        switch (msg.gameId) {
          case 1: // sumo
            synchronizer.send(["orientationAndMotion"]);
            break;
          case 2: // snake
            synchronizer.send(["sound", "buttons"]);
            break;
          case 3: // meteor
            synchronizer.send(["buttons"]);
            break;
          default:
            console.log("This shouldn't happen.")

          
        }
      }
      if (!msg.success){
        err = { msg: "ERROR :(" }
      }
      callback(msg, err);
    });
  };




  Synchronizer.prototype.send = function(eventListeners) {
    synchronizer = this;

    // remove any listeners (exception of microphone)
    synchronizer.currentListeners.forEach(function(listener) {
      console.log("remove current listener...");
      window.removeEventListener(listener[0], listener[1]);
      // 
    });
    synchronizer.currentListeners = [];

    // remove microphone if it's on and not needed for this game
    if (synchronizer.microphoneOn && eventListeners[0] != "sound") {
      // TODO: insert code that switches off microphone
      synchronizer.micrphoneOn = false;
    }

    eventListeners.forEach(function(eventListener) {

    
      switch(eventListener) {
        case "orientationAndMotion":
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

            var orientationListener = function (eventData) {
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
                    gameId: _instance.gameId,
                    buttons: _instance.buttons,
                    orientation: orientation,
                    motion: _instance.prevMotion,
                    timestamp: Date.now()
                  });
                _instance.prevOrientation = orientation;
              }
            }

            var motionListener = function (eventData) {

              var motion = {
                y: eventData.accelerationIncludingGravity.y.toFixed(3)
              };

              if(Math.abs(motion.y - _instance.prevMotion.y) >= options.yThreshold) {

                _instance.socket.emit('synchronizer-data',
                  {
                    username: _instance.username,
                    roomId: _instance.roomId,
                    gameId: _instance.gameId,
                    buttons: _instance.buttons,
                    orientation: _instance.prevOrientation,
                    motion: motion,
                    timestamp: Date.now()
                  });
                _instance.prevMotion = motion;
              }
            }

            window.addEventListener('deviceorientation', orientationListener);
            window.addEventListener('devicemotion', motionListener);
            
            synchronizer.currentListeners.push(['deviceorientation', orientationListener]);
            synchronizer.currentListeners.push(['devicemotion', motionListener]);

            break;
          }
        case "sound":
          // don't push anything to currentListeners; instead do this:
          synchronizer.microphoneOn = true;
          break;

        case "buttons":
          var buttons = document.getElementsByClassName('synchronizer-button');

          for(var i = 0; i < buttons.length; i++){
            buttons[i].addEventListener('touchstart', function(e){
              if (_instance.buttons.indexOf(this.id) < 0){ // if this button id is not in buttons
                _instance.buttons.push(this.id); // append to class property `buttons`
              }
              _instance.socket.emit('synchronizer-data',
                {
                  username: _instance.username,
                  roomId: _instance.roomId,
                  gameId: _instance.gameId,
                  buttons: _instance.buttons,
                  orientation: _instance.prevOrientation,
                  motion: _instance.prevMotion,
                  timestamp: Date.now()
                });
            });

            buttons[i].addEventListener('touchmove', function(e){
              e.preventDefault()
            });

            buttons[i].addEventListener('touchend', function(e){
              if (_instance.buttons.indexOf(this.id) > -1){
                _instance.buttons.splice(_instance.buttons.indexOf(this.id), 1)
              }
              _instance.socket.emit('synchronizer-data',
                {
                  username: _instance.username,
                  roomId: _instance.roomId,
                  gameId: _instance.gameId,
                  buttons: _instance.buttons,
                  orientation: _instance.prevOrientation,
                  motion: _instance.prevMotion,
                  timestamp: Date.now()
                });
            });
          }

          break;
      };

    });
  }







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