const { DataTypes, Model } = require('sequelize');
const { sequelize, test } = require('../mysql');

class Reservacion extends Model {}

Reservacion.init({
  id_usuario: {type: DataTypes.INTEGER}, 
  id_negocio: {type: DataTypes.INTEGER}, 
  dia: {type: DataTypes.DATE}, 
  confirmacion: {type: DataTypes.STRING, defaultValue: "PENDIENTE"}, 
  personas: {type: DataTypes.INTEGER}, 
  zona: {type: DataTypes.STRING},

}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'reservaciones', // We need to choose the model name
  // don't forget to enable timestamps!
  timestamps: true,

  // I don't want createdAt
  createdAt: false,
  updatedAt: 'updated_at',
  createdAt: 'created_at'
});

// the defined model is the class itself
console.log("Modelo Reresvaciones:" + Reservacion === sequelize.models.reservaciones); // true
//test()

module.exports  = {Reservacion, sequelize}