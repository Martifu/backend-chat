const jsonwebtoken = require('jsonwebtoken');
const _ = require('lodash');
const ChatController = require('../controllers/ChatController');
const isLogin = require('../middlewares/isLogin');
const uploader = require('../middlewares/uploader');

const Chat = require('../mongo/models/chat')

const EXPIRES_IN = 60 * 60; // 1 hour

module.exports = app => {
  app.get('/', (req, res) => {
    res.send({data:"Chat is lisening"});
  });

  app.get('/api/getchat',async (request, response) => {
    try {

      //const {} = request.body;
      const chat = await Chat.find({ });
      response.status(200).send({status:'OK',data:chat})

  } catch (error) {
      
      response.status(500).send({status:'ERROR', message:error.message})
  }
  });

  app.post('/api/createMessage',async (request, response) => {
    try {
      const {id, nombre, foto, mensaje, userId,} = request.body;

      const message = await Chat.create({
          id,
          nombre,
          foto,
          mensaje,
          userId,
      });
      response.status(200).send({data:message})
    } catch (error) {
        
        response.status(500).send({status:'ERROR', message:error.message})
    }
  });

};
