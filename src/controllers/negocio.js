const Chat = require('../mongo/models/chat')


async function guardarMensaje(data) {
  console.log(data);
  try {
    const {to, from, mensaje, fecha, idnegocio} = data;

    const message = await Chat.create({
      to,
      from,
      mensaje,
      fecha,
      idnegocio
    });
    console.log('este es el message',message);
    return message;
  } catch (error) {
    console.log('este es el error', error.message);
    return error;
  }

}

module.exports  = {guardarMensaje}
