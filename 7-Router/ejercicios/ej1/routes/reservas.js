const express = require('express')
const reservas = express.Router()

function fecha() {
   let date = new Date()
   let day = date.getDate()
   let month = date.getMonth() + 1
   let year = date.getFullYear()
   return (day <= 9 ? "0" + day : day) + "/" + month + "/" + year
}

reservas.get('/', (req, res) => {
   req.app.locals.db.collection('reservas').find().toArray((err, data) => {
      err
         ? res.send({ error: true, mensaje: "No se ha podido acceder a la BBDD", data: err })
         : res.send({ error: false, mensaje: 'Informacion recuperada de la BBDD', results: data })
   })
})



reservas.post('/checkin', (req, res) => {

   req.app.locals.db.collection('clientes').find({ dni: req.body.dni }).toArray((err, cliente) => {
      err
         ? res.send({ error: true, mensaje: "No se ha podido acceder a la BBDD de clientes", data: err })
         : cliente.length < 1
            ? res.send({ error: true, mensaje: "No se ha encontrado el cliente en la BBDD", data: cliente })
            : req.app.locals.db.collection('habitaciones').find({ numero: parseInt(req.body.numero) }).toArray((err1, habitacion) => {
               err1
                  ? res.send({ error: true, mensaje: "No se ha podido acceder a la BBDD de habitaciones", data: err1 })
                  : habitacion.length < 1
                     ? res.send({ error: true, mensaje: "No se ha encontrado la habitacion en la BBDD", data: habitacion })
                     : habitacion[0].ocupada
                        ? res.send({ error: true, mensaje: `La habitacion nº ${req.body.numero} ya esta ocupada, selecciona una habitacion libre`, data: habitacion })
                        : (req.app.locals.db.collection('reservas').insertOne({ cliente: req.body.dni, habitacion: req.body.numero, checkIn: fecha(), checkOut: "" }, (err2, reserva) => {
                           err2
                              ? res.send({ error: true, mensaje: "No se ha podido acceder a la BBDD de reservas", data: err2 })
                              : reserva.insertedId === null
                                 ? res.send({ error: true, mensaje: "No se ha podido registrar en la BBDD de reservas", data: reserva })
                                 : req.app.locals.db.collection('habitaciones').updateOne({ numero: parseInt(req.body.numero) }, { $set: { ocupada: true } }, (err3, data) => {
                                    err3
                                       ? res.send({ error: true, mensaje: "No se ha podido acceder a la BBDD de habitaciones", data: err3 })
                                       : data.modifiedCount < 1
                                          ? res.send({ error: true, mensaje: "No se ha podido reservar la habitacion", data: data })
                                          : res.send({ error: false, mensaje: `Habitacion ${habitacion[0].numero} reservada a nombre de ${cliente[0].nombre} ${cliente[0].apellido}`, data: reserva })
                                 })
                        }))
            })
   })
})

reservas.put('/checkout', (req, res) => {
   req.app.locals.db.collection('reservas').updateOne({ cliente: req.body.dni, habitacion: req.body.numero }, { $set: { checkOut: fecha(), cliente: req.body.dni + "✔", habitacion: req.body.numero + "✔" } }, (err, checkout) => {
      err
         ? res.send({ error: true, mensaje: "No se ha podido acceder a la BBDD de reservas", data: err })
         : checkout.matchedCount < 1
            ? res.send({ error: true, mensaje: "No se han encontrado coincidencias en la BBDD de reservas", data: checkout })
            : checkout.modifiedCount < 1
               ? res.send({ error: true, mensaje: "Esa reserva ya ha finalizado.", data: checkout })
               : req.app.locals.db.collection('habitaciones').updateOne({ numero: parseInt(req.body.numero) }, { $set: { ocupada: false } }, (err1, habitacion) => {
                  err1
                     ? res.send({ error: true, mensaje: "No se ha podido acceder a la BBDD de habitaciones", data: err1 })
                     : res.send({ error: false, mensaje: `Reserva finalizada, habitacion ${req.body.numero} queda libre, esperamos verle pronto.`, data: checkout })
               })
   })
})

module.exports = reservas