const mongoose = require('mongoose');
const usuarioValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
     nombre: {
          type: String,
          required: [true, 'El nombre es requerido']
     },
     email: {
          type: String,
          required: [true, 'El correo es requerido'],
          unique: true
     },
     password: {
          type: String,
          required: [true, 'El password es requerdido']
     },
     
     estado : {
          type: Boolean,
          default: false
     },
     
     role: {
          type: String,
          default: 'USER_ROLE',
          enum: {
               values: ['USER_ROLE', 'ADMIN_ROLE'],
               message: '{VALUE} No es un rol permitido'
          }
     }
})

usuarioSchema.methods.toJSON = function() {
     let user = this;
     let userObjet = user.toObject();
     delete userObjet.password;

     return userObjet;
}

usuarioSchema.plugin( usuarioValidator, {message: '{PATH} debe ser unico'});

module.exports = mongoose.model('usuarios', usuarioSchema);