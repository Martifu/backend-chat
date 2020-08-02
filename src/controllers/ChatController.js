const Chat = require('../mongo/models/chat')

const createMessage = async (request, response) => {
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

module.exports = { };