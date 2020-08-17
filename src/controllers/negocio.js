const Chat = require('../mongo/models/chat')

const {Reservacion} = require('../database/models/Reservacion')


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

async function guardarReservacion(data) {
  
  const {id_usuario, id_negocio, dia, personas, zona} = data.body;

  try {
    const reservacion = await Reservacion.create({
        id_usuario:id_usuario, 
        id_negocio:id_negocio, 
        dia:dia,
        personas:personas, 
        zona:zona
    })
    return reservacion;
  }catch (error) {
    console.log('este es el error', error.message);
    return error.message;
  }

}


module.exports  = {guardarMensaje, guardarReservacion}
