const jsonwebtoken = require('jsonwebtoken');
const _ = require('lodash');
const profile = require('./controllers/profile');

let connectedUsers = {};

module.exports = io => {
  io.on('connection', async socket => {

    //get the data from jwt
     

    // use the user id as room
    //const user = await profile.info(id);

    /*io.to(email).emit('connected', { id: socket.id }); // emit when the user is connected
    socket.broadcast.emit('joined', {
      email,
      email
    });*/

    //connectedUsers[id] = user;

    socket.on('send', message => {
      console.log(message);
      var room = message['sala'];
      console.log(room);
      io.sockets.to(room).emit('new-message', {
        message 
      });
    });

    socket.on('join', room => {
      socket.join(room); // use the user id as room
    });

    socket.on('leave', room => {
      socket.leave(room); // use the user id as room
    });

    /*socket.on('send-file', ({ type, url }) => {
      socket.broadcast.emit('new-file', {
        from: { id, username: user.username },
        file: { type, url }
      });
    });*/

    /*socket.on('disconnect', () => {
      io.emit('disconnected', email);
    });*/
  });
}; 
