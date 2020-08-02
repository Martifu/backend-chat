const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = Schema(
  {
    to:  {type:String, required:true},
    from:  {type:String, required:true},
    mensaje:  {type:String, required:true},
    fecha: {type:String, required:true},
    idnegocio: {type:String, required:true},
  },
  { timestamps: true }
);

const Chat = mongoose.model('chat', schema);
module.exports = Chat;
