const express = require('express')
const app = express()
const port = process.env.PORT || 3000

//para que pueda leer lo que le llega por el body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//para que pueda leer lo que le llega por el body

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

app.get('/api/mesas', (req, res) => {
   app.locals.db.collection("mesas").find().toArray(function (err, datos) {
      err
         ? res.send({ mensaje: "error", results: err })
         : res.send({ mensaje: "correcto", results: datos })
   })
})

app.post('/api/anyadir', (req, res) => {
   console.log(req.body)
   app.locals.db.collection("mesas").insertOne(req.body, (err, datos) => {
      err
         ? res.send({ mensaje: "error", results: err })
         : res.send({ mensaje: "insertado", results: datos })

   })
})
/* {multi:true} para modificar varios a la vez */
app.put('/api/modificar/:color', (req, res) => {
   app.locals.db.collection("mesas").updateMany({ color: req.params.color }, { $set: { color: "granate" } }, (err, datos) => {
      err
         ? res.send({ mensaje: "error", results: err })
         : res.send({ mensaje: datos.modiedCount>0? "modificado":"Ninguna coincidencia", results: datos })
   })
})

app.delete('/api/borrar/:patas', (req, res) => {
   app.locals.db.collection("mesas").deleteMany({ patas: parseInt(req.params.patas) }, (err, datos) => {
      err
         ? res.send({ mensaje: "error", results: err })
         : res.send({ mensaje: datos.deletedCount>0? "Borrado correctamente":"Ninguna coincidencia", results: datos })
   })
})

app.listen(port, err => {
   err
      ? console.log("He fallado, lo siento")
      : console.log(`estoy funcionando en localhost:${port}`)
})