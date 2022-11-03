const express = require("express")
const app = express()
const port = process.env.PORT || 3000
//para que pueda leer lo que llega por body
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
//para que pueda leer lo que llega por body
app.use(express.static('public'))
//configuracion mongoDB
const mongodb = require('mongodb')
let MongoClient = mongodb.MongoClient
MongoClient.connect('mongodb://127.0.0.1:27017', (err, client) => {
   err
      ? console.error('MongoDB no conectado. Error: ' + err)
      : console.log('MongoDB se ha conectado'), app.locals.db = client.db("pruebas")
})
//configuracion mongoDB

app.get('/api/series', (req, res) => {
   app.locals.db.collection("series").find().toArray((err, data) => {
      err
         ? res.send({ mensaje: "error", results: err })
         : res.send({ mensaje: "correcto", results: data })
   })
})
app.get('/api/:serie', (req, res) => {
   console.log(req.params.serie)
   app.locals.db.collection("series").find({ titulo: req.params.serie }).toArray((err, data) => {
      err
         ? res.send({ mensaje: "error", results: err })
         : res.send({ mensaje: "correcto", results: data })
   })
})

app.post('/api/nuevaSerie', (req, res) => {
   app.locals.db.collection("series").insertOne(
      { titulo: req.body.titulo, plataforma: req.body.plataforma, nota: req.body.nota },
      (err, data) => {
         err
            ? res.send({ mensaje: "error", results: err })
            : res.send({ mensaje: "Agregado", results: data })
      })
})



app.listen(port, err => {
   err
      ? console.log("He fallado, lo siento")
      : console.log(`estoy funcionando en localhost:${port}`)
})