const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let CategoriasSchema = new Schema({
     descripcion: {
          type: String,
          unique: true,
          required: [true, 'La descripcion debe ser unica']
     },
     title: {
          type: String,
          required: [true, 'Nombre requerido']
     },
     usuario: {
          type: Schema.Types.ObjectId,
          ref: 'Usuario'
     }
})

module.exports = mongoose.model('Categorias', CategoriasSchema)