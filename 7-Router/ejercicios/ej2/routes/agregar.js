const agregar = require('express').Router()

agregar.post('/nuevoMenu', (req, res) => {
   req.app.locals.db.collection('menus').insertOne({
      nombre: req.body.nombre,
      precio: req.body.precio,
   }, (err, data) => {
      err
         ? res.send({ error: true, mensaje: "No se ha podido acceder a la BBDD", data: err })
         : (data.length < 1
            ? res.send({ error: true, mensaje: 'No se ha podido agregar a la BBDD', data: data })
            : res.send({ error: false, mensaje: `Agregado a la BBDD`, data: data }))
   })
})
agregar.post('/nuevoHamburguesa', (req, res) => {
   req.app.locals.db.collection('hamburguesas').insertOne({
      nombre: req.body.nombre,
      precio: req.body.precio,
   }, (err, data) => {
      err
         ? res.send({ error: true, mensaje: "No se ha podido acceder a la BBDD", data: err })
         : (data.length < 1
            ? res.send({ error: true, mensaje: 'No se ha podido agregar a la BBDD', data: data })
            : res.send({ error: false, mensaje: `Agregado a la BBDD`, data: data }))
   })
})
agregar.post('/nuevoBebida', (req, res) => {
   req.app.locals.db.collection('bebidas').insertOne({
      nombre: req.body.nombre,
      precio: req.body.precio,
   }, (err, data) => {
      err
         ? res.send({ error: true, mensaje: "No se ha podido acceder a la BBDD", data: err })
         : (data.length < 1
            ? res.send({ error: true, mensaje: 'No se ha podido agregar a la BBDD', data: data })
            : res.send({ error: false, mensaje: `Agregado a la BBDD`, data: data }))
   })
})
agregar.post('/nuevoEntrante', (req, res) => {
   req.app.locals.db.collection('entrantes').insertOne({
      nombre: req.body.nombre,
      precio: req.body.precio,
   }, (err, data) => {
      err
         ? res.send({ error: true, mensaje: "No se ha podido acceder a la BBDD", data: err })
         : (data.length < 1
            ? res.send({ error: true, mensaje: 'No se ha podido agregar a la BBDD', data: data })
            : res.send({ error: false, mensaje: `Agregado a la BBDD`, data: data }))
   })
})


module.exports = agregar