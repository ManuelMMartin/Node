const express = require('express')
const app = express()
const port = process.env.PORT || 3000

//para que pueda leer lo que le llega por el body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//para que pueda leer lo que le llega por el body
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
   console.log('MongoDB se ha conectado')
   app.locals.db = client.db("pruebas")
}).catch(err => console.error('MongoDB no conectado. Error: ' + err))

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

app.get('/api/libros', (req, res) => {
   app.locals.db.collection("libros").find().toArray((err, data) => {
      err
         ? res.send({ mensaje: "error", results: err })
         : res.send({ mensaje: "correcto", results: data })
   })
})
app.get('/api/libros/:titulo', (req, res) => {
   console.log(req.params.titulo)
   app.locals.db.collection("libros").find({ titulo: req.params.titulo }).toArray((err, data) => {
      err
         ? res.send({ mensaje: "error", results: err })
         : res.send({
            mensaje:
               data.length > 0
                  ? "correcto"
                  : "no se ha encontrado " + req.params.titulo,
            results: data
         })
   })
})

app.post("/api/nuevoLibro/:titulo", (req, res) => {
   app.locals.db.collection("libros").insertOne({ titulo: req.params.titulo, estado: "Sin leer" }, (err, data) => {
      err
         ? res.send({ mensaje: "error", results: err })
         : res.send({ mensaje: "Agregado", results: data })
   })
})

app.put('/api/editarLibro/:titulo', (req, res) => {
   app.locals.db.collection("libros").updateOne({ titulo: req.params.titulo }, { $set: { estado: "Leido" } }, (err, data) => {
      err
         ? res.send({ mensaje: "error", results: err })
         : res.send({ mensaje: "Modificado", results: data })
   })
})

app.delete('/api/borrarLibro/:titulo', (req, res) => {
   app.locals.db.collection("libros").deleteOne({ titulo: req.params.titulo }, (err, data) => {
      err
         ? res.send({ mensaje: "error", results: err })
         : res.send({ mensaje: "Eliminado", results: data })
   })
})

app.listen(port, err => {
   err
      ? console.log("He fallado, lo siento")
      : console.log(`estoy funcionando en localhost:${port}`)
})