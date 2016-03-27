// server.js (or rather, appConfig.js) requires this function in:
//    require('synchronizer')(socketio);

var rooms = {};

module.exports = function(io) {
  /* every time a user connects */
  io.on('connection', function(socket){
    console.log('A user connected');

    var type, _id;
    /* if trying to create */
    socket.on('synchronizer-create', function(id){
      socket.join(id);
      console.log("Room ID: " + id + "created");
      rooms[id] = true;
      type = 'host';
      _id = id;
      console.log(rooms);
    });

    /* if trying to join */
    socket.on('synchronizer-join', function(msg){

      var response = {
        username: msg.username,
        id: msg.id,
        success: false,
        msg: "Unknown Error"
      };

      if (type !== 'host' && rooms[msg.id]){ // not a host, and room already exists

        socket.join(msg.id);
        console.log("User " + msg.username + " joined room " + msg.id);
        type = 'player';

        response.success = true;
        response.msg = "Successfully joined room.";

        io.to(msg.id).emit('synchronizer-join', response);
        return
      }

      if (type === 'host'){
        response.msg = "Hosts cannot join rooms."
      }

      if (!rooms[msg.id]){
        response.msg = "That room doesn't exist!"
      }

      socket.emit('synchronizer-join', response);

    });

    socket.on('synchronizer-data', function(data){
      if (type === 'player'){
        io.to(data.roomId).emit('synchronizer-data', data)
      }
    });


    socket.on('disconnect', function(){
      if (type === 'host' && _id){
        delete rooms[_id]
      }
    });

  });
};