const jsonwebtoken = require('jsonwebtoken');
const _ = require('lodash');
const ChatController = require('../controllers/ChatController');
const isLogin = require('../middlewares/isLogin');
const uploader = require('../middlewares/uploader');
const Negocio = require('../controllers/negocio');
const Chat = require('../mongo/models/chat');

const EXPIRES_IN = 60 * 60; // 1 hour

module.exports = app => {
  app.get('/', (req, res) => {
    res.send({ data: 'Chat is lisening' });
  });

  app.post('/api/getchat', async (request, response) => {
    try {
      const { conversacion, idnegocio } = request.body;
      const chat = await Chat.find({ conversacion: conversacion, idnegocio: idnegocio });
      response.status(200).send({ status: 'OK', data: chat });
    } catch (error) {
      response.status(500).send({ status: 'ERROR', message: error.message });
    }
  });

  app.post('/api/getConversationCliente', async (request, response) => {
    try {

      const { user } = request.body;
      const Converzaciones = await Chat.aggregate([{
        $project:
          {
            to: 1,
            from: 1,
            idnegocio: 1,
            createdAt: 1,
            mensaje: 1,
            nombre: 1,
            foto: 1,
            result: { $or: [{ to: user }, { from: user }] }
          }
      }, {
        $group: {
          '_id': '$idnegocio',
          'last': { '$last': '$$ROOT' }
        }
      }]);

      response.status(200).send({ status: 'OK', data: Converzaciones });

    } catch (error) {

      response.status(500).send({ status: 'ERROR', message: error.message });
    }
  });

  app.post('/api/getConversationNegocio', async (request, response) => {
    try {

      const { idnegocio } = request.body;
      const Conversaciones = await Chat.aggregate([
        { '$match': { 'idnegocio': idnegocio } },
        {
          $project: {
            idnegocio: 1,
            to: 1,
            from: 1,
            nombre: 1,
            mensaje: 1,
            conversacion: 1,
            createdAt: 1
          }
        },
        {
          $group: {
            '_id': '$conversacion',
            'last': { '$last': '$$ROOT' }
          }
        }
      ]);

      response.status(200).send({ status: 'OK', data: Conversaciones });

    } catch (error) {

      response.status(500).send({ status: 'ERROR', message: error.message });
    }
  });

  app.post('/api/guardarReservacion', async (request, response) => {
    try {
      const reservacion = Negocio.guardarReservacion(request);
      response.status(200).send({ status: 'ok', data: reservacion });
    } catch (error) {
      response.status(400).send({ status: 'error', type: error.message, message: 'Hubo un error' });
    }


  });

};
