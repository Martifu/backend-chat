const jsonwebtoken = require('jsonwebtoken');
const _ = require('lodash');
const negocio = require('./controllers/negocio')
let users = [];


module.exports = io => {
  io.on('connection', async socket => {

      console.log('a user connected');
      socket.on('disconnect', function(data) {
        console.log('user disconnected');
        users.splice(data, 1);
      });

      socket.on('message', function(data){
        let index = users.findIndex(user => {
          return user.userId === data.to
        });
        negocio.guardarMensaje(data)
        users[index].socket.emit('message', data);
      });

      socket.on('online', function(userId){
        if (users.length > 0) {
          if (users[0]['userId'] == userId){
            console.log('Ya se encontro adentro');
          } else {
            users.push({
              socket,
              userId
            })
            console.log(users)
          }
        } else {
          users.push({
            socket,
            userId
          })
          console.log(users)
        }

      });
    });

    /*socket.on('disconnect', () => {
      io.emit('disconnected', email);
    });*/
}; 
