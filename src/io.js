const jsonwebtoken = require('jsonwebtoken');
const _ = require('lodash');
const profile = require('./controllers/profile');

let users = [];

module.exports = io => {
  io.on('connection', async socket => {

      console.log('a user connected');
      socket.on('disconnect', function() {
        console.log('user disconnected');
      });
     

      socket.on('message', function(data){
        let index = users.findIndex(user => {
          return user.userId === data.userId
        });
        users[index].socket.emit('message', data.message);
      });

      socket.on('online', function(userId){
        users.push({
          socket,
          userId
        })
        console.log(users)
      });
  });
}; 
