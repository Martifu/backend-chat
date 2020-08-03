const Chat = require('../mongo/models/chat')


async function guardarMensaje(data) {
  console.log(data);
  try {
    const {conversacion, to, from, mensaje, idnegocio, foto, nombre} = data;

    const message = await Chat.create({
      conversacion,
      to,
      from,
      mensaje,
      idnegocio,
      foto,
      nombre
    });
    console.log('este es el message',message);
    return message;
  } catch (error) {
    console.log('este es el error', error.message);
    return error;
  }

}

module.exports  = {guardarMensaje}
