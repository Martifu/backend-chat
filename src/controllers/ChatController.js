const Chat = require('../mongo/models/chat')

const createMessage = async (request, response) => {
    try {
        const {to, from, mensaje, idnegocio, foto, nombre} = request.body;

        const message = await Chat.create({
            to,
            from,
            mensaje,
            idnegocio,
            foto,
            nombre
        });
        response.status(200).send({data:message})
    } catch (error) {
        
        response.status(500).send({status:'ERROR', message:error.message})
    }
};


const getChat = async (request, response) => {
    try {

        const {} = request.body;
        const chat = await Chat.find();
        response.status(200).send({status:'OK',data:chat})

    } catch (error) {
        
        response.status(500).send({status:'ERROR', message:error.message})
    }
};

module.exports = { createMessage, };