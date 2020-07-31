const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = Schema(
  {
    id: {type:Number, required:true},
    nombre:  {type:String, required:true},
    foto:  {type:String, required:true},
    mensaje: {type:String, required:true},
    userId: {type:Number, required:true},
  },
  { timestamps: true }
);

const Chat = mongoose.model('chat', schema);
module.exports = Chat;
