const jsonwebtoken = require('jsonwebtoken');
const _ = require('lodash');
const ChatController = require('../controllers/ChatController');
const isLogin = require('../middlewares/isLogin');
const uploader = require('../middlewares/uploader');
const Negocio = require('../controllers/negocio');
const Chat = require('../mongo/models/chat')

const EXPIRES_IN = 60 * 60; // 1 hour

module.exports = app => {
  app.get('/', (req, res) => {
    res.send({data:"Chat is lisening"});
  });

  app.post('/api/getchat',async (request, response) => {
    try {

        const {admin, user, idnegocio} = request.body;
        const chat = await Chat.find({ $or: [{ to: admin }, { to: user }, { from: admin }, { from: user }],
          idnegocio: idnegocio });
        response.status(200).send({status:'OK',data:chat})

    } catch (error) {

        response.status(500).send({status:'ERROR', message:error.message})
    }
  });

  app.get('/api/getConversationCliente',async (request, response) => {
    try {

        const {user} = request.body;
        const Converzaciones = await Chat.aggregate([{
          $project:
              {
                to: 1,
                from: 1,
                idnegocio:1,
                createdAt:1,
                mensaje:1,
                nombre:1,
                foto:1,
                result: { $or: [{ to: user }, { from: user }]}
          },
        }, {
          $group: { 
            "_id": "$idnegocio",
            "last": { "$last": "$$ROOT" },
          }, 
        }]);
        
        response.status(200).send({status:'OK',data:Converzaciones})

    } catch (error) {

        response.status(500).send({status:'ERROR', message:error.message})
    }
  });

  app.get('/api/getConversationNegocio',async (request, response) => {
    try {

        const {user, idnegocio} = request.body;
        const Converzaciones = await Chat.aggregate([
          { "$match": { "idnegocio": idnegocio } },
          {
            $project : {
              idnegocio:1,
              to:1,
              from:1,
              mensaje:1,
              createdAt:1,
              result: { $or: [{ to: user }, { from: user }]}
            }
          },
          {
          $group: { 
            "_id": "$from",
            "last": { "$last": "$$ROOT" },
          }, 
        }
        ]);
        
        response.status(200).send({status:'OK',data:Converzaciones})

    } catch (error) {

        response.status(500).send({status:'ERROR', message:error.message})
    }
  });

};
