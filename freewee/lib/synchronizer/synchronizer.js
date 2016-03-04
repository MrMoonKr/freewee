// server.js requires this function
//    require('synchronizer')(socketio);

var rooms = {};

module.exports = function(io) {

  io.on('connection', function(socket){
    console.log('A user connected');

    var type, _id;

    socket.on('disconnect', function(){
      if (type === 'host' && _id){
        delete rooms[_id]
      }
    });

    socket.on('synchronizer-create', function(id){
      socket.join(id);
      console.log("Room ID: " + id + "created");
      rooms[id] = true;
      type = 'host';
      _id = id;
      console.log(rooms);
    });

    socket.on('synchronizer-join', function(msg){

      var response = {
        username: msg.username,
        id: msg.id,
        success: false,
        msg: "Unknown Error"
      };

      if (type !== 'host' && rooms[msg.id]){

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
    })
  });
};