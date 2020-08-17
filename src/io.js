const jsonwebtoken = require('jsonwebtoken');
const negocio = require('./controllers/negocio')

const users = [];


module.exports = io => {
  io.on('connection', async socket => {
      console.log('a user connected');
      socket.on('message', function(data){
        let usuario;
        usuario = users.find(user => {
          return user.userId === data.idsocket
        });
        if (usuario === undefined) {
          negocio.guardarMensaje(data)
        } else {
          const idxsocket = users.findIndex(user => {
            return user.userId === data.idsocket
          });
          users[idxsocket].socket.emit('message', data);
          negocio.guardarMensaje(data)
        }
      });

      socket.on('online', function(userId){
        let encontrado = '';
        encontrado = users.find(element => element.userId === userId);
        const idx = users.indexOf(encontrado)
        console.log('log usuario',encontrado);
        console.log('index',idx);
        if (idx === -1) {
          users.push({
            socket,
            userId
          })
          console.log('log users',users)
        } else {
          console.log('Ya existe ese usuario');
          users.splice(idx, 1);
          users.push({
            socket,
            userId
          })
          console.log('log otro users',users);
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

      socket.on('reservacion', (data) =>{
        let usuario;
        usuario = users.find(user => {
          return user.userId === data.id_socket
        });
        if (usuario === undefined) {
          negocio.guardarReservacion(data);
        } else {
          let index = users.findIndex(user => {
            return user.userId === data.id_socket
          });
          negocio.guardarReservacion(data);
          users[index].socket.emit('reservacion', data);
        }
      })
    });

    

    
}; 
