const mongoose = require('mongoose')

const discoSchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   titulo: {
      type: String,
      required: [true, "El titulo es obligatorio"]
   },
   artista: {
      type: String,
      required: [true, "El artista es obligatorio"]
   },
   anyo: {
      type: Number,
      required: [true, "El año es obligatorio"]
   },
   genero: String,
   stock: {
      type: Number,
      required: [true, "Debes añadir el stock"]
   },
   formato: String
})

module.exports = mongoose.model('disco', discoSchema)