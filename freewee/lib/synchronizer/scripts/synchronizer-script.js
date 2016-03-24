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
    // this.id = Math.floor(Math.random()*9000) + 1000; // generate random code
    this.id = generateWord();
    this.username = "";
    this.roomId = this.id;
    this.type = options.type;
    this.socket = options.socket;
    this.prevData = null;
    this.buttons = [];

    if (this.type == 'host'){
      this.socket.emit('synchronizer-create', this.id);
      console.log(this.id);
    }
  }

  Synchronizer.prototype.onJoin = function(callback){
    synchronizer = this;
    this.socket.on('synchronizer-join', function(data){
      var err;
      synchronizer.roomId = data.id;
      if (synchronizer.type === 'player'){
        synchronizer.send();
      }
      if (!data.success){
        err = { msg: data.msg }
      }
      callback(data, err);
    });
  };

  Synchronizer.prototype.join = function(username, id){
    if (this.type == 'player'){
      this.socket.emit('synchronizer-join', {
        id: id,
        username: username
      });
      this.username = username;
    }
  };

  Synchronizer.prototype.send = function() {

    if (window.DeviceOrientationEvent) {
      var options = {
            alphaThreshold: 5,
            betaThreshold: 5,
            gammaThreshold: 5,
            radians: false
          };

      _instance.prevData = {
        alpha: 0,
        beta: 0,
        gamma: 0
      };

      window.addEventListener('deviceorientation', function (eventData) {

        var data = {
          alpha: options.radians ? eventData.alpha * Math.PI / 180.0 : eventData.alpha,
          beta: options.radians ? eventData.beta * Math.PI / 180.0 : eventData.beta,
          gamma: options.radians ? eventData.gamma * Math.PI / 180.0 : eventData.gamma
        };

        if(Math.abs(data.alpha - _instance.prevData.alpha) >= options.alphaThreshold ||
            Math.abs(data.beta - _instance.prevData.beta) >= options.betaThreshold ||
            Math.abs(data.gamma - _instance.prevData.gamma) >= options.gammaThreshold
            ) {

          _instance.socket.emit('synchronizer-data',
            {
              username: _instance.username,
              roomId: _instance.roomId,
              buttons: _instance.buttons,
              orientation: data,
              timestamp: Date.now()
            });
          _instance.prevData = data;
        }
      })
    }

    // Add button listeners
    var buttons = document.getElementsByClassName('synchronizer-button');

    for(var i = 0; i < buttons.length; i++){
      buttons[i].addEventListener('touchstart', function(e){
        if (_instance.buttons.indexOf(this.id) < 0){
          _instance.buttons.push(this.id);
        }
        _instance.socket.emit('synchronizer-data',
          {
            username: _instance.username,
            roomId: _instance.roomId,
            buttons: _instance.buttons,
            orientation: _instance.prevData,
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
            buttons: _instance.buttons,
            orientation: _instance.prevData,
            timestamp: Date.now()
          });
      });
    }


  };

  Synchronizer.prototype.receive = function(callback){
    this.socket.on('synchronizer-data', function(data){
      callback(data);
    })
  };


  window.synchronizer = synchronizer;

}(window, document));

function generateWord(){
  var vowels = ['a', 'e', 'i', 'o', 'u'];
  var consts =  ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'qu', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z', 'tt', 'ch', 'sh'];

  var len = 5;

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