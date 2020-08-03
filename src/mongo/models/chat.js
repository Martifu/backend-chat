const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = Schema(
  {
    conversacion: {type:String, required:true},
    to:  {type:String, required:true},
    from:  {type:String, required:true},
    mensaje:  {type:String, required:true},
    foto:  {type:String, required:true},
    nombre:  {type:String, required:true},
    idnegocio: {type:String, required:true},
  },
  { timestamps: true }
);

const Chat = mongoose.model('chat', schema);
module.exports = Chat;
