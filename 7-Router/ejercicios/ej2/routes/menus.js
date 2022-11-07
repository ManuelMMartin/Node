const menus = require('express').Router()

menus.get('/', (req, res) => {
   req.app.locals.db.collection('menus').find().toArray((err, data) => {
      err
         ? res.send({ error: true, mensaje: "No se ha podido acceder a la BBDD", data: err })
         : (data.length < 1
            ? res.send({ error: true, mensaje: 'No hay datos en la BBDD', data: data })
            : res.send({ error: false, mensaje: 'Recuperada informacion de la BBDD', results: data }))
   })
})

module.exports = menus