/* server.js (or rather, appConfig.js) requires this exported function in:
 *    require('synchronizer')(socketio);
 */

var rooms = {};

module.exports = function(io) {
  /* every time a user connects */
  io.on('connection', function(socket){
    console.log('A user connected');
    var type, _id;

    /* CREATE A ROOM */
    socket.on('synchronizer-create', function(id){
      socket.join(id);
      console.log("room ID : " + id + " created");
      rooms[id] = 0;
      type = 'game-screen';
      _id = id;
      rooms[id] 

    });

    /* ACCEPT NEW CONTROLLER */
    socket.on('synchronizer-join', function(msg){
      console.log("player trying to join");
      var response = {
        username: msg.username,
        id: msg.id,
        playerOrder: 0,
        success: false,
        msg: "Unknown Error in Join"
      };

      if (type !== 'game-screen' && rooms.hasOwnProperty(msg.id)){ // not a game-screen, and room already exists
        socket.join(msg.id);
        console.log(msg.username + " joined room " + msg.id);
        type = 'controller';
        response.playerOrder = rooms[msg.id];
        response.success = true;
        response.msg = "Successfully joined room.";

        rooms[msg.id] += 1;
        
        io.to(msg.id).emit('synchronizer-join', response);
        return
      }

      if (!rooms.hasOwnProperty(msg.id)){
        response.msg = "That room doesn't exist!"
      }

      socket.emit('synchronizer-join', response);

    });

    /* INFORM CONTROLLER CLIENTS WHICH GAME TO CHANGE TO (layout, event listeners) */
    socket.on('synchronizer-game', function(msg){
      if (type === 'game-screen'){
        io.to(msg.roomId).emit('synchronizer-game', {gameId: msg.gameId, success: true});
      }
    });

    /* SEND DATA TO GAME SCREEN CLIENT */
    socket.on('synchronizer-data', function(data){
      if (type === 'controller'){
        io.to(data.roomId).emit('synchronizer-data', data);
      }
    });


    socket.on('disconnect', function(){
      if (type === 'game-screen' && _id){
        delete rooms[_id]
      }
    });

  });
};