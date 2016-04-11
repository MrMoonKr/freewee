/* server.js (or rather, appConfig.js) requires this exported function in:
 *    require('synchronizer')(socketio);
 */

var rooms = {};

module.exports = function(io) {
  /* every time a user connects */
  io.on('connection', function(socket){
    console.log('A user connected');
    var type, _id;
    console.log('type: ' + type);

    /* CREATE A ROOM */
    socket.on('synchronizer-create', function(id){
      socket.join(id);
      console.log("Room ID: " + id + "created");
      rooms[id] = true;
      type = 'game-screen';
      _id = id;
      console.log(rooms);

    });

    /* ACCEPT NEW CONTROLLER */
    socket.on('synchronizer-join', function(msg){
      console.log("player trying to join");
      // console.log(io.sockets.manager.rooms);
      console.log("type: " + type);
      var response = {
        username: msg.username,
        id: msg.id,
        success: false,
        msg: "Unknown Error in Join"
      };

      if (type !== 'game-screen') {console.log("is controller")}
        if (rooms[msg.id]) {console.log("room exists")}

      if (type !== 'game-screen' && rooms[msg.id]){ // not a game-screen, and room already exists
        console.log("player joining room of id " + msg.id);
        socket.join(msg.id);
        console.log("player joined room " + msg.id);
        console.log("User " + msg.username + " joined room " + msg.id);
        type = 'controller';

        response.success = true;
        response.msg = "Successfully joined room.";

        io.to(msg.id).emit('synchronizer-join', response);
        return
      }

      if (!rooms[msg.id]){
        response.msg = "That room doesn't exist!"
      }

      socket.emit('synchronizer-join', response);

    });

    /* ALL PLAYERS READY; START GAME */
    // socket.on('synchronizer-ready', function(msg){
    //   console.log("why am i in here?");
    //   var response = {
    //     success: false,
    //     msg: "Unknown Error in Ready"
    //   };

    //   console.log("User " + msg.username + " joined room " + msg.id);

    //   response.success = true;
    //   response.msg = "Successfully joined room.";

    //   return

    // });

    socket.on('synchronizer-data', function(data){
      if (type === 'controller'){
        io.to(data.roomId).emit('synchronizer-data', data)
      }
    });


    socket.on('disconnect', function(){
      if (type === 'game-screen' && _id){
        delete rooms[_id]
      }
    });

  });
};