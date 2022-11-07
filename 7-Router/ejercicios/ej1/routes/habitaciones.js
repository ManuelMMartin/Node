const express = require('express')
const habitaciones = express.Router()

habitaciones.get('/', (req, res) => {
   req.app.locals.db.collection('habitaciones').find().toArray((err, data) => {
      err
         ? res.send({ error: true, mensaje: "No se ha podido acceder a la BBDD", data: err })
         : res.send({ error: false, mensaje: 'Informacion recuperada de la BBDD', results: data })
   })
})


/* habitaciones.post('/nuevaHabitacion', (req, res) => {
   req.app.locals.db.collection('habitaciones').insertOne({ numero: req.body.numero, ocupada: false }, (err, data) => {
      err
         ? res.send({ error: true, mensaje: "No se ha podido acceder a la BBDD", data: err })
         : res.send({ error: false, mensaje: 'Agregada nueva habitacion a la BBDD', data: data })       
   })
}) */


module.exports = habitaciones