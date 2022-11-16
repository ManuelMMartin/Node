const pedidos = require('express').Router()

pedidos.get('/', (req, res) => {
   req.app.locals.db.collection('pedidos').find().toArray((err, data) => {
      err
         ? res.send({ error: true, mensaje: "No se ha podido acceder a la BBDD", data: err })
         : (data.length < 1
            ? res.send({ error: true, mensaje: 'No hay datos en la BBDD', data: data })
            : res.send({ error: false, mensaje: 'Recuperada informacion de la BBDD', results: data }))
   })
})

pedidos.post('/nuevo', (req, res) => {
   req.app.locals.db.collection(req.body.bbdd).find({ nombre: req.body.nombre }).toArray((err, data) => {
      err
         ? res.send({ error: true, mensaje: "No se ha podido acceder a la BBDD", data: err })
         : data.length < 1
            ? res.send({ error: true, mensaje: 'No hay datos en la BBDD', data: data })
            : req.app.locals.db.collection('pedidos').insertOne({ coleccion: req.body.bbdd, menu: req.body.menu, nombre: data[0].nombre, precio: data[0].precio }, (err1, data1) => {
               err1
                  ? res.send({ error: true, mensaje: 'No se ha podido acceder a la BBDD', results: err1 })
                  : data1.length < 1
                     ? res.send({ error: true, mensaje: 'No hay datos en la BBDD', data: data1 })
                     : res.send({ error: false, mensaje: 'Pedido agregado correctamente', data: data })
            })
   })
})


module.exports = pedidos