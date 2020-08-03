const jsonwebtoken = require('jsonwebtoken');
const _ = require('lodash');
const negocio = require('./controllers/negocio')
let users = [];


module.exports = io => {
  io.on('connection', async socket => {

      console.log('a user connected');

      

      socket.on('message', function(data){
        let index = users.findIndex(user => {
          return user.userId === data.to
        });
        negocio.guardarMensaje(data)
        users[index].socket.emit('message', data);
      });

      socket.on('online', function(userId){
        var encontrado = null;
        encontrado = users.find(element => element.userId == userId);
        console.log(encontrado);
        if (encontrado == undefined) {
          users.push({
            socket,
            userId
          })
          console.log(users)
        } else {
          console.log('Ya existe ese usuario');
          var new_element =users.find(element => element.userId == userId);
          users.pop(new_element);
          console.log(users);
          users.push({
            socket,
            userId
          })
          console.log(users);
        }
      });

      socket.on('salir', function(data) {
        console.log('user disconnected');
        users.splice(data, 1);
        console.log(users);
      });

      socket.on('disconnect', () => {
        io.emit('disconnected');
        console.log("desconecto");
        users.splice(socket, 1);
      });
    });

    

    
}; 
