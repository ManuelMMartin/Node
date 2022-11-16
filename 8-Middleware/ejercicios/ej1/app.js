const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const corsOptions = {
   origin: 'www.midominio.es',
}

//para que pueda leer lo que le llega por el body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//para que pueda leer lo que le llega por el body
app.use(cors(corsOptions))


//Configuración mongodb
const MongoClient = require('mongodb').MongoClient
//conexion con promesas
MongoClient.connect('mongodb://127.0.0.1:27017', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
}).then(client => {
   console.log('🟢MongoDB se ha conectado')
   app.locals.db = client.db("hotel")
}).catch(err => console.error('🔴MongoDB no conectado. Error: ' + err))
//Configuración mongodb

app.get('/pedir', (req, res) => {
   console.log(cors(corsOptions))
   app.locals.db.collection('clientes').find({ dni: req.body.dni }).toArray((err, data) => {
      err
         ? res.send({ error: true, mensaje: "error al acceder a la BBDD", data: err })
         : res.send({ error: false, mensaje: "Busqueda satisfactoria", results: data })
   })

})

app.post('/publicar', (req, res) => {
   app.locals.db.collection('clientes').indertOne({ dni: req.body.dni, nombre: req.body.nombre, apellido: req.body.apellido }, (err, data) => {
      err
         ? res.send({ error: true, mensaje: "error al acceder a la BBDD", data: err })
         : data.insertedCount < 1
            ? res.send({ error: true, mensaje: "no se ha podido insertar en la BBDD", data: data })
            : res.send({ error: false, mensaje: "agregado a la BBDD", data: data })
   })
})

app.put('/modificar', (req, res) => {
   app.locals.db.collection('clientes').updateOne({ dni: req.body.dni }, { $set: { nombre: req.body.nombre, apellido: req.body.apellido } }, (err, data) => {
      err
         ? res.send({ error: true, mensaje: "error al acceder a la BBDD", data: err })
         : data.matchedCount < 1
            ? res.send({ error: true, mensaje: "no se ha encontrado el cliente en la BBDD", data: data })
            : data.modifiedCount < 1
               ? res.send({ error: true, mensaje: "no se ha modificado el cliente en la BBDD", data: data })
               : res.send({ error: false, mensaje: "modificado en a la BBDD", data: data })
   })

})

app.delete('/borrar', (req, res) => {
   app.locals.db.collection('clientes').deleteOne({ dni: req.body.dni }, (err, data) => {
      err
         ? res.send({ error: true, mensaje: "error al acceder a la BBDD", data: err })
         : data.deletedCount < 1
            ? res.send({ error: true, mensaje: "no se ha borrado el cliente en la BBDD", data: data })
            : res.send({ error: false, mensaje: "borrado de la BBDD", data: data })
   })

})


app.listen(port, err => {
   err
      ? console.log("🔴He fallado, lo siento")
      : console.log(`🟢estoy funcionando en localhost:${port}`)
})