const express = require("express")
const app = express()
const port = process.env.PORT || 3000
//para que pueda leer lo que llega por body
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
//para que pueda leer lo que llega por body
app.use(express.static('public'))
//Configuración mongodb
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
/* MongoClient.connect('mongodb://127.0.0.1:27017', (err, client) => {
   if (err) {
      console.error('MongoDB no conectado. Error: ' + err)
   } else {
      console.log('MongoDB se ha conectado')
      app.locals.db = client.db("pruebas")
   }
}) */
//conexion con promesas
MongoClient.connect('mongodb://127.0.0.1:27017', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
}).then(client => {
   console.log('🟢MongoDB se ha conectado')
   app.locals.db = client.db("pruebas")
}).catch(err => console.error('🔴MongoDB no conectado. Error: ' + err))

// CONEXION CON PROMESAS Y ASYNC/AWAIT
/* async function conectar() {
   const client = await MongoClient.connect('mongodb://127.0.0.1:27017', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   }).catch(err => {
      console.error(`🔴MongoDB no conectado. Error: ${err}`)
   })
   try {
      console.log(`🟢MongoDB se ha conectado`)
      app.locals.db = client.db('clase')
   } catch (err) {
      console.error(`🔴MongoDB no conectado. Error: ${err}`)
   }
}
conectar() */

//Configuración mongodb

app.get('/api/menus', (req, res) => {
   app.locals.db.collection("restaurante").find().toArray((err, data) => {
      err
         ? res.send({ mensaje: "error", results: err })
         : res.send({ mensaje: "correcto", results: data })
   })
})

app.post('/api/nuevoMenu', (req, res) => {
   console.log(req.body)
   if (req.body.numero === "" || req.body.primero === "" || req.body.segundo === "" || req.body.postre === "" || req.body.precio === "") {
      res.send(console.log("Debes rellenar todos los campos"))
   } else {
      app.locals.db.collection("restaurante").find({ numero: parseInt(req.body.numero) }).toArray((err, data) => {
         err
            ? res.send({ mensaje: "No se ha podido agregar el menu", results: err })
            : data.length > 0
               ? res.send({ mensaje: "Ya existe un menu con el numero: " + req.body.numero, results: data })
               : (app.locals.db.collection("restaurante").insertOne(
                  { numero: parseInt(req.body.numero), primero: req.body.primero, segundo: req.body.segundo, postre: req.body.postre, precio: parseInt(req.body.precio) },
                  (err, data) => {
                     err
                        ? res.send({ mensaje: "No se ha podido agregar el menu", results: err })
                        : res.send({ mensaje: "Agregado el menu numero: " + req.body.numero, results: data })
                  }))
      })
   }
})

app.put('/api/editarMenu', (req, res) => {
   app.locals.db.collection('restaurante')
      .updateOne(
         { numero: parseInt(req.body.numero) },
         { $set: { primero: req.body.primero, segundo: req.body.segundo, postre: req.body.postre, precio: parseInt(req.body.precio) } },
         (err, data) => {
            err
               ? res.send({ mensaje: "No se ha podido modificar el menu", results: err })
               : res.send({ mensaje: "Modificado el menu numero: " + req.body.numero, results: data })
         })
})

app.delete('/api/borrarMenu', (req, res) => {
   app.locals.db.collection('restaurante').deleteOne({ numero: parseInt(req.body.numero) }, (err, data) => {
      err
         ? res.send({ mensaje: "No se ha podido borrar el menu", results: err })
         : res.send({ mensaje: "Borrado el menu numero: " + req.body.numero, results: data })
   })
})


app.listen(port, err => {
   err
      ? console.log("🔴He fallado, lo siento")
      : console.log(`🟢estoy funcionando en localhost:${port}`)
})