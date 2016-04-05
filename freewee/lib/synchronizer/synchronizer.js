// server.js (or rather, appConfig.js) requires this function in:
//    require('synchronizer')(socketio);

var rooms = {};

module.exports = function(io) {
  /* every time a user connects */
  io.on('connection', function(socket){
    console.log('A user connected');

    var type, _id;
    /* Create a room for new game screen */
    socket.on('synchronizer-create', function(id){
      socket.join(id);
      console.log("Room ID: " + id + "created");
      rooms[id] = true;
      type = 'game-screen';
      _id = id;
      console.log(rooms);
    });

    /* Accept controller */
    socket.on('synchronizer-join', function(msg){

      var response = {
        username: msg.username,
        id: msg.id,
        success: false,
        msg: "Unknown Error"
      };

      if (type == 'controller' && rooms[msg.id]){ // not a game-screen, and room already exists

        socket.join(msg.id);
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