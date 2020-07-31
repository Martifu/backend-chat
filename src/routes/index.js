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
      const chat = await Chat.create({ });
      response.status(200).send({status:'OK',data:chat})

  } catch (error) {
      
      response.status(500).send({status:'ERROR', message:error.message})
  }
  });

};
