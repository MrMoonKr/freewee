var request = require('supertest');
var server = require('../support/server');

describe('webserver', function() {
  var app;
  beforeEach(function (done) {
    app = server.express();
    server.beforeEach(app, function() {
      done();
    });
  });

  afterEach(function () {

  });

  it('responds to / with a 200 OK', function(done) {
    request(app)
      .get('/')
      .expect(200, done);
  });

  it('should have proper headers', function(done) {
    request(app)
      .get('/')
      .expect(200,done)
      .expect(function(res){
        res.headers.should.have.properties(['content-type','etag']);
      });
  });

  it('should have proper text/html content-type', function(done) {
    request(app)
      .get('/')
      .expect(200,done)
      .expect(function(res){
        res.headers['content-type'].should.equal('text/html; charset=utf-8');
      });
  });

  it('404 everything else', function testPath(done) {
    request(app)
      .get('/foo/bar')
      .expect(404, done);
  });

});


var should = require('should');
var io = require('socket.io-client');

var socketURL = 'http://localhost:3000';

var options ={
  transports: ['websocket'],
  'force new connection': true
};

var chatUser1 = {'name':'Tom'};
var chatUser2 = {'name':'Sally'};
var chatUser3 = {'name':'Dana'};

var server = require('../support/server');

describe('socket communication', function(){
  var gameScreenSocket;
  var controllerSocket;
  beforeEach(function(done) {
    // Setup
    console.log('...establishing socket connection...');
    gameScreenSocket = io.connect(socketURL, options);
    controllerSocket = io.connect(socketURL, options);

    gameScreenSocket.on('connect', function() {
      // console.log('...game screen socket.io client successfully connected...');
    });
    controllerSocket.on('connect', function() {
      // console.log('...controller socket.io client successfully connected...');
    });
    done();
  });

  it('game screen client can create room', function(done){
    gameScreenSocket.emit('synchronizer-create', 1234); // type = 'game-screen' now
    controllerSocket.emit('synchronizer-join', {
        id: 1234,
        username: "bella"
      }) // type = 'controller' now
    gameScreenSocket.on('synchronizer-join', function(data){
    });
    done();
  })

  it('controller client can join room', function(done){
    controllerSocket.emit('synchronizer-join', {
        id: 1234,
        username: "bella"
      }) // type = 'controller' now
    controllerSocket.on('synchronizer-join', function(data){
    });
    done();
  })

  it('controller client is notified of game start triggered by game screen client', function(done){
    // game screen create room 4321
    gameScreenSocket.emit('synchronizer-create', 4321); // type = 'game-screen' now
    // controller join room 4321
    controllerSocket.emit('synchronizer-join', {
        id: 4321,
        username: "bella"
      }) // type = 'controller' now

    // test synchronizer-game
    gameScreenSocket.emit('synchronizer-game', {
        roomId: 4321,
        gameId: 1
    }) 
    console.log("emitted");
    controllerSocket.on('synchronizer-game', function(data){
      console.log("gameId: " + data.gameId);
    });
    done();
  })

  it('controller client can send data to game screen client', function(done){
    // test synchronizer-data
    // game screen create room 4321
    gameScreenSocket.emit('synchronizer-create', 4321); // type = 'game-screen' now
    // controller join room 4321
    controllerSocket.emit('synchronizer-join', {
        id: 4321,
        username: "bella"
      }) // type = 'controller' now

    controllerSocket.emit('synchronizer-data', {
        roomId: 4321,
        data : "mydata"
    }) 
    controllerSocket.on('synchronizer-data', function(data){
      console.log("data: " + data.data);
      done();
    });
  })
});