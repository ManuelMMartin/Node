const clientes = require('express').Router()

clientes.get('/', (req, res) => {
   req.app.locals.db.collection('clientes').find().toArray((err, data) => {
      err
         ? res.send({ error: true, mensaje: "No se ha podido acceder a la BBDD", data: err })
         : (data.length < 1
            ? res.send({ error: true, mensaje: 'No hay datos en la BBDD', data: data })
            : res.send({ error: false, mensaje: 'Recuperada informacion de la BBDD', results: data }))
   })
})

clientes.post('/nuevoCliente', (req, res) => {
   req.app.locals.db.collection('clientes').find({ dni: req.body.dni }).toArray((err, data) => {
      err
         ? res.send({ error: true, mensaje: "No se ha podido acceder a la BBDD", data: err })
         : data.length >= 1
            ? res.send({ error: true, mensaje: `El cliente con DNI ${req.body.dni} ya esta registrado en la BBDD`, data: data })
            : req.app.locals.db.collection('clientes').insertOne({
               nombre: req.body.nombre,
               apellido: req.body.apellido,
               dni: req.body.dni
            }, (err1, data1) => {
               err1
                  ? res.send({ error: true, mensaje: "No se ha podido acceder a la BBDD", data: err1 })
                  : (data1.insertedId === null
                     ? res.send({ error: true, mensaje: 'No se ha podido agregar a la BBDD', data: data1 })
                     : res.send({ error: false, mensaje: `Agregado ${req.body.nombre} ${req.body.apellido} a la BBDD`, data: data1 }))
            })
   })
})

clientes.put('/editarCliente', (req, res) => {
   req.app.locals.db.collection('clientes').updateOne({ dni: req.body.dni }, { $set: { nombre: req.body.nombre, apellido: req.body.apellido } }, (err, data) => {
      err
         ? res.send({ error: true, mensaje: "No se ha podido acceder a la BBDD", data: err })
         : data.matchedCount < 1
            ? res.send({ error: true, mensaje: 'El DNI introducido no esta registrado en la BBDD', data: data })
            : data.modifiedCount < 1
               ? res.send({ error: true, mensaje: 'Los datos introducidos ya estaban en la BBDD', data: data })
               : res.send({ error: false, mensaje: `Modificados los datos del cliente con DNI ${req.body.dni} en la BBDD`, data: data })
   })
})

module.exports = clientes